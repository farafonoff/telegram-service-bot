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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var incident_1 = require("incident");
var messagesUri = require("../messages-uri");
// Perform one request every 1000 ms
var POLLING_DELAY = 1000;
// Match a contact id:
// TODO: handle the "guest" prefix
var CONTACT_ID_PATTERN = /^(\d+):(.+)$/;
// TODO(demurgos): Looks like there is a problem with the return type
function parseContactId(contactId) {
    var match = CONTACT_ID_PATTERN.exec(contactId);
    if (match === null) {
        throw new incident_1.Incident("parse-error", "Unable to parse userId");
    }
    return {
        raw: contactId,
        prefix: parseInt(match[1], 10),
        username: match[2]
    };
}
exports.parseContactId = parseContactId;
function formatRichTextResource(nativeResource) {
    var parsedConversationUri = messagesUri
        .parseConversation(nativeResource.conversationLink);
    var parsedContactUri = messagesUri.parseContact(nativeResource.from);
    var parsedContactId = parseContactId(parsedContactUri.contact);
    return {
        type: "RichText",
        id: nativeResource.id,
        clientId: nativeResource.clientmessageid,
        composeTime: new Date(nativeResource.composetime),
        arrivalTime: new Date(nativeResource.originalarrivaltime),
        from: parsedContactId,
        conversation: parsedConversationUri.conversation,
        content: nativeResource.content
    };
}
exports.formatRichTextResource = formatRichTextResource;
function formatTextResource(nativeResource) {
    var parsedConversationUri = messagesUri
        .parseConversation(nativeResource.conversationLink);
    var parsedContactUri = messagesUri.parseContact(nativeResource.from);
    var parsedContactId = parseContactId(parsedContactUri.contact);
    return {
        type: "Text",
        id: nativeResource.id,
        clientId: nativeResource.clientmessageid,
        composeTime: new Date(nativeResource.composetime),
        arrivalTime: new Date(nativeResource.originalarrivaltime),
        from: parsedContactId,
        conversation: parsedConversationUri.conversation,
        content: nativeResource.content
    };
}
exports.formatTextResource = formatTextResource;
// tslint:disable-next-line:max-line-length
function formatControlClearTypingResource(nativeResource) {
    var parsedConversationUri = messagesUri
        .parseConversation(nativeResource.conversationLink);
    var parsedContactUri = messagesUri.parseContact(nativeResource.from);
    var parsedContactId = parseContactId(parsedContactUri.contact);
    return {
        type: "Control/ClearTyping",
        id: nativeResource.id,
        composeTime: new Date(nativeResource.composetime),
        arrivalTime: new Date(nativeResource.originalarrivaltime),
        from: parsedContactId,
        conversation: parsedConversationUri.conversation,
        native: nativeResource
    };
}
exports.formatControlClearTypingResource = formatControlClearTypingResource;
// tslint:disable-next-line:max-line-length
function formatControlTypingResource(nativeResource) {
    var parsedConversationUri = messagesUri
        .parseConversation(nativeResource.conversationLink);
    var parsedContactUri = messagesUri.parseContact(nativeResource.from);
    var parsedContactId = parseContactId(parsedContactUri.contact);
    return {
        type: "Control/Typing",
        id: nativeResource.id,
        composeTime: new Date(nativeResource.composetime),
        arrivalTime: new Date(nativeResource.originalarrivaltime),
        from: parsedContactId,
        conversation: parsedConversationUri.conversation,
        native: nativeResource
    };
}
exports.formatControlTypingResource = formatControlTypingResource;
function formatMessageResource(nativeResource) {
    switch (nativeResource.messagetype) {
        case "RichText":
            return formatRichTextResource(nativeResource);
        case "Text":
            return formatTextResource(nativeResource);
        case "Control/ClearTyping":
            return formatControlClearTypingResource(nativeResource);
        case "Control/Typing":
            return formatControlTypingResource(nativeResource);
        default:
            // tslint:disable-next-line:max-line-length
            throw new Error("Unknown ressource.messageType (" + JSON.stringify(nativeResource.messagetype) + ") for resource:\n" + JSON.stringify(nativeResource));
    }
}
function formatEventMessage(native) {
    var resource;
    switch (native.resourceType) {
        case "UserPresence":
            resource = null;
            break;
        case "EndpointPresence":
            resource = null;
            break;
        case "NewMessage":
            resource = formatMessageResource(native.resource);
            break;
        default:
            // tslint:disable-next-line:max-line-length
            throw new Error("Unknown EventMessage.resourceType (" + JSON.stringify(native.resourceType) + ") for Event:\n" + JSON.stringify(native));
    }
    return {
        id: native.id,
        type: native.type,
        resourceType: native.resourceType,
        time: new Date(native.time),
        resourceLink: native.resourceLink,
        resource: resource
    };
}
var MessagesPoller = (function (_super) {
    __extends(MessagesPoller, _super);
    function MessagesPoller(io, apiContext) {
        var _this = _super.call(this) || this;
        _this.io = io;
        _this.apiContext = apiContext;
        _this.intervalId = null;
        return _this;
    }
    MessagesPoller.prototype.isActive = function () {
        return this.intervalId !== null;
    };
    MessagesPoller.prototype.run = function () {
        if (this.isActive()) {
            return this;
        }
        this.intervalId = setInterval(this.getMessages.bind(this), POLLING_DELAY);
        return this;
    };
    MessagesPoller.prototype.stop = function () {
        if (!this.isActive()) {
            return this;
        }
        clearInterval(this.intervalId);
        this.intervalId = null;
        return this;
    };
    MessagesPoller.prototype.getMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions, res, body, _i, _a, msg, formatted, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        requestOptions = {
                            // TODO: explicitly define user, endpoint and subscription
                            uri: messagesUri.poll(this.apiContext.registrationToken.host),
                            jar: this.apiContext.cookieJar,
                            headers: {
                                RegistrationToken: this.apiContext.registrationToken.raw
                            }
                        };
                        return [4 /*yield*/, this.io.post(requestOptions)];
                    case 1:
                        res = _b.sent();
                        if (res.statusCode !== 200) {
                            return [2 /*return*/, Promise.reject(new incident_1.Incident("poll", "Unable to poll"))];
                        }
                        body = JSON.parse(res.body);
                        if (body.eventMessages) {
                            for (_i = 0, _a = body.eventMessages; _i < _a.length; _i++) {
                                msg = _a[_i];
                                formatted = formatEventMessage(msg);
                                if (formatted && formatted.resource) {
                                    this.emit("event-message", formatted);
                                }
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        this.emit("error", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MessagesPoller;
}(events_1.EventEmitter));
exports.MessagesPoller = MessagesPoller;
exports.default = MessagesPoller;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wb2xsaW5nL21lc3NhZ2VzLXBvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFvQztBQUNwQyxxQ0FBa0M7QUFTbEMsNkNBQStDO0FBRS9DLG9DQUFvQztBQUNwQyxJQUFNLGFBQWEsR0FBVyxJQUFJLENBQUM7QUFFbkMsc0JBQXNCO0FBQ3RCLGtDQUFrQztBQUNsQyxJQUFNLGtCQUFrQixHQUFXLGNBQWMsQ0FBQztBQUVsRCxxRUFBcUU7QUFDckUsd0JBQStCLFNBQWlCO0lBQzlDLElBQU0sS0FBSyxHQUEyQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekUsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLG1CQUFRLENBQUMsYUFBYSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELE1BQU0sQ0FBQztRQUNMLEdBQUcsRUFBRSxTQUFTO1FBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzlCLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ25CLENBQUM7QUFDSixDQUFDO0FBVkQsd0NBVUM7QUFFRCxnQ0FBdUMsY0FBK0M7SUFDcEYsSUFBTSxxQkFBcUIsR0FBZ0MsV0FBVztTQUNuRSxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RCxJQUFNLGdCQUFnQixHQUEyQixXQUFXLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRixJQUFNLGVBQWUsR0FBeUIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZGLE1BQU0sQ0FBQztRQUNMLElBQUksRUFBRSxVQUFVO1FBQ2hC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QUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUN4QyxDQUFDOzZCQUNGO3dCQUNILENBQUM7Ozs7d0JBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBRyxDQUFDLENBQUM7Ozs7OztLQUUzQjtJQUNILHFCQUFDO0FBQUQsQ0FqRUEsQUFpRUMsQ0FqRW1DLHFCQUFZLEdBaUUvQztBQWpFWSx3Q0FBYztBQW1FM0Isa0JBQWUsY0FBYyxDQUFDIiwiZmlsZSI6ImxpYi9wb2xsaW5nL21lc3NhZ2VzLXBvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCI7XHJcbmltcG9ydCB7SW5jaWRlbnR9IGZyb20gXCJpbmNpZGVudFwiO1xyXG5pbXBvcnQge1BhcnNlZENvbnZlcnNhdGlvbklkfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGkvYXBpXCI7XHJcbmltcG9ydCB7Q29udGV4dCBhcyBBcGlDb250ZXh0fSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGkvY29udGV4dFwiO1xyXG5pbXBvcnQgKiBhcyBldmVudHMgZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL2V2ZW50c1wiO1xyXG5pbXBvcnQgKiBhcyByZXNvdXJjZXMgZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL3Jlc291cmNlc1wiO1xyXG5pbXBvcnQgKiBhcyBodHRwSW8gZnJvbSBcIi4uL2ludGVyZmFjZXMvaW9cIjtcclxuaW1wb3J0ICogYXMgbmF0aXZlRXZlbnRzIGZyb20gXCIuLi9pbnRlcmZhY2VzL25hdGl2ZS1hcGkvZXZlbnRzXCI7XHJcbmltcG9ydCAqIGFzIG5hdGl2ZU1lc3NhZ2VSZXNvdXJjZXMgZnJvbSBcIi4uL2ludGVyZmFjZXMvbmF0aXZlLWFwaS9tZXNzYWdlLXJlc291cmNlc1wiO1xyXG5pbXBvcnQgKiBhcyBuYXRpdmVSZXNvdXJjZXMgZnJvbSBcIi4uL2ludGVyZmFjZXMvbmF0aXZlLWFwaS9yZXNvdXJjZXNcIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZXNVcmkgZnJvbSBcIi4uL21lc3NhZ2VzLXVyaVwiO1xyXG5cclxuLy8gUGVyZm9ybSBvbmUgcmVxdWVzdCBldmVyeSAxMDAwIG1zXHJcbmNvbnN0IFBPTExJTkdfREVMQVk6IG51bWJlciA9IDEwMDA7XHJcblxyXG4vLyBNYXRjaCBhIGNvbnRhY3QgaWQ6XHJcbi8vIFRPRE86IGhhbmRsZSB0aGUgXCJndWVzdFwiIHByZWZpeFxyXG5jb25zdCBDT05UQUNUX0lEX1BBVFRFUk46IFJlZ0V4cCA9IC9eKFxcZCspOiguKykkLztcclxuXHJcbi8vIFRPRE8oZGVtdXJnb3MpOiBMb29rcyBsaWtlIHRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHRoZSByZXR1cm4gdHlwZVxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb250YWN0SWQoY29udGFjdElkOiBzdHJpbmcpOiBQYXJzZWRDb252ZXJzYXRpb25JZCB7XHJcbiAgY29uc3QgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGwgPSBDT05UQUNUX0lEX1BBVFRFUk4uZXhlYyhjb250YWN0SWQpO1xyXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkge1xyXG4gICAgdGhyb3cgbmV3IEluY2lkZW50KFwicGFyc2UtZXJyb3JcIiwgXCJVbmFibGUgdG8gcGFyc2UgdXNlcklkXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgcmF3OiBjb250YWN0SWQsXHJcbiAgICBwcmVmaXg6IHBhcnNlSW50KG1hdGNoWzFdLCAxMCksXHJcbiAgICB1c2VybmFtZTogbWF0Y2hbMl1cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0UmljaFRleHRSZXNvdXJjZShuYXRpdmVSZXNvdXJjZTogbmF0aXZlTWVzc2FnZVJlc291cmNlcy5SaWNoVGV4dCk6IHJlc291cmNlcy5SaWNoVGV4dFJlc291cmNlIHtcclxuICBjb25zdCBwYXJzZWRDb252ZXJzYXRpb25Vcmk6IG1lc3NhZ2VzVXJpLkNvbnZlcnNhdGlvblVyaSA9IG1lc3NhZ2VzVXJpXHJcbiAgICAucGFyc2VDb252ZXJzYXRpb24obmF0aXZlUmVzb3VyY2UuY29udmVyc2F0aW9uTGluayk7XHJcbiAgY29uc3QgcGFyc2VkQ29udGFjdFVyaTogbWVzc2FnZXNVcmkuQ29udGFjdFVyaSA9IG1lc3NhZ2VzVXJpLnBhcnNlQ29udGFjdChuYXRpdmVSZXNvdXJjZS5mcm9tKTtcclxuICBjb25zdCBwYXJzZWRDb250YWN0SWQ6IFBhcnNlZENvbnZlcnNhdGlvbklkID0gcGFyc2VDb250YWN0SWQocGFyc2VkQ29udGFjdFVyaS5jb250YWN0KTtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogXCJSaWNoVGV4dFwiLFxyXG4gICAgaWQ6IG5hdGl2ZVJlc291cmNlLmlkLFxyXG4gICAgY2xpZW50SWQ6IG5hdGl2ZVJlc291cmNlLmNsaWVudG1lc3NhZ2VpZCxcclxuICAgIGNvbXBvc2VUaW1lOiBuZXcgRGF0ZShuYXRpdmVSZXNvdXJjZS5jb21wb3NldGltZSksXHJcbiAgICBhcnJpdmFsVGltZTogbmV3IERhdGUobmF0aXZlUmVzb3VyY2Uub3JpZ2luYWxhcnJpdmFsdGltZSksXHJcbiAgICBmcm9tOiBwYXJzZWRDb250YWN0SWQsXHJcbiAgICBjb252ZXJzYXRpb246IHBhcnNlZENvbnZlcnNhdGlvblVyaS5jb252ZXJzYXRpb24sXHJcbiAgICBjb250ZW50OiBuYXRpdmVSZXNvdXJjZS5jb250ZW50XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFRleHRSZXNvdXJjZShuYXRpdmVSZXNvdXJjZTogbmF0aXZlTWVzc2FnZVJlc291cmNlcy5UZXh0KTogcmVzb3VyY2VzLlRleHRSZXNvdXJjZSB7XHJcbiAgY29uc3QgcGFyc2VkQ29udmVyc2F0aW9uVXJpOiBtZXNzYWdlc1VyaS5Db252ZXJzYXRpb25VcmkgPSBtZXNzYWdlc1VyaVxyXG4gICAgLnBhcnNlQ29udmVyc2F0aW9uKG5hdGl2ZVJlc291cmNlLmNvbnZlcnNhdGlvbkxpbmspO1xyXG4gIGNvbnN0IHBhcnNlZENvbnRhY3RVcmk6IG1lc3NhZ2VzVXJpLkNvbnRhY3RVcmkgPSBtZXNzYWdlc1VyaS5wYXJzZUNvbnRhY3QobmF0aXZlUmVzb3VyY2UuZnJvbSk7XHJcbiAgY29uc3QgcGFyc2VkQ29udGFjdElkOiBQYXJzZWRDb252ZXJzYXRpb25JZCA9IHBhcnNlQ29udGFjdElkKHBhcnNlZENvbnRhY3RVcmkuY29udGFjdCk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFwiVGV4dFwiLFxyXG4gICAgaWQ6IG5hdGl2ZVJlc291cmNlLmlkLFxyXG4gICAgY2xpZW50SWQ6IG5hdGl2ZVJlc291cmNlLmNsaWVudG1lc3NhZ2VpZCxcclxuICAgIGNvbXBvc2VUaW1lOiBuZXcgRGF0ZShuYXRpdmVSZXNvdXJjZS5jb21wb3NldGltZSksXHJcbiAgICBhcnJpdmFsVGltZTogbmV3IERhdGUobmF0aXZlUmVzb3VyY2Uub3JpZ2luYWxhcnJpdmFsdGltZSksXHJcbiAgICBmcm9tOiBwYXJzZWRDb250YWN0SWQsXHJcbiAgICBjb252ZXJzYXRpb246IHBhcnNlZENvbnZlcnNhdGlvblVyaS5jb252ZXJzYXRpb24sXHJcbiAgICBjb250ZW50OiBuYXRpdmVSZXNvdXJjZS5jb250ZW50XHJcbiAgfTtcclxufVxyXG5cclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q29udHJvbENsZWFyVHlwaW5nUmVzb3VyY2UobmF0aXZlUmVzb3VyY2U6IG5hdGl2ZU1lc3NhZ2VSZXNvdXJjZXMuQ29udHJvbENsZWFyVHlwaW5nKTogcmVzb3VyY2VzLkNvbnRyb2xDbGVhclR5cGluZ1Jlc291cmNlIHtcclxuICBjb25zdCBwYXJzZWRDb252ZXJzYXRpb25Vcmk6IG1lc3NhZ2VzVXJpLkNvbnZlcnNhdGlvblVyaSA9IG1lc3NhZ2VzVXJpXHJcbiAgICAucGFyc2VDb252ZXJzYXRpb24obmF0aXZlUmVzb3VyY2UuY29udmVyc2F0aW9uTGluayk7XHJcbiAgY29uc3QgcGFyc2VkQ29udGFjdFVyaTogbWVzc2FnZXNVcmkuQ29udGFjdFVyaSA9IG1lc3NhZ2VzVXJpLnBhcnNlQ29udGFjdChuYXRpdmVSZXNvdXJjZS5mcm9tKTtcclxuICBjb25zdCBwYXJzZWRDb250YWN0SWQ6IFBhcnNlZENvbnZlcnNhdGlvbklkID0gcGFyc2VDb250YWN0SWQocGFyc2VkQ29udGFjdFVyaS5jb250YWN0KTtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogXCJDb250cm9sL0NsZWFyVHlwaW5nXCIsXHJcbiAgICBpZDogbmF0aXZlUmVzb3VyY2UuaWQsXHJcbiAgICBjb21wb3NlVGltZTogbmV3IERhdGUobmF0aXZlUmVzb3VyY2UuY29tcG9zZXRpbWUpLFxyXG4gICAgYXJyaXZhbFRpbWU6IG5ldyBEYXRlKG5hdGl2ZVJlc291cmNlLm9yaWdpbmFsYXJyaXZhbHRpbWUpLFxyXG4gICAgZnJvbTogcGFyc2VkQ29udGFjdElkLFxyXG4gICAgY29udmVyc2F0aW9uOiBwYXJzZWRDb252ZXJzYXRpb25VcmkuY29udmVyc2F0aW9uLFxyXG4gICAgbmF0aXZlOiBuYXRpdmVSZXNvdXJjZVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdENvbnRyb2xUeXBpbmdSZXNvdXJjZShuYXRpdmVSZXNvdXJjZTogbmF0aXZlTWVzc2FnZVJlc291cmNlcy5Db250cm9sVHlwaW5nKTogcmVzb3VyY2VzLkNvbnRyb2xUeXBpbmdSZXNvdXJjZSB7XHJcbiAgY29uc3QgcGFyc2VkQ29udmVyc2F0aW9uVXJpOiBtZXNzYWdlc1VyaS5Db252ZXJzYXRpb25VcmkgPSBtZXNzYWdlc1VyaVxyXG4gICAgLnBhcnNlQ29udmVyc2F0aW9uKG5hdGl2ZVJlc291cmNlLmNvbnZlcnNhdGlvbkxpbmspO1xyXG4gIGNvbnN0IHBhcnNlZENvbnRhY3RVcmk6IG1lc3NhZ2VzVXJpLkNvbnRhY3RVcmkgPSBtZXNzYWdlc1VyaS5wYXJzZUNvbnRhY3QobmF0aXZlUmVzb3VyY2UuZnJvbSk7XHJcbiAgY29uc3QgcGFyc2VkQ29udGFjdElkOiBQYXJzZWRDb252ZXJzYXRpb25JZCA9IHBhcnNlQ29udGFjdElkKHBhcnNlZENvbnRhY3RVcmkuY29udGFjdCk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IFwiQ29udHJvbC9UeXBpbmdcIixcclxuICAgIGlkOiBuYXRpdmVSZXNvdXJjZS5pZCxcclxuICAgIGNvbXBvc2VUaW1lOiBuZXcgRGF0ZShuYXRpdmVSZXNvdXJjZS5jb21wb3NldGltZSksXHJcbiAgICBhcnJpdmFsVGltZTogbmV3IERhdGUobmF0aXZlUmVzb3VyY2Uub3JpZ2luYWxhcnJpdmFsdGltZSksXHJcbiAgICBmcm9tOiBwYXJzZWRDb250YWN0SWQsXHJcbiAgICBjb252ZXJzYXRpb246IHBhcnNlZENvbnZlcnNhdGlvblVyaS5jb252ZXJzYXRpb24sXHJcbiAgICBuYXRpdmU6IG5hdGl2ZVJlc291cmNlXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TWVzc2FnZVJlc291cmNlKG5hdGl2ZVJlc291cmNlOiBuYXRpdmVSZXNvdXJjZXMuTWVzc2FnZVJlc291cmNlKTogcmVzb3VyY2VzLlJlc291cmNlIHtcclxuICBzd2l0Y2ggKG5hdGl2ZVJlc291cmNlLm1lc3NhZ2V0eXBlKSB7XHJcbiAgICBjYXNlIFwiUmljaFRleHRcIjpcclxuICAgICAgcmV0dXJuIGZvcm1hdFJpY2hUZXh0UmVzb3VyY2UoPG5hdGl2ZU1lc3NhZ2VSZXNvdXJjZXMuUmljaFRleHQ+IG5hdGl2ZVJlc291cmNlKTtcclxuICAgIGNhc2UgXCJUZXh0XCI6XHJcbiAgICAgIHJldHVybiBmb3JtYXRUZXh0UmVzb3VyY2UoPG5hdGl2ZU1lc3NhZ2VSZXNvdXJjZXMuVGV4dD4gbmF0aXZlUmVzb3VyY2UpO1xyXG4gICAgY2FzZSBcIkNvbnRyb2wvQ2xlYXJUeXBpbmdcIjpcclxuICAgICAgcmV0dXJuIGZvcm1hdENvbnRyb2xDbGVhclR5cGluZ1Jlc291cmNlKDxuYXRpdmVNZXNzYWdlUmVzb3VyY2VzLkNvbnRyb2xDbGVhclR5cGluZz4gbmF0aXZlUmVzb3VyY2UpO1xyXG4gICAgY2FzZSBcIkNvbnRyb2wvVHlwaW5nXCI6XHJcbiAgICAgIHJldHVybiBmb3JtYXRDb250cm9sVHlwaW5nUmVzb3VyY2UoPG5hdGl2ZU1lc3NhZ2VSZXNvdXJjZXMuQ29udHJvbFR5cGluZz4gbmF0aXZlUmVzb3VyY2UpO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcmVzc291cmNlLm1lc3NhZ2VUeXBlICgke0pTT04uc3RyaW5naWZ5KG5hdGl2ZVJlc291cmNlLm1lc3NhZ2V0eXBlKX0pIGZvciByZXNvdXJjZTpcXG4ke0pTT04uc3RyaW5naWZ5KG5hdGl2ZVJlc291cmNlKX1gKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdEV2ZW50TWVzc2FnZShuYXRpdmU6IG5hdGl2ZUV2ZW50cy5FdmVudE1lc3NhZ2UpOiBldmVudHMuRXZlbnRNZXNzYWdlIHtcclxuICBsZXQgcmVzb3VyY2U6IHJlc291cmNlcy5SZXNvdXJjZSB8IG51bGw7XHJcbiAgc3dpdGNoIChuYXRpdmUucmVzb3VyY2VUeXBlKSB7XHJcbiAgICBjYXNlIFwiVXNlclByZXNlbmNlXCI6XHJcbiAgICAgIHJlc291cmNlID0gbnVsbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwiRW5kcG9pbnRQcmVzZW5jZVwiOlxyXG4gICAgICByZXNvdXJjZSA9IG51bGw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcIk5ld01lc3NhZ2VcIjpcclxuICAgICAgcmVzb3VyY2UgPSBmb3JtYXRNZXNzYWdlUmVzb3VyY2UoPG5hdGl2ZVJlc291cmNlcy5NZXNzYWdlUmVzb3VyY2U+IG5hdGl2ZS5yZXNvdXJjZSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gRXZlbnRNZXNzYWdlLnJlc291cmNlVHlwZSAoJHtKU09OLnN0cmluZ2lmeShuYXRpdmUucmVzb3VyY2VUeXBlKX0pIGZvciBFdmVudDpcXG4ke0pTT04uc3RyaW5naWZ5KG5hdGl2ZSl9YCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaWQ6IG5hdGl2ZS5pZCxcclxuICAgIHR5cGU6IG5hdGl2ZS50eXBlLFxyXG4gICAgcmVzb3VyY2VUeXBlOiBuYXRpdmUucmVzb3VyY2VUeXBlLFxyXG4gICAgdGltZTogbmV3IERhdGUobmF0aXZlLnRpbWUpLFxyXG4gICAgcmVzb3VyY2VMaW5rOiBuYXRpdmUucmVzb3VyY2VMaW5rLFxyXG4gICAgcmVzb3VyY2U6IHJlc291cmNlXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzUG9sbGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBpbzogaHR0cElvLkh0dHBJbztcclxuICBhcGlDb250ZXh0OiBBcGlDb250ZXh0O1xyXG4gIGludGVydmFsSWQ6IG51bWJlciB8IE5vZGVKUy5UaW1lciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlvOiBodHRwSW8uSHR0cElvLCBhcGlDb250ZXh0OiBBcGlDb250ZXh0KSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMuaW8gPSBpbztcclxuICAgIHRoaXMuYXBpQ29udGV4dCA9IGFwaUNvbnRleHQ7XHJcbiAgICB0aGlzLmludGVydmFsSWQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgaXNBY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbnRlcnZhbElkICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcnVuKCk6IHRoaXMge1xyXG4gICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoaXMuZ2V0TWVzc2FnZXMuYmluZCh0aGlzKSwgUE9MTElOR19ERUxBWSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHN0b3AoKTogdGhpcyB7XHJcbiAgICBpZiAoIXRoaXMuaXNBY3RpdmUoKSkge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGNsZWFySW50ZXJ2YWwoPGFueT4gdGhpcy5pbnRlcnZhbElkKTtcclxuICAgIHRoaXMuaW50ZXJ2YWxJZCA9IG51bGw7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhc3luYyBnZXRNZXNzYWdlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBodHRwSW8uUG9zdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgLy8gVE9ETzogZXhwbGljaXRseSBkZWZpbmUgdXNlciwgZW5kcG9pbnQgYW5kIHN1YnNjcmlwdGlvblxyXG4gICAgICAgIHVyaTogbWVzc2FnZXNVcmkucG9sbCh0aGlzLmFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW4uaG9zdCksXHJcbiAgICAgICAgamFyOiB0aGlzLmFwaUNvbnRleHQuY29va2llSmFyLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFJlZ2lzdHJhdGlvblRva2VuOiB0aGlzLmFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW4ucmF3XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCByZXM6IGh0dHBJby5SZXNwb25zZSA9IGF3YWl0IHRoaXMuaW8ucG9zdChyZXF1ZXN0T3B0aW9ucyk7XHJcblxyXG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgSW5jaWRlbnQoXCJwb2xsXCIsIFwiVW5hYmxlIHRvIHBvbGxcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBib2R5OiB7ZXZlbnRNZXNzYWdlcz86IG5hdGl2ZUV2ZW50cy5FdmVudE1lc3NhZ2VbXX0gPSBKU09OLnBhcnNlKHJlcy5ib2R5KTtcclxuXHJcbiAgICAgIGlmIChib2R5LmV2ZW50TWVzc2FnZXMpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IG1zZyBvZiBib2R5LmV2ZW50TWVzc2FnZXMpIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG1zZywgbnVsbCwgMikpO1xyXG4gICAgICAgICAgY29uc3QgZm9ybWF0dGVkOiBldmVudHMuRXZlbnRNZXNzYWdlID0gZm9ybWF0RXZlbnRNZXNzYWdlKG1zZyk7XHJcbiAgICAgICAgICBpZiAoZm9ybWF0dGVkICYmIGZvcm1hdHRlZC5yZXNvdXJjZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJldmVudC1tZXNzYWdlXCIsIGZvcm1hdHRlZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VzUG9sbGVyO1xyXG4iXX0=
