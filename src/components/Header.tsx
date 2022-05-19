import {
    ButtonGroup,
    IconButton,
    Flex,
    useColorMode,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";
import { GoSignOut } from "react-icons/go";
import { MqttSettings } from "./MqttSettings";
import { FaMoon, FaSun } from "react-icons/fa";
import { Settings } from "../types/types";
import { History } from "./History";

type Props = {
    Username?: string;
    Settings: Settings | undefined;
    signOut?: () => void;
    setSettings: (username: string, password: string) => void;
};

export function Header({ Username, Settings, signOut, setSettings }: Props) {
    const imageFilter = useColorModeValue("invert(100%)", "invert(0%)");
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
            w={"100%"}
            h={"48px"}
            pos={"absolute"}
            p={2}
            align={"center"}
            justify="space-between"
        >
            <Image
                p={2}
                filter={imageFilter}
                h={"48px"}
                src="Berlex_ITS_logo_white.svg"
                alt="BerlexConnect - Intelligent traffic systems"
            />
            <ButtonGroup size="sm" isAttached variant="outline">
                {Username && (
                    <>
                        <History />
                        <MqttSettings
                            Username={Settings?.Username}
                            Password={Settings?.Password}
                            setSettings={setSettings}
                        />
                        <IconButton
                            title={Username}
                            onClick={() => signOut && signOut()}
                            aria-label="Change enviroment"
                            icon={<GoSignOut />}
                        />
                    </>
                )}
                <IconButton
                    onClick={() => toggleColorMode()}
                    aria-label="Toggle color mode"
                    icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                />
            </ButtonGroup>
        </Flex>
    );
}
