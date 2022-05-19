import { createContext, useCallback, useContext, useState } from "react";
import { PreviousMessage } from "../types/types";

export type HistoryContent = {
    history: PreviousMessage[];
    setHistory: (messages: PreviousMessage[]) => void;
    addToHistory: (message: PreviousMessage) => void;
};

const HistoryContext = createContext<HistoryContent>({
    history: [],
    setHistory: () => {},
    addToHistory: () => {},
});

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [history, setHistory] = useState<PreviousMessage[]>([]);

    //Add to the queue and remove messages older than 10 minutes
    const addToHistory = useCallback(
        (message: PreviousMessage) => {
            const newHistory = [...history, message];
            setHistory(
                newHistory.filter((m) => m.sentAt > Date.now() - 600000)
            );
        },
        [history]
    );

    return (
        <HistoryContext.Provider value={{ history, setHistory, addToHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
