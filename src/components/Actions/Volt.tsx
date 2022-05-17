import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Box,
    Flex,
    IconButton,
    Tooltip,
    SliderMark,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import { IActionProps } from "../../types/types";

const formatVoltage = (voltage: number) => {
    return (Math.round(voltage * 100) / 100).toFixed(2);
};
const voltColor = (volt: number) => {
    if (volt <= 10.8) return "red.500";
    if (volt > 10.8 && volt <= 11.7) return "yellow.400";
    return "green.400";
};

export function Volt({ sendAction }: IActionProps) {
    const [sliderValue, setSliderValue] = useState(13);
    const [showTooltip, setShowTooltip] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const thumbColor = useColorModeValue("gray.800", "white");

    const onEnter = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setShowTooltip(true);
    };

    const onExit = () => {
        const t = setTimeout(() => {
            setShowTooltip(false);
        }, 200);
        setTimer(t);
    };

    return (
        <Flex w={"100%"} mt={6} mb={4}>
            <Slider
                aria-label="slider-ex-4"
                min={0}
                max={15}
                step={0.1}
                defaultValue={13}
                onChange={(v) => setSliderValue(v)}
                onMouseEnter={onEnter}
                onMouseLeave={onExit}
            >
                <SliderMark value={0} mt="1" fontWeight={"bold"} fontSize="sm">
                    0v
                </SliderMark>
                <SliderMark
                    value={7.5}
                    mt="1"
                    ml="-3"
                    fontWeight={"bold"}
                    fontSize="sm"
                >
                    7.5v
                </SliderMark>
                <SliderMark
                    value={15}
                    mt="1"
                    ml="-5"
                    fontWeight={"bold"}
                    fontSize="sm"
                >
                    15v
                </SliderMark>
                <SliderTrack
                    bgGradient={
                        "linear(to-r, red.500 0%, red.500 72%, yellow.400 72%, yellow.400 78%, green.400 78%)"
                    }
                >
                    <SliderFilledTrack bg={"transparent"} />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg={voltColor(sliderValue)}
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${formatVoltage(sliderValue)}v`}
                >
                    <SliderThumb bg={thumbColor} boxSize={6}>
                        <Box
                            color={voltColor(sliderValue)}
                            as={HiLightningBolt}
                        />
                    </SliderThumb>
                </Tooltip>
            </Slider>
            <IconButton
                ml={4}
                colorScheme={"green"}
                color="white"
                bg={"green.400"}
                size="sm"
                aria-label={"send"}
                icon={<MdSend />}
                onClick={() => {
                    sendAction({
                        topic: "volt",
                        message: `v=${formatVoltage(sliderValue)}`,
                    });
                }}
            />
        </Flex>
    );
}
