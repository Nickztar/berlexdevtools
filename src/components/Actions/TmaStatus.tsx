import { Flex, ButtonGroup, Button } from "@chakra-ui/react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { IActionProps } from "../../types/types";
import { BitAction } from "./BitAction";

const PossibleArrowStates = [
    "unknown",
    "off",
    "staticLeft",
    "staticRight",
    "runningLeft",
    "runningRight",
    "cross",
    "dots",
    "extra",
];
const PossiblePositions = ["unknown", "movingDown", "down", "movingUp", "up"];

export function TmaStatus({ sendAction }: IActionProps) {
    const [arrowState, setArrowState] = useState<string>(
        PossibleArrowStates[0]
    );
    const [position, setPosition] = useState<string>(PossiblePositions[0]);

    return (
        <Flex direction={"column"} align="center">
            <ButtonGroup isAttached>
                {PossibleArrowStates.map((state) => (
                    <BitAction
                        key={state}
                        size="xs"
                        isIncluded={state === arrowState}
                        variant={"error"}
                        onClick={() => setArrowState(state)}
                        text={state}
                    />
                ))}
            </ButtonGroup>
            <ButtonGroup isAttached mt={2}>
                {PossiblePositions.map((state) => (
                    <BitAction
                        key={state}
                        size="xs"
                        isIncluded={state === position}
                        variant={"error"}
                        onClick={() => setPosition(state)}
                        text={state}
                    />
                ))}
            </ButtonGroup>
            <Button
                mt={2}
                variant={"solid"}
                colorScheme={"green"}
                bg={"green.400"}
                color="white"
                size={"xs"}
                rightIcon={<MdSend />}
                onClick={() =>
                    sendAction({
                        topic: "tmaStatus",
                        message: `arrow=${arrowState},tmaPos=${position}`,
                    })
                }
            >
                Send status
            </Button>
        </Flex>
    );
}
