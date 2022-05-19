import { createContext, useContext, useState } from "react";
import { QueueMessage } from "../types/types";

export type QueueContent = {
    queueActive: boolean;
    toggleQueue: () => void;
    queue: QueueMessage[];
    setQueue: (messages: QueueMessage[]) => void;
    addToQueue: (message: QueueMessage) => void;
};

const QueueContext = createContext<QueueContent>({
    queueActive: false,
    toggleQueue: () => {},
    queue: [],
    setQueue: () => {},
    addToQueue: () => {},
});

export const useQueue = () => useContext(QueueContext);

export const QueueProvider = ({ children }: { children: React.ReactNode }) => {
    const [queue, setQueue] = useState<QueueMessage[]>([]);
    const [queueActive, setQueueActive] = useState<boolean>(false);

    //Add to the queue and remove messages older than 10 minutes
    const addToQueue = (message: QueueMessage) => {
        setQueue([...queue, message]);
    };

    const toggleQueue = () => {
        setQueueActive(!queueActive);
    };

    return (
        <QueueContext.Provider
            value={{ queueActive, toggleQueue, queue, setQueue, addToQueue }}
        >
            {children}
        </QueueContext.Provider>
    );
};
