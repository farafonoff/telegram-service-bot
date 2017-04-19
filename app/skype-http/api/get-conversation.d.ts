import * as Bluebird from "bluebird";
import { Context } from "../interfaces/api/context";
import { Conversation } from "../interfaces/api/conversation";
import * as io from "../interfaces/io";
export declare function getConversation(io: io.HttpIo, apiContext: Context, conversationId: string): Bluebird<Conversation>;
export default getConversation;
