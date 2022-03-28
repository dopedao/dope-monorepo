// Updates the "sprite" field for db tables "items" and "body_parts"
// which hustlers.go reads to composite the sprite for a Hustler.
//
// Without this field updated the proper item sprite will not render
// on the final sprite sheet.
package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"cloud.google.com/go/storage"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"google.golang.org/api/iterator"

	_ "github.com/lib/pq"
)

var bucketUrl = "https://static.dopewars.gg/"

func main() {
	ctx := context.Background()

	// Database connection client
	db, err := sql.Open(dialect.Postgres, "postgres://postgres:postgres@localhost:5433?sslmode=disable")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}
	client := ent.NewClient(ent.Driver(db))

	// GCP Storage Bucket Client
	s, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}

	query := &storage.Query{Prefix: ""}

	storageBucket := s.Bucket("dopewars-static")
	bucketObjects := storageBucket.Objects(ctx, query)
	for {
		attrs, err := bucketObjects.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		println(attrs.Name)

		if !strings.Contains(attrs.Name, ".png") {
			continue
		}

		split := strings.Split(attrs.Name, "/")

		if len(split) == 2 {
			id := strings.TrimSuffix(split[1], ".png")
			item, err := client.Item.Get(ctx, id)
			if err != nil {
				log.Fatal(err)
			}

			if split[0] == "male" {
				item.Sprite.Male = bucketUrl + attrs.Name
			} else if split[0] == "female" {
				item.Sprite.Female = bucketUrl + attrs.Name
			}

			if err := client.Item.UpdateOne(item).SetSprite(item.Sprite).Exec(ctx); err != nil {
				log.Fatal(err)
			}
		} else if len(split) == 3 {
			id := fmt.Sprintf("%s-%s-%s", strings.ToUpper(split[0]), strings.ToUpper(split[1]), strings.TrimSuffix(split[2], ".png"))
			body, err := client.BodyPart.Get(ctx, id)
			if err != nil {
				log.Fatal(err)
			}

			body.Sprite = bucketUrl + attrs.Name

			if err := client.BodyPart.UpdateOneID(id).SetSprite(body.Sprite).Exec(ctx); err != nil {
				log.Fatal(err)
			}
		}
	}
}
