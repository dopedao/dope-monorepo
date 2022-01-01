import { ToastId, useToast } from "@chakra-ui/react";
import EventHandler, { Events } from "game/handlers/EventHandler";
import Quest from "game/quests/Quest";
import React from "react";

export default function ToastManager() {
    const toast = useToast();
    let toastRef = React.useRef<ToastId>();

    const showToast = (message: string) => {
        toastRef.current = toast({description: message})!;
    };

    const hideToast = () => {
        if (toastRef.current)
            toast.close(toastRef.current);
    };

    EventHandler.emitter().on(Events.PLAYER_NEW_QUEST, (quest: Quest) => {
        toast({title: `New quest ${quest.name}!`, description: quest.description});
    });

    return (
        <>
        </>
    )
}