import { Button, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";

const MainColor = (variant: string) => {
    switch (variant) {
        case "error":
            return "red.500";
        case "warning":
            return "yellow.400";
        case "capability":
            return "green.500";
        default:
            return "";
    }
};
const ColorScheme = (variant: string) => {
    switch (variant) {
        case "error":
            return "red";
        case "warning":
            return "yellow";
        case "capability":
            return "green";
        default:
            return "";
    }
};

type Props = {
    isIncluded: boolean;
    onClick: () => void;
    text: string;
    tooltip?: string;
    variant: "error" | "warning" | "capability";
};

export function BitAction({
    isIncluded,
    onClick,
    text,
    tooltip,
    variant,
}: Props) {
    const color = useColorModeValue("black", "white");

    const mainColor = useMemo(() => MainColor(variant), [variant]);
    const colorScheme = useMemo(() => ColorScheme(variant), [variant]);

    if (tooltip) {
        return (
            <Tooltip
                hasArrow
                placement="top"
                label={tooltip}
                // bg={mainColor}
                // color={color}
            >
                <Button
                    variant={isIncluded ? "solid" : "outline"}
                    colorScheme={colorScheme}
                    color={color}
                    borderColor={mainColor}
                    bg={isIncluded ? mainColor : "transparent"}
                    size="sm"
                    onClick={onClick}
                >
                    {text}
                </Button>
            </Tooltip>
        );
    }

    return (
        <Button
            variant={isIncluded ? "solid" : "outline"}
            colorScheme={colorScheme}
            color={color}
            borderColor={mainColor}
            bg={isIncluded ? mainColor : "transparent"}
            size="sm"
            onClick={onClick}
        >
            {text}
        </Button>
    );
}
