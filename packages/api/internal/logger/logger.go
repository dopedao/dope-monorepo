package logger

import (
	"context"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type LogKV func(*zerolog.Context) zerolog.Context

func LogFor(ctx context.Context, values ...LogKV) (context.Context, zerolog.Logger) {
	sub := zerolog.Ctx(ctx).With()
	for _, value := range values {
		sub = value(&sub)
	}
	lg := sub.Logger()
	return lg.WithContext(ctx), lg
}

// Reduce boilerplate code all over the place with this handy function
func LogFatalOnErr(err error, msg string) {
	if err != nil {
		log.Fatal().Err(err).Msgf(msg) //nolint:gocritic
	}
}
