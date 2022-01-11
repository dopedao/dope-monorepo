// Code generated by entc, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// AmountsColumns holds the columns for the "amounts" table.
	AmountsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "type", Type: field.TypeEnum, Enums: []string{"DOPE", "ETH", "EQUIPMENT", "HUSTLER", "PAPER", "TURF"}},
		{Name: "amount", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "asset_id", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "listing_inputs", Type: field.TypeString, Nullable: true},
		{Name: "listing_outputs", Type: field.TypeString, Nullable: true},
	}
	// AmountsTable holds the schema information for the "amounts" table.
	AmountsTable = &schema.Table{
		Name:       "amounts",
		Columns:    AmountsColumns,
		PrimaryKey: []*schema.Column{AmountsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "amounts_listings_inputs",
				Columns:    []*schema.Column{AmountsColumns[4]},
				RefColumns: []*schema.Column{ListingsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "amounts_listings_outputs",
				Columns:    []*schema.Column{AmountsColumns[5]},
				RefColumns: []*schema.Column{ListingsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// BodyPartsColumns holds the columns for the "body_parts" table.
	BodyPartsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "type", Type: field.TypeEnum, Enums: []string{"body", "hair", "beard"}},
		{Name: "sex", Type: field.TypeEnum, Enums: []string{"male", "female"}},
		{Name: "rle", Type: field.TypeString},
	}
	// BodyPartsTable holds the schema information for the "body_parts" table.
	BodyPartsTable = &schema.Table{
		Name:       "body_parts",
		Columns:    BodyPartsColumns,
		PrimaryKey: []*schema.Column{BodyPartsColumns[0]},
	}
	// DopesColumns holds the columns for the "dopes" table.
	DopesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "claimed", Type: field.TypeBool, Default: false},
		{Name: "opened", Type: field.TypeBool, Default: false},
		{Name: "score", Type: field.TypeInt, Nullable: true},
		{Name: "rank", Type: field.TypeInt, Nullable: true},
		{Name: "order", Type: field.TypeInt},
		{Name: "listing_dope_lastsales", Type: field.TypeString, Unique: true, Nullable: true},
		{Name: "wallet_dopes", Type: field.TypeString, Nullable: true},
	}
	// DopesTable holds the schema information for the "dopes" table.
	DopesTable = &schema.Table{
		Name:       "dopes",
		Columns:    DopesColumns,
		PrimaryKey: []*schema.Column{DopesColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "dopes_listings_dope_lastsales",
				Columns:    []*schema.Column{DopesColumns[6]},
				RefColumns: []*schema.Column{ListingsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "dopes_wallets_dopes",
				Columns:    []*schema.Column{DopesColumns[7]},
				RefColumns: []*schema.Column{WalletsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// EventsColumns holds the columns for the "events" table.
	EventsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "address", Type: field.TypeBytes},
		{Name: "index", Type: field.TypeUint64},
		{Name: "hash", Type: field.TypeBytes},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "updated_at", Type: field.TypeTime},
	}
	// EventsTable holds the schema information for the "events" table.
	EventsTable = &schema.Table{
		Name:       "events",
		Columns:    EventsColumns,
		PrimaryKey: []*schema.Column{EventsColumns[0]},
		Indexes: []*schema.Index{
			{
				Name:    "event_hash_index",
				Unique:  true,
				Columns: []*schema.Column{EventsColumns[3], EventsColumns[2]},
			},
		},
	}
	// HustlersColumns holds the columns for the "hustlers" table.
	HustlersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "type", Type: field.TypeEnum, Enums: []string{"original_gangsta", "regular"}},
		{Name: "name", Type: field.TypeString, Nullable: true},
		{Name: "title", Type: field.TypeString, Nullable: true},
		{Name: "color", Type: field.TypeString, Nullable: true},
		{Name: "background", Type: field.TypeString, Nullable: true},
		{Name: "age", Type: field.TypeUint64},
		{Name: "sex", Type: field.TypeEnum, Enums: []string{"male", "female"}, Default: "male"},
		{Name: "viewbox", Type: field.TypeJSON},
		{Name: "order", Type: field.TypeJSON},
		{Name: "svg", Type: field.TypeString, Nullable: true},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "body_part_hustler_bodies", Type: field.TypeString, Nullable: true},
		{Name: "body_part_hustler_hairs", Type: field.TypeString, Nullable: true},
		{Name: "body_part_hustler_beards", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_weapons", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_clothes", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_vehicles", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_waists", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_feet", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_hands", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_drugs", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_necks", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_rings", Type: field.TypeString, Nullable: true},
		{Name: "item_hustler_accessories", Type: field.TypeString, Nullable: true},
		{Name: "wallet_hustlers", Type: field.TypeString, Nullable: true},
	}
	// HustlersTable holds the schema information for the "hustlers" table.
	HustlersTable = &schema.Table{
		Name:       "hustlers",
		Columns:    HustlersColumns,
		PrimaryKey: []*schema.Column{HustlersColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "hustlers_body_parts_hustler_bodies",
				Columns:    []*schema.Column{HustlersColumns[12]},
				RefColumns: []*schema.Column{BodyPartsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_body_parts_hustler_hairs",
				Columns:    []*schema.Column{HustlersColumns[13]},
				RefColumns: []*schema.Column{BodyPartsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_body_parts_hustler_beards",
				Columns:    []*schema.Column{HustlersColumns[14]},
				RefColumns: []*schema.Column{BodyPartsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_weapons",
				Columns:    []*schema.Column{HustlersColumns[15]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_clothes",
				Columns:    []*schema.Column{HustlersColumns[16]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_vehicles",
				Columns:    []*schema.Column{HustlersColumns[17]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_waists",
				Columns:    []*schema.Column{HustlersColumns[18]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_feet",
				Columns:    []*schema.Column{HustlersColumns[19]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_hands",
				Columns:    []*schema.Column{HustlersColumns[20]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_drugs",
				Columns:    []*schema.Column{HustlersColumns[21]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_necks",
				Columns:    []*schema.Column{HustlersColumns[22]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_rings",
				Columns:    []*schema.Column{HustlersColumns[23]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_items_hustler_accessories",
				Columns:    []*schema.Column{HustlersColumns[24]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "hustlers_wallets_hustlers",
				Columns:    []*schema.Column{HustlersColumns[25]},
				RefColumns: []*schema.Column{WalletsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// ItemsColumns holds the columns for the "items" table.
	ItemsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "type", Type: field.TypeEnum, Enums: []string{"weapon", "clothes", "vehicle", "waist", "foot", "hand", "drugs", "neck", "ring", "accessory"}},
		{Name: "name_prefix", Type: field.TypeString, Nullable: true},
		{Name: "name_suffix", Type: field.TypeString, Nullable: true},
		{Name: "name", Type: field.TypeString},
		{Name: "suffix", Type: field.TypeString, Nullable: true},
		{Name: "augmented", Type: field.TypeBool, Nullable: true},
		{Name: "count", Type: field.TypeInt, Nullable: true},
		{Name: "tier", Type: field.TypeEnum, Nullable: true, Enums: []string{"common", "rare", "custom", "black_market"}},
		{Name: "greatness", Type: field.TypeInt, Nullable: true},
		{Name: "rles", Type: field.TypeJSON, Nullable: true},
		{Name: "svg", Type: field.TypeString, Nullable: true},
		{Name: "item_derivative", Type: field.TypeString, Nullable: true},
	}
	// ItemsTable holds the schema information for the "items" table.
	ItemsTable = &schema.Table{
		Name:       "items",
		Columns:    ItemsColumns,
		PrimaryKey: []*schema.Column{ItemsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "items_items_derivative",
				Columns:    []*schema.Column{ItemsColumns[12]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// ListingsColumns holds the columns for the "listings" table.
	ListingsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "active", Type: field.TypeBool},
		{Name: "source", Type: field.TypeEnum, Enums: []string{"OPENSEA", "SWAPMEET"}},
		{Name: "dope_listings", Type: field.TypeString, Nullable: true},
	}
	// ListingsTable holds the schema information for the "listings" table.
	ListingsTable = &schema.Table{
		Name:       "listings",
		Columns:    ListingsColumns,
		PrimaryKey: []*schema.Column{ListingsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "listings_dopes_listings",
				Columns:    []*schema.Column{ListingsColumns[3]},
				RefColumns: []*schema.Column{DopesColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// SearchIndexColumns holds the columns for the "search_index" table.
	SearchIndexColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "type", Type: field.TypeEnum, Enums: []string{"dope", "item", "hustler"}},
		{Name: "greatness", Type: field.TypeInt, Nullable: true},
		{Name: "claimed", Type: field.TypeBool},
		{Name: "opened", Type: field.TypeBool},
		{Name: "sale_active", Type: field.TypeBool},
		{Name: "sale_price", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "last_sale_price", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "dope_index", Type: field.TypeString, Unique: true, Nullable: true},
		{Name: "hustler_index", Type: field.TypeString, Unique: true, Nullable: true},
		{Name: "item_index", Type: field.TypeString, Unique: true, Nullable: true},
	}
	// SearchIndexTable holds the schema information for the "search_index" table.
	SearchIndexTable = &schema.Table{
		Name:       "search_index",
		Columns:    SearchIndexColumns,
		PrimaryKey: []*schema.Column{SearchIndexColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "search_index_dopes_index",
				Columns:    []*schema.Column{SearchIndexColumns[8]},
				RefColumns: []*schema.Column{DopesColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "search_index_hustlers_index",
				Columns:    []*schema.Column{SearchIndexColumns[9]},
				RefColumns: []*schema.Column{HustlersColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "search_index_items_index",
				Columns:    []*schema.Column{SearchIndexColumns[10]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// SyncStatesColumns holds the columns for the "sync_states" table.
	SyncStatesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "start_block", Type: field.TypeUint64},
	}
	// SyncStatesTable holds the schema information for the "sync_states" table.
	SyncStatesTable = &schema.Table{
		Name:       "sync_states",
		Columns:    SyncStatesColumns,
		PrimaryKey: []*schema.Column{SyncStatesColumns[0]},
	}
	// WalletsColumns holds the columns for the "wallets" table.
	WalletsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "paper", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "created_at", Type: field.TypeTime},
	}
	// WalletsTable holds the schema information for the "wallets" table.
	WalletsTable = &schema.Table{
		Name:       "wallets",
		Columns:    WalletsColumns,
		PrimaryKey: []*schema.Column{WalletsColumns[0]},
	}
	// WalletItemsColumns holds the columns for the "wallet_items" table.
	WalletItemsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString},
		{Name: "balance", Type: field.TypeInt, SchemaType: map[string]string{"postgres": "numeric"}},
		{Name: "item_wallets", Type: field.TypeString, Nullable: true},
		{Name: "wallet_items", Type: field.TypeString, Nullable: true},
	}
	// WalletItemsTable holds the schema information for the "wallet_items" table.
	WalletItemsTable = &schema.Table{
		Name:       "wallet_items",
		Columns:    WalletItemsColumns,
		PrimaryKey: []*schema.Column{WalletItemsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "wallet_items_items_wallets",
				Columns:    []*schema.Column{WalletItemsColumns[2]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "wallet_items_wallets_items",
				Columns:    []*schema.Column{WalletItemsColumns[3]},
				RefColumns: []*schema.Column{WalletsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// DopeItemsColumns holds the columns for the "dope_items" table.
	DopeItemsColumns = []*schema.Column{
		{Name: "dope_id", Type: field.TypeString},
		{Name: "item_id", Type: field.TypeString},
	}
	// DopeItemsTable holds the schema information for the "dope_items" table.
	DopeItemsTable = &schema.Table{
		Name:       "dope_items",
		Columns:    DopeItemsColumns,
		PrimaryKey: []*schema.Column{DopeItemsColumns[0], DopeItemsColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "dope_items_dope_id",
				Columns:    []*schema.Column{DopeItemsColumns[0]},
				RefColumns: []*schema.Column{DopesColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "dope_items_item_id",
				Columns:    []*schema.Column{DopeItemsColumns[1]},
				RefColumns: []*schema.Column{ItemsColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		AmountsTable,
		BodyPartsTable,
		DopesTable,
		EventsTable,
		HustlersTable,
		ItemsTable,
		ListingsTable,
		SearchIndexTable,
		SyncStatesTable,
		WalletsTable,
		WalletItemsTable,
		DopeItemsTable,
	}
)

func init() {
	AmountsTable.ForeignKeys[0].RefTable = ListingsTable
	AmountsTable.ForeignKeys[1].RefTable = ListingsTable
	DopesTable.ForeignKeys[0].RefTable = ListingsTable
	DopesTable.ForeignKeys[1].RefTable = WalletsTable
	HustlersTable.ForeignKeys[0].RefTable = BodyPartsTable
	HustlersTable.ForeignKeys[1].RefTable = BodyPartsTable
	HustlersTable.ForeignKeys[2].RefTable = BodyPartsTable
	HustlersTable.ForeignKeys[3].RefTable = ItemsTable
	HustlersTable.ForeignKeys[4].RefTable = ItemsTable
	HustlersTable.ForeignKeys[5].RefTable = ItemsTable
	HustlersTable.ForeignKeys[6].RefTable = ItemsTable
	HustlersTable.ForeignKeys[7].RefTable = ItemsTable
	HustlersTable.ForeignKeys[8].RefTable = ItemsTable
	HustlersTable.ForeignKeys[9].RefTable = ItemsTable
	HustlersTable.ForeignKeys[10].RefTable = ItemsTable
	HustlersTable.ForeignKeys[11].RefTable = ItemsTable
	HustlersTable.ForeignKeys[12].RefTable = ItemsTable
	HustlersTable.ForeignKeys[13].RefTable = WalletsTable
	ItemsTable.ForeignKeys[0].RefTable = ItemsTable
	ListingsTable.ForeignKeys[0].RefTable = DopesTable
	SearchIndexTable.ForeignKeys[0].RefTable = DopesTable
	SearchIndexTable.ForeignKeys[1].RefTable = HustlersTable
	SearchIndexTable.ForeignKeys[2].RefTable = ItemsTable
	SearchIndexTable.Annotation = &entsql.Annotation{
		Table: "search_index",
	}
	WalletItemsTable.ForeignKeys[0].RefTable = ItemsTable
	WalletItemsTable.ForeignKeys[1].RefTable = WalletsTable
	DopeItemsTable.ForeignKeys[0].RefTable = DopesTable
	DopeItemsTable.ForeignKeys[1].RefTable = ItemsTable
}
