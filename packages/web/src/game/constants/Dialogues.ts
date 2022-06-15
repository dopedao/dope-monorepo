import Citizen from "game/entities/citizen/Citizen";
import Conversation, { Text } from "game/entities/citizen/Conversation";
import NetworkHandler from "game/handlers/network/NetworkHandler";
import { UniversalEventNames } from "game/handlers/network/types";

const updateChoiceTexts = (citizen: Citizen, conversation: Conversation, next: number, lastAnswerIndex: number) => {
    if (conversation.texts.length - 1 > next)
        conversation.texts.splice(next + 1, lastAnswerIndex - next)
}

const updateConversation = (citizen: Citizen, conversation: Conversation) => {
    citizen.conversations.unshift(conversation);

    if (NetworkHandler.getInstance().connected) {
        NetworkHandler.getInstance().send(
            UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
            {
                citizen: citizen.getData('id'),
                conversation: conversation.id,
                text: undefined,
            },
        );
    }
}

const Texts: {[key: string]: Text[]} = {
    "hello": [
        {
            text: "Hey, how are you?",
            choices: {
                "I'm fine": "name",
                "I'm not fine": "name"
            },
            typingSpeed: 50
        },
        {
            text: "Test end text",
        }
    ],
    "name": [{
            text: "What's your name?",
            choices: {
                "My name is ...": ""
            },
            typingSpeed: 50,
        },
        {
            text: "Nice to meet you!",
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

export const randomText = (citizen: Citizen, conversation: Conversation, texts: Text[]) => {
    const textIdx = Math.floor(Math.random() * texts.length);
    conversation.texts.push(texts[textIdx]);
    citizen.conversations.unshift(conversation);

    // TODO: Fire up end text event and move somewhere else, maybe in network handler?
    if (NetworkHandler.getInstance().connected) {
      NetworkHandler.getInstance().send(
          UniversalEventNames.PLAYER_UPDATE_CITIZEN_STATE,
          {
              citizen: citizen.getData('id'),
              conversation: conversation.id,
              text: textIdx,
          },
      );
    }
}


// TODO: texts in here? in conversation object
const Conversations: {[key: string]: {
    random?: boolean,
    nextConversation?: string,
}} = {
    "hello": {
        random: false,
    },
    "name": {
        random: false,
    },
    "oracle_jones_random": {
        random: true,
    },
    "detective_harry_random": {
        random: true,
    },
    "jimmy_random": {
        random: true,
    }
};

function getConversation(id: string, text?: number): Conversation | undefined {
    const conv = Conversations[id];
    if (!conv) {
        console.warn(`Conversation with id ${id} does not exist`);
        return;
    }

    const conversationObj = new Conversation(id, Texts[id].slice(text));
    if (conv.random) {
        conversationObj.texts = [conversationObj.texts[Math.floor(Math.random() * conversationObj.texts.length)]];
        conversationObj.onFinish = (citizen, conversation) => randomText(citizen, conversation, Texts[id]);
    } else if (conv.nextConversation) {
        const nextConv = getConversation(conv.nextConversation);
        if (nextConv) conversationObj.onFinish = (citizen) => updateConversation(citizen, nextConv);
    }

    return conversationObj;
}

export {
    Texts,
    Conversations,
    getConversation,
}