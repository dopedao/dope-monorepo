package game

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/base"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/middleware"
	"github.com/gorilla/websocket"
)

const TICKRATE = time.Second / 5
const MINUTES_DAY = 24 * 60
const BOT_COUNT = 0

func NewGame() *Game {
	game := Game{
		Ticker: time.NewTicker(TICKRATE),
		SpawnPosition: schema.Position{
			X: 500, Y: 200,
			CurrentMap: "NY_Bushwick_Basket",
		},
		Register:   make(chan *Player),
		Unregister: make(chan *Player),
		Broadcast:  make(chan BroadcastMessage),
	}

	// add fake players
	for i := 0; i < BOT_COUNT; i++ {
		hustlerId := int(rand.Float64() * 1500)
		game.Players = append(game.Players, NewPlayer(nil, &game,
			strconv.Itoa(hustlerId), fmt.Sprintf("Bot #%d - %d", i, hustlerId),
			game.SpawnPosition.CurrentMap, game.SpawnPosition.X, game.SpawnPosition.Y))
	}

	return &game
}

func (g *Game) Handle(ctx context.Context, client *ent.Client, conn *websocket.Conn) {
	ctx, log := base.LogFor(ctx)
	log.Info().Msgf("New connection from ", conn.RemoteAddr().String())

	WHITELISTED_WALLETS := []string{
		"0xbd8a92E249090249c5fB2FF71e47B69fb650d3AF",
		"0xeCF37Cf863a1979C939b458b6ac149820e3182c2",
		"0xC207662fC0388DA7d4F7a44f29437987745C015f",
		"0x94324fcF2cC42F702F7dCBEe5e61E947DC9e2D91",
		"0xA61e8168c13453b491CB9060CCE1FF69E0761c96",
		"0x42aB133871fA8b4AF29efC4D1daAdC14818df661",
		"0x4823BE7F266c5bcA85B7Dbd8e41f4710e1c49a7b",
		"0xb8D362CAE4670b4E23C82B005703060597D143F5",
		"0x67F3E43c779449be61580FC75a42D143e840f04c",
		"0xf64C454E8d503f4274F43A6f3f0e37e62A8dB660",
		"0xB6E4FB1c1173f396B7536AEa7255B1e031630E62",
		"0x73d75DEF6E95d51f2F92Ec9eD53eb368078fdBca",
		"0xe8aa9Ef3998Fe2D146730927744bd9334424d8eA",
		"0xd4b65Db36026dDF08859B8175c02c611FDE0A020",
		"0xe1b8fa08A480c63434570350F3b8deC345Ec340E",
		"0x8028A4F06A209B942b692b2714466f795DD18003",
		"0x36CA97410B8E3B13847d91cc82EDC23A958d7dCa",
		"0xba740c9035fF3c24A69e0df231149c9cd12BAe07",
		"0x865c529F7053ADc50aC9d3efc54D71DB7b28907C",
		"0xF364156A8df7064583a4a694B3332A4237c34B93",
		"0xF364156A8df7064583a4a694B3332A4237c34B93",
		"0xF364156A8df7064583a4a694B3332A4237c34B93",
		"0xF364156A8df7064583a4a694B3332A4237c34B93",
		"0xF364156A8df7064583a4a694B3332A4237c34B93",
		"0x0f617402b5954a8118CE951FbBDdaf1a4ac16310",
		"0x1793d9B7ff6C67650828e912bD384EA19600435B",
		"0x1c1Ce70ca6975cf60658Fa55aE9358C8b295D062",
		"0xA9DA2e4b36D75d3aEE8630C6Acd09FD567091F10",
		"0x36CA97410B8E3B13847d91cc82EDC23A958d7dCa",
		"0xeE622D297229a2d6DA9E866AB6a6Db14f71E5529",
		"0x0405EdD14183E894BEc5cEa5b4938110A4D901dD",
		"0x1c1305BAbc432452718d8968E4DB6a07800ddEAb",
		"0x6F8a10B701C58AA99F9A240208c7BE64381C313f",
		"0x77e125D23e6C0D081086F0D849b4350ea6206A8C",
		"0xb09Fa44eF3bcBD1bf2D35D5644a19e188d4c05F6",
		"0xD6Fd8413B1FaCafcB46b3F7C08d07DaA0fe5E770",
		"0x084Bd02D4dfb5Af7F9D487a60682378B057d36Bb",
		"0x27dFA6Ba1dD770A675791c528d0346885CeE982F",
		"0x77dAD85Aa761E30146052908A17E8aD6bcdbc853",
		"0xef57398c6D9418009bB87d25bd145D66018c2B71",
		"0x614D53Fa73D3D63Cc6606B6D2C1e09C41e623B5e",
		"0xc377930ac4AEF713313CdefD2578f34Df3eb487B",
		"0x637307b752f001a30EB7a05891C4e02922C912bE",
		"0x997693452fC73a90C3B4acf9a9BA64694DB7E98C",
		"0xE14722962e29d1B37e9f91c5d3Bb1Dd76036771F",
		"0x4254c53Fc3b3b38DF025Ea30BcAE410e11bb95b6",
		"0x85893Cc28F86C3138e1e3F888B16466E8acCaFC6",
		"0x6B8Ee579F5A8C8c67ab04d5A09768ca7EFFf9Ae8",
		"0x9a678b81E235669e627833f153199ec87135FD8e",
		"0x980C9b472500f3bB6c08d876f45Df3A1E3298496",
		"0x5fB92fD6B3C0cD9d0DD97f041B7d0Db738103561",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x9aEB4Ad9e4CE1D5CE16b72141705553915440007",
		"0x351Da3c9B54621f3905462E865FE3723DCBA8e81",
		"0xA12D1Aa37e0A2939044d2FC67704CD55B8A852fE",
		"0x113607267004cc98502E06A3c3abd48f5c5Fe645",
		"0xC6D725b42Ddd3257f8eF05f807ac3155AC70af87",
		"0xc6F236891c3099ce4b210793BB1b3030fFfBaA67",
		"0xb14bE0a9f67eF3E8bBf44CfC516aD17D186B3Aa2",
		"0xCED10840f87A2320fdcA1DbE17D4F8e4211840A8",
		"0x1716c294b7cA46143Ba130CC592068b8E8d2bf2B",
		"0x5d928F0Db4a09B873924dE89cAa5a3db752Cb2a2",
		"0x9C1d0669eB2c5D6CBeC987fc7f6686911fAdE080",
		"0x1CabC3e62e0527cBe09917F5Ca8e6D9999502d82",
		"0x32245e7E21c7aAFEbB67A331F3e0a3D32b64D36C",
		"0x5aC90E2e21A027Fcd573DbAEE52B5b5eadfb4285",
		"0xDc48c1a598790A58cC6E5056fbe1fD0B93b8EcfA",
		"0x3cE77e5B6207d95d20A5B9214c072B5E241E6024",
		"0x1839FAEA698CBaE6EdE826C09D943DE1dba7DD96",
		"0x2C941171bD2A7aEda7c2767c438DfF36EAaFdaFc",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x7e188FCE356695d37F67153aeC2112D197EF405c",
		"0x844D207dCc344447636A2312e8a0675eCdB4df02",
		"0x3598b2883a370Be3fA9893ccE920AB835EAC5901",
		"0xAf9114785D8ec810902407B75AD86aC76092Af2c",
		"0x1716c294b7cA46143Ba130CC592068b8E8d2bf2B",
		"0x2A0d9059075a84C280Db8f8542Bf7e7cD75F51f2",
		"0xfbce92dEcd42BDb6ffE02CFd567a1F14e6Fd505a",
		"0x4cbE8C3AdBA20829a28cdf38AE433a553BC35170",
		"0x6478c54d7e93801950Ef4970424D2E84BD1A7eA1",
		"0x98CC285E55C8312C5E84b23321C11C6B34e2BdaB",
		"0x276b5785286fa9b13931ef8deaabd3445824bb74",
		"0x8ff18637797e6f94f395d73f76ecab29fdd40e22",
		"0x4cbE8C3AdBA20829a28cdf38AE433a553BC35170",
	}

	for {
		// ignore if player is already registered
		// when a player is registered, it uses its own read and write pumps
		if g.PlayerByConn(conn) != nil {
			continue
		}

		var msg BaseMessage
		if err := conn.ReadJSON(&msg); err != nil {
			// facing a close error, we need to stop handling messages
			if _, ok := err.(*websocket.CloseError); ok {
				break
			}

			// we need to use writejson here
			// because player is not yet registered
			conn.WriteJSON(generateErrorMessage(500, "could not read json"))
			continue
		}

		// messages from players are handled else where
		switch msg.Event {
		case "player_join":
			var data PlayerJoinData
			if err := json.Unmarshal(msg.Data, &data); err != nil {
				// we can directly use writejson here
				// because player is not yet registered
				conn.WriteJSON(generateErrorMessage(500, "could not unmarshal player_join data"))
				continue
			}

			// check if authenticated wallet contains used hustler
			// and get data from db
			var gameHustler *ent.GameHustler = nil
			if data.HustlerId != "" {
				// 2 players cannot have the same hustler id
				if g.PlayerByHustlerID(data.HustlerId) != nil {
					conn.WriteJSON(generateErrorMessage(409, "an instance of this hustler is already in the game"))
					continue
				}

				walletAddress, err := middleware.Wallet(ctx)
				if err != nil {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get wallet"))
					continue
				}

				associatedAddress, err := client.Wallet.Query().Where(wallet.HasHustlersWith(hustler.IDEQ(data.HustlerId))).OnlyID(ctx)
				if err != nil || associatedAddress != walletAddress {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "could not get hustler"))
					continue
				}

				// check if wallet whitelisted for event
				whitelisted := false
				for _, addr := range WHITELISTED_WALLETS {
					if walletAddress == addr {
						whitelisted = true
						break
					}
				}

				if !whitelisted {
					conn.WriteJSON(generateErrorMessage(http.StatusUnauthorized, "wallet is not whitelisted"))
					continue
				}

				// get game hustler from hustler id
				gameHustler, err = client.GameHustler.Get(ctx, data.HustlerId)
				if err != nil {
					gameHustler, err = client.GameHustler.Create().
						SetID(data.HustlerId).
						// TODO: define spawn position constant
						SetLastPosition(g.SpawnPosition).
						Save(ctx)
					if err != nil {
						conn.WriteJSON(generateErrorMessage(500, "could not create game hustler"))
						continue
					}
				}
			}

			g.HandlePlayerJoin(ctx, conn, client, gameHustler)
		}
	}
}
