// Code generated by entc, DO NOT EDIT.

package ent

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/search"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
)

// Hustler is the model entity for the Hustler schema.
type Hustler struct {
	config `json:"-"`
	// ID of the ent.
	ID string `json:"id,omitempty"`
	// Type holds the value of the "type" field.
	Type hustler.Type `json:"type,omitempty"`
	// Name holds the value of the "name" field.
	Name string `json:"name,omitempty"`
	// Title holds the value of the "title" field.
	Title string `json:"title,omitempty"`
	// Color holds the value of the "color" field.
	Color string `json:"color,omitempty"`
	// Background holds the value of the "background" field.
	Background string `json:"background,omitempty"`
	// Age holds the value of the "age" field.
	Age uint64 `json:"age,omitempty"`
	// Sex holds the value of the "sex" field.
	Sex hustler.Sex `json:"sex,omitempty"`
	// Viewbox holds the value of the "viewbox" field.
	Viewbox []int `json:"viewbox,omitempty"`
	// Order holds the value of the "order" field.
	Order []int `json:"order,omitempty"`
	// Svg holds the value of the "svg" field.
	Svg string `json:"svg,omitempty"`
	// CreatedAt holds the value of the "created_at" field.
	CreatedAt time.Time `json:"created_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the HustlerQuery when eager-loading is set.
	Edges                    HustlerEdges `json:"edges"`
	body_part_hustler_bodies *string
	body_part_hustler_hairs  *string
	body_part_hustler_beards *string
	item_hustler_weapons     *string
	item_hustler_clothes     *string
	item_hustler_vehicles    *string
	item_hustler_waists      *string
	item_hustler_feet        *string
	item_hustler_hands       *string
	item_hustler_drugs       *string
	item_hustler_necks       *string
	item_hustler_rings       *string
	item_hustler_accessories *string
	wallet_hustlers          *string
}

// HustlerEdges holds the relations/edges for other nodes in the graph.
type HustlerEdges struct {
	// Wallet holds the value of the wallet edge.
	Wallet *Wallet `json:"wallet,omitempty"`
	// Weapon holds the value of the weapon edge.
	Weapon *Item `json:"weapon,omitempty"`
	// Clothes holds the value of the clothes edge.
	Clothes *Item `json:"clothes,omitempty"`
	// Vehicle holds the value of the vehicle edge.
	Vehicle *Item `json:"vehicle,omitempty"`
	// Waist holds the value of the waist edge.
	Waist *Item `json:"waist,omitempty"`
	// Foot holds the value of the foot edge.
	Foot *Item `json:"foot,omitempty"`
	// Hand holds the value of the hand edge.
	Hand *Item `json:"hand,omitempty"`
	// Drug holds the value of the drug edge.
	Drug *Item `json:"drug,omitempty"`
	// Neck holds the value of the neck edge.
	Neck *Item `json:"neck,omitempty"`
	// Ring holds the value of the ring edge.
	Ring *Item `json:"ring,omitempty"`
	// Accessory holds the value of the accessory edge.
	Accessory *Item `json:"accessory,omitempty"`
	// Body holds the value of the body edge.
	Body *BodyPart `json:"body,omitempty"`
	// Hair holds the value of the hair edge.
	Hair *BodyPart `json:"hair,omitempty"`
	// Beard holds the value of the beard edge.
	Beard *BodyPart `json:"beard,omitempty"`
	// Index holds the value of the index edge.
	Index *Search `json:"index,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [15]bool
}

// WalletOrErr returns the Wallet value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) WalletOrErr() (*Wallet, error) {
	if e.loadedTypes[0] {
		if e.Wallet == nil {
			// The edge wallet was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: wallet.Label}
		}
		return e.Wallet, nil
	}
	return nil, &NotLoadedError{edge: "wallet"}
}

// WeaponOrErr returns the Weapon value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) WeaponOrErr() (*Item, error) {
	if e.loadedTypes[1] {
		if e.Weapon == nil {
			// The edge weapon was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Weapon, nil
	}
	return nil, &NotLoadedError{edge: "weapon"}
}

// ClothesOrErr returns the Clothes value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) ClothesOrErr() (*Item, error) {
	if e.loadedTypes[2] {
		if e.Clothes == nil {
			// The edge clothes was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Clothes, nil
	}
	return nil, &NotLoadedError{edge: "clothes"}
}

// VehicleOrErr returns the Vehicle value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) VehicleOrErr() (*Item, error) {
	if e.loadedTypes[3] {
		if e.Vehicle == nil {
			// The edge vehicle was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Vehicle, nil
	}
	return nil, &NotLoadedError{edge: "vehicle"}
}

// WaistOrErr returns the Waist value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) WaistOrErr() (*Item, error) {
	if e.loadedTypes[4] {
		if e.Waist == nil {
			// The edge waist was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Waist, nil
	}
	return nil, &NotLoadedError{edge: "waist"}
}

// FootOrErr returns the Foot value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) FootOrErr() (*Item, error) {
	if e.loadedTypes[5] {
		if e.Foot == nil {
			// The edge foot was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Foot, nil
	}
	return nil, &NotLoadedError{edge: "foot"}
}

// HandOrErr returns the Hand value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) HandOrErr() (*Item, error) {
	if e.loadedTypes[6] {
		if e.Hand == nil {
			// The edge hand was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Hand, nil
	}
	return nil, &NotLoadedError{edge: "hand"}
}

// DrugOrErr returns the Drug value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) DrugOrErr() (*Item, error) {
	if e.loadedTypes[7] {
		if e.Drug == nil {
			// The edge drug was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Drug, nil
	}
	return nil, &NotLoadedError{edge: "drug"}
}

// NeckOrErr returns the Neck value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) NeckOrErr() (*Item, error) {
	if e.loadedTypes[8] {
		if e.Neck == nil {
			// The edge neck was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Neck, nil
	}
	return nil, &NotLoadedError{edge: "neck"}
}

// RingOrErr returns the Ring value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) RingOrErr() (*Item, error) {
	if e.loadedTypes[9] {
		if e.Ring == nil {
			// The edge ring was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Ring, nil
	}
	return nil, &NotLoadedError{edge: "ring"}
}

// AccessoryOrErr returns the Accessory value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) AccessoryOrErr() (*Item, error) {
	if e.loadedTypes[10] {
		if e.Accessory == nil {
			// The edge accessory was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: item.Label}
		}
		return e.Accessory, nil
	}
	return nil, &NotLoadedError{edge: "accessory"}
}

// BodyOrErr returns the Body value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) BodyOrErr() (*BodyPart, error) {
	if e.loadedTypes[11] {
		if e.Body == nil {
			// The edge body was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: bodypart.Label}
		}
		return e.Body, nil
	}
	return nil, &NotLoadedError{edge: "body"}
}

// HairOrErr returns the Hair value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) HairOrErr() (*BodyPart, error) {
	if e.loadedTypes[12] {
		if e.Hair == nil {
			// The edge hair was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: bodypart.Label}
		}
		return e.Hair, nil
	}
	return nil, &NotLoadedError{edge: "hair"}
}

// BeardOrErr returns the Beard value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) BeardOrErr() (*BodyPart, error) {
	if e.loadedTypes[13] {
		if e.Beard == nil {
			// The edge beard was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: bodypart.Label}
		}
		return e.Beard, nil
	}
	return nil, &NotLoadedError{edge: "beard"}
}

// IndexOrErr returns the Index value or an error if the edge
// was not loaded in eager-loading, or loaded but was not found.
func (e HustlerEdges) IndexOrErr() (*Search, error) {
	if e.loadedTypes[14] {
		if e.Index == nil {
			// The edge index was loaded in eager-loading,
			// but was not found.
			return nil, &NotFoundError{label: search.Label}
		}
		return e.Index, nil
	}
	return nil, &NotLoadedError{edge: "index"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Hustler) scanValues(columns []string) ([]interface{}, error) {
	values := make([]interface{}, len(columns))
	for i := range columns {
		switch columns[i] {
		case hustler.FieldViewbox, hustler.FieldOrder:
			values[i] = new([]byte)
		case hustler.FieldAge:
			values[i] = new(sql.NullInt64)
		case hustler.FieldID, hustler.FieldType, hustler.FieldName, hustler.FieldTitle, hustler.FieldColor, hustler.FieldBackground, hustler.FieldSex, hustler.FieldSvg:
			values[i] = new(sql.NullString)
		case hustler.FieldCreatedAt:
			values[i] = new(sql.NullTime)
		case hustler.ForeignKeys[0]: // body_part_hustler_bodies
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[1]: // body_part_hustler_hairs
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[2]: // body_part_hustler_beards
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[3]: // item_hustler_weapons
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[4]: // item_hustler_clothes
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[5]: // item_hustler_vehicles
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[6]: // item_hustler_waists
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[7]: // item_hustler_feet
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[8]: // item_hustler_hands
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[9]: // item_hustler_drugs
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[10]: // item_hustler_necks
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[11]: // item_hustler_rings
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[12]: // item_hustler_accessories
			values[i] = new(sql.NullString)
		case hustler.ForeignKeys[13]: // wallet_hustlers
			values[i] = new(sql.NullString)
		default:
			return nil, fmt.Errorf("unexpected column %q for type Hustler", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Hustler fields.
func (h *Hustler) assignValues(columns []string, values []interface{}) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case hustler.FieldID:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field id", values[i])
			} else if value.Valid {
				h.ID = value.String
			}
		case hustler.FieldType:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field type", values[i])
			} else if value.Valid {
				h.Type = hustler.Type(value.String)
			}
		case hustler.FieldName:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field name", values[i])
			} else if value.Valid {
				h.Name = value.String
			}
		case hustler.FieldTitle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field title", values[i])
			} else if value.Valid {
				h.Title = value.String
			}
		case hustler.FieldColor:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field color", values[i])
			} else if value.Valid {
				h.Color = value.String
			}
		case hustler.FieldBackground:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field background", values[i])
			} else if value.Valid {
				h.Background = value.String
			}
		case hustler.FieldAge:
			if value, ok := values[i].(*sql.NullInt64); !ok {
				return fmt.Errorf("unexpected type %T for field age", values[i])
			} else if value.Valid {
				h.Age = uint64(value.Int64)
			}
		case hustler.FieldSex:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field sex", values[i])
			} else if value.Valid {
				h.Sex = hustler.Sex(value.String)
			}
		case hustler.FieldViewbox:
			if value, ok := values[i].(*[]byte); !ok {
				return fmt.Errorf("unexpected type %T for field viewbox", values[i])
			} else if value != nil && len(*value) > 0 {
				if err := json.Unmarshal(*value, &h.Viewbox); err != nil {
					return fmt.Errorf("unmarshal field viewbox: %w", err)
				}
			}
		case hustler.FieldOrder:
			if value, ok := values[i].(*[]byte); !ok {
				return fmt.Errorf("unexpected type %T for field order", values[i])
			} else if value != nil && len(*value) > 0 {
				if err := json.Unmarshal(*value, &h.Order); err != nil {
					return fmt.Errorf("unmarshal field order: %w", err)
				}
			}
		case hustler.FieldSvg:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field svg", values[i])
			} else if value.Valid {
				h.Svg = value.String
			}
		case hustler.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				h.CreatedAt = value.Time
			}
		case hustler.ForeignKeys[0]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field body_part_hustler_bodies", values[i])
			} else if value.Valid {
				h.body_part_hustler_bodies = new(string)
				*h.body_part_hustler_bodies = value.String
			}
		case hustler.ForeignKeys[1]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field body_part_hustler_hairs", values[i])
			} else if value.Valid {
				h.body_part_hustler_hairs = new(string)
				*h.body_part_hustler_hairs = value.String
			}
		case hustler.ForeignKeys[2]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field body_part_hustler_beards", values[i])
			} else if value.Valid {
				h.body_part_hustler_beards = new(string)
				*h.body_part_hustler_beards = value.String
			}
		case hustler.ForeignKeys[3]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_weapons", values[i])
			} else if value.Valid {
				h.item_hustler_weapons = new(string)
				*h.item_hustler_weapons = value.String
			}
		case hustler.ForeignKeys[4]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_clothes", values[i])
			} else if value.Valid {
				h.item_hustler_clothes = new(string)
				*h.item_hustler_clothes = value.String
			}
		case hustler.ForeignKeys[5]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_vehicles", values[i])
			} else if value.Valid {
				h.item_hustler_vehicles = new(string)
				*h.item_hustler_vehicles = value.String
			}
		case hustler.ForeignKeys[6]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_waists", values[i])
			} else if value.Valid {
				h.item_hustler_waists = new(string)
				*h.item_hustler_waists = value.String
			}
		case hustler.ForeignKeys[7]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_feet", values[i])
			} else if value.Valid {
				h.item_hustler_feet = new(string)
				*h.item_hustler_feet = value.String
			}
		case hustler.ForeignKeys[8]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_hands", values[i])
			} else if value.Valid {
				h.item_hustler_hands = new(string)
				*h.item_hustler_hands = value.String
			}
		case hustler.ForeignKeys[9]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_drugs", values[i])
			} else if value.Valid {
				h.item_hustler_drugs = new(string)
				*h.item_hustler_drugs = value.String
			}
		case hustler.ForeignKeys[10]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_necks", values[i])
			} else if value.Valid {
				h.item_hustler_necks = new(string)
				*h.item_hustler_necks = value.String
			}
		case hustler.ForeignKeys[11]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_rings", values[i])
			} else if value.Valid {
				h.item_hustler_rings = new(string)
				*h.item_hustler_rings = value.String
			}
		case hustler.ForeignKeys[12]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field item_hustler_accessories", values[i])
			} else if value.Valid {
				h.item_hustler_accessories = new(string)
				*h.item_hustler_accessories = value.String
			}
		case hustler.ForeignKeys[13]:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field wallet_hustlers", values[i])
			} else if value.Valid {
				h.wallet_hustlers = new(string)
				*h.wallet_hustlers = value.String
			}
		}
	}
	return nil
}

// QueryWallet queries the "wallet" edge of the Hustler entity.
func (h *Hustler) QueryWallet() *WalletQuery {
	return (&HustlerClient{config: h.config}).QueryWallet(h)
}

// QueryWeapon queries the "weapon" edge of the Hustler entity.
func (h *Hustler) QueryWeapon() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryWeapon(h)
}

// QueryClothes queries the "clothes" edge of the Hustler entity.
func (h *Hustler) QueryClothes() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryClothes(h)
}

// QueryVehicle queries the "vehicle" edge of the Hustler entity.
func (h *Hustler) QueryVehicle() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryVehicle(h)
}

// QueryWaist queries the "waist" edge of the Hustler entity.
func (h *Hustler) QueryWaist() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryWaist(h)
}

// QueryFoot queries the "foot" edge of the Hustler entity.
func (h *Hustler) QueryFoot() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryFoot(h)
}

// QueryHand queries the "hand" edge of the Hustler entity.
func (h *Hustler) QueryHand() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryHand(h)
}

// QueryDrug queries the "drug" edge of the Hustler entity.
func (h *Hustler) QueryDrug() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryDrug(h)
}

// QueryNeck queries the "neck" edge of the Hustler entity.
func (h *Hustler) QueryNeck() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryNeck(h)
}

// QueryRing queries the "ring" edge of the Hustler entity.
func (h *Hustler) QueryRing() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryRing(h)
}

// QueryAccessory queries the "accessory" edge of the Hustler entity.
func (h *Hustler) QueryAccessory() *ItemQuery {
	return (&HustlerClient{config: h.config}).QueryAccessory(h)
}

// QueryBody queries the "body" edge of the Hustler entity.
func (h *Hustler) QueryBody() *BodyPartQuery {
	return (&HustlerClient{config: h.config}).QueryBody(h)
}

// QueryHair queries the "hair" edge of the Hustler entity.
func (h *Hustler) QueryHair() *BodyPartQuery {
	return (&HustlerClient{config: h.config}).QueryHair(h)
}

// QueryBeard queries the "beard" edge of the Hustler entity.
func (h *Hustler) QueryBeard() *BodyPartQuery {
	return (&HustlerClient{config: h.config}).QueryBeard(h)
}

// QueryIndex queries the "index" edge of the Hustler entity.
func (h *Hustler) QueryIndex() *SearchQuery {
	return (&HustlerClient{config: h.config}).QueryIndex(h)
}

// Update returns a builder for updating this Hustler.
// Note that you need to call Hustler.Unwrap() before calling this method if this Hustler
// was returned from a transaction, and the transaction was committed or rolled back.
func (h *Hustler) Update() *HustlerUpdateOne {
	return (&HustlerClient{config: h.config}).UpdateOne(h)
}

// Unwrap unwraps the Hustler entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (h *Hustler) Unwrap() *Hustler {
	tx, ok := h.config.driver.(*txDriver)
	if !ok {
		panic("ent: Hustler is not a transactional entity")
	}
	h.config.driver = tx.drv
	return h
}

// String implements the fmt.Stringer.
func (h *Hustler) String() string {
	var builder strings.Builder
	builder.WriteString("Hustler(")
	builder.WriteString(fmt.Sprintf("id=%v", h.ID))
	builder.WriteString(", type=")
	builder.WriteString(fmt.Sprintf("%v", h.Type))
	builder.WriteString(", name=")
	builder.WriteString(h.Name)
	builder.WriteString(", title=")
	builder.WriteString(h.Title)
	builder.WriteString(", color=")
	builder.WriteString(h.Color)
	builder.WriteString(", background=")
	builder.WriteString(h.Background)
	builder.WriteString(", age=")
	builder.WriteString(fmt.Sprintf("%v", h.Age))
	builder.WriteString(", sex=")
	builder.WriteString(fmt.Sprintf("%v", h.Sex))
	builder.WriteString(", viewbox=")
	builder.WriteString(fmt.Sprintf("%v", h.Viewbox))
	builder.WriteString(", order=")
	builder.WriteString(fmt.Sprintf("%v", h.Order))
	builder.WriteString(", svg=")
	builder.WriteString(h.Svg)
	builder.WriteString(", created_at=")
	builder.WriteString(h.CreatedAt.Format(time.ANSIC))
	builder.WriteByte(')')
	return builder.String()
}

// Hustlers is a parsable slice of Hustler.
type Hustlers []*Hustler

func (h Hustlers) config(cfg config) {
	for _i := range h {
		h[_i].config = cfg
	}
}
