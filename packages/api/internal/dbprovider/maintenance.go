package dbprovider

import (
	"context"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

type RecreateMaterializedViewsJob struct{}

func (j RecreateMaterializedViewsJob) Run() {
	ctx := context.Background()
	RecreateMaterializedViews(ctx)
}

// Refresh the search index materialized view
// This can reduce bloat and improve performance
// by keeping the data volume size down.
func RefreshSearchIndex(ctx context.Context) error {
	logger.Log.Debug().Msg("Refreshing materialized view search_index")
	q := `REFRESH MATERIALIZED VIEW CONCURRENTLY search_index;`
	if _, err := Conn().ExecContext(ctx, q); err != nil {
		return err
	}
	return nil
}

type RefreshSearchIndexJob struct{}

func (j RefreshSearchIndexJob) Run() {
	err := RefreshSearchIndex(context.Background())
	if err != nil {
		logger.Log.Error().Err(err).Msg("Error refreshing search index")
	}
}

func Vacuum(ctx context.Context) {
	logger.Log.Info().Msg("Vacuuming database")
	q := `VACUUM (ANALYZE, FULL);`
	_, err := Conn().ExecContext(ctx, q)
	logger.LogFatalOnErr(err, "Vacuuming database")
}

type VacuumJob struct{}

func (j VacuumJob) Run() {
	Vacuum(context.Background())
}
