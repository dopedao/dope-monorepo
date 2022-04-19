import Citizen from "game/entities/citizen/Citizen";
import Conversation, { Text } from "game/entities/citizen/Conversation";
import NetworkHandler from "game/handlers/network/NetworkHandler";
import { UniversalEventNames } from "game/handlers/network/types";

const Texts: {[key: string]: Text[]} = {
    "hello": [{
        text: "Hey, how are you?",
        choices: ["I'm fine", "I'm not fine"],
        typingSpeed: 50,
        onEnd: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
            if (selectedChoice === 0) {
                conversation.add(...Texts["hello_choice_1"]);

                if (NetworkHandler.getInstance().connected) {
                    NetworkHandler.getInstance().send(
                        UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
                        {
                            citizen: citizen.getData('id'),
                            conversation: conversation.id,
                            text: "hello_choice_1",
                        },
                    );
                }
            } else {
                conversation.add(...Texts["hello_choice_2"]);

                if (NetworkHandler.getInstance().connected) {
                    NetworkHandler.getInstance().send(
                        UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
                        {
                            citizen: citizen.getData('id'),
                            conversation: conversation.id,
                            text: "hello_choice_2",
                        },
                    );
                }
            }
        }
    }],
    "hello_choice_1": [{
        text: "Glad to hear that!",
    }],
    "hello_choice_2": [{
        text: "Sadge",
    }],
    "name": [{
        text: "What's your name?",
        choices: ["My name is..."],
        typingSpeed: 50,
        onEnd: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
            if (selectedChoice === 0) {
                conversation.add(...Texts["name_choice_1"]);

                if (NetworkHandler.getInstance().connected) {
                    NetworkHandler.getInstance().send(
                        UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
                        {
                            citizen: citizen.getData('id'),
                            conversation: conversation.id,
                            text: "name_choice_1",
                        },
                    );
                }
            }
        },
    }],
    "name_choice_1": [{
        text: "Nice to meet you!",
    }],
    "oracle_jones_random": [
        {
            text: "Community health is wealth ⏤ WAGMI"
        },
        {
            text: "Ain't Gotta Get Ready If U Stay Ready"
        },
        {
            text: "Stackin' $PAPER is a 1UP"
        }
    ],
    "word_reporter_random": [
        {
            text: "🗣 DopeCity is community. Community is thriving"
        },
        {
            text: "🗣 The Swap Meet is self-improvement"
        },
        {
            text: "🗣 Word Around Town: Watch your back. Po-Po is on the hunt."
        }
    ],
    "soundwave_sammy_random": [
        {
            text: "🔊🔊 Wassup my ninjas! No BULL, but I’m hearing DopeCity’s in for quite a storm. Hope you can BEAR it."
        },
        {
            text: "🔊🔊 I’m not GASSIN’ y’all, but now would be the best time to stack some #PAPER"
        },
        {
            text: "🔊🔊 Bing Bong! Message to our very own Dope Dolphins: Second best is still NGMI"
        }
    ],
    "detective_harry_random": [
        {
            text: "Not that I’d ever get caught up, but it seems [HUSTLER] is opening his fat mouth again. I got the dirt!"
        },
        {
            text: "I’ll bet you 100 $PAPER the Dope Dolphins don’t make it to the championship. On my momma!"
        },
        {
            text: "[HUSTLER] left this tip for the community. Take it or leave, but I don’t trust the guy."
        }
    ]
};

const Conversations: {[key: string]: Conversation} = {
    "test": new Conversation("test", Texts["hello"], (citizen: Citizen) => {
        citizen.conversations.push(Conversations["name"]);

        if (NetworkHandler.getInstance().connected) {
            NetworkHandler.getInstance().send(
                UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
                {
                    citizen: citizen.getData('id'),
                    conversation: "test2",
                    text: undefined,
                },
            );
        }
    }),
    "test2": new Conversation("test2", Texts["name"]),
    "oracle_jones_random": new Conversation("oracle_jones_random", Texts["oracle_jones_random"]),
};

function getConversation(id: string, text?: string): Conversation {
    const conv = Conversations[id];
    if (text)
        conv.texts = Texts[text]

    return conv;
}

export {
    Texts,
    Conversations,
    getConversation,
}