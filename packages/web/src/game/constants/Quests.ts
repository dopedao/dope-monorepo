import Citizen from "game/entities/citizen/Citizen";
import Item from "game/entities/player/inventory/Item";
import Player from "game/entities/player/Player";
import BringItemQuest from "game/entities/player/quests/BringItemQuest";
import InteractCitizenQuest from "game/entities/player/quests/InteractCitizenQuest";
import ItemQuest from "game/entities/player/quests/ItemQuest";
import Quest from "game/entities/player/quests/Quest"
import WaterfallQuest from "game/entities/player/quests/WaterfallQuest";
import { Events } from "game/handlers/events/EventHandler";
import GameScene from "game/scenes/Game";
import Zone from "game/world/Zone";
import Items from "./Items";

export enum QuestType {
    BringItem = "bringItem",
    InteractCitizen = "interactCitizen",
    Item = "item",
    Point = "point",
    Waterfall = "waterfall",
}

export interface QuestDataTypes {
    [QuestType.BringItem]: {
        item: Item,
    },
    [QuestType.InteractCitizen]: {
        citizenId: string,
    },
    [QuestType.Item]: {
        item: Item,
    },
    [QuestType.Point]: {
        zone: Zone,
    },
    [QuestType.Waterfall]: {
        events: Events[] | Events,
    }
}

export interface QuestData {
    name: string;
    description: string;
    data: {$case: QuestType.BringItem, bringItem: QuestDataTypes[QuestType.BringItem]} | 
        {$case: QuestType.InteractCitizen, interactCitizen: QuestDataTypes[QuestType.InteractCitizen]} |
        {$case: QuestType.Item, item: QuestDataTypes[QuestType.Item]} |
        {$case: QuestType.Point, point: QuestDataTypes[QuestType.Point]} |
        {$case: QuestType.Waterfall, waterfall: QuestDataTypes[QuestType.Waterfall]};
}

const Quests: {[key: string]: QuestData} = {
    BRING_APPLE: {
        name: "Bring Item",
        description: "Bring an item to a citizen",
        data: {
            $case: QuestType.BringItem,
            bringItem: {
                item: Items["apple"],
            }
        }
    },
    SEND_CHAT_MESSAGES: {
        name: "Send Chat Messages",
        description: "Send chat messages to the chatbox",
        data: {
            $case: QuestType.Waterfall,
            waterfall: {
                events: Array.from({length: 5}, () => Events.CHAT_MESSAGE)
            }
        }
    }
}

export function getQuest(questName: string, scene: GameScene, questReferer?: Citizen): Quest | undefined {
    const questData = Quests[questName];
    if (!questData) return;

    let quest: Quest | undefined;
    const questManager = (<any>scene).player.questManager;
    switch (questData.data.$case) {
        case QuestType.BringItem:
            if (!questReferer) return;

            quest = new BringItemQuest(questData.name, questData.description, questData.data.bringItem.item, questManager, questReferer);
            break;
        case QuestType.InteractCitizen:
            const citizenId = questData.data.interactCitizen.citizenId;
            // TODO: implement
            quest = new InteractCitizenQuest(questData.name, questData.description, (scene.citizens as Citizen[]).find(e => citizenId === e.getData('id'))!, questManager, questReferer);
            break;
        case QuestType.Item:
            quest = new ItemQuest(questData.name, questData.description, questData.data.item.item, (<any>scene).player.questManager);
            break;
        case QuestType.Point:
            // TODO: implement 
            break;
        case QuestType.Waterfall:
            quest = new WaterfallQuest(questData.name, questData.description, questData.data.waterfall.events, questManager);
            break;
    }

    return quest;
}

export default Quests;