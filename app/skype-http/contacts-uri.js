"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var url_1 = require("url");
function joinPath(parts) {
    return path_1.posix.join.apply(null, parts);
}
var CONTACTS_HOST = "contacts.skype.com";
// The following functions build an array of parts to build the path
// /contacts/v1
function buildV1() {
    return ["contacts/v1"];
}
// /contacts/v1/users
function buildUsers() {
    return buildV1().concat("users");
}
// /contacts/v1/users/:user
function buildUser(username) {
    return buildUsers().concat(username);
}
// /contacts/v1/users/:user/contacts
function buildContacts(username) {
    return buildUser(username).concat("contacts");
}
// /contacts/v1/users/:user/contacts/profiles
function buildContactProfiles(username) {
    return buildContacts(username).concat("profiles");
}
// /contacts/v1/users/:user/contacts/:contactType
function buildContactsType(username, contactType) {
    return buildContacts(username).concat(contactType);
}
// /contacts/v1/users/:user/contacts/:contactType/:contactId
function buildContact(username, contactType, contactId) {
    return buildContactsType(username, contactType).concat(contactId);
}
// /contacts/v1/users/:user/contacts/:contactType/:contactId/block
function buildContactBlock(username, contactType, contactId) {
    return buildContact(username, contactType, contactId).concat("block");
}
// /contacts/v1/users/:user/contacts/:contactType/:contactId/unblock
function buildContactUnlock(username, contactType, contactId) {
    return buildContact(username, contactType, contactId).concat("unblock");
}
// /contacts/v1/users/:user/profile
function buildProfile(username) {
    return buildUser(username).concat("profile");
}
// TODO (from skype-web-reversed):
// tslint:disable:max-line-length
// myContactsEndpoint: "contacts/${version}/users/${id}/contacts?$filter=type eq 'skype' or type eq 'msn' or type eq 'pstn' or type eq 'agent' or type eq 'lync'&reason=${reason}",
// myDeltaContactsEndpoint: "contacts/${version}/users/${id}/contacts?delta&$filter=type eq 'skype' or type eq 'msn' or type eq 'pstn' or type eq 'agent' or type eq 'lync'&reason=${reason}",
// tslint:enable
function getOrigin() {
    return "https://" + CONTACTS_HOST;
}
function get(path) {
    return url_1.resolve(getOrigin(), path);
}
// https://contacts.skype.com/contacts/v1/users/:username/contacts
function contacts(username) {
    return get(joinPath(buildContacts(username)));
}
exports.contacts = contacts;
// https://contacts.skype.com/contacts/v1/users/:username/contacts/profiles
function contactProfiles(username) {
    return get(joinPath(buildContactProfiles(username)));
}
exports.contactProfiles = contactProfiles;
// https://contacts.skype.com/contacts/v1/users/:username/contacts/:contactType/:contactId
function contact(username, contactType, contact) {
    return get(joinPath(buildContact(username, contactType, contact)));
}
exports.contact = contact;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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dkQsQ0FBQztBQUZELDBDQUVDO0FBRUQsMEZBQTBGO0FBQzFGLGlCQUF3QixRQUFnQixFQUNoQixXQUFpRSxFQUNqRSxPQUFlO0lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBSkQsMEJBSUMiLCJmaWxlIjoibGliL2NvbnRhY3RzLXVyaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cG9zaXh9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7cmVzb2x2ZSBhcyByZXNvbHZlVXJpfSBmcm9tIFwidXJsXCI7XHJcblxyXG5mdW5jdGlvbiBqb2luUGF0aChwYXJ0czogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gIHJldHVybiBwb3NpeC5qb2luLmFwcGx5KG51bGwsIHBhcnRzKTtcclxufVxyXG5cclxuY29uc3QgQ09OVEFDVFNfSE9TVDogc3RyaW5nID0gXCJjb250YWN0cy5za3lwZS5jb21cIjtcclxuXHJcbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGJ1aWxkIGFuIGFycmF5IG9mIHBhcnRzIHRvIGJ1aWxkIHRoZSBwYXRoXHJcblxyXG4vLyAvY29udGFjdHMvdjFcclxuZnVuY3Rpb24gYnVpbGRWMSgpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIFtcImNvbnRhY3RzL3YxXCJdO1xyXG59XHJcblxyXG4vLyAvY29udGFjdHMvdjEvdXNlcnNcclxuZnVuY3Rpb24gYnVpbGRVc2VycygpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkVjEoKS5jb25jYXQoXCJ1c2Vyc1wiKTtcclxufVxyXG5cclxuLy8gL2NvbnRhY3RzL3YxL3VzZXJzLzp1c2VyXHJcbmZ1bmN0aW9uIGJ1aWxkVXNlcih1c2VybmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXJzKCkuY29uY2F0KHVzZXJuYW1lKTtcclxufVxyXG5cclxuLy8gL2NvbnRhY3RzL3YxL3VzZXJzLzp1c2VyL2NvbnRhY3RzXHJcbmZ1bmN0aW9uIGJ1aWxkQ29udGFjdHModXNlcm5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRVc2VyKHVzZXJuYW1lKS5jb25jYXQoXCJjb250YWN0c1wiKTtcclxufVxyXG5cclxuLy8gL2NvbnRhY3RzL3YxL3VzZXJzLzp1c2VyL2NvbnRhY3RzL3Byb2ZpbGVzXHJcbmZ1bmN0aW9uIGJ1aWxkQ29udGFjdFByb2ZpbGVzKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkQ29udGFjdHModXNlcm5hbWUpLmNvbmNhdChcInByb2ZpbGVzXCIpO1xyXG59XHJcblxyXG4vLyAvY29udGFjdHMvdjEvdXNlcnMvOnVzZXIvY29udGFjdHMvOmNvbnRhY3RUeXBlXHJcbmZ1bmN0aW9uIGJ1aWxkQ29udGFjdHNUeXBlKHVzZXJuYW1lOiBzdHJpbmcsIGNvbnRhY3RUeXBlOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkQ29udGFjdHModXNlcm5hbWUpLmNvbmNhdChjb250YWN0VHlwZSk7XHJcbn1cclxuXHJcbi8vIC9jb250YWN0cy92MS91c2Vycy86dXNlci9jb250YWN0cy86Y29udGFjdFR5cGUvOmNvbnRhY3RJZFxyXG5mdW5jdGlvbiBidWlsZENvbnRhY3QodXNlcm5hbWU6IHN0cmluZywgY29udGFjdFR5cGU6IHN0cmluZywgY29udGFjdElkOiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgcmV0dXJuIGJ1aWxkQ29udGFjdHNUeXBlKHVzZXJuYW1lLCBjb250YWN0VHlwZSkuY29uY2F0KGNvbnRhY3RJZCk7XHJcbn1cclxuXHJcbi8vIC9jb250YWN0cy92MS91c2Vycy86dXNlci9jb250YWN0cy86Y29udGFjdFR5cGUvOmNvbnRhY3RJZC9ibG9ja1xyXG5mdW5jdGlvbiBidWlsZENvbnRhY3RCbG9jayh1c2VybmFtZTogc3RyaW5nLCBjb250YWN0VHlwZTogc3RyaW5nLCBjb250YWN0SWQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICByZXR1cm4gYnVpbGRDb250YWN0KHVzZXJuYW1lLCBjb250YWN0VHlwZSwgY29udGFjdElkKS5jb25jYXQoXCJibG9ja1wiKTtcclxufVxyXG5cclxuLy8gL2NvbnRhY3RzL3YxL3VzZXJzLzp1c2VyL2NvbnRhY3RzLzpjb250YWN0VHlwZS86Y29udGFjdElkL3VuYmxvY2tcclxuZnVuY3Rpb24gYnVpbGRDb250YWN0VW5sb2NrKHVzZXJuYW1lOiBzdHJpbmcsIGNvbnRhY3RUeXBlOiBzdHJpbmcsIGNvbnRhY3RJZDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZENvbnRhY3QodXNlcm5hbWUsIGNvbnRhY3RUeXBlLCBjb250YWN0SWQpLmNvbmNhdChcInVuYmxvY2tcIik7XHJcbn1cclxuXHJcbi8vIC9jb250YWN0cy92MS91c2Vycy86dXNlci9wcm9maWxlXHJcbmZ1bmN0aW9uIGJ1aWxkUHJvZmlsZSh1c2VybmFtZTogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gIHJldHVybiBidWlsZFVzZXIodXNlcm5hbWUpLmNvbmNhdChcInByb2ZpbGVcIik7XHJcbn1cclxuXHJcbi8vIFRPRE8gKGZyb20gc2t5cGUtd2ViLXJldmVyc2VkKTpcclxuLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXHJcbi8vIG15Q29udGFjdHNFbmRwb2ludDogXCJjb250YWN0cy8ke3ZlcnNpb259L3VzZXJzLyR7aWR9L2NvbnRhY3RzPyRmaWx0ZXI9dHlwZSBlcSAnc2t5cGUnIG9yIHR5cGUgZXEgJ21zbicgb3IgdHlwZSBlcSAncHN0bicgb3IgdHlwZSBlcSAnYWdlbnQnIG9yIHR5cGUgZXEgJ2x5bmMnJnJlYXNvbj0ke3JlYXNvbn1cIixcclxuLy8gbXlEZWx0YUNvbnRhY3RzRW5kcG9pbnQ6IFwiY29udGFjdHMvJHt2ZXJzaW9ufS91c2Vycy8ke2lkfS9jb250YWN0cz9kZWx0YSYkZmlsdGVyPXR5cGUgZXEgJ3NreXBlJyBvciB0eXBlIGVxICdtc24nIG9yIHR5cGUgZXEgJ3BzdG4nIG9yIHR5cGUgZXEgJ2FnZW50JyBvciB0eXBlIGVxICdseW5jJyZyZWFzb249JHtyZWFzb259XCIsXHJcbi8vIHRzbGludDplbmFibGVcclxuXHJcbmZ1bmN0aW9uIGdldE9yaWdpbigpOiBzdHJpbmcge1xyXG4gIHJldHVybiBcImh0dHBzOi8vXCIgKyBDT05UQUNUU19IT1NUO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQocGF0aDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIHJlc29sdmVVcmkoZ2V0T3JpZ2luKCksIHBhdGgpO1xyXG59XHJcblxyXG4vLyBodHRwczovL2NvbnRhY3RzLnNreXBlLmNvbS9jb250YWN0cy92MS91c2Vycy86dXNlcm5hbWUvY29udGFjdHNcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhY3RzKHVzZXJuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBnZXQoam9pblBhdGgoYnVpbGRDb250YWN0cyh1c2VybmFtZSkpKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly9jb250YWN0cy5za3lwZS5jb20vY29udGFjdHMvdjEvdXNlcnMvOnVzZXJuYW1lL2NvbnRhY3RzL3Byb2ZpbGVzXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWN0UHJvZmlsZXModXNlcm5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdldChqb2luUGF0aChidWlsZENvbnRhY3RQcm9maWxlcyh1c2VybmFtZSkpKTtcclxufVxyXG5cclxuLy8gaHR0cHM6Ly9jb250YWN0cy5za3lwZS5jb20vY29udGFjdHMvdjEvdXNlcnMvOnVzZXJuYW1lL2NvbnRhY3RzLzpjb250YWN0VHlwZS86Y29udGFjdElkXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWN0KHVzZXJuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3RUeXBlOiBcInNreXBlXCIgfCBcIm1zblwiIHwgXCJwc3RuXCIgfCBcImFnZW50XCIgfCBcImx5bmNcIiB8IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gZ2V0KGpvaW5QYXRoKGJ1aWxkQ29udGFjdCh1c2VybmFtZSwgY29udGFjdFR5cGUsIGNvbnRhY3QpKSk7XHJcbn1cclxuIl19
