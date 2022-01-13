package ent

import (
	"context"

	dialectsql "entgo.io/ent/dialect/sql"
)

func (c *Client) RefreshSearchIndex(ctx context.Context) error {
	db := c.driver.(*dialectsql.Driver).DB()

	const q = `REFRESH MATERIALIZED VIEW CONCURRENTLY search_index;`

	if _, err := db.ExecContext(ctx, q); err != nil {
		return err
	}

	return nil
}
