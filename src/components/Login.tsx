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
import { FaServer } from "react-icons/fa";
import { Token } from "../types/token";

type Props = {
    Enviroment: string;
    setToken: (token: Token) => void;
    setEnivorment: (enviroment: string) => void;
};
function isValidHttpUrl(string: string): boolean {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
export function Login({ Enviroment, setEnivorment, setToken }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if (!isValidHttpUrl(Enviroment)) {
            setError("Invalid enviroment");
            return;
        }
        setError(null);
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);
        body.append("grant_type", "password");
        const url = Enviroment + "/token";
        setIsLoading(true);
        const reponse = await fetch(url, {
            method: "post",
            body,
        }).catch(() => {
            setError("Failed to connect to server");
            setIsLoading(false);
        });
        if (!reponse || reponse.status !== 200) {
            setError("Invalid username or password");
            setIsLoading(false);
        }
        const data = await reponse!.json();
        setIsLoading(false);
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
                        children={<Icon as={FaServer} />}
                    />
                    <Input
                        autoFocus={true}
                        value={Enviroment}
                        onChange={(e) => setEnivorment(e.target.value)}
                        placeholder="Enviroment"
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={MdOutlineEmail} />}
                    />
                    <Input
                        autoFocus={true}
                        value={username}
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
                        value={password}
                        type={"password"}
                    />
                </InputGroup>
                <Button isLoading={isLoading} onClick={handleLogin}>
                    Login
                </Button>
                {error && (
                    <Text alignSelf={"center"} color={"red"} fontSize="xl">
                        {error}
                    </Text>
                )}
            </VStack>
        </Flex>
    );
}
