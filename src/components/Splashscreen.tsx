import {
    useColorModeValue,
    Flex,
    Img,
    Text,
    Button,
    useToast,
} from "@chakra-ui/react";
import { relaunch } from "@tauri-apps/api/process";
import { installUpdate, UpdateManifest } from "@tauri-apps/api/updater";
import { useState } from "react";

type Props = {
    manifest: UpdateManifest | undefined;
    done: () => void;
};

export function SplashScreen({ manifest, done }: Props) {
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const performUpdate = async () => {
        setLoading(true);
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
            done();
        }
    };
    const imageFilter = useColorModeValue("invert(100%)", "invert(0%)");
    return (
        <Flex
            h="100%"
            w="100%"
            justify={"center"}
            position={"absolute"}
            bg={"gray.800"}
            top={0}
            align={"center"}
            flexDir="column"
        >
            <Img
                filter={imageFilter}
                p={"10%"}
                src="Berlex_ITS_logo_white.svg"
                alt="BerlexConnect - Intelligent traffic systems"
            />
            {manifest ? (
                <Flex flexDir={"column"}>
                    <Button
                        mt={-4}
                        isLoading={loading}
                        onClick={performUpdate}
                        variant="solid"
                        colorScheme={"red"}
                        bg={"red.500"}
                        color={"white"}
                    >
                        Upgrade to v{manifest.version}
                    </Button>
                    <Button variant={"link"} size={"xs"} onClick={done}>
                        Skip
                    </Button>
                </Flex>
            ) : (
                <Text
                    mt={-4}
                    fontWeight="500"
                    fontSize="4xl"
                    className="loading"
                    display={"flex"}
                >
                    Checking for update
                </Text>
            )}
        </Flex>
    );
}
