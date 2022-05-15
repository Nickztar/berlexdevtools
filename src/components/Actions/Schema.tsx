import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { MqttMessage, Sch } from "../../types/types";
import { BitAction } from "./BitAction";

type Props = {
    sendSchema: (message: MqttMessage) => void;
};

export function Schema({ sendSchema }: Props) {
    const [selected, setSelected] = useState<Sch | null>(null);

    const PossibleSchemas: Sch[] = [
        { title: "error (blinking yellow)", state: "e", variant: "error" },
        { title: "error off", state: "eo", variant: "error" },
        { title: "startup", state: "s", variant: "error" },
        { title: "idle (red)", state: "i", variant: "error" },
        { title: "config (red)", state: "c", variant: "error" },
        { title: "all-red (red)", state: "a", variant: "error" },
        { title: "red", state: "r", variant: "error" },
        { title: "timeout", state: "t", variant: "warning" },
        { title: "timeout off", state: "to", variant: "warning" },
        { title: "orange (red and yellow)", state: "o", variant: "warning" },
        { title: "yellow", state: "y", variant: "warning" },
        { title: "blinking yellow", state: "b", variant: "warning" },
        { title: "green", state: "g", variant: "capability" },
        { title: "blinking green", state: "h", variant: "capability" },
    ];

    return (
        <ButtonGroup isAttached>
            {PossibleSchemas.map((schema) => (
                <BitAction
                    variant={schema.variant}
                    onClick={() =>
                        selected?.state === schema.state
                            ? setSelected(null)
                            : setSelected(schema)
                    }
                    tooltip={schema.title}
                    text={schema.state}
                    isIncluded={selected?.state === schema.state}
                />
            ))}
            <IconButton
                colorScheme={"green"}
                bg={"green.400"}
                color="white"
                size="sm"
                aria-label={"send"}
                icon={<MdSend />}
                disabled={!selected}
                onClick={() =>
                    sendSchema({
                        topic: "sch",
                        message: `${selected?.state}=-1`,
                    })
                }
            />
        </ButtonGroup>
    );
}
