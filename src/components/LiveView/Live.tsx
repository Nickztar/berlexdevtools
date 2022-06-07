import { Button, Spinner } from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api";
import { UnlistenFn, listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

interface Props {}

type Message = {
    sentAt: number;
    topic: string;
    payload: string;
};

export function Live(props: Props) {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    let unListen: UnlistenFn | undefined = undefined;
    // host: String,
    // port: u16,
    // username: String,
    // password: String,
    const startListening = async () => {
        setIsConnecting(true);
        const res = await invoke("start_forwarding", {
            config: {
                host: "HOST",
                port: 1883,
                username: "USERNAME",
                password: "PASSWORD",
            },
        });
        console.log(res);
        if (res) {
            unListen = await listen("mqtt-message", (ev) => {
                // event.event is the event name (useful if you want to use a single callback fn for multiple event types)
                // event.payload is the payload object
                console.log(ev);
                const message = ev.payload as Message;
                message.sentAt = new Date().getTime();
                setMessages((prev) => [...prev, message]);
            });
            setIsConnected(true);
        }
        setIsConnecting(false);
    };

    useEffect(() => {
        return () => {
            unListen && unListen();
        };
    });

    if (!isConnecting && !isConnected) {
        return <Button onClick={startListening}>Start listening</Button>;
    } else if (isConnecting) {
        return <Spinner />;
    } else {
        return (
            <div>
                {messages.map((message) => {
                    return (
                        <div key={message.sentAt}>
                            {message.topic} -&gt; {message.payload}
                        </div>
                    );
                })}
            </div>
        );
    }
}
