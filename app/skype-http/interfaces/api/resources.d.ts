import { ParsedConversationId } from "./api";
export interface Resource {
    type: "Text" | "RichText" | "Control/ClearTyping" | "Control/Typing";
    id: string;
    composeTime: Date;
    arrivalTime: Date;
    from: ParsedConversationId;
    conversation: string;
    native?: any;
}
export interface TextResource extends Resource {
    type: "Text";
    clientId: string;
    content: string;
}
export interface RichTextResource extends Resource {
    type: "RichText";
    clientId: string;
    content: string;
}
export interface ControlClearTypingResource extends Resource {
    type: "Control/ClearTyping";
}
export interface ControlTypingResource extends Resource {
    type: "Control/Typing";
}
