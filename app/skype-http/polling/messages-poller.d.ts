import { EventEmitter } from "events";
import { ParsedConversationId } from "../interfaces/api/api";
import { Context as ApiContext } from "../interfaces/api/context";
import * as resources from "../interfaces/api/resources";
import * as httpIo from "../interfaces/io";
import * as nativeMessageResources from "../interfaces/native-api/message-resources";
export declare function parseContactId(contactId: string): ParsedConversationId;
export declare function formatRichTextResource(nativeResource: nativeMessageResources.RichText): resources.RichTextResource;
export declare function formatTextResource(nativeResource: nativeMessageResources.Text): resources.TextResource;
export declare function formatControlClearTypingResource(nativeResource: nativeMessageResources.ControlClearTyping): resources.ControlClearTypingResource;
export declare function formatControlTypingResource(nativeResource: nativeMessageResources.ControlTyping): resources.ControlTypingResource;
export declare class MessagesPoller extends EventEmitter {
    io: httpIo.HttpIo;
    apiContext: ApiContext;
    intervalId: number | NodeJS.Timer | null;
    constructor(io: httpIo.HttpIo, apiContext: ApiContext);
    isActive(): boolean;
    run(): this;
    stop(): this;
    protected getMessages(): Promise<void>;
}
export default MessagesPoller;
