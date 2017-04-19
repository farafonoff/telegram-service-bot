import * as Bluebird from "bluebird";
import { EventEmitter } from "events";
import * as api from "./interfaces/api/api";
import { Contact } from "./interfaces/api/contact";
import { Context as ApiContext } from "./interfaces/api/context";
import { Conversation } from "./interfaces/api/conversation";
import * as apiEvents from "./interfaces/api/events";
import { HttpIo } from "./interfaces/io";
import { MessagesPoller } from "./polling/messages-poller";
export declare class Api extends EventEmitter implements ApiEvents {
    io: HttpIo;
    context: ApiContext;
    messagesPoller: MessagesPoller;
    constructor(context: ApiContext, io: HttpIo);
    acceptContactRequest(contactUsername: string): Bluebird<this>;
    declineContactRequest(contactUsername: string): Bluebird<this>;
    getContact(contactId: string): Bluebird<Contact>;
    getContacts(): Bluebird<Contact[]>;
    getConversation(conversationId: string): Bluebird<Conversation>;
    getConversations(): Bluebird<Conversation[]>;
    sendMessage(message: api.NewMessage, conversationId: string): Bluebird<api.SendMessageResult>;
    setStatus(status: api.Status): Bluebird<any>;
    /**
     * Start polling and emitting events
     */
    listen(): Bluebird<this>;
    /**
     * Stop polling and emitting events
     */
    stopListening(): Bluebird<this>;
    protected handlePollingEvent(ev: apiEvents.EventMessage): void;
}
export interface ApiEvents extends NodeJS.EventEmitter {
}
export default Api;
