export interface Text {
  text: string;
  choices?: Array<string>;
  typingSpeed?: number;
  onEnd?: (text: Text, conversation: Conversation, selectedChoice?: string) => void;
}

export default class Conversation {
  // on that text page end 
  texts: Array<Text>;

  // callback when conversation is finished
  onFinish?: () => boolean;

  constructor(texts: Array<Text> | Text, onFinish?: () => boolean) {
    this.texts = texts instanceof Array ? texts : [ texts ];

    this.onFinish = onFinish;
  }
}
