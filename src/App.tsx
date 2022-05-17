import { Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Messaging } from "./components/Messaging";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Enviroments } from "./types/constants";
import { Token } from "./types/token";
import { Settings } from "./types/types";

function App() {
    const [enviroment, setEnviroment] = useState(Enviroments.Test);
    const [token, setToken] = useState<Token | undefined>();
    const [settings, setSettings] = useState<Settings | undefined>(undefined);

    const handleLogin = useCallback(
        (newToken: Token) => {
            if (
                newToken &&
                Date.parse(newToken.expires) > Date.now() &&
                newToken.enviroment === enviroment
            ) {
                localStorage.setItem("token", JSON.stringify(newToken));
                setToken(newToken);
            }
        },
        [enviroment]
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(undefined);
    };

    const saveSettings = (newSettings: Settings) => {
        localStorage.setItem("settings", JSON.stringify(newSettings));
        setSettings(newSettings);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const existingToken = JSON.parse(storedToken) as Token;
            handleLogin(existingToken);
        }
        const storedSettings = localStorage.getItem("settings");
        if (storedSettings) {
            const existingSettings = JSON.parse(storedSettings) as Settings;
            setSettings(existingSettings);
        }
    }, [handleLogin]);

    if (!token) {
        return (
            <>
                <Login
                    setToken={handleLogin}
                    Enviroment={enviroment}
                    setEnivorment={setEnviroment}
                />
            </>
        );
    }

    return (
        <>
            <Header
                Settings={settings}
                Username={token?.userName}
                signOut={handleLogout}
                setSettings={(u, p) =>
                    saveSettings({ Username: u, Password: p })
                }
            />
            <Box pt="48px">
                <Messaging settings={settings} enviroment={enviroment} />
            </Box>
        </>
    );
}

export default App;
