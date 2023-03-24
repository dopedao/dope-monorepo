// Updates the "sprite" field for db tables "items" and "body_parts"
// which hustlers.go reads to composite the sprite for a Hustler.
//
// Without this field updated the proper item sprite will not render
// on the final sprite sheet.
//
// # AUTH NOTES
//
//   - For buckets, you have to auth with a json file as spelled out here
//     https://cloud.google.com/docs/authentication/production
//
//   - For PGSQL you have to pass the db password to the script as first parameter like
//     go run 03_refresh_database_sprite_entries/main.go DBPASSWORD
package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"google.golang.org/api/iterator"
)

var bucketUrl = "https://static.dopewars.gg/"

func main() {
	ctx := context.Background()
	client := dbprovider.Ent()

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

		fmt.Println(attrs.Name)

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

			fmt.Printf("id: %s, sprite: %s\n", id, body.Sprite)
			if err := client.BodyPart.UpdateOneID(id).SetSprite(body.Sprite).Exec(ctx); err != nil {
				log.Fatal(err)
			}
		}
	}
}
