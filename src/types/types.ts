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
