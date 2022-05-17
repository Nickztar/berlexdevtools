import { ButtonGroup, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdClear, MdSend } from "react-icons/md";
import { Bit, IActionProps } from "../../types/types";
import { maskSum } from "../../utils/helpers";
import { BitAction } from "./BitAction";

export function Capabilities({ sendAction }: IActionProps) {
    const [selected, setSelected] = useState<Bit[]>([]);
    const PossibleCapabilities: Bit[] = [
        { title: "bit0", mask: 1 },
        { title: "bit1", mask: 2 },
        { title: "bit2", mask: 4 },
        { title: "bit3", mask: 8 },
        { title: "bit4", mask: 16 },
    ];
    const toggleSelected = (error: Bit) => {
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
            {PossibleCapabilities.map((capability) => (
                <BitAction
                    key={capability.mask}
                    variant={"capability"}
                    onClick={() => toggleSelected(capability)}
                    isIncluded={
                        !!selected.find((s) => s.mask === capability.mask)
                    }
                    text={capability.title}
                />
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
                    sendAction({
                        topic: "capabilities",
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
                    sendAction({
                        topic: "capabilities",
                        message: `mask=${maskSum(selected)}`,
                    })
                }
            />
        </ButtonGroup>
    );
}
