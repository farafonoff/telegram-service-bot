export interface Resource {
    type: "Message" | "UserPresenceDoc" | "EndpointPresenceDoc" | string;
    id: string;
}
export interface MessageResource extends Resource {
    type: "Message";
    messagetype: "Control/LiveState" | "Control/ClearTyping" | "Control/Typing" | "Event/Call" | "RichText" | "RichText/UriObject" | "Text" | string;
    ackrequired: string;
    originalarrivaltime: string;
    /**
     * Instant Messaging Display Name ?
     *
     * display name of the author
     */
    imdisplayname: string;
    conversationLink: string;
    composetime: string;
    isactive: boolean;
    from: string;
    version: string;
    threadtopic?: string;
}
export interface UserPresenceResource extends Resource {
    type: "UserPresenceDoc" | string;
    selfLink: string;
    availability: "Offline" | "Online" | string;
    status: "Offline" | "Online" | "Idle" | string;
    capabilities: string;
    lastSeenAt?: string;
    endpointPresenceDocLinks: string[];
}
export interface EndpointPresenceResource extends Resource {
    type: "EndpointPresenceDoc" | string;
    selfLink: string;
    publicInfo: {
        capabilities: string;
        typ: string;
        skypeNameVersion: string;
        nodeInfo: string;
        version: string;
    };
    privateInfo: {
        /**
         * Endpoint name
         *
         * Usually the name of the computer (host for Linux ?)
         */
        epname: string;
    };
}
