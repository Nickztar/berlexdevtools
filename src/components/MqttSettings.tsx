import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    IconButton,
} from "@chakra-ui/react";
import { getVersion } from "@tauri-apps/api/app";
import { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";

type Props = {
    Username?: string;
    Password?: string;
    setSettings: (username: string, password: string) => void;
};

export function MqttSettings({ Username, Password, setSettings }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [username, setUsername] = useState(Username || "");
    const [password, setPassword] = useState(Password || "");
    const [version, setVersion] = useState("0.0.0");

    useEffect(() => {
        getVersion().then((qVersion) => {
            setVersion(qVersion);
        });
    }, []);

    return (
        <>
            <IconButton
                aria-label="Settings"
                onClick={onOpen}
                icon={<MdOutlineSettings />}
            />
            <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader py={2}>Settings - v{version}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            size={"sm"}
                            placeholder="broker username"
                        />
                        <Input
                            mt={2}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size={"sm"}
                            placeholder="broker password"
                        />
                    </ModalBody>

                    <ModalFooter py={2}>
                        <Button
                            isDisabled={!password || !username}
                            size={"sm"}
                            colorScheme="blue"
                            onClick={() => {
                                onClose();
                                setSettings(username, password);
                            }}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
