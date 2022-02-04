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

func main() {
	ctx := context.Background()

	db, err := sql.Open(dialect.Postgres, "postgres://postgres:postgres@localhost:5432?sslmode=disable")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(db))

	s, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatal(err)
	}

	query := &storage.Query{Prefix: ""}

	bkt := s.Bucket("dopewars-static")
	it := bkt.Objects(ctx, query)
	for {
		attrs, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		println(attrs.Name)

		if !strings.Contains(attrs.Name, ".png") {
			println("asdas")
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
				item.Sprite.Male = "https://static.dopewars.gg/" + attrs.Name
			} else if split[0] == "female" {
				item.Sprite.Female = "https://static.dopewars.gg/" + attrs.Name
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

			body.Sprite = "https://static.dopewars.gg/" + attrs.Name

			if err := client.BodyPart.UpdateOneID(id).SetSprite(body.Sprite).Exec(ctx); err != nil {
				log.Fatal(err)
			}
		}
	}
}
