import { Flex, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MqttMessage, Settings } from "../types/types";
import { Angle } from "./Actions/Angle";
import { Capabilities } from "./Actions/Capabilities";
import { Errors } from "./Actions/Errors";
import { Powerstates } from "./Actions/Powerstates";
import { Volt } from "./Actions/Volt";

type Props = {
    settings: Settings | undefined;
    enviroment: string;
};

export function Messaging({ settings, enviroment }: Props) {
    const [imei, setIMEI] = useState<string>("");
    const [base, setBase] = useState<string>("R6");

    async function sendAction(action: MqttMessage) {
        const baseUrl = `${enviroment}/api/messagebroker`;
        const topic = `${base}/${imei}/t/${action.topic}`;
        const payload = action.message;
        const body = JSON.stringify({
            topic,
            payload,
        });
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Basic ${window.btoa(
                    settings?.Username + ":" + settings?.Password
                )}`,
                "Content-Type": "application/json",
            },
            body,
        });
        console.log(response);
    }

    return (
        <Flex h={"100%"} align={"center"} justify="center">
            <VStack spacing={4} align="center">
                <Flex maxW={"350px"}>
                    <Input
                        size="sm"
                        maxW={"50px"}
                        borderRadius={"md"}
                        borderRightRadius={0}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="Base"
                        value={base}
                    />
                    <Input
                        size="sm"
                        borderRadius={"md"}
                        borderLeftRadius={0}
                        onChange={(e) => setIMEI(e.target.value)}
                        placeholder="IMEI"
                        value={imei}
                    />
                </Flex>
                <Powerstates setPowerstate={sendAction} />
                <Errors sendErrors={sendAction} />
                <Capabilities sendCapabilites={sendAction} />
                <Volt sendVolt={sendAction} />
                <Angle sendAngle={sendAction} />
            </VStack>
        </Flex>
    );
}
