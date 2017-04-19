import * as Bluebird from "bluebird";
import * as api from "../interfaces/api/api";
import { Context } from "../interfaces/api/context";
import * as io from "../interfaces/io";
export declare function sendMessage(io: io.HttpIo, apiContext: Context, message: api.NewMessage, conversationId: string): Bluebird<api.SendMessageResult>;
export default sendMessage;
