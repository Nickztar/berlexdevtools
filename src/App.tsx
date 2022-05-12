import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Actions } from "./components/Actions";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Enviroments } from "./types/constants";
import { Token } from "./types/token";
import { Settings } from "./types/types";

function App() {
    const [enviroment, setEnviroment] = useState(Enviroments.Test);
    const [token, setToken] = useState<Token | undefined>();
    const [settings, setSettings] = useState<Settings | undefined>(undefined);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(JSON.parse(storedToken) as Token);
        }
    }, []);

    useEffect(() => {
        if (
            token &&
            Date.parse(token.expires) > Date.now() &&
            token.enviroment === enviroment
        ) {
            localStorage.setItem("token", JSON.stringify(token));
        } else {
            setToken(undefined);
            // localStorage.removeItem("token");
        }
    }, [token, enviroment]);

    if (!token) {
        return (
            <>
                <Login
                    setToken={setToken}
                    Enviroment={enviroment}
                    setEnivorment={setEnviroment}
                />
            </>
        );
    }

    return (
        <>
            <Header
                Username={token?.userName}
                Enviroment={enviroment}
                changeEnviroment={setEnviroment}
                signOut={() => setToken(undefined)}
                setSettings={(u, p) =>
                    setSettings({ Username: u, Password: p })
                }
            />
            <Box pt="48px">
                <Actions settings={settings} enviroment={enviroment} />
            </Box>
        </>
    );
}

export default App;
