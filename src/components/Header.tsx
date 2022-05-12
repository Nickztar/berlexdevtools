import { ButtonGroup, IconButton, Flex } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import { Enviroments } from "../types/constants";
import { GoSignOut } from "react-icons/go";
import { MqttSettings } from "./MqttSettings";

type Props = {
    Username?: string;
    Enviroment: string;
    changeEnviroment: (env: string) => void;
    signOut?: () => void;
    setSettings: (username: string, password: string) => void;
};

export function Header({
    Username,
    Enviroment,
    changeEnviroment,
    signOut,
    setSettings,
}: Props) {
    return (
        <Flex
            w={"100%"}
            pos={"absolute"}
            p={2}
            align={"center"}
            justify="flex-end"
        >
            {Username && (
                <ButtonGroup size="sm" isAttached variant="outline">
                    <MqttSettings setSettings={setSettings} />
                    <IconButton
                        title={Enviroment}
                        onClick={() => changeEnviroment(Enviroments.Unset)}
                        aria-label="Change enviroment"
                        icon={<MdRefresh />}
                    />
                    <IconButton
                        title={Username}
                        onClick={() => signOut && signOut()}
                        aria-label="Change enviroment"
                        icon={<GoSignOut />}
                    />
                </ButtonGroup>
            )}
        </Flex>
    );
}
