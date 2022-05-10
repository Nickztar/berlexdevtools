import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { Enviroments } from "../types/enums";

type Props = {
    setEnviroment: (env: string) => void;
};

export function Enviroment({ setEnviroment }: Props) {
    return (
        <Flex h={"100%"} align={"center"} justify="center">
            <SimpleGrid columns={2} spacing={8}>
                <Button
                    onClick={() => setEnviroment(Enviroments.Local)}
                    borderRadius="md"
                    bg={"green.400"}
                    p={8}
                >
                    Local
                </Button>
                <Button
                    onClick={() => setEnviroment(Enviroments.Dev)}
                    borderRadius="md"
                    bg={"blue.400"}
                    p={8}
                >
                    Dev
                </Button>
                <Button
                    onClick={() => setEnviroment(Enviroments.Test)}
                    borderRadius="md"
                    bg={"red.400"}
                    p={8}
                >
                    Test
                </Button>
                <Button
                    onClick={() => setEnviroment(Enviroments.Staging)}
                    borderRadius="md"
                    bg={"purple.400"}
                    p={8}
                >
                    Staging
                </Button>
            </SimpleGrid>
        </Flex>
    );
}
