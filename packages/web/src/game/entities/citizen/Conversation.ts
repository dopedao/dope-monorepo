export default class Conversation
{
    text: string;

    onComplete?: () => void;

    constructor(text: string, onComplete?: () => void)
    {
        this.text = text;
        this.onComplete = onComplete;
    }
}