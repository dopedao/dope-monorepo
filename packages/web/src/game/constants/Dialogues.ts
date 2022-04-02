import Citizen from "game/entities/citizen/Citizen";
import Conversation, { Text } from "game/entities/citizen/Conversation";
import NetworkHandler from "game/handlers/network/NetworkHandler";
import { UniversalEventNames } from "game/handlers/network/types";

const Texts: {[key: string]: Text} = {
    "hello": {
        text: "Hey, how are you?",
        choices: ["I'm fine", "I'm not fine"],
        typingSpeed: 50,
        onEnd: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
            if (selectedChoice === 0) {
                conversation.add(Texts["hello_choice_1"]);

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
                conversation.add(Texts["hello_choice_2"]);

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
    },
    "hello_choice_1": {
        text: "Glad to hear that!",
    },
    "hello_choice_2": {
        text: "Sadge",
    },
    "name": {
        text: "What's your name?",
        choices: ["My name is..."],
        typingSpeed: 50,
        onEnd: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
            if (selectedChoice === 0) {
                conversation.add(Texts["name_choice_1"]);

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
    },
    "name_choice_1": {
        text: "Nice to meet you!",
    },
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
};

function getConversation(id: string, text?: string): Conversation {
    const conv = Conversations[id];
    if (text)
        conv.texts = [Texts[text]]

    return conv;
}

export {
    Texts,
    Conversations,
    getConversation,
}