export declare type Status = "Hidden" | "Online" | "Away" | "Busy";
export interface Credentials {
    username: string;
    password: string;
}
export interface ParsedConversationId {
    raw: string;
    prefix: number;
    username: string;
}
export interface SendMessageResult {
    clientMessageId: string;
    arrivalTime: number;
    textContent: string;
}
export interface NewMessage {
    textContent: string;
}
export interface ParsedId {
    id: string;
    typeKey: string;
}
export interface FullId extends ParsedId {
    typeName: string;
    raw: string;
}
