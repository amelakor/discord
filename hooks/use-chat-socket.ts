import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";
import { Member, Message, Profile } from "@prisma/client";
type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey,
}: ChatSocketProps) => {
    const { socket } = useSocket();

    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (old: any) => {
                if (!old || !old.pages || old.pages.lenght === 0) return old;
                const newData = old.pages.map((page: any) => {
                    return {
                        ...page,
                        items: page.items.map((item: any) => {
                            if (item.id === message.id) return message;
                            return item;
                        }),
                    };
                });

                return {
                    ...old,
                    pages: newData,
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                items: [message],
                            },
                        ],
                    };
                }

                const newData = [...oldData.pages];

                newData[0] = {
                    ...newData[0],
                    items: [message, ...newData[0].items],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
