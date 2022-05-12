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
} from "@chakra-ui/react";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";
import { MqttMessage } from "../types/types";

type Props = {
    sendVolt: (message: MqttMessage) => void;
};

const formatVoltage = (voltage: number) => {
    return (Math.round(voltage * 100) / 100).toFixed(2);
};

export function Volt({ sendVolt }: Props) {
    const [sliderValue, setSliderValue] = useState(12);
    const [showTooltip, setShowTooltip] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

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
        <Flex mt={6}>
            <Slider
                aria-label="slider-ex-4"
                min={0}
                max={15}
                step={0.1}
                defaultValue={12}
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
                <SliderTrack bg="red.100">
                    <SliderFilledTrack bg="yellow" />
                </SliderTrack>
                <Tooltip
                    hasArrow
                    bg="green.400"
                    color="white"
                    placement="top"
                    isOpen={showTooltip}
                    label={`${formatVoltage(sliderValue)}v`}
                >
                    <SliderThumb boxSize={6}>
                        <Box color="green.400" as={HiLightningBolt} />
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
                    sendVolt({
                        topic: "volt",
                        message: `v=${formatVoltage(sliderValue)}`,
                    });
                }}
            />
        </Flex>
    );
}
