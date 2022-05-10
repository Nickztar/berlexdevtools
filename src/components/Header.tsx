import { ButtonGroup, Button, IconButton, Flex } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import { Enviroments } from "../types/enums";
import { GoSignOut } from "react-icons/go";

type Props = {
    Username?: string;
    Enviroment: string;
    changeEnviroment: (env: string) => void;
    signOut?: () => void;
};

export function Header({
    Username,
    Enviroment,
    changeEnviroment,
    signOut,
}: Props) {
    return (
        <Flex
            w={"100%"}
            pos={"absolute"}
            p={2}
            align={"center"}
            justify="space-between"
        >
            <ButtonGroup size="sm" isAttached variant="outline">
                <Button mr="-px">{Enviroment}</Button>
                <IconButton
                    onClick={() => changeEnviroment(Enviroments.Unset)}
                    aria-label="Change enviroment"
                    icon={<MdRefresh />}
                />
            </ButtonGroup>
            {Username && (
                <ButtonGroup size="sm" isAttached variant="outline">
                    <Button mr="-px">{Username}</Button>
                    <IconButton
                        onClick={() => signOut && signOut()}
                        aria-label="Change enviroment"
                        icon={<GoSignOut />}
                    />
                </ButtonGroup>
            )}
        </Flex>
    );
}
