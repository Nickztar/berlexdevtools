import {
    Button,
    Flex,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Image,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { Token } from "../types/token";

type Props = {
    Enviroment: string;
    setToken: (token: Token) => void;
};

export function Login({ Enviroment, setToken }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
        setError(null);
        const data = new URLSearchParams();
        data.append("username", username);
        data.append("password", password);
        data.append("grant_type", "password");
        const url = Enviroment + "/token";
        fetch(url, {
            method: "post",
            body: data,
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    setError("Invalid username or password");
                    return undefined;
                }
            })
            .then((data) => {
                if (!data) return;
                const issued = data[".issued"];
                const expires = data[".expires"];
                const token = {
                    issued,
                    expires,
                    access_token: data.access_token,
                    expires_in: data.expires_in,
                    token_type: data.token_type,
                    userName: data.userName,
                    enviroment: Enviroment,
                } as Token;
                setToken(token);
            });
    };

    return (
        <Flex h={"100%"} align={"center"} justify="center">
            <VStack spacing={4} align="stretch">
                <Image
                    p={4}
                    src="Berlex_ITS_logo_white.svg"
                    alt="BerlexConnect - Intelligent traffic systems"
                />
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={MdOutlineEmail} />}
                    />
                    <Input
                        autoFocus={true}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={MdPassword} />}
                    />
                    <Input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type={"password"}
                    />
                </InputGroup>
                <Button onClick={handleLogin}>Login</Button>
                {error && (
                    <Text color={"red"} fontSize="2xl">
                        {error}
                    </Text>
                )}
            </VStack>
        </Flex>
    );
}
