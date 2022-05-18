import { Fade, useToast } from "@chakra-ui/react";
import {
    checkUpdate,
    installUpdate,
    UpdateManifest,
} from "@tauri-apps/api/updater";
import { useEffect, useState } from "react";
import { SplashScreen } from "./components/Splashscreen";
import App from "./App";
import { relaunch } from "@tauri-apps/api/process";

export function AppWrapper() {
    const [checkingUpdate, setCheckingUpdate] = useState(true);
    const [updateManifest, setUpdateManifest] = useState<
        UpdateManifest | undefined
    >(undefined);
    const toast = useToast();

    const performUpdate = async () => {
        try {
            await installUpdate();
            await relaunch();
        } catch (e) {
            if (typeof e === "string") {
                toast({
                    title: "Update failed",
                    description: e,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-left",
                });
            }
        } finally {
            setCheckingUpdate(false);
        }
    };

    useEffect(() => {
        const query = setTimeout(async () => {
            try {
                const { shouldUpdate, manifest } = await checkUpdate();
                if (shouldUpdate) {
                    setUpdateManifest(manifest);
                } else {
                    setCheckingUpdate(false);
                }
            } catch (error) {
                console.log(error);
                if (
                    typeof error === "string" &&
                    !error.includes("EOF while parsing a value")
                ) {
                    toast({
                        title: "Failed to apply update",
                        description: error,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "top-left",
                    });
                }
                setCheckingUpdate(false);
            }
        }, 1);

        return () => {
            //On unmount, "cancel" the query
            clearTimeout(query);
        };
    }, [toast]);

    return (
        <>
            {!checkingUpdate && <App />}
            <Fade
                initial={false}
                transition={{ enter: undefined, exit: { duration: 0.2 } }}
                in={checkingUpdate}
                unmountOnExit
            >
                <SplashScreen
                    manifest={updateManifest}
                    done={() => setCheckingUpdate(false)}
                />
            </Fade>
        </>
    );
}
