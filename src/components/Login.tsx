import { Button, Flex, Input, VStack } from "@chakra-ui/react";
import React from "react";

export function Login() {
    return (
        <Flex h={"100%"} align={"center"} justify="center">
            <VStack spacing={4} align="stretch">
                <Input placeholder="Username" />
                <Input placeholder="Password" type={"password"} />
                <Button>Login</Button>
            </VStack>
        </Flex>
    );
}
