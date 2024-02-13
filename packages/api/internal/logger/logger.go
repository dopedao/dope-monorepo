package logger

import (
	"context"
	"fmt"
	"os"
	"path"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/pkgerrors"
)

type LogKV func(*zerolog.Context) zerolog.Context

var Log *zerolog.Logger

func Init() {
	if Log != nil {
		return
	}
	fmt.Println("INITIALIZING LOGGER")

	if envcfg.IsRunningLocally() {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	} else {
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	// Customize zerolog for Google Cloud Platform logger
	zerolog.LevelFieldName = "severity"
	zerolog.TimestampFieldName = "timestamp"
	zerolog.TimeFieldFormat = time.RFC3339Nano
	zerolog.ErrorStackMarshaler = pkgerrors.MarshalStack
	var l zerolog.Logger

	if envcfg.IsRunningLocally() {
		// pretty console output
		// https://betterstack.com/community/guides/logging/zerolog/
		consoleWriter := zerolog.ConsoleWriter{Out: os.Stdout}
		l = zerolog.New(consoleWriter).
			With().Timestamp().Stack().Logger()
	} else {
		// writes to stderr and outputs logs to BETTERSTACK for observability
		multi := zerolog.MultiLevelWriter(
			os.Stderr,           // write to console
			betterStackWriter{}, // BetterStack for observability
		)
		l = zerolog.New(multi).With().
			Timestamp().
			Stack().
			Logger()
		// minimum info level
		l = l.Level(zerolog.InfoLevel)
	}

	l = l.Hook(CallerHook{})
	l.WithContext(context.Background())

	Log = &l
}

// Reduce boilerplate code all over the place with this handy function
func LogFatalOnErr(err error, msg string) {
	if err != nil {
		Log.Fatal().Err(err).Msgf(msg)
	}
}

// Reformat logs to be much more readable on the command line
type CallerHook struct{}

func (h CallerHook) Run(event *zerolog.Event, level zerolog.Level, msg string) {
	if _, file, line, ok := runtime.Caller(3); ok {
		var file = path.Base(file)
		var line = line
		filename := file[strings.LastIndex(file, "/")+1:] + ":" + strconv.Itoa(line)
		event.Str("caller", filename)
	}
}
