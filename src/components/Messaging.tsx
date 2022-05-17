import { Flex, Input, VStack } from "@chakra-ui/react";
import { FunctionComponent, useMemo, useState } from "react";
import { IActionProps, MqttMessage, Settings } from "../types/types";
import { Angle } from "./Actions/Angle";
import { Capabilities } from "./Actions/Capabilities";
import { Errors } from "./Actions/Errors";
import { Powerstates } from "./Actions/Powerstates";
import { Volt } from "./Actions/Volt";
import { Schema } from "./Actions/Schema";
import { TmaStatus } from "./Actions/TmaStatus";

type Props = {
    settings: Settings | undefined;
    enviroment: string;
};

type Action = {
    Name: string;
    Component: FunctionComponent<IActionProps>;
    Base: string[];
};

const Actions: Action[] = [
    { Name: "Powerstates", Component: Powerstates, Base: ["R6", "VMS"] },
    { Name: "Schema", Component: Schema, Base: ["R6"] },
    { Name: "TmaStatus", Component: TmaStatus, Base: ["VMS"] },
    { Name: "Errors", Component: Errors, Base: ["R6", "VMS"] },
    { Name: "Capabilities", Component: Capabilities, Base: ["R6", "VMS"] },
    { Name: "Volt", Component: Volt, Base: ["R6", "VMS"] },
    { Name: "Angle", Component: Angle, Base: ["R6", "VMS"] },
];

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
    const filteredActions = useMemo(() => {
        return Actions.filter((x) => x.Base.includes(base));
    }, [base]);
    return (
        <Flex h={"100%"} align={"center"} justify="center">
            <VStack spacing={4} align="center">
                <Flex align="center">
                    <Input
                        size="sm"
                        maxW={"60px"}
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
                {filteredActions.map((action) => (
                    <action.Component
                        key={action.Name}
                        baseTopic={base}
                        sendAction={sendAction}
                    />
                ))}
                {/* <Position /> */}
            </VStack>
        </Flex>
    );
}
