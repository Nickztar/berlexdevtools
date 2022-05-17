import { Flex, Img, useColorModeValue } from "@chakra-ui/react";
import { relaunch } from "@tauri-apps/api/process";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { useEffect, useState } from "react";
import App from "./App";

export function AppWrapper() {
    const imageFilter = useColorModeValue("invert(100%)", "invert(0%)");
    const [checkingUpdate, setCheckingUpdate] = useState(true);
    async function CheckUpdate() {
        try {
            const { shouldUpdate, manifest } = await checkUpdate();
            console.log({ shouldUpdate, manifest });
            if (shouldUpdate) {
                // display dialog
                await installUpdate();
                // install complete, restart app
                await relaunch();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCheckingUpdate(false);
        }
    }

    useEffect(() => {
        CheckUpdate();
    }, []);

    if (!checkingUpdate) {
        return <App />;
    }

    return (
        <Flex h="100%" w="100%" justify={"center"} align={"center"}>
            <Img
                filter={imageFilter}
                p={"10%"}
                src="Berlex_ITS_logo_white.svg"
                alt="BerlexConnect - Intelligent traffic systems"
            />
        </Flex>
    );
}