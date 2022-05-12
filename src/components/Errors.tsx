import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdClear, MdSend } from "react-icons/md";
import { MqttMessage } from "../types/types";

type Props = {
    sendErrors: (powerstate: MqttMessage) => void;
};

type Error = {
    title: string;
    mask: number;
};

const maskSum = (selected: Error[]) => {
    return selected.reduce((acc, curr) => acc + curr.mask, 0);
};

export function Errors({ sendErrors }: Props) {
    const [selected, setSelected] = useState<Error[]>([]);
    const PossibleErrors: Error[] = [
        { title: "bit0", mask: 1 },
        { title: "bit1", mask: 2 },
        { title: "bit2", mask: 4 },
        { title: "bit3", mask: 8 },
        { title: "bit4", mask: 16 },
        { title: "bit5", mask: 32 },
        { title: "bit6", mask: 64 },
        { title: "bit7", mask: 128 },
    ];

    const toggleSelected = (error: Error) => {
        if (selected.find((s) => s.mask === error.mask)) {
            setSelected((prevSelected) =>
                prevSelected.filter((e) => e.mask !== error.mask)
            );
        } else {
            setSelected((prevSelected) => [...prevSelected, error]);
        }
    };
    return (
        <ButtonGroup isAttached>
            {PossibleErrors.map((error) => (
                <Button
                    key={error.mask}
                    variant={"outline"}
                    colorScheme="red"
                    color={"white"}
                    borderColor={"red.500"}
                    bg={
                        selected.find((s) => s.mask === error.mask)
                            ? "red.500"
                            : "transparent"
                    }
                    size="sm"
                    onClick={() => toggleSelected(error)}
                >
                    {error.title}
                </Button>
            ))}
            <IconButton
                colorScheme={"blue"}
                bg={"blue.500"}
                color="white"
                size="sm"
                aria-label={"send"}
                icon={<MdClear />}
                onClick={() => {
                    setSelected([]);
                    sendErrors({
                        topic: "error",
                        message: `mask=0`,
                    });
                }}
            />
            <IconButton
                colorScheme={"green"}
                bg={"green.400"}
                color="white"
                size="sm"
                aria-label={"send"}
                icon={<MdSend />}
                onClick={() =>
                    sendErrors({
                        topic: "error",
                        message: `mask=${maskSum(selected)}`,
                    })
                }
            />
        </ButtonGroup>
    );
}
