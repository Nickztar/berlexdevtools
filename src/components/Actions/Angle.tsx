import { Box, ButtonGroup, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import useMouse from "../../hooks/useMouse";
import { off, on } from "../../utils/helpers";
import { R6 } from "../R6";
import { BsCircleFill } from "react-icons/bs";
import { MdClear, MdSend } from "react-icons/md";
import { IActionProps } from "../../types/types";
import { VMS } from "../VMS";

function calcAngle(cx: number, cy: number, ex: number, ey: number) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
}

const maxAngle = 90;
const errorAngle = 25;
const normalizedAngle = (angle: number) => {
    return Math.round(Math.abs(angle));
};

export function Angle({ sendAction, baseTopic }: IActionProps) {
    const [rotating, setRotating] = useState<boolean>(false);
    const [angle, setAngle] = useState<number>(0);
    const rotateEl = useRef(null);
    const { elX, elY, elH, elW } = useMouse(rotateEl);
    const RotateElement = useMemo(
        () => (baseTopic === "VMS" ? VMS : R6),
        [baseTopic]
    );
    console.log(RotateElement);
    const disableRotate = () => {
        off(window, "mouseup", disableRotate);
        setRotating(false);
    };

    const enableRotate = () => {
        on(window, "mouseup", disableRotate);
        setRotating(true);
    };

    if (rotating && elX && elY) {
        const fromX = elW / 2;
        const fromY = elH;
        const newAngle = calcAngle(elX, elY, fromX, fromY) - 90;
        if (Math.abs(newAngle) <= maxAngle && angle !== newAngle)
            setAngle(newAngle);
    }

    return (
        <Flex w="100%" align={"center"} justify="space-around">
            <Box ref={rotateEl} mt={6} w="127px" h="127px">
                <Flex
                    mx={"auto"}
                    w={"fit-content"}
                    direction={"column"}
                    justify={"center"}
                    align={"center"}
                    transformOrigin={"bottom center"}
                    transform={`rotate(${angle}deg)`}
                >
                    <Tooltip
                        hasArrow
                        bg={
                            normalizedAngle(angle) < errorAngle
                                ? "green.400"
                                : "red.500"
                        }
                        color="white"
                        placement="top"
                        isOpen={true}
                        label={`${normalizedAngle(angle)}°`}
                    >
                        <IconButton
                            onMouseDown={enableRotate}
                            variant="solid"
                            mb={2}
                            size={"xs"}
                            aria-label="Rotate"
                            borderRadius={"50%"}
                            icon={<BsCircleFill />}
                        />
                    </Tooltip>
                    <RotateElement />
                </Flex>
            </Box>
            <ButtonGroup isAttached mt={3}>
                <IconButton
                    colorScheme={"blue"}
                    bg={"blue.500"}
                    color="white"
                    size="sm"
                    aria-label={"send"}
                    icon={<MdClear />}
                    onClick={() => {
                        setAngle(0);
                        sendAction({
                            topic: "acc",
                            message: `angle=0`,
                        });
                    }}
                />
                <IconButton
                    colorScheme={"green"}
                    color="white"
                    bg={"green.400"}
                    size="sm"
                    aria-label={"send"}
                    icon={<MdSend />}
                    onClick={() => {
                        sendAction({
                            topic: "acc",
                            message: `angle=${normalizedAngle(angle)}`,
                        });
                    }}
                />
            </ButtonGroup>
        </Flex>
    );
}
