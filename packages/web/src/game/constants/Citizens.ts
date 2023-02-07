import { PathPoint } from "game/entities/citizen/Citizen";
import Conversation from "game/entities/citizen/Conversation";
import Hustler from "game/entities/Hustler";
import { Conversations, getConversation, randomText, Texts } from "./Dialogues";

interface StartPosition {
    x: number;
    y: number;
    currentMap: string;
}

export interface CitizenData {
    name: string;
    description?: string;
    hustlerId: string;
    position: StartPosition;
    conversations?: Conversation[] | Conversation;
    path?: Array<PathPoint>;
    repeatPath?: boolean;
    shouldFollowPath?: boolean;
}

const Citizens = {
    jimmy: {
        name: "Jimmy",
        description: "Jimmy is a local hustler. He is a very nice guy.",
        hustlerId: "12",
        position: {
            x: 100,
            y: 300,
            currentMap: "NY_Bushwick_Basket",
        },
        conversations: [
            // getConversation("jimmy_random"),
        ],
        path: [
            { position: new Phaser.Math.Vector2(200, 300), wait: 3000, onMoved: (hustler: Hustler) => hustler.say('I need a damn break...', 'white')},
            { position: new Phaser.Math.Vector2(405, 200) },
            { position: new Phaser.Math.Vector2(800, 100), wait: 8000, onMoved: (hustler: Hustler) => hustler.say('I can\'t be walking around indefinitely...', 'white') },
            { position: new Phaser.Math.Vector2(100, 500) },
        ],
        repeat: true,
        shouldFollowPath: false,
    },
    oracle_jones: {
        name: "Oracle Jones",
        description: "Street Artist",
        hustlerId: "13",
        position: {
            x: 500,
            y: 300,
            currentMap: "NY_Bushwick_Basket",
        },
        conversations: [
            // getConv
        ],
        path: [
            { position: new Phaser.Math.Vector2(800, 100), wait: 8000, onMoved: (hustler: Hustler) => hustler.say('I can\'t be walking around indefinitely...', 'white') },
            { position: new Phaser.Math.Vector2(405, 200) },
            { position: new Phaser.Math.Vector2(200, 300), wait: 3000, onMoved: (hustler: Hustler) => hustler.say('I need a damn break...', 'white')},
            { position: new Phaser.Math.Vector2(100, 500) },
        ],
        repeat: true,
        shouldFollowPath: true,
    },
};

export default Citizens;
