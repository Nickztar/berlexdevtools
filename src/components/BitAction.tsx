import { Button, useColorModeValue } from "@chakra-ui/react";

type Props = {
    isIncluded: boolean;
    onClick: () => void;
    text: string;
    variant: "error" | "capability";
};

export function BitAction({ isIncluded, onClick, text, variant }: Props) {
    const color = useColorModeValue("black", "white");

    const mainColor = variant === "error" ? "red.500" : "green.500";

    return (
        <Button
            variant={isIncluded ? "solid" : "outline"}
            colorScheme={variant === "error" ? "red" : "green"}
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
