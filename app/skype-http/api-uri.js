"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var url_1 = require("url");
var consts_1 = require("./consts");
exports.DEFAULT_USER = "self";
function joinPath(parts) {
    return path_1.posix.join.apply(null, parts);
}
// The following functions build an array of parts to build the path
// /contacts/v1
function buildV1() {
    return ["contacts/v1"];
}
// /users
function buildUsers() {
    return ["users"];
}
// /users/:user
function buildUser(username) {
    return buildUsers().concat(username);
}
// /users/:user/contacts
function buildContacts(username) {
    return buildUser(username).concat("contacts");
}
// /users/:user/contacts/auth-request/:contact
function buildAuthRequest(username, contact) {
    return buildContacts(username).concat("auth-request", contact);
}
// /users/:user/contacts/auth-request/:contact/accept
function buildAuthRequestAccept(username, contact) {
    return buildAuthRequest(username, contact).concat("accept");
}
// /users/:user/contacts/auth-request/:contact/decline
function buildAuthRequestDecline(username, contact) {
    return buildAuthRequest(username, contact).concat("decline");
}
// /users/:user/displayname
function buildDisplayName(username) {
    return buildUser(username).concat("displayname");
}
// /users/:user/profile
function buildProfile(username) {
    return buildUser(username).concat("profile");
}
// agentProvisioningService: { host: "https://api.aps.skype.com/v1/" },
// stratusService: {
//   avatarUrl: "users/${contactId}/profile/avatar?cacheHeaders=1",
//     avatarUpdateUrl: "users/${contactId}/profile/avatar",
//     blockContactEndpoint: "users/self/contacts/${contactId}/block",
//     contactRequestEndpoint: "users/self/contacts/auth-request",
//     contactRequestTimeInterval: 60000,
//     contactsEndpoint: "users/self/authorized-contacts",
//     directorySearchEndpointSkypeOnly: "search/users/any?keyWord=${keyword}&contactTypes[]=skype",
//     directorySearchEndpoint: "search/users/any?keyWord=${keyword}",
//     directorySearchByIdEndpoint: "search/users?skypename=${skypeName}",
//     firstContactRequestDelay: 10000,
//     host: "https://api.skype.com/",
//     myContactsEndpoint: "users/self/contacts?hideDetails=true",
//     profileEndpoint: "users/self/profile",
//     profilesEndpoint: "users/self/contacts/profiles",
//     batchProfilesEndpoint: "users/batch/profiles",
//     userInfoEndpoint: "users/self",
//     unblockContactEndpoint: "users/self/contacts/${contactId}/unblock",
//     deleteContactEndpoint: "users/self/contacts/${contactId}",
//     retry: n
// },
// /users/:user/profile/avatar?cacheHeaders=1
function buildAvatar(username) {
    return buildProfile(username).concat("avatar?cacheHeaders=1");
}
// /users/:user/profile/avatar
function buildUpdatedAvatar(username) {
    return buildProfile(username).concat("avatar");
}
function getOrigin() {
    return "https://" + consts_1.SKYPEWEB_API_SKYPE_HOST;
}
function get(path) {
    return url_1.resolve(getOrigin(), path);
}
function displayName(username) {
    return get(joinPath(buildDisplayName(username)));
}
exports.displayName = displayName;
function userProfile(username) {
    return get(joinPath(buildProfile(username)));
}
exports.userProfile = userProfile;
function authRequestAccept(username, contact) {
    return get(joinPath(buildAuthRequestAccept(username, contact)));
}
exports.authRequestAccept = authRequestAccept;
function authRequestDecline(username, contact) {
    return get(joinPath(buildAuthRequestDecline(username, contact)));
}
exports.authRequestDecline = authRequestDecline;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGktdXJpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTJCO0FBQzNCLDJCQUEwQztBQUMxQyxtQ0FBaUQ7QUFFcEMsUUFBQSxZQUFZLEdBQVcsTUFBTSxDQUFDO0FBRTNDLGtCQUFrQixLQUFlO0lBQy9CLE1BQU0sQ0FBQyxZQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELG9FQUFvRTtBQUVwRSxlQUFlO0FBQ2Y7SUFDRSxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQsU0FBUztBQUNUO0lBQ0UsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELGVBQWU7QUFDZixtQkFBb0IsUUFBZ0I7SUFDbEMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsd0JBQXdCO0FBQ3hCLHVCQUF3QixRQUFnQjtJQUN0QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsOENBQThDO0FBQzlDLDBCQUEyQixRQUFnQixFQUFFLE9BQWU7SUFDMUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxxREFBcUQ7QUFDckQsZ0NBQWlDLFFBQWdCLEVBQUUsT0FBZTtJQUNoRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsc0RBQXNEO0FBQ3RELGlDQUFrQyxRQUFnQixFQUFFLE9BQWU7SUFDakUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELDJCQUEyQjtBQUMzQiwwQkFBMkIsUUFBZ0I7SUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELHVCQUF1QjtBQUN2QixzQkFBdUIsUUFBZ0I7SUFDckMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUVELHVFQUF1RTtBQUN2RSxvQkFBb0I7QUFDcEIsbUVBQW1FO0FBQ25FLDREQUE0RDtBQUM1RCxzRUFBc0U7QUFDdEUsa0VBQWtFO0FBQ2xFLHlDQUF5QztBQUN6QywwREFBMEQ7QUFDMUQsb0dBQW9HO0FBQ3BHLHNFQUFzRTtBQUN0RSwwRUFBMEU7QUFDMUUsdUNBQXVDO0FBQ3ZDLHNDQUFzQztBQUN0QyxrRUFBa0U7QUFDbEUsNkNBQTZDO0FBQzdDLHdEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQsc0NBQXNDO0FBQ3RDLDBFQUEwRTtBQUMxRSxpRUFBaUU7QUFDakUsZUFBZTtBQUNmLEtBQUs7QUFFTCw2Q0FBNkM7QUFDN0MscUJBQXFCLFFBQWdCO0lBQ25DLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVELDhCQUE4QjtBQUM5Qiw0QkFBNEIsUUFBZ0I7SUFDMUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVEO0lBQ0UsTUFBTSxDQUFDLFVBQVUsR0FBRyxnQ0FBdUIsQ0FBQztBQUM5QyxDQUFDO0FBRUQsYUFBYSxJQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxhQUFVLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELHFCQUE2QixRQUFnQjtJQUMzQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUZELGtDQUVDO0FBRUQscUJBQTZCLFFBQWdCO0lBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0MsQ0FBQztBQUZELGtDQUVDO0FBRUQsMkJBQW1DLFFBQWdCLEVBQUUsT0FBZTtJQUNsRSxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFGRCw4Q0FFQztBQUVELDRCQUFvQyxRQUFnQixFQUFFLE9BQWU7SUFDbkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRkQsZ0RBRUMiLCJmaWxlIjoibGliL2FwaS11cmkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Bvc2l4fSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge3Jlc29sdmUgYXMgcmVzb2x2ZVVyaX0gZnJvbSBcInVybFwiO1xyXG5pbXBvcnQge1NLWVBFV0VCX0FQSV9TS1lQRV9IT1NUfSBmcm9tIFwiLi9jb25zdHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1VTRVI6IHN0cmluZyA9IFwic2VsZlwiO1xyXG5cclxuZnVuY3Rpb24gam9pblBhdGgocGFydHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuICByZXR1cm4gcG9zaXguam9pbi5hcHBseShudWxsLCBwYXJ0cyk7XHJcbn1cclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGJ1aWxkIGFuIGFycmF5IG9mIHBhcnRzIHRvIGJ1aWxkIHRoZSBwYXRoXHJcblxyXG4vLyAvY29udGFjdHMvdjFcclxuZnVuY3Rpb24gYnVpbGRWMSgpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIFtcImNvbnRhY3RzL3YxXCJdO1xyXG59XHJcblxyXG4vLyAvdXNlcnNcclxuZnVuY3Rpb24gYnVpbGRVc2VycyAoKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBbXCJ1c2Vyc1wiXTtcclxufVxyXG5cclxuLy8gL3VzZXJzLzp1c2VyXHJcbmZ1bmN0aW9uIGJ1aWxkVXNlciAodXNlcm5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRVc2VycygpLmNvbmNhdCh1c2VybmFtZSk7XHJcbn1cclxuXHJcbi8vIC91c2Vycy86dXNlci9jb250YWN0c1xyXG5mdW5jdGlvbiBidWlsZENvbnRhY3RzICh1c2VybmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXIodXNlcm5hbWUpLmNvbmNhdChcImNvbnRhY3RzXCIpO1xyXG59XHJcblxyXG4vLyAvdXNlcnMvOnVzZXIvY29udGFjdHMvYXV0aC1yZXF1ZXN0Lzpjb250YWN0XHJcbmZ1bmN0aW9uIGJ1aWxkQXV0aFJlcXVlc3QgKHVzZXJuYW1lOiBzdHJpbmcsIGNvbnRhY3Q6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRDb250YWN0cyh1c2VybmFtZSkuY29uY2F0KFwiYXV0aC1yZXF1ZXN0XCIsIGNvbnRhY3QpO1xyXG59XHJcblxyXG4vLyAvdXNlcnMvOnVzZXIvY29udGFjdHMvYXV0aC1yZXF1ZXN0Lzpjb250YWN0L2FjY2VwdFxyXG5mdW5jdGlvbiBidWlsZEF1dGhSZXF1ZXN0QWNjZXB0ICh1c2VybmFtZTogc3RyaW5nLCBjb250YWN0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkQXV0aFJlcXVlc3QodXNlcm5hbWUsIGNvbnRhY3QpLmNvbmNhdChcImFjY2VwdFwiKTtcclxufVxyXG5cclxuLy8gL3VzZXJzLzp1c2VyL2NvbnRhY3RzL2F1dGgtcmVxdWVzdC86Y29udGFjdC9kZWNsaW5lXHJcbmZ1bmN0aW9uIGJ1aWxkQXV0aFJlcXVlc3REZWNsaW5lICh1c2VybmFtZTogc3RyaW5nLCBjb250YWN0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkQXV0aFJlcXVlc3QodXNlcm5hbWUsIGNvbnRhY3QpLmNvbmNhdChcImRlY2xpbmVcIik7XHJcbn1cclxuXHJcbi8vIC91c2Vycy86dXNlci9kaXNwbGF5bmFtZVxyXG5mdW5jdGlvbiBidWlsZERpc3BsYXlOYW1lICh1c2VybmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXIodXNlcm5hbWUpLmNvbmNhdChcImRpc3BsYXluYW1lXCIpO1xyXG59XHJcblxyXG4vLyAvdXNlcnMvOnVzZXIvcHJvZmlsZVxyXG5mdW5jdGlvbiBidWlsZFByb2ZpbGUgKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkVXNlcih1c2VybmFtZSkuY29uY2F0KFwicHJvZmlsZVwiKTtcclxufVxyXG5cclxuLy8gYWdlbnRQcm92aXNpb25pbmdTZXJ2aWNlOiB7IGhvc3Q6IFwiaHR0cHM6Ly9hcGkuYXBzLnNreXBlLmNvbS92MS9cIiB9LFxyXG4vLyBzdHJhdHVzU2VydmljZToge1xyXG4vLyAgIGF2YXRhclVybDogXCJ1c2Vycy8ke2NvbnRhY3RJZH0vcHJvZmlsZS9hdmF0YXI/Y2FjaGVIZWFkZXJzPTFcIixcclxuLy8gICAgIGF2YXRhclVwZGF0ZVVybDogXCJ1c2Vycy8ke2NvbnRhY3RJZH0vcHJvZmlsZS9hdmF0YXJcIixcclxuLy8gICAgIGJsb2NrQ29udGFjdEVuZHBvaW50OiBcInVzZXJzL3NlbGYvY29udGFjdHMvJHtjb250YWN0SWR9L2Jsb2NrXCIsXHJcbi8vICAgICBjb250YWN0UmVxdWVzdEVuZHBvaW50OiBcInVzZXJzL3NlbGYvY29udGFjdHMvYXV0aC1yZXF1ZXN0XCIsXHJcbi8vICAgICBjb250YWN0UmVxdWVzdFRpbWVJbnRlcnZhbDogNjAwMDAsXHJcbi8vICAgICBjb250YWN0c0VuZHBvaW50OiBcInVzZXJzL3NlbGYvYXV0aG9yaXplZC1jb250YWN0c1wiLFxyXG4vLyAgICAgZGlyZWN0b3J5U2VhcmNoRW5kcG9pbnRTa3lwZU9ubHk6IFwic2VhcmNoL3VzZXJzL2FueT9rZXlXb3JkPSR7a2V5d29yZH0mY29udGFjdFR5cGVzW109c2t5cGVcIixcclxuLy8gICAgIGRpcmVjdG9yeVNlYXJjaEVuZHBvaW50OiBcInNlYXJjaC91c2Vycy9hbnk/a2V5V29yZD0ke2tleXdvcmR9XCIsXHJcbi8vICAgICBkaXJlY3RvcnlTZWFyY2hCeUlkRW5kcG9pbnQ6IFwic2VhcmNoL3VzZXJzP3NreXBlbmFtZT0ke3NreXBlTmFtZX1cIixcclxuLy8gICAgIGZpcnN0Q29udGFjdFJlcXVlc3REZWxheTogMTAwMDAsXHJcbi8vICAgICBob3N0OiBcImh0dHBzOi8vYXBpLnNreXBlLmNvbS9cIixcclxuLy8gICAgIG15Q29udGFjdHNFbmRwb2ludDogXCJ1c2Vycy9zZWxmL2NvbnRhY3RzP2hpZGVEZXRhaWxzPXRydWVcIixcclxuLy8gICAgIHByb2ZpbGVFbmRwb2ludDogXCJ1c2Vycy9zZWxmL3Byb2ZpbGVcIixcclxuLy8gICAgIHByb2ZpbGVzRW5kcG9pbnQ6IFwidXNlcnMvc2VsZi9jb250YWN0cy9wcm9maWxlc1wiLFxyXG4vLyAgICAgYmF0Y2hQcm9maWxlc0VuZHBvaW50OiBcInVzZXJzL2JhdGNoL3Byb2ZpbGVzXCIsXHJcbi8vICAgICB1c2VySW5mb0VuZHBvaW50OiBcInVzZXJzL3NlbGZcIixcclxuLy8gICAgIHVuYmxvY2tDb250YWN0RW5kcG9pbnQ6IFwidXNlcnMvc2VsZi9jb250YWN0cy8ke2NvbnRhY3RJZH0vdW5ibG9ja1wiLFxyXG4vLyAgICAgZGVsZXRlQ29udGFjdEVuZHBvaW50OiBcInVzZXJzL3NlbGYvY29udGFjdHMvJHtjb250YWN0SWR9XCIsXHJcbi8vICAgICByZXRyeTogblxyXG4vLyB9LFxyXG5cclxuLy8gL3VzZXJzLzp1c2VyL3Byb2ZpbGUvYXZhdGFyP2NhY2hlSGVhZGVycz0xXHJcbmZ1bmN0aW9uIGJ1aWxkQXZhdGFyKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkUHJvZmlsZSh1c2VybmFtZSkuY29uY2F0KFwiYXZhdGFyP2NhY2hlSGVhZGVycz0xXCIpO1xyXG59XHJcblxyXG4vLyAvdXNlcnMvOnVzZXIvcHJvZmlsZS9hdmF0YXJcclxuZnVuY3Rpb24gYnVpbGRVcGRhdGVkQXZhdGFyKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkUHJvZmlsZSh1c2VybmFtZSkuY29uY2F0KFwiYXZhdGFyXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRPcmlnaW4gKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIFwiaHR0cHM6Ly9cIiArIFNLWVBFV0VCX0FQSV9TS1lQRV9IT1NUO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQocGF0aDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHJlc29sdmVVcmkoZ2V0T3JpZ2luKCksIHBhdGgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU5hbWUgKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoam9pblBhdGgoYnVpbGREaXNwbGF5TmFtZSh1c2VybmFtZSkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVzZXJQcm9maWxlICh1c2VybmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGpvaW5QYXRoKGJ1aWxkUHJvZmlsZSh1c2VybmFtZSkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhSZXF1ZXN0QWNjZXB0ICh1c2VybmFtZTogc3RyaW5nLCBjb250YWN0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoam9pblBhdGgoYnVpbGRBdXRoUmVxdWVzdEFjY2VwdCh1c2VybmFtZSwgY29udGFjdCkpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhSZXF1ZXN0RGVjbGluZSAodXNlcm5hbWU6IHN0cmluZywgY29udGFjdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGpvaW5QYXRoKGJ1aWxkQXV0aFJlcXVlc3REZWNsaW5lKHVzZXJuYW1lLCBjb250YWN0KSkpO1xyXG59XHJcbiJdfQ==
