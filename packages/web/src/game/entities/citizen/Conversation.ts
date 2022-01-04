export default class Conversation
{
    text: string;

    // return true if the conversation is completed
    onFinish?: () => boolean;

    constructor(text: string, onFinish?: () => boolean)
    {
        this.text = text;
        this.onFinish = onFinish;
    }
}