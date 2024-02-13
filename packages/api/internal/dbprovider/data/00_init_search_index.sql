DROP MATERIALIZED VIEW IF EXISTS search_index;

CREATE MATERIALIZED VIEW search_index AS (
	WITH dope_agg AS (
		SELECT
			df.id,
			array_agg(df.fullname) AS fullnames,
			sum(
				CASE
					WHEN df.greatness = 20 THEN 4
					WHEN df.greatness = 19 THEN 3
					WHEN df.greatness > 14 THEN 2
					ELSE 1
				END
			) AS greatness,
			opened,
			claimed,
			sale_price
		FROM
			(
				SELECT
					d.dope_id AS id,
					coalesce(
						(
							trim(
								BOTH ' '
								FROM
									(
										' ' || coalesce(i.name_prefix, '') || ' ' || coalesce(i.name_suffix, '') || ' ' || coalesce(i.name, '') || ' ' || coalesce(i.suffix, '') || ' ' || coalesce(
											CASE
												WHEN i."augmented" THEN '+1'
											END,
											''
										)
									)
							)
						),
						''
					) AS fullname,
					greatness,
					opened,
					claimed,
					sale_price
				FROM
					dope_items d
					INNER JOIN items i ON d.item_id = i.id
					INNER JOIN (
						SELECT
							dope.id AS id,
							dope.opened AS opened,
							dope.claimed AS claimed,
							dope.best_ask_price_eth AS sale_price
						FROM
							dopes dope
					) l ON d.dope_id = l.id
			) df
		GROUP BY
			df.id,
			df.opened,
			df.claimed,
			df.sale_price
	)
	SELECT
		concat('dope_', id) AS id,
		greatness,
		opened,
		claimed,
		sale_price,
		FALSE as banned,
		TEXT 'DOPE' AS TYPE,
		id AS dope_index,
		NULL AS item_index,
		NULL AS hustler_index,
		(
			to_tsvector('english', coalesce(fullnames [0], '')) || to_tsvector('english', coalesce(fullnames [1], '')) || to_tsvector('english', coalesce(fullnames [2], '')) || to_tsvector('english', coalesce(fullnames [3], '')) || to_tsvector('english', coalesce(fullnames [4], '')) || to_tsvector('english', coalesce(fullnames [5], '')) || to_tsvector('english', coalesce(fullnames [6], '')) || to_tsvector('english', coalesce(fullnames [7], '')) || to_tsvector('english', coalesce(id, ''))
		) AS tsv_document
	FROM
		dope_agg
	UNION
	SELECT
		concat('item_', id) AS id,
		CASE
			WHEN greatness = 20 THEN 4
			WHEN greatness = 19 THEN 3
			WHEN greatness > 14 THEN 2
			ELSE 1
		END AS greatness,
		FALSE AS opened,
		FALSE AS claimed,
		best_ask_price_eth AS sale_price,
		FALSE as banned,
		'ITEM' AS TYPE,
		NULL AS dope_index,
		id AS item_index,
		NULL AS hustler_index,
		(
			to_tsvector(
				'english',
				coalesce(
					(
						trim(
							BOTH ' '
							FROM
								(
									' ' || coalesce(name_prefix, '') || ' ' || coalesce(name_suffix, '') || ' ' || coalesce(name, '') || ' ' || coalesce(suffix, '') || ' ' || coalesce(
										CASE
											WHEN "augmented" THEN '+1'
										END,
										''
									)
								)
						)
					),
					''
				)
			) || to_tsvector('english', coalesce(id, ''))
		) AS tsv_document
	FROM
		items
)
UNION
(
	WITH hustler_agg AS (
		SELECT
			df.id,
			array_agg(df.fullname) AS fullnames,
			df.title,
			df.name,
			df.sale_price,
			df.banned,
			sum(
				CASE
					WHEN df.greatness = 20 THEN 4
					WHEN df.greatness = 19 THEN 3
					WHEN df.greatness > 14 THEN 2
					ELSE 1
				END
			) AS greatness
		FROM
			(
				SELECT
					h.id AS id,
					coalesce(
						(
							trim(
								BOTH ' '
								FROM
									(
										' ' || coalesce(i.name_prefix, '') || ' ' || coalesce(i.name_suffix, '') || ' ' || coalesce(i.name, '') || ' ' || coalesce(i.suffix, '') || ' ' || coalesce(
											CASE
												WHEN i."augmented" THEN '+1'
											END,
											''
										)
									)
							)
						),
						''
					) AS fullname,
					greatness,
					h.name,
					h.title AS title,
					h.best_ask_price_eth AS sale_price,
					(
						h.item_hustler_feet IS NULL
						AND h.item_hustler_drugs IS NULL
						AND h.item_hustler_hands IS NULL
						AND h.item_hustler_necks IS NULL
						AND h.item_hustler_rings IS NULL
						AND h.item_hustler_waists IS NULL
						AND h.item_hustler_clothes IS NULL
						AND h.item_hustler_weapons IS NULL
						AND h.item_hustler_vehicles IS NULL
						AND h.item_hustler_accessories IS NULL
					) AS banned
				FROM
					hustlers h
					LEFT JOIN items i ON h.item_hustler_feet = i.id
					OR h.item_hustler_drugs = i.id
					OR h.item_hustler_hands = i.id
					OR h.item_hustler_necks = i.id
					OR h.item_hustler_rings = i.id
					OR h.item_hustler_waists = i.id
					OR h.item_hustler_clothes = i.id
					OR h.item_hustler_weapons = i.id
					OR h.item_hustler_vehicles = i.id
					OR h.item_hustler_accessories = i.id
			) df
		GROUP BY
			df.id,
			title,
			df.name,
			df.sale_price,
			df.banned
	)
	SELECT
		concat('hustler_', id) AS id,
		greatness,
		FALSE AS opened,
		FALSE AS claimed,
		sale_price,
		-- we use banned to remove "naked" hustlers
		banned,
		'HUSTLER' AS TYPE,
		NULL AS dope_index,
		NULL AS item_index,
		id AS hustler_index,
		(
			to_tsvector('english', coalesce(fullnames [0], '')) || to_tsvector('english', coalesce(fullnames [1], '')) || to_tsvector('english', coalesce(fullnames [2], '')) || to_tsvector('english', coalesce(fullnames [3], '')) || to_tsvector('english', coalesce(fullnames [4], '')) || to_tsvector('english', coalesce(fullnames [5], '')) || to_tsvector('english', coalesce(fullnames [6], '')) || to_tsvector('english', coalesce(fullnames [7], '')) || to_tsvector('english', coalesce(name, '')) || to_tsvector('english', coalesce(title, '')) || to_tsvector('english', coalesce(id, ''))
		) AS tsv_document
	FROM
		hustler_agg
);

CREATE UNIQUE INDEX search_index_pk ON search_index using btree(id);

CREATE INDEX type_sale_price_banned_opened_idx ON search_index (type, banned, sale_price, opened);

CREATE INDEX idx_search_index_on_sale_price_id ON search_index (sale_price, id);

CREATE INDEX tsv_idx ON search_index USING GIN (tsv_document);