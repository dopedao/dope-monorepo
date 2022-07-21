import Citizen from "./Citizen";

export interface Text {
  text: string;
  // Choices that the player can choose
  // Choice: conversation id
  choices?: {[choice: string]: string};
  
  typingSpeed?: number;
  onEnd?: (citizen: Citizen, conversation: Conversation, text: Text, selectedChoice?: number) => void;
}

export default class Conversation {
  id: string;
  // on that text page end 
  texts: Array<Text>;

  // callback when conversation is finished
  onFinish?: (citizen: Citizen, conversation: this) => void;

  constructor(id: string, texts: Array<Text> | Text, onFinish?: (citizen: Citizen, conversation: Conversation) => void) {
    this.id = id;
    this.texts = texts instanceof Array ? texts : [ texts ];

    this.onFinish = onFinish;
  }

  add(...texts: Text[]) {
    this.texts.push(...texts);
  }

  get(index: number): Text {
    return this.texts[index];
  }
}
