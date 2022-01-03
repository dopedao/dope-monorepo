export default class Conversation
{
    text: string;

    // return true if the conversation is completed
    // if true, the conversation will get removed from the conversations array of the citizen which includes
    // this conversation
    onFinish?: () => boolean;

    constructor(text: string, onFinish?: () => boolean)
    {
        this.text = text;
        this.onFinish = onFinish;
    }
}
