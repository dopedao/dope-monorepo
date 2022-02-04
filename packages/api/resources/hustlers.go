package resources

import (
	"bytes"
	"context"
	"encoding/json"
	"image"
	"image/draw"
	"image/png"
	"net/http"
	"reflect"
	"strconv"
	"strings"

	"cloud.google.com/go/storage"
	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
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

func sprite(h *ent.Hustler, slot, sex string) string {
	r := reflect.ValueOf(h.Edges)
	v := reflect.Indirect(r).FieldByName(slot)
	item := v.Interface().(*ent.Item)

	if item.Sprite.Female == "" {
		item = item.Edges.Base
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

	return &Sprites{
		Body:      h.Edges.Body.Sprite,
		Beard:     h.Edges.Beard.Sprite,
		Hair:      h.Edges.Hair.Sprite,
		Accessory: sprite(h, "Accessory", h.Sex.String()),
		Clothes:   sprite(h, "Clothes", h.Sex.String()),
		Foot:      sprite(h, "Foot", h.Sex.String()),
		Hand:      sprite(h, "Hand", h.Sex.String()),
		Neck:      sprite(h, "Neck", h.Sex.String()),
		Ring:      sprite(h, "Ring", h.Sex.String()),
		Waist:     sprite(h, "Waist", h.Sex.String()),
		Weapon:    sprite(h, "Weapon", h.Sex.String()),
	}, nil
}

func HustlerSpritesHandler(client *ent.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ctx, log := base.LogFor(ctx)

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
	rdr, err := static.Object(strings.TrimPrefix(url, "https://static.dopewars.gg/")).NewReader(ctx)
	if err != nil {
		return nil, err
	}
	defer rdr.Close()

	return png.Decode(rdr)
}

func HustlerSpritesCompositeHandler(client *ent.Client, static *storage.BucketHandle) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ctx, log := base.LogFor(ctx)

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
			log.Err(err).Msgf("Getting hustler body with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		hair, err := readSprite(ctx, static, s.Hair)
		if err != nil {
			log.Err(err).Msgf("Getting hustler hair with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		// accessory, err := readSprite(ctx, static, s.Accessory)
		// if err != nil {
		// 	log.Err(err).Msgf("Getting hustler accessory with id: %s", id)
		// 	http.Error(w, "unexpected error", http.StatusInternalServerError)
		// 	return
		// }

		clothes, err := readSprite(ctx, static, s.Clothes)
		if err != nil {
			log.Err(err).Msgf("Getting hustler clothes with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		foot, err := readSprite(ctx, static, s.Foot)
		if err != nil {
			log.Err(err).Msgf("Getting hustler foot with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		hand, err := readSprite(ctx, static, s.Hand)
		if err != nil {
			log.Err(err).Msgf("Getting hustler hand with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		neck, err := readSprite(ctx, static, s.Neck)
		if err != nil {
			log.Err(err).Msgf("Getting hustler neck with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		ring, err := readSprite(ctx, static, s.Ring)
		if err != nil {
			log.Err(err).Msgf("Getting hustler ring with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		waist, err := readSprite(ctx, static, s.Waist)
		if err != nil {
			log.Err(err).Msgf("Getting hustler waist with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		weapon, err := readSprite(ctx, static, s.Weapon)
		if err != nil {
			log.Err(err).Msgf("Getting hustler weapon with id: %s", id)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		composited := &notOpaqueRGBA{image.NewRGBA(body.Bounds())}
		draw.Draw(composited, body.Bounds(), body, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, hair.Bounds(), hair, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, clothes.Bounds(), clothes, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, hand.Bounds(), hand, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, neck.Bounds(), neck, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, foot.Bounds(), foot, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, ring.Bounds(), ring, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, waist.Bounds(), waist, image.Point{0, 0}, draw.Over)
		draw.Draw(composited, weapon.Bounds(), weapon, image.Point{0, 0}, draw.Over)
		// draw.Draw(composited, accessory.Bounds(), accessory, image.Point{0, 0}, draw.Over)

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
