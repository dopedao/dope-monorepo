package dbprovider

import (
	"embed"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

//go:embed data/dopes.sql
//go:embed data/items.sql
//go:embed data/dope_items.sql
//go:embed data/body_parts.sql
var fsBootstrap embed.FS

func Seed() {
	files := []string{
		"data/dopes.sql",
		"data/items.sql",
		"data/dope_items.sql",
		"data/body_parts.sql"}

	logger.Log.Info().Msg("Bootstrapping database")

	for _, file := range files {
		content, err := fsBootstrap.ReadFile(file)
		if err != nil {
			logger.Log.Fatal().Msgf("Reading file %s: %+v", file, err)
		}

		if _, err := Conn().Exec(string(content)); err != nil {
			logger.Log.Fatal().Msgf("Inserting %s: %+v", file, err)
		}
	}
}

func shouldSeedDatabase() bool {
	var count int
	if err := Conn().QueryRow("SELECT COUNT(*) FROM dopes").Scan(&count); err != nil {
		logger.Log.Fatal().Msgf("Checking if db needs to be bootstrapped: %+v", err)
	}

	return count == 0
}
