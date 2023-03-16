package logger

import (
	"context"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type LogKV func(*zerolog.Context) zerolog.Context

func LogFor(ctx context.Context, values ...LogKV) (context.Context, zerolog.Logger) {
	SetGcpLevels()
	logWithCtx := zerolog.Ctx(ctx).With()
	for _, value := range values {
		logWithCtx = value(&logWithCtx)
	}
	lg := logWithCtx.Logger()
	return lg.WithContext(ctx), lg
}

// Reduce boilerplate code all over the place with this handy function
func LogFatalOnErr(err error, msg string) {
	if err != nil {
		log.Fatal().Err(err).Msgf(msg) //nolint:gocritic
	}
}

// Customize zerolog for Cloud Platform a bit so things show up correctly.
func SetGcpLevels() {
	zerolog.LevelFieldName = "severity"
	zerolog.TimestampFieldName = "timestamp"
	zerolog.TimeFieldFormat = time.RFC3339Nano
}
