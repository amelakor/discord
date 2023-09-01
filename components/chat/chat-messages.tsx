"use client";

import { Member } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "conversationId" | "channelId";
    paramValue: string;
    type: "conversation" | "channel";
}
const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: ChatMessagesProps) => {
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <ChatWelcome type={type} name={name} />
        </div>
    );
};

export default ChatMessages;
