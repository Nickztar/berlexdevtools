import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { ReactElement } from "react";
import { IActionProps } from "../../types/types";

type PowerState = {
    title: string;
    color: string;
    bg: string;
    icon: ReactElement;
    message: string;
};

export function Powerstates({ sendAction }: IActionProps) {
    const PossiblePowerstates: PowerState[] = [
        {
            title: "on",
            color: "white",
            bg: "green.400",
            icon: <MdOutlinePowerSettingsNew />,
            message: "cloud=online,power=on",
        },
        {
            title: "off",
            color: "white",
            bg: "gray.500",
            icon: <MdOutlinePowerSettingsNew />,
            message: "cloud=offline,power=off",
        },
        {
            title: "off_sleep",
            color: "white",
            bg: "gray.400",
            icon: <GiNightSleep />,

            message: "cloud=offline,power=off_sleep",
        },
        {
            title: "unknown",
            color: "white",
            bg: "red.500",
            icon: <FaQuestion />,
            message: "cloud=dead,power=unknown",
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
                    onClick={() =>
                        sendAction({
                            topic: "status",
                            message: powerstate.message,
                        })
                    }
                />
            ))}
        </ButtonGroup>
    );
}
