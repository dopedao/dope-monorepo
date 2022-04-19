import Citizen from "game/entities/citizen/Citizen";
import Item from "game/entities/player/inventory/Item";
import Player from "game/entities/player/Player";
import ItemQuest from "game/entities/player/quests/ItemQuest";
import Quest from "game/entities/player/quests/Quest"
import WaterfallQuest from "game/entities/player/quests/WaterfallQuest";
import { Events } from "game/handlers/events/EventHandler";
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
    type: QuestType,
    name: string;
    description: string;
    data: QuestDataTypes[QuestType];
}



const Quests: {[key: string]: QuestData} = {
    BRING_APPLE: {
        type: QuestType.BringItem,
        name: "Bring Item",
        description: "Bring an item to a citizen",
        data: {
            item: Items["apple"],
        }
    },
    SEND_CHAT_MESSAGES: {
        type: QuestType.Waterfall,
        name: "Send Chat Messages",
        description: "Send chat messages to the chatbox",
        data: {
            events: Array.from({length: 5}, () => Events.CHAT_MESSAGE)
        }
    }
}

export function getQuest(questName: string, player: Player, questReferer?: Citizen): Quest | undefined {
    const questData = Quests[questName];
    if (!questData) return;

    let quest: Quest | undefined;
    switch (questData.type) {
        case QuestType.BringItem:
            quest = new ItemQuest(questData.name, questData.description, (<any>questData.data).item, player.questManager, questReferer);
            break;
        case QuestType.InteractCitizen:
            // TODO: implement
            // quest = new ItemQuest(questData.name, questData.description, Citizens, player.questManager, questReferer);
            break;
        case QuestType.Item:
            quest = new ItemQuest(questData.name, questData.description, (<any>questData.data).item, player.questManager);
            break;
        case QuestType.Point:
            // TODO: implement 
            break;
        case QuestType.Waterfall:
            quest = new WaterfallQuest(questData.name, questData.description, (<any>questData.data).events, player.questManager);
            break;
        default:
            console.error(`Quest type ${questData.type} not implemented`);
    }

    return quest;
}

export default Quests;