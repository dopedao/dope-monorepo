package verify

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-redis/redis/v8"
)

type DiscordUser struct {
	Username      string
	Discriminator string
	Id            string
	Email         string
	PaperCount    int
	DopeCount     int
	HustlerCount  int
	IsOg          bool
}

func HandleUserObj() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()

		var discUser DiscordUser
		if err := decoder.Decode(&discUser); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var ctx = context.Background()
		client := redis.NewClient(&redis.Options{
			Addr:     "localhost:6379",
			Password: "",
			DB:       0,
		})

		encodedDiscUser, err := json.Marshal(discUser)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if err = client.Publish(ctx, "discord", encodedDiscUser).Err(); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("Success.\n"))
	}
}
