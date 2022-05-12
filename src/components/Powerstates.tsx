import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { MdPower, MdPowerOff } from "react-icons/md";
import { AiOutlineQuestion } from "react-icons/ai";
import { MqttMessage } from "../types/types";
import { FaLeaf } from "react-icons/fa";
import { ReactElement } from "react";

type Props = {
    setPowerstate: (powerstate: MqttMessage) => void;
};

type PowerState = {
    title: string;
    icon: ReactElement;
    action: MqttMessage;
};

export function Powerstates({ setPowerstate }: Props) {
    const PossiblePowerstates: PowerState[] = [
        {
            title: "on",
            icon: <MdPower />,
            action: { topic: "status", message: "cloud=online,power=on" },
        },
        {
            title: "off",
            icon: <MdPowerOff />,
            action: { topic: "status", message: "cloud=offline,power=off" },
        },
        {
            title: "off_sleep",
            icon: <FaLeaf />,
            action: {
                topic: "status",
                message: "cloud=offline,power=off_sleep",
            },
        },
        {
            title: "unknown",
            icon: <AiOutlineQuestion />,
            action: { topic: "status", message: "cloud=dead,power=unknown" },
        },
    ];
    return (
        <ButtonGroup size="md" isAttached variant="outline">
            {PossiblePowerstates.map((powerstate) => (
                <IconButton
                    key={powerstate.title}
                    title={powerstate.title}
                    aria-label="Change enviroment"
                    icon={powerstate.icon}
                    onClick={() => setPowerstate(powerstate.action)}
                />
            ))}
        </ButtonGroup>
    );
}
