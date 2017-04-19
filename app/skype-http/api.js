"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var events_1 = require("events");
var accept_contact_request_1 = require("./api/accept-contact-request");
var decline_contact_request_1 = require("./api/decline-contact-request");
var get_contact_1 = require("./api/get-contact");
var get_contacts_1 = require("./api/get-contacts");
var get_conversation_1 = require("./api/get-conversation");
var get_conversations_1 = require("./api/get-conversations");
var send_message_1 = require("./api/send-message");
var set_status_1 = require("./api/set-status");
var messages_poller_1 = require("./polling/messages-poller");
var Api = (function (_super) {
    __extends(Api, _super);
    function Api(context, io) {
        var _this = _super.call(this) || this;
        _this.context = context;
        _this.io = io;
        _this.messagesPoller = new messages_poller_1.MessagesPoller(_this.io, _this.context);
        _this.messagesPoller.on("error", function (err) { return _this.emit("error", err); });
        _this.messagesPoller.on("event-message", function (ev) { return _this.handlePollingEvent(ev); });
        return _this;
    }
    Api.prototype.acceptContactRequest = function (contactUsername) {
        return accept_contact_request_1.default(this.io, this.context, contactUsername).thenReturn(this);
    };
    Api.prototype.declineContactRequest = function (contactUsername) {
        return decline_contact_request_1.default(this.io, this.context, contactUsername).thenReturn(this);
    };
    Api.prototype.getContact = function (contactId) {
        return get_contact_1.default(this.io, this.context, contactId);
    };
    Api.prototype.getContacts = function () {
        return get_contacts_1.default(this.io, this.context);
    };
    Api.prototype.getConversation = function (conversationId) {
        return get_conversation_1.default(this.io, this.context, conversationId);
    };
    Api.prototype.getConversations = function () {
        return get_conversations_1.default(this.io, this.context);
    };
    Api.prototype.sendMessage = function (message, conversationId) {
        return send_message_1.default(this.io, this.context, message, conversationId);
    };
    Api.prototype.setStatus = function (status) {
        return set_status_1.default(this.io, this.context, status);
    };
    /**
     * Start polling and emitting events
     */
    Api.prototype.listen = function () {
        this.messagesPoller.run();
        return Bluebird.resolve(this);
    };
    /**
     * Stop polling and emitting events
     */
    Api.prototype.stopListening = function () {
        this.messagesPoller.stop();
        return Bluebird.resolve(this);
    };
    Api.prototype.handlePollingEvent = function (ev) {
        this.emit("event", ev);
        if (ev.resource === null) {
            return;
        }
        // Prevent echo
        if (ev.resource.from.username === this.context.username) {
            return;
        }
        if (ev && ev.resource && ev.resource.type === "Text") {
            this.emit("Text", ev.resource);
        }
        else if (ev && ev.resource && ev.resource.type === "RichText") {
            this.emit("RichText", ev.resource);
        }
    };
    return Api;
}(events_1.EventEmitter));
exports.Api = Api;
exports.default = Api;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RyxDQUFDIiwiZmlsZSI6ImxpYi9hcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJldmVudHNcIjtcclxuaW1wb3J0IGFjY2VwdENvbnRhY3RSZXF1ZXN0IGZyb20gXCIuL2FwaS9hY2NlcHQtY29udGFjdC1yZXF1ZXN0XCI7XHJcbmltcG9ydCBkZWNsaW5lQ29udGFjdFJlcXVlc3QgZnJvbSBcIi4vYXBpL2RlY2xpbmUtY29udGFjdC1yZXF1ZXN0XCI7XHJcbmltcG9ydCBnZXRDb250YWN0IGZyb20gXCIuL2FwaS9nZXQtY29udGFjdFwiO1xyXG5pbXBvcnQgZ2V0Q29udGFjdHMgZnJvbSBcIi4vYXBpL2dldC1jb250YWN0c1wiO1xyXG5pbXBvcnQgZ2V0Q29udmVyc2F0aW9uIGZyb20gXCIuL2FwaS9nZXQtY29udmVyc2F0aW9uXCI7XHJcbmltcG9ydCBnZXRDb252ZXJzYXRpb25zIGZyb20gXCIuL2FwaS9nZXQtY29udmVyc2F0aW9uc1wiO1xyXG5pbXBvcnQgc2VuZE1lc3NhZ2UgZnJvbSBcIi4vYXBpL3NlbmQtbWVzc2FnZVwiO1xyXG5pbXBvcnQgc2V0U3RhdHVzIGZyb20gXCIuL2FwaS9zZXQtc3RhdHVzXCI7XHJcbmltcG9ydCAqIGFzIGFwaSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9hcGlcIjtcclxuaW1wb3J0IHtDb250YWN0fSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9jb250YWN0XCI7XHJcbmltcG9ydCB7Q29udGV4dCBhcyBBcGlDb250ZXh0fSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9jb250ZXh0XCI7XHJcbmltcG9ydCB7Q29udmVyc2F0aW9ufSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9jb252ZXJzYXRpb25cIjtcclxuaW1wb3J0ICogYXMgYXBpRXZlbnRzIGZyb20gXCIuL2ludGVyZmFjZXMvYXBpL2V2ZW50c1wiO1xyXG5pbXBvcnQge0h0dHBJb30gZnJvbSBcIi4vaW50ZXJmYWNlcy9pb1wiO1xyXG5pbXBvcnQge01lc3NhZ2VzUG9sbGVyfSBmcm9tIFwiLi9wb2xsaW5nL21lc3NhZ2VzLXBvbGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFwaSBleHRlbmRzIEV2ZW50RW1pdHRlciBpbXBsZW1lbnRzIEFwaUV2ZW50cyB7XHJcbiAgaW86IEh0dHBJbztcclxuICBjb250ZXh0OiBBcGlDb250ZXh0O1xyXG4gIG1lc3NhZ2VzUG9sbGVyOiBNZXNzYWdlc1BvbGxlcjtcclxuXHJcbiAgY29uc3RydWN0b3IgKGNvbnRleHQ6IEFwaUNvbnRleHQsIGlvOiBIdHRwSW8pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5pbyA9IGlvO1xyXG4gICAgdGhpcy5tZXNzYWdlc1BvbGxlciA9IG5ldyBNZXNzYWdlc1BvbGxlcih0aGlzLmlvLCB0aGlzLmNvbnRleHQpO1xyXG4gICAgdGhpcy5tZXNzYWdlc1BvbGxlci5vbihcImVycm9yXCIsIChlcnI6IEVycm9yKSA9PiB0aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpKTtcclxuICAgIHRoaXMubWVzc2FnZXNQb2xsZXIub24oXCJldmVudC1tZXNzYWdlXCIsIChldjogYXBpRXZlbnRzLkV2ZW50TWVzc2FnZSkgPT4gdGhpcy5oYW5kbGVQb2xsaW5nRXZlbnQoZXYpKTtcclxuICB9XHJcblxyXG4gIGFjY2VwdENvbnRhY3RSZXF1ZXN0KGNvbnRhY3RVc2VybmFtZTogc3RyaW5nKTogQmx1ZWJpcmQ8dGhpcz4ge1xyXG4gICAgcmV0dXJuIGFjY2VwdENvbnRhY3RSZXF1ZXN0KHRoaXMuaW8sIHRoaXMuY29udGV4dCwgY29udGFjdFVzZXJuYW1lKS50aGVuUmV0dXJuKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZGVjbGluZUNvbnRhY3RSZXF1ZXN0IChjb250YWN0VXNlcm5hbWU6IHN0cmluZyk6IEJsdWViaXJkPHRoaXM+IHtcclxuICAgIHJldHVybiBkZWNsaW5lQ29udGFjdFJlcXVlc3QodGhpcy5pbywgdGhpcy5jb250ZXh0LCBjb250YWN0VXNlcm5hbWUpLnRoZW5SZXR1cm4odGhpcyk7XHJcbiAgfVxyXG5cclxuICBnZXRDb250YWN0IChjb250YWN0SWQ6IHN0cmluZyk6IEJsdWViaXJkPENvbnRhY3Q+IHtcclxuICAgIHJldHVybiBnZXRDb250YWN0KHRoaXMuaW8sIHRoaXMuY29udGV4dCwgY29udGFjdElkKTtcclxuICB9XHJcblxyXG4gIGdldENvbnRhY3RzICgpOiBCbHVlYmlyZDxDb250YWN0W10+IHtcclxuICAgIHJldHVybiBnZXRDb250YWN0cyh0aGlzLmlvLCB0aGlzLmNvbnRleHQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udmVyc2F0aW9uIChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogQmx1ZWJpcmQ8Q29udmVyc2F0aW9uPiB7XHJcbiAgICByZXR1cm4gZ2V0Q29udmVyc2F0aW9uKHRoaXMuaW8sIHRoaXMuY29udGV4dCwgY29udmVyc2F0aW9uSWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29udmVyc2F0aW9ucyAoKTogQmx1ZWJpcmQ8Q29udmVyc2F0aW9uW10+IHtcclxuICAgIHJldHVybiBnZXRDb252ZXJzYXRpb25zKHRoaXMuaW8sIHRoaXMuY29udGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZW5kTWVzc2FnZSAobWVzc2FnZTogYXBpLk5ld01lc3NhZ2UsIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiBCbHVlYmlyZDxhcGkuU2VuZE1lc3NhZ2VSZXN1bHQ+IHtcclxuICAgIHJldHVybiBzZW5kTWVzc2FnZSh0aGlzLmlvLCB0aGlzLmNvbnRleHQsIG1lc3NhZ2UsIGNvbnZlcnNhdGlvbklkKTtcclxuICB9XHJcblxyXG4gIHNldFN0YXR1cyAoc3RhdHVzOiBhcGkuU3RhdHVzKTogQmx1ZWJpcmQ8YW55PiB7XHJcbiAgICByZXR1cm4gc2V0U3RhdHVzKHRoaXMuaW8sIHRoaXMuY29udGV4dCwgc3RhdHVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHBvbGxpbmcgYW5kIGVtaXR0aW5nIGV2ZW50c1xyXG4gICAqL1xyXG4gIGxpc3RlbiAoKTogQmx1ZWJpcmQ8dGhpcz4ge1xyXG4gICAgdGhpcy5tZXNzYWdlc1BvbGxlci5ydW4oKTtcclxuICAgIHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBwb2xsaW5nIGFuZCBlbWl0dGluZyBldmVudHNcclxuICAgKi9cclxuICBzdG9wTGlzdGVuaW5nICgpOiBCbHVlYmlyZDx0aGlzPiB7XHJcbiAgICB0aGlzLm1lc3NhZ2VzUG9sbGVyLnN0b3AoKTtcclxuICAgIHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhbmRsZVBvbGxpbmdFdmVudChldjogYXBpRXZlbnRzLkV2ZW50TWVzc2FnZSk6IHZvaWQge1xyXG4gICAgdGhpcy5lbWl0KFwiZXZlbnRcIiwgZXYpO1xyXG5cclxuICAgIGlmIChldi5yZXNvdXJjZSA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHJldmVudCBlY2hvXHJcbiAgICBpZiAoZXYucmVzb3VyY2UuZnJvbS51c2VybmFtZSA9PT0gdGhpcy5jb250ZXh0LnVzZXJuYW1lKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXYgJiYgZXYucmVzb3VyY2UgJiYgZXYucmVzb3VyY2UudHlwZSA9PT0gXCJUZXh0XCIpIHtcclxuICAgICAgdGhpcy5lbWl0KFwiVGV4dFwiLCBldi5yZXNvdXJjZSk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ICYmIGV2LnJlc291cmNlICYmIGV2LnJlc291cmNlLnR5cGUgPT09IFwiUmljaFRleHRcIikge1xyXG4gICAgICB0aGlzLmVtaXQoXCJSaWNoVGV4dFwiLCBldi5yZXNvdXJjZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEFwaUV2ZW50cyBleHRlbmRzIE5vZGVKUy5FdmVudEVtaXR0ZXIge1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG4iXX0=
