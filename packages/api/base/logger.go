package base

import (
	"context"

	"github.com/rs/zerolog"
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
