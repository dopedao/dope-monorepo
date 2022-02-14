interface Text {
  text: string;
  typingSpeed?: number;
  onEnd?: () => void;
}

export default class Conversation {
  // on that text page end 
  texts: Array<Text>;

  // return true if the conversation is completed
  // if true, the conversation will get removed from the conversations array of the citizen which includes
  // this conversation
  onFinish?: () => boolean;

  constructor(texts: Array<Text> | Text, onFinish?: () => boolean) {
    this.texts = texts instanceof Array ? texts : [ texts ];

    this.onFinish = onFinish;
  }
}
