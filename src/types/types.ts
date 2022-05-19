export type Settings = {
    Username: string;
    Password: string;
};

export type MqttMessage = {
    topic: string;
    message: string;
};

export type Bit = {
    title: string;
    mask: number;
};

export type Sch = {
    title: string;
    variant: "error" | "warning" | "capability";
    state: string;
    time?: number;
};

export type QueueMessage = {
    topic: string;
    message: string;
};

export type PreviousMessage = {
    topic: string;
    message: string;
    sentAt: number;
};

export interface IActionProps {
    sendAction: (message: MqttMessage) => void;
    baseTopic?: string;
}
