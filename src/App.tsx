import { useEffect, useState } from "react";
import { Enviroment } from "./components/Enviroment";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Enviroments } from "./types/enums";
import { Token } from "./types/token";

function App() {
    const [enviroment, setEnviroment] = useState(Enviroments.Unset);
    const [token, setToken] = useState<Token | undefined>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
            token.enviroment == enviroment
        ) {
            localStorage.setItem("token", JSON.stringify(token));
            setIsAuthenticated(true);
        } else if (token) {
            setToken(undefined);
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
        }
    }, [token, enviroment]);

    const signOut = () => {
        setToken(undefined);
    };

    if (enviroment === Enviroments.Unset) {
        return <Enviroment setEnviroment={setEnviroment} />;
    }
    if (!isAuthenticated) {
        return (
            <>
                <Header
                    Enviroment={enviroment}
                    changeEnviroment={setEnviroment}
                />
                <Login setToken={setToken} Enviroment={enviroment} />
            </>
        );
    }

    return (
        <Header
            Username={token?.userName}
            Enviroment={enviroment}
            changeEnviroment={setEnviroment}
            signOut={signOut}
        />
    );
}

export default App;
