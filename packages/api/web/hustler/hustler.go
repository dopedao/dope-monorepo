package hustler

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"image"
	"image/draw"
	"image/png"
	"net/http"
	"reflect"
	"strconv"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/gorilla/mux"
)

type Sprites struct {
	Accessory string `json:"accessory"`
	Beard     string `json:"beard"`
	Body      string `json:"body"`
	Hair      string `json:"hair"`
	Clothes   string `json:"clothes"`
	Foot      string `json:"foot"`
	Hand      string `json:"hand"`
	Neck      string `json:"neck"`
	Ring      string `json:"ring"`
	Waist     string `json:"waist"`
	Weapon    string `json:"weapon"`
}

func sprite(ctx context.Context, h *ent.Hustler, slot, sex string) string {
	log := logger.Log

	r := reflect.ValueOf(h.Edges)
	v := reflect.Indirect(r).FieldByName(slot)
	item := v.Interface().(*ent.Item)

	if item == nil {
		log.Warn().Msgf("No item: %s", slot)
		return ""
	}

	if item.Sprite.Female == "" && item.Edges.Base == nil {
		log.Warn().Msgf("No sprite for item: %s", item.ID)
		return ""
	} else if item.Sprite.Female == "" {
		item = item.Edges.Base
	}

	if item.Sprite.Female == "" {
		log.Warn().Msgf("No sprite for item: %s", item.ID)
		return ""
	}

	r2 := reflect.ValueOf(item.Sprite)
	v2 := reflect.Indirect(r2).FieldByName(strings.Title(strings.ToLower(sex)))
	return v2.String()
}

func sprites(ctx context.Context, id string, client *ent.Client) (*Sprites, error) {
	h, err := client.Hustler.Query().
		WithBeard().
		WithBody().
		WithHair().
		WithAccessory(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithClothes(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithFoot(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithHand(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithNeck(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithRing(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithWaist(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		WithWeapon(func(q *ent.ItemQuery) {
			q.WithBase()
		}).
		Where(hustler.IDEQ(id)).
		Only(ctx)
	if err != nil {
		return nil, err
	}

	s := &Sprites{
		Body:      fmt.Sprintf("https://static.dopewars.gg/%s/body/0.png", strings.ToLower(h.Sex.String())),
		Hair:      fmt.Sprintf("https://static.dopewars.gg/%s/hair/0.png", strings.ToLower(h.Sex.String())),
		Accessory: sprite(ctx, h, "Accessory", h.Sex.String()),
		Clothes:   sprite(ctx, h, "Clothes", h.Sex.String()),
		Foot:      sprite(ctx, h, "Foot", h.Sex.String()),
		Hand:      sprite(ctx, h, "Hand", h.Sex.String()),
		Neck:      sprite(ctx, h, "Neck", h.Sex.String()),
		Ring:      sprite(ctx, h, "Ring", h.Sex.String()),
		Waist:     sprite(ctx, h, "Waist", h.Sex.String()),
		Weapon:    sprite(ctx, h, "Weapon", h.Sex.String()),
	}

	if h.Edges.Body != nil {
		s.Body = h.Edges.Body.Sprite
	}

	if h.Edges.Hair != nil {
		s.Hair = h.Edges.Hair.Sprite
	}

	if h.Edges.Beard != nil {
		s.Beard = h.Edges.Beard.Sprite
	}

	return s, nil
}

func SpritesHandler(client *ent.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		log := logger.Log

		vars := mux.Vars(r)
		id := vars["id"]

		s, err := sprites(ctx, id, client)
		if err != nil {
			if ent.IsNotFound(err) {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}
			log.Err(err).Msgf("Getting hustler with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		b, err := json.Marshal(s)
		if err != nil {
			log.Err(err).Msgf("Marshalling sprites.")
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(b)
	}
}

// enforce image.RGBA to always add the alpha channel when encoding PNGs.
type notOpaqueRGBA struct {
	*image.RGBA
}

func (i *notOpaqueRGBA) Opaque() bool {
	return false
}

func readSprite(ctx context.Context, static *storage.BucketHandle, url string) (image.Image, error) {
	rdr, err := static.Object(
		strings.TrimPrefix(url, "https://static.dopewars.gg/")).NewReader(ctx)
	if err != nil {
		return nil, err
	}
	defer rdr.Close()

	return png.Decode(rdr)
}

func SpritesCompositeHandler(client *ent.Client, static *storage.BucketHandle) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		log := logger.Log

		vars := mux.Vars(r)
		id := vars["id"]
		s, err := sprites(ctx, id, client)
		if err != nil {
			if ent.IsNotFound(err) {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}
			log.Err(err).Msgf("Getting hustler with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		body, err := readSprite(ctx, static, s.Body)
		if err != nil {
			log.Err(err).Msgf("Getting hustler body with id: %s", s.Body)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		composited := &notOpaqueRGBA{image.NewRGBA(body.Bounds())}
		draw.Draw(composited, body.Bounds(), body, image.Point{0, 0}, draw.Over)

		if s.Hair != "" {
			hair, err := readSprite(ctx, static, s.Hair)
			if err != nil {
				log.Err(err).Msgf("Getting hustler hair with id: %s", s.Hair)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, hair.Bounds(), hair, image.Point{0, 0}, draw.Over)
		}

		if s.Accessory != "" {
			accessory, err := readSprite(ctx, static, s.Accessory)
			if err != nil {
				log.Err(err).Msgf("Getting hustler accessory with id: %s", id)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, accessory.Bounds(), accessory, image.Point{0, 0}, draw.Over)
		}

		if s.Clothes != "" {
			clothes, err := readSprite(ctx, static, s.Clothes)
			if err != nil {
				log.Err(err).Msgf("Getting hustler clothes with id: %s", s.Clothes)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, clothes.Bounds(), clothes, image.Point{0, 0}, draw.Over)
		}

		if s.Foot != "" {
			foot, err := readSprite(ctx, static, s.Foot)
			if err != nil {
				log.Err(err).Msgf("Getting hustler foot with id: %s", s.Foot)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, foot.Bounds(), foot, image.Point{0, 0}, draw.Over)
		}

		if s.Hand != "" {
			hand, err := readSprite(ctx, static, s.Hand)
			if err != nil {
				log.Err(err).Msgf("Getting hustler hand with id: %s", s.Hand)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, hand.Bounds(), hand, image.Point{0, 0}, draw.Over)
		}

		if s.Neck != "" {
			neck, err := readSprite(ctx, static, s.Neck)
			if err != nil {
				log.Err(err).Msgf("Getting hustler neck with id: %s", s.Neck)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, neck.Bounds(), neck, image.Point{0, 0}, draw.Over)
		}

		if s.Ring != "" {
			ring, err := readSprite(ctx, static, s.Ring)
			if err != nil {
				log.Err(err).Msgf("Getting hustler ring with id: %s", s.Ring)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, ring.Bounds(), ring, image.Point{0, 0}, draw.Over)
		}

		if s.Waist != "" {
			waist, err := readSprite(ctx, static, s.Waist)
			if err != nil {
				log.Err(err).Msgf("Getting hustler waist with id: %s", s.Waist)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, waist.Bounds(), waist, image.Point{0, 0}, draw.Over)
		}

		if s.Weapon != "" {
			weapon, err := readSprite(ctx, static, s.Weapon)
			if err != nil {
				log.Err(err).Msgf("Getting hustler weapon with id: %s", s.Weapon)
				http.Error(w, "unexpected error", http.StatusInternalServerError)
				return
			}
			draw.Draw(composited, weapon.Bounds(), weapon, image.Point{0, 0}, draw.Over)
		}

		buffer := new(bytes.Buffer)
		if err := png.Encode(buffer, composited); err != nil {
			log.Err(err).Msgf("Encoding image: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "image/png")
		w.Header().Set("Content-Length", strconv.Itoa(len(buffer.Bytes())))
		if _, err := w.Write(buffer.Bytes()); err != nil {
			log.Err(err).Msgf("Encoding image: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
		}
	}
}
