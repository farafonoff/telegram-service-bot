import * as api from "./api";
export { connect } from "./connect";
import * as apiInterface from "./interfaces/api/api";
import * as contact from "./interfaces/api/contact";
import * as conversation from "./interfaces/api/conversation";
export declare type Api = api.Api;
export declare namespace Api {
    type NewMessage = apiInterface.NewMessage;
    type SendMessageResult = apiInterface.SendMessageResult;
}
export declare type Contact = contact.Contact;
export declare namespace Contact {
    type Phone = contact.Phone;
    type Location = contact.Location;
}
export declare type Conversation = conversation.Conversation;
export declare namespace Conversation {
    type ThreadProperties = conversation.ThreadProperties;
}
