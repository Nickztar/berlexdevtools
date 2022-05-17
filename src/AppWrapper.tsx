import { Fade, Flex, Img, useColorModeValue, useToast } from "@chakra-ui/react";
import { relaunch } from "@tauri-apps/api/process";
import { checkUpdate, installUpdate } from "@tauri-apps/api/updater";
import { useCallback, useEffect, useState } from "react";
import App from "./App";

let shouldCheck = true;

export function AppWrapper() {
    const imageFilter = useColorModeValue("invert(100%)", "invert(0%)");
    const [checkingUpdate, setCheckingUpdate] = useState(true);
    const toast = useToast();
    async function CheckUpdate() {
        shouldCheck = false;
        try {
            const { shouldUpdate } = await checkUpdate();
            if (shouldUpdate) {
                // display dialog
                await installUpdate();
                // install complete, restart app
                await relaunch();
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: "Failed to apply update",
                description: error,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-left",
            });
        } finally {
            setCheckingUpdate(false);
        }
    }

    //TODO: This ended up being super janky... will most likely need to be reworked

    const CheckUpdateCallback = useCallback(CheckUpdate, [toast]);
    useEffect(() => {
        if (shouldCheck) CheckUpdateCallback();
    }, [CheckUpdateCallback]);

    return (
        <>
            {!checkingUpdate && <App />}
            <Fade
                initial={false}
                transition={{ enter: undefined, exit: { duration: 0.2 } }}
                in={checkingUpdate}
                unmountOnExit
            >
                <Flex
                    h="100%"
                    w="100%"
                    justify={"center"}
                    position={"absolute"}
                    bg={"gray.800"}
                    top={0}
                    align={"center"}
                >
                    <Img
                        filter={imageFilter}
                        p={"10%"}
                        src="Berlex_ITS_logo_white.svg"
                        alt="BerlexConnect - Intelligent traffic systems"
                    />
                </Flex>
            </Fade>
        </>
    );
}
