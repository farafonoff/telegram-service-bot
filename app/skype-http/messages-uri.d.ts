export declare const DEFAULT_USER: string;
export declare const DEFAULT_ENDPOINT: string;
export declare function thread(host: string, threadId: string): string;
export declare function users(host: string): string;
export declare function user(host: string, userId?: string): string;
export declare function endpoints(host: string, userId?: string): string;
export declare function endpoint(host: string, userId?: string, endpointId?: string): string;
export declare function poll(host: string, userId?: string, endpointId?: string, subscriptionId?: number): string;
/**
 * Returns https://{host}/v1/users/{userId}/endpoints/{endpointId}/subscriptions
 * @param host
 * @param userId
 * @param endpointId
 */
export declare function subscriptions(host: string, userId?: string, endpointId?: string): string;
export declare function conversations(host: string, user: string): string;
export declare function conversation(host: string, user: string, conversationId: string): string;
/**
 * Returns https://{host}/v1/users/{user}/conversations/{conversationId}/messages
 * @param host
 * @param user
 * @param conversationId
 */
export declare function messages(host: string, user: string, conversationId: string): string;
export declare function userMessagingService(host: string, user?: string): string;
export declare function endpointMessagingService(host: string, user?: string, endpoint?: string): string;
export interface ContactUri {
    host: string;
    user: string;
    contact: string;
}
export declare function parseContact(uri: string): ContactUri;
export interface ConversationUri {
    host: string;
    user: string;
    conversation: string;
}
export declare function parseConversation(uri: string): ConversationUri;
