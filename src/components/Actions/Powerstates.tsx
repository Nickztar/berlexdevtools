import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { ReactElement } from "react";
import { MqttMessage } from "../../types/types";

type Props = {
    setPowerstate: (powerstate: MqttMessage) => void;
};

type PowerState = {
    title: string;
    color: string;
    bg: string;
    icon: ReactElement;
    action: MqttMessage;
};

export function Powerstates({ setPowerstate }: Props) {
    const PossiblePowerstates: PowerState[] = [
        {
            title: "on",
            color: "white",
            bg: "green.400",
            icon: <MdOutlinePowerSettingsNew />,
            action: { topic: "status", message: "cloud=online,power=on" },
        },
        {
            title: "off",
            color: "white",
            bg: "gray.500",
            icon: <MdOutlinePowerSettingsNew />,
            action: { topic: "status", message: "cloud=offline,power=off" },
        },
        {
            title: "off_sleep",
            color: "white",
            bg: "gray.400",
            icon: <GiNightSleep />,
            action: {
                topic: "status",
                message: "cloud=offline,power=off_sleep",
            },
        },
        {
            title: "unknown",
            color: "white",
            bg: "red.500",
            icon: <FaQuestion />,
            action: { topic: "status", message: "cloud=dead,power=unknown" },
        },
    ];
    return (
        <ButtonGroup size="sm" isAttached variant="solid">
            {PossiblePowerstates.map((powerstate) => (
                <IconButton
                    color={powerstate.color}
                    bg={powerstate.bg}
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
