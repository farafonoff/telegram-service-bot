"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var incident_1 = require("incident");
var path_1 = require("path");
var url_1 = require("url");
exports.DEFAULT_USER = "ME";
exports.DEFAULT_ENDPOINT = "SELF";
var CONVERSATION_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)$/;
var CONTACT_PATTERN = /^\/v1\/users\/([^/]+)\/contacts\/([^/]+)$/;
var MESSAGES_PATTERN = /^\/v1\/users\/([^/]+)\/conversations\/([^/]+)\/messages$/;
function joinPath(parts) {
    return path_1.posix.join.apply(null, parts);
}
// The following functions build an array of parts to build the path
// /v1
function buildV1() {
    return ["v1"];
}
// /v1/threads
function buildThreads() {
    return buildV1().concat("threads");
}
// /v1/threads/{thread}
function buildThread(thread) {
    return buildThreads().concat(thread);
}
// /v1/users
function buildUsers() {
    return buildV1().concat("users");
}
// /v1/users/{user}
function buildUser(user) {
    return buildUsers().concat(user);
}
// /v1/users/{user}/endpoints
function buildEndpoints(user) {
    return buildUser(user).concat("endpoints");
}
// /v1/users/{user}/endpoints/{endpoint}
function buildEndpoint(user, endpoint) {
    return buildEndpoints(user).concat(endpoint);
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions
function buildSubscriptions(user, endpoint) {
    return buildEndpoint(user, endpoint).concat("subscriptions");
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}
function buildSubscription(user, endpoint, subscription) {
    return buildSubscriptions(user, endpoint).concat(String(subscription));
}
// /v1/users/{user}/endpoints/{endpoint}/subscriptions/{subscription}/poll
function buildPoll(user, endpoint, subscription) {
    return buildSubscription(user, endpoint, subscription).concat("poll");
}
// /v1/users/{user}/endpoints/{endpoint}/presenceDocs
function buildEndpointPresenceDocs(user, endpoint) {
    return buildEndpoint(user, endpoint).concat("presenceDocs");
}
// /v1/users/{user}/endpoints/{endpoint}/presenceDocs/endpointMessagingService
function buildEndpointMessagingService(user, endpoint) {
    return buildEndpointPresenceDocs(user, endpoint).concat("endpointMessagingService");
}
// /v1/users/{user}/conversations
function buildConversations(user) {
    return buildUser(user).concat("conversations");
}
// /v1/users/{user}/conversations/{conversation}
function buildConversation(user, conversation) {
    return buildConversations(user).concat(conversation);
}
// /v1/users/{user}/conversations/{conversation}/messages
function buildMessages(user, conversation) {
    return buildConversation(user, conversation).concat("messages");
}
// /v1/users/{user}/presenceDocs
function buildUserPresenceDocs(user) {
    return buildUser(user).concat("presenceDocs");
}
// /v1/users/{user}/presenceDocs/endpointMessagingService
function buildUserMessagingService(user) {
    return buildUserPresenceDocs(user).concat("endpointMessagingService");
}
/**
 * Returns an URI origin like: "https://host.com"
 * If host is `null`, returns an empty string
 */
function getOrigin(host) {
    return host === null ? "" : "https://" + host;
}
function get(host, path) {
    return url_1.resolve(getOrigin(host), path);
}
function thread(host, threadId) {
    return get(host, joinPath(buildThread(threadId)));
}
exports.thread = thread;
function users(host) {
    return get(host, joinPath(buildUsers()));
}
exports.users = users;
function user(host, userId) {
    if (userId === void 0) { userId = exports.DEFAULT_USER; }
    return get(host, joinPath(buildUser(userId)));
}
exports.user = user;
// https://{host}/v1/users/{userId}/endpoints
function endpoints(host, userId) {
    if (userId === void 0) { userId = exports.DEFAULT_USER; }
    return get(host, joinPath(buildEndpoints(userId)));
}
exports.endpoints = endpoints;
function endpoint(host, userId, endpointId) {
    if (userId === void 0) { userId = exports.DEFAULT_USER; }
    if (endpointId === void 0) { endpointId = exports.DEFAULT_ENDPOINT; }
    return get(host, joinPath(buildEndpoint(userId, endpointId)));
}
exports.endpoint = endpoint;
function poll(host, userId, endpointId, subscriptionId) {
    if (userId === void 0) { userId = exports.DEFAULT_USER; }
    if (endpointId === void 0) { endpointId = exports.DEFAULT_ENDPOINT; }
    if (subscriptionId === void 0) { subscriptionId = 0; }
    return get(host, joinPath(buildPoll(userId, endpointId, subscriptionId)));
}
exports.poll = poll;
/**
 * Returns https://{host}/v1/users/{userId}/endpoints/{endpointId}/subscriptions
 * @param host
 * @param userId
 * @param endpointId
 */
function subscriptions(host, userId, endpointId) {
    if (userId === void 0) { userId = exports.DEFAULT_USER; }
    if (endpointId === void 0) { endpointId = exports.DEFAULT_ENDPOINT; }
    return get(host, joinPath(buildSubscriptions(userId, endpointId)));
}
exports.subscriptions = subscriptions;
function conversations(host, user) {
    return get(host, joinPath(buildConversations(user)));
}
exports.conversations = conversations;
function conversation(host, user, conversationId) {
    return get(host, joinPath(buildConversation(user, conversationId)));
}
exports.conversation = conversation;
/**
 * Returns https://{host}/v1/users/{user}/conversations/{conversationId}/messages
 * @param host
 * @param user
 * @param conversationId
 */
function messages(host, user, conversationId) {
    return get(host, joinPath(buildMessages(user, conversationId)));
}
exports.messages = messages;
function userMessagingService(host, user) {
    if (user === void 0) { user = exports.DEFAULT_USER; }
    return get(host, joinPath(buildUserMessagingService(user)));
}
exports.userMessagingService = userMessagingService;
function endpointMessagingService(host, user, endpoint) {
    if (user === void 0) { user = exports.DEFAULT_USER; }
    if (endpoint === void 0) { endpoint = exports.DEFAULT_ENDPOINT; }
    return get(host, joinPath(buildEndpointMessagingService(user, endpoint)));
}
exports.endpointMessagingService = endpointMessagingService;
function parseContact(uri) {
    var parsed = url_1.parse(uri);
    if (parsed.host === undefined || parsed.pathname === undefined) {
        throw new incident_1.Incident("parse-error", "Expected URI to have a host and path");
    }
    var match = CONTACT_PATTERN.exec(parsed.pathname);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Expected URI to be a conversation uri");
    }
    return {
        host: parsed.host,
        user: match[1],
        contact: match[2]
    };
}
exports.parseContact = parseContact;
function parseConversation(uri) {
    var parsed = url_1.parse(uri);
    if (parsed.host === undefined || parsed.pathname === undefined) {
        throw new incident_1.Incident("parse-error", "Expected URI to have a host and path");
    }
    var match = CONVERSATION_PATTERN.exec(parsed.pathname);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Expected URI to be a conversation uri");
    }
    return {
        host: parsed.host,
        user: match[1],
        conversation: match[2]
    };
}
exports.parseConversation = parseConversation;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sSUFBSSxtQkFBUSxDQUFDLGFBQWEsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDRCxNQUFNLENBQUM7UUFDTCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7UUFDakIsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDZCxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUN2QixDQUFDO0FBQ0osQ0FBQztBQWRELDhDQWNDIiwiZmlsZSI6ImxpYi9tZXNzYWdlcy11cmkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luY2lkZW50fSBmcm9tIFwiaW5jaWRlbnRcIjtcclxuaW1wb3J0IHtwb3NpeH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtwYXJzZSBhcyBwYXJzZVVyaSwgcmVzb2x2ZSBhcyByZXNvbHZlVXJpLCBVcmx9IGZyb20gXCJ1cmxcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1VTRVI6IHN0cmluZyA9IFwiTUVcIjtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRU5EUE9JTlQ6IHN0cmluZyA9IFwiU0VMRlwiO1xyXG5cclxuY29uc3QgQ09OVkVSU0FUSU9OX1BBVFRFUk46IFJlZ0V4cCA9IC9eXFwvdjFcXC91c2Vyc1xcLyhbXi9dKylcXC9jb252ZXJzYXRpb25zXFwvKFteL10rKSQvO1xyXG5jb25zdCBDT05UQUNUX1BBVFRFUk46IFJlZ0V4cCA9IC9eXFwvdjFcXC91c2Vyc1xcLyhbXi9dKylcXC9jb250YWN0c1xcLyhbXi9dKykkLztcclxuY29uc3QgTUVTU0FHRVNfUEFUVEVSTjogUmVnRXhwID0gL15cXC92MVxcL3VzZXJzXFwvKFteL10rKVxcL2NvbnZlcnNhdGlvbnNcXC8oW14vXSspXFwvbWVzc2FnZXMkLztcclxuXHJcbmZ1bmN0aW9uIGpvaW5QYXRoKHBhcnRzOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHBvc2l4LmpvaW4uYXBwbHkobnVsbCwgcGFydHMpO1xyXG59XHJcblxyXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBidWlsZCBhbiBhcnJheSBvZiBwYXJ0cyB0byBidWlsZCB0aGUgcGF0aFxyXG5cclxuLy8gL3YxXHJcbmZ1bmN0aW9uIGJ1aWxkVjEoKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBbXCJ2MVwiXTtcclxufVxyXG5cclxuLy8gL3YxL3RocmVhZHNcclxuZnVuY3Rpb24gYnVpbGRUaHJlYWRzKCk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRWMSgpLmNvbmNhdChcInRocmVhZHNcIik7XHJcbn1cclxuXHJcbi8vIC92MS90aHJlYWRzL3t0aHJlYWR9XHJcbmZ1bmN0aW9uIGJ1aWxkVGhyZWFkKHRocmVhZDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFRocmVhZHMoKS5jb25jYXQodGhyZWFkKTtcclxufVxyXG5cclxuLy8gL3YxL3VzZXJzXHJcbmZ1bmN0aW9uIGJ1aWxkVXNlcnMoKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFYxKCkuY29uY2F0KFwidXNlcnNcIik7XHJcbn1cclxuXHJcbi8vIC92MS91c2Vycy97dXNlcn1cclxuZnVuY3Rpb24gYnVpbGRVc2VyKHVzZXI6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRVc2VycygpLmNvbmNhdCh1c2VyKTtcclxufVxyXG5cclxuLy8gL3YxL3VzZXJzL3t1c2VyfS9lbmRwb2ludHNcclxuZnVuY3Rpb24gYnVpbGRFbmRwb2ludHModXNlcjogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXIodXNlcikuY29uY2F0KFwiZW5kcG9pbnRzXCIpO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L2VuZHBvaW50cy97ZW5kcG9pbnR9XHJcbmZ1bmN0aW9uIGJ1aWxkRW5kcG9pbnQodXNlcjogc3RyaW5nLCBlbmRwb2ludDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZEVuZHBvaW50cyh1c2VyKS5jb25jYXQoZW5kcG9pbnQpO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L2VuZHBvaW50cy97ZW5kcG9pbnR9L3N1YnNjcmlwdGlvbnNcclxuZnVuY3Rpb24gYnVpbGRTdWJzY3JpcHRpb25zKHVzZXI6IHN0cmluZywgZW5kcG9pbnQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRFbmRwb2ludCh1c2VyLCBlbmRwb2ludCkuY29uY2F0KFwic3Vic2NyaXB0aW9uc1wiKTtcclxufVxyXG5cclxuLy8gL3YxL3VzZXJzL3t1c2VyfS9lbmRwb2ludHMve2VuZHBvaW50fS9zdWJzY3JpcHRpb25zL3tzdWJzY3JpcHRpb259XHJcbmZ1bmN0aW9uIGJ1aWxkU3Vic2NyaXB0aW9uKHVzZXI6IHN0cmluZywgZW5kcG9pbnQ6IHN0cmluZywgc3Vic2NyaXB0aW9uOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkU3Vic2NyaXB0aW9ucyh1c2VyLCBlbmRwb2ludCkuY29uY2F0KFN0cmluZyhzdWJzY3JpcHRpb24pKTtcclxufVxyXG5cclxuLy8gL3YxL3VzZXJzL3t1c2VyfS9lbmRwb2ludHMve2VuZHBvaW50fS9zdWJzY3JpcHRpb25zL3tzdWJzY3JpcHRpb259L3BvbGxcclxuZnVuY3Rpb24gYnVpbGRQb2xsKHVzZXI6IHN0cmluZywgZW5kcG9pbnQ6IHN0cmluZywgc3Vic2NyaXB0aW9uOiBudW1iZXIpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkU3Vic2NyaXB0aW9uKHVzZXIsIGVuZHBvaW50LCBzdWJzY3JpcHRpb24pLmNvbmNhdChcInBvbGxcIik7XHJcbn1cclxuXHJcbi8vIC92MS91c2Vycy97dXNlcn0vZW5kcG9pbnRzL3tlbmRwb2ludH0vcHJlc2VuY2VEb2NzXHJcbmZ1bmN0aW9uIGJ1aWxkRW5kcG9pbnRQcmVzZW5jZURvY3ModXNlcjogc3RyaW5nLCBlbmRwb2ludDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZEVuZHBvaW50KHVzZXIsIGVuZHBvaW50KS5jb25jYXQoXCJwcmVzZW5jZURvY3NcIik7XHJcbn1cclxuXHJcbi8vIC92MS91c2Vycy97dXNlcn0vZW5kcG9pbnRzL3tlbmRwb2ludH0vcHJlc2VuY2VEb2NzL2VuZHBvaW50TWVzc2FnaW5nU2VydmljZVxyXG5mdW5jdGlvbiBidWlsZEVuZHBvaW50TWVzc2FnaW5nU2VydmljZSh1c2VyOiBzdHJpbmcsIGVuZHBvaW50OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkRW5kcG9pbnRQcmVzZW5jZURvY3ModXNlciwgZW5kcG9pbnQpLmNvbmNhdChcImVuZHBvaW50TWVzc2FnaW5nU2VydmljZVwiKTtcclxufVxyXG5cclxuLy8gL3YxL3VzZXJzL3t1c2VyfS9jb252ZXJzYXRpb25zXHJcbmZ1bmN0aW9uIGJ1aWxkQ29udmVyc2F0aW9ucyh1c2VyOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkVXNlcih1c2VyKS5jb25jYXQoXCJjb252ZXJzYXRpb25zXCIpO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L2NvbnZlcnNhdGlvbnMve2NvbnZlcnNhdGlvbn1cclxuZnVuY3Rpb24gYnVpbGRDb252ZXJzYXRpb24odXNlcjogc3RyaW5nLCBjb252ZXJzYXRpb246IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRDb252ZXJzYXRpb25zKHVzZXIpLmNvbmNhdChjb252ZXJzYXRpb24pO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L2NvbnZlcnNhdGlvbnMve2NvbnZlcnNhdGlvbn0vbWVzc2FnZXNcclxuZnVuY3Rpb24gYnVpbGRNZXNzYWdlcyh1c2VyOiBzdHJpbmcsIGNvbnZlcnNhdGlvbjogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZENvbnZlcnNhdGlvbih1c2VyLCBjb252ZXJzYXRpb24pLmNvbmNhdChcIm1lc3NhZ2VzXCIpO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L3ByZXNlbmNlRG9jc1xyXG5mdW5jdGlvbiBidWlsZFVzZXJQcmVzZW5jZURvY3ModXNlcjogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXIodXNlcikuY29uY2F0KFwicHJlc2VuY2VEb2NzXCIpO1xyXG59XHJcblxyXG4vLyAvdjEvdXNlcnMve3VzZXJ9L3ByZXNlbmNlRG9jcy9lbmRwb2ludE1lc3NhZ2luZ1NlcnZpY2VcclxuZnVuY3Rpb24gYnVpbGRVc2VyTWVzc2FnaW5nU2VydmljZSh1c2VyOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkVXNlclByZXNlbmNlRG9jcyh1c2VyKS5jb25jYXQoXCJlbmRwb2ludE1lc3NhZ2luZ1NlcnZpY2VcIik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIFVSSSBvcmlnaW4gbGlrZTogXCJodHRwczovL2hvc3QuY29tXCJcclxuICogSWYgaG9zdCBpcyBgbnVsbGAsIHJldHVybnMgYW4gZW1wdHkgc3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRPcmlnaW4oaG9zdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gaG9zdCA9PT0gbnVsbCA/IFwiXCIgOiBcImh0dHBzOi8vXCIgKyBob3N0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQoaG9zdDogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcclxuICByZXR1cm4gcmVzb2x2ZVVyaShnZXRPcmlnaW4oaG9zdCksIHBhdGgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdGhyZWFkKGhvc3Q6IHN0cmluZywgdGhyZWFkSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChob3N0LCBqb2luUGF0aChidWlsZFRocmVhZCh0aHJlYWRJZCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJzKGhvc3Q6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChob3N0LCBqb2luUGF0aChidWlsZFVzZXJzKCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXIoaG9zdDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZyA9IERFRkFVTFRfVVNFUik6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChob3N0LCBqb2luUGF0aChidWlsZFVzZXIodXNlcklkKSkpO1xyXG59XHJcblxyXG4vLyBodHRwczovL3tob3N0fS92MS91c2Vycy97dXNlcklkfS9lbmRwb2ludHNcclxuZXhwb3J0IGZ1bmN0aW9uIGVuZHBvaW50cyhob3N0OiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nID0gREVGQVVMVF9VU0VSKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGhvc3QsIGpvaW5QYXRoKGJ1aWxkRW5kcG9pbnRzKHVzZXJJZCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuZHBvaW50KGhvc3Q6IHN0cmluZywgdXNlcklkOiBzdHJpbmcgPSBERUZBVUxUX1VTRVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludElkOiBzdHJpbmcgPSBERUZBVUxUX0VORFBPSU5UKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGhvc3QsIGpvaW5QYXRoKGJ1aWxkRW5kcG9pbnQodXNlcklkLCBlbmRwb2ludElkKSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcG9sbChob3N0OiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nID0gREVGQVVMVF9VU0VSLFxyXG4gICAgICAgICAgICAgICAgICAgICBlbmRwb2ludElkOiBzdHJpbmcgPSBERUZBVUxUX0VORFBPSU5ULCBzdWJzY3JpcHRpb25JZDogbnVtYmVyID0gMCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChob3N0LCBqb2luUGF0aChidWlsZFBvbGwodXNlcklkLCBlbmRwb2ludElkLCBzdWJzY3JpcHRpb25JZCkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgaHR0cHM6Ly97aG9zdH0vdjEvdXNlcnMve3VzZXJJZH0vZW5kcG9pbnRzL3tlbmRwb2ludElkfS9zdWJzY3JpcHRpb25zXHJcbiAqIEBwYXJhbSBob3N0XHJcbiAqIEBwYXJhbSB1c2VySWRcclxuICogQHBhcmFtIGVuZHBvaW50SWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpcHRpb25zKGhvc3Q6IHN0cmluZywgdXNlcklkOiBzdHJpbmcgPSBERUZBVUxUX1VTRVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZHBvaW50SWQ6IHN0cmluZyA9IERFRkFVTFRfRU5EUE9JTlQpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoaG9zdCwgam9pblBhdGgoYnVpbGRTdWJzY3JpcHRpb25zKHVzZXJJZCwgZW5kcG9pbnRJZCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnNhdGlvbnMoaG9zdDogc3RyaW5nLCB1c2VyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoaG9zdCwgam9pblBhdGgoYnVpbGRDb252ZXJzYXRpb25zKHVzZXIpKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJzYXRpb24oaG9zdDogc3RyaW5nLCB1c2VyOiBzdHJpbmcsIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoaG9zdCwgam9pblBhdGgoYnVpbGRDb252ZXJzYXRpb24odXNlciwgY29udmVyc2F0aW9uSWQpKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGh0dHBzOi8ve2hvc3R9L3YxL3VzZXJzL3t1c2VyfS9jb252ZXJzYXRpb25zL3tjb252ZXJzYXRpb25JZH0vbWVzc2FnZXNcclxuICogQHBhcmFtIGhvc3RcclxuICogQHBhcmFtIHVzZXJcclxuICogQHBhcmFtIGNvbnZlcnNhdGlvbklkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVzc2FnZXMoaG9zdDogc3RyaW5nLCB1c2VyOiBzdHJpbmcsIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoaG9zdCwgam9pblBhdGgoYnVpbGRNZXNzYWdlcyh1c2VyLCBjb252ZXJzYXRpb25JZCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJNZXNzYWdpbmdTZXJ2aWNlKGhvc3Q6IHN0cmluZywgdXNlcjogc3RyaW5nID0gREVGQVVMVF9VU0VSKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGhvc3QsIGpvaW5QYXRoKGJ1aWxkVXNlck1lc3NhZ2luZ1NlcnZpY2UodXNlcikpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGVuZHBvaW50TWVzc2FnaW5nU2VydmljZShob3N0OiBzdHJpbmcsIHVzZXI6IHN0cmluZyA9IERFRkFVTFRfVVNFUixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludDogc3RyaW5nID0gREVGQVVMVF9FTkRQT0lOVCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChob3N0LCBqb2luUGF0aChidWlsZEVuZHBvaW50TWVzc2FnaW5nU2VydmljZSh1c2VyLCBlbmRwb2ludCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb250YWN0VXJpIHtcclxuICBob3N0OiBzdHJpbmc7XHJcbiAgdXNlcjogc3RyaW5nO1xyXG4gIGNvbnRhY3Q6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ29udGFjdCh1cmk6IHN0cmluZyk6IENvbnRhY3RVcmkge1xyXG4gIGNvbnN0IHBhcnNlZDogVXJsID0gcGFyc2VVcmkodXJpKTtcclxuICBpZiAocGFyc2VkLmhvc3QgPT09IHVuZGVmaW5lZCB8fCBwYXJzZWQucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEluY2lkZW50KFwicGFyc2UtZXJyb3JcIiwgXCJFeHBlY3RlZCBVUkkgdG8gaGF2ZSBhIGhvc3QgYW5kIHBhdGhcIik7XHJcbiAgfVxyXG4gIGNvbnN0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsID0gQ09OVEFDVF9QQVRURVJOLmV4ZWMocGFyc2VkLnBhdGhuYW1lKTtcclxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBJbmNpZGVudChcInBhcnNlLWVycm9yXCIsIFwiRXhwZWN0ZWQgVVJJIHRvIGJlIGEgY29udmVyc2F0aW9uIHVyaVwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIGhvc3Q6IHBhcnNlZC5ob3N0LFxyXG4gICAgdXNlcjogbWF0Y2hbMV0sXHJcbiAgICBjb250YWN0OiBtYXRjaFsyXVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udmVyc2F0aW9uVXJpIHtcclxuICBob3N0OiBzdHJpbmc7XHJcbiAgdXNlcjogc3RyaW5nO1xyXG4gIGNvbnZlcnNhdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb252ZXJzYXRpb24odXJpOiBzdHJpbmcpOiBDb252ZXJzYXRpb25Vcmkge1xyXG4gIGNvbnN0IHBhcnNlZDogVXJsID0gcGFyc2VVcmkodXJpKTtcclxuICBpZiAocGFyc2VkLmhvc3QgPT09IHVuZGVmaW5lZCB8fCBwYXJzZWQucGF0aG5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEluY2lkZW50KFwicGFyc2UtZXJyb3JcIiwgXCJFeHBlY3RlZCBVUkkgdG8gaGF2ZSBhIGhvc3QgYW5kIHBhdGhcIik7XHJcbiAgfVxyXG4gIGNvbnN0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXkgfCBudWxsID0gQ09OVkVSU0FUSU9OX1BBVFRFUk4uZXhlYyhwYXJzZWQucGF0aG5hbWUpO1xyXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkge1xyXG4gICAgdGhyb3cgbmV3IEluY2lkZW50KFwicGFyc2UtZXJyb3JcIiwgXCJFeHBlY3RlZCBVUkkgdG8gYmUgYSBjb252ZXJzYXRpb24gdXJpXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgaG9zdDogcGFyc2VkLmhvc3QsXHJcbiAgICB1c2VyOiBtYXRjaFsxXSxcclxuICAgIGNvbnZlcnNhdGlvbjogbWF0Y2hbMl1cclxuICB9O1xyXG59XHJcbiJdfQ==
