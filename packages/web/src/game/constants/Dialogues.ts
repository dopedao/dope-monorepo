import Citizen from "game/entities/citizen/Citizen";
import Conversation, { Text } from "game/entities/citizen/Conversation";
import NetworkHandler from "game/handlers/network/NetworkHandler";
import { UniversalEventNames } from "game/handlers/network/types";
import { number } from "starknet";

const updateText = (citizen: Citizen, conversation: Conversation, next: number) => {
    conversation.add(Texts[conversation.id][next]);

    if (NetworkHandler.getInstance().connected) {
        NetworkHandler.getInstance().send(
            UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
            {
                citizen: citizen.getData('id'),
                conversation: conversation.id,
                text: next,
            },
        );
    }
}

const updateConversation = (citizen: Citizen, next: string) => {
    citizen.conversations.push(Conversations[next]);

    if (NetworkHandler.getInstance().connected) {
        NetworkHandler.getInstance().send(
            UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
            {
                citizen: citizen.getData('id'),
                conversation: next,
                text: undefined,
            },
        );
    }
}

const bindRandom = (texts: Text[]): Text[] => {
    return texts.map(text => {
        text.onEnd = (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
            const next = Math.round(Math.random() * (texts.length - 1));
            updateText(citizen, conversation, next);
        }

        return text;
    });
}

const Texts: {[key: string]: Text[]} = {
    "hello": [
        {
            text: "Hey, how are you?",
            choices: ["I'm fine", "I'm not fine"],
            typingSpeed: 50,
            onEnd: (citizen, conversation, text, selectedChoice) => {
                updateText(citizen, conversation, selectedChoice === 0 ? 1 : 2)
            }
        },
        {
            text: "Glad to hear that!"
        },
        {
            text: "Sadge"
        }
    ],
    "name": [{
            text: "What's your name?",
            choices: ["My name is..."],
            typingSpeed: 50,
            onEnd: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => {
                updateText(citizen, conversation, 1)
            },
        },
        {
            text: "Nice to meet you!"
        }
    ],
    "jimmy_random": [
        {
            text: "Hey, I'm jimmy",
        },
        {
            text: "I'm a hustler",
        },
        {
            text: "Jimmy",
        }
    ],
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
    "hello": new Conversation("hello", Texts["hello"], (citizen) => {
        updateConversation(citizen, "name")
    }),
    "oracle_jones_random": new Conversation("oracle_jones_random", Texts["oracle_jones_random"][Math.round(Math.random() * (Texts["oracle_jones_random"].length - 1))], (citizen, conversation) => {
        const textIdx = Math.round(Math.random() * (Texts["jimmy_random"].length - 1));
        citizen.conversations.push(conversation);

        updateText(citizen, conversation, textIdx);
    }),
    "detective_harry_random": new Conversation("detective_harry_random", Texts["detective_harry_random"][Math.round(Math.random() * (Texts["detective_harry_random"].length - 1))], (citizen, conversation) => {
        const textIdx = Math.round(Math.random() * (Texts["jimmy_random"].length - 1));
        citizen.conversations.push(conversation);

        updateText(citizen, conversation, textIdx);
    }),
    "jimmy_random": new Conversation("jimmy_random", Texts["jimmy_random"][Math.round(Math.random() * (Texts["jimmy_random"].length - 1))], (citizen, conversation) => {
        const textIdx = Math.round(Math.random() * (Texts["jimmy_random"].length - 1));
        citizen.conversations.push(conversation);

        updateText(citizen, conversation, textIdx);
    }),
};

function getConversation(id: string, text?: number): Conversation {
    const conv = Conversations[id];
    if (text)
        conv.texts = [Texts[id][text]]

    return conv;
}

export {
    Texts,
    Conversations,
    getConversation,
}