import {
    Box,
    Heading,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineHistory } from "react-icons/md";
import { useHistory } from "../providers/HistoryProvider";

export const History = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bg = useColorModeValue("gray.100", "gray.600");
    const { history } = useHistory();
    const hasHistory = history.length > 0;
    return (
        <>
            <IconButton
                aria-label="History"
                onClick={onOpen}
                icon={<MdOutlineHistory />}
            />
            <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader py={2}>History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxH={"65vh"} overflowY="auto" mb={4}>
                        {hasHistory ? (
                            history.map((message) => (
                                <Box
                                    key={message.sentAt}
                                    bg={bg}
                                    p={2}
                                    mt={2}
                                    shadow="md"
                                    borderRadius={"md"}
                                >
                                    <Heading fontSize="md">
                                        {message.topic}
                                    </Heading>
                                    <Text mt={1}>{message.message}</Text>
                                </Box>
                            ))
                        ) : (
                            <Heading fontSize="md">
                                No messages recently sent
                            </Heading>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
