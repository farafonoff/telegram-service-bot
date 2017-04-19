"use strict";
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
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var request = require("request");
var url_1 = require("url");
var Consts = require("./consts");
var messagesUri = require("./messages-uri");
var microsoftAccount = require("./providers/microsoft-account");
var utils = require("./utils");
var hmac_sha256_1 = require("./utils/hmac-sha256");
/**
 * Builds an Api context trough a new authentication.
 * This involves the requests:
 * GET <loginUrl> to scrap the LoginKeys (pie & etm)
 * POST <loginUrl> to get the SkypeToken from the credentials and LoginKeys
 * POST <registrationUrl> to get RegistrationToken from the SkypeToken
 *   Eventually, follow a redirection to use the assigned host
 * POST <subscription> to gain access to resources with the RegistrationToken
 *
 * @param options
 * @returns {Bluebird<ApiContext>}
 */
function login(options) {
    return __awaiter(this, void 0, void 0, function () {
        var jar, ioOptions, getSkypeTokenOptions, skypeToken, registrationToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jar = request.jar();
                    ioOptions = { io: options.io, jar: jar };
                    getSkypeTokenOptions = {
                        credentials: {
                            login: options.credentials.username,
                            password: options.credentials.password
                        },
                        httpIo: options.io,
                        cookieJar: jar
                    };
                    return [4 /*yield*/, microsoftAccount.getSkypeToken(getSkypeTokenOptions)];
                case 1:
                    skypeToken = _a.sent();
                    if (options.verbose) {
                        console.log("Acquired SkypeToken");
                    }
                    return [4 /*yield*/, getRegistrationToken(ioOptions, skypeToken, Consts.SKYPEWEB_DEFAULT_MESSAGES_HOST)];
                case 2:
                    registrationToken = _a.sent();
                    if (options.verbose) {
                        console.log("Acquired RegistrationToken");
                    }
                    return [4 /*yield*/, subscribeToResources(ioOptions, registrationToken)];
                case 3:
                    _a.sent();
                    if (options.verbose) {
                        console.log("Subscribed to resources");
                    }
                    return [4 /*yield*/, createPresenceDocs(ioOptions, registrationToken)];
                case 4:
                    _a.sent();
                    if (options.verbose) {
                        console.log("Created presence docs");
                    }
                    return [2 /*return*/, {
                            username: options.credentials.username,
                            skypeToken: skypeToken,
                            cookieJar: jar,
                            registrationToken: registrationToken
                        }];
            }
        });
    });
}
exports.login = login;
function getLockAndKeyResponse(time) {
    var inputBuffer = Buffer.from(String(time), "utf8");
    var appIdBuffer = Buffer.from(Consts.SKYPEWEB_LOCKANDKEY_APPID, "utf8");
    var secretBuffer = Buffer.from(Consts.SKYPEWEB_LOCKANDKEY_SECRET, "utf8");
    return hmac_sha256_1.hmacSha256(inputBuffer, appIdBuffer, secretBuffer);
}
// Get the token used to subscribe to resources
function getRegistrationToken(options, skypeToken, messagesHost, retry) {
    if (retry === void 0) { retry = 2; }
    return Bluebird
        .try(function () {
        var startTime = utils.getCurrentTime();
        var lockAndKeyResponse = getLockAndKeyResponse(startTime);
        var headers = {
            LockAndKey: utils.stringifyHeaderParams({
                appId: Consts.SKYPEWEB_LOCKANDKEY_APPID,
                time: String(startTime),
                lockAndKeyResponse: lockAndKeyResponse
            }),
            ClientInfo: utils.stringifyHeaderParams({
                os: "Windows",
                osVer: "10",
                proc: "Win64",
                lcid: "en-us",
                deviceType: "1",
                country: "n/a",
                clientName: Consts.SKYPEWEB_CLIENTINFO_NAME,
                clientVer: Consts.SKYPEWEB_CLIENTINFO_VERSION
            }),
            Authentication: utils.stringifyHeaderParams({
                skypetoken: skypeToken.value
            })
        };
        var requestOptions = {
            uri: messagesUri.endpoints(messagesHost),
            headers: headers,
            jar: options.jar,
            body: "{}" // Skype requires you to send an empty object as a body
        };
        return Bluebird.resolve(options.io.post(requestOptions))
            .then(function (res) {
            if (res.statusCode !== 201 && res.statusCode !== 301) {
                return Bluebird.reject(new incident_1.Incident("net", "Unable to register an endpoint"));
            }
            // TODO: handle statusCode 201 & 301
            var locationHeader = res.headers["location"];
            var location = url_1.parse(locationHeader); // TODO: parse in messages-uri.ts
            if (location.host === undefined) {
                throw new incident_1.Incident("parse-error", "Expected location to define host");
            }
            if (location.host !== messagesHost) {
                messagesHost = location.host;
                if (retry > 0) {
                    return getRegistrationToken(options, skypeToken, messagesHost, retry--);
                }
                else {
                    return Bluebird.reject(new incident_1.Incident("net", "Exceeded max tries"));
                }
            }
            // registrationTokenHeader is like "registrationToken=someString; expires=someNumber; endpointId={someString}"
            var registrationTokenHeader = res.headers["set-registrationtoken"];
            var parsedHeader = utils.parseHeaderParams(registrationTokenHeader);
            if (!parsedHeader["registrationToken"] || !parsedHeader["expires"] || !parsedHeader["endpointId"]) {
                return Bluebird.reject(new incident_1.Incident("protocol", "Missing parameters for the registrationToken"));
            }
            var expires = parseInt(parsedHeader["expires"], 10); // in seconds
            var registrationToken = {
                value: parsedHeader["registrationToken"],
                expirationDate: new Date(1000 * expires),
                endpointId: parsedHeader["endpointId"],
                raw: registrationTokenHeader,
                host: messagesHost
            };
            return Bluebird.resolve(registrationToken);
        });
    });
}
function subscribeToResources(ioOptions, registrationToken) {
    // TODO(demurgos): typedef
    // tslint:disable-next-line:typedef
    var requestDocument = {
        interestedResources: [
            "/v1/threads/ALL",
            "/v1/users/ME/contacts/ALL",
            "/v1/users/ME/conversations/ALL/messages",
            "/v1/users/ME/conversations/ALL/properties"
        ],
        template: "raw",
        channelType: "httpLongPoll" // TODO: use websockets ?
    };
    var requestOptions = {
        uri: messagesUri.subscriptions(registrationToken.host),
        jar: ioOptions.jar,
        body: JSON.stringify(requestDocument),
        headers: {
            RegistrationToken: registrationToken.raw
        }
    };
    return Bluebird.resolve(ioOptions.io.post(requestOptions))
        .then(function (res) {
        if (res.statusCode !== 201) {
            return Bluebird.reject(new incident_1.Incident("net", "Unable to subscribe to resources"));
        }
        // Example response:
        // {
        //   "statusCode": 201,
        //   "body": "{}",
        //   "headers": {
        //     "cache-control": "no-store, must-revalidate, no-cache",
        //       "pragma": "no-cache",
        //       "content-length": "2",
        //       "content-type": "application/json; charset=utf-8",
        //       "location": "https://db5-client-s.gateway.messenger.live.com/v1/users/ME/endpoints/SELF/subscriptions/0",
        //       "x-content-type-options": "nosniff",
        //       "contextid": "tcid=3434983151221922702,server=DB5SCH101121535",
        //       "date": "Sat, 14 May 2016 16:41:17 GMT",
        //       "connection": "close"
        //   }
        // }
        return Bluebird.resolve(null);
    });
}
function createPresenceDocs(ioOptions, registrationToken) {
    return Bluebird
        .try(function () {
        if (!registrationToken.endpointId) {
            return Bluebird.reject(new incident_1.Incident("Missing endpoint id in registration token"));
        }
        // this is the exact json that is needed to register endpoint for setting of status.
        // TODO: typedef
        // tslint:disable-next-line:typedef
        var requestBody = {
            id: "endpointMessagingService",
            type: "EndpointPresenceDoc",
            selfLink: "uri",
            privateInfo: {
                epname: "skype" // Name of the endpoint (normally the name of the host)
            },
            publicInfo: {
                capabilities: "video|audio",
                type: 1,
                skypeNameVersion: Consts.SKYPEWEB_CLIENTINFO_NAME,
                nodeInfo: "xx",
                version: Consts.SKYPEWEB_CLIENTINFO_VERSION + "//" + Consts.SKYPEWEB_CLIENTINFO_NAME
            }
        };
        var uri = messagesUri.endpointMessagingService(registrationToken.host, messagesUri.DEFAULT_USER, registrationToken.endpointId);
        var requestOptions = {
            uri: uri,
            jar: ioOptions.jar,
            body: JSON.stringify(requestBody),
            headers: {
                RegistrationToken: registrationToken.raw
            }
        };
        return ioOptions.io.put(requestOptions);
    })
        .then(function (res) {
        if (res.statusCode !== 200) {
            return Bluebird.reject(new incident_1.Incident("net", "Unable to create presence endpoint"));
        }
        return Bluebird.resolve(null);
    });
}
exports.default = login;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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VSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxtQkFBUSxDQUFDLEtBQUssRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELGtCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJsaWIvbG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcbmltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSBcInJlcXVlc3RcIjtcclxuaW1wb3J0IHtwYXJzZSBhcyBwYXJzZVVyaSwgVXJsfSBmcm9tIFwidXJsXCI7XHJcbmltcG9ydCAqIGFzIENvbnN0cyBmcm9tIFwiLi9jb25zdHNcIjtcclxuaW1wb3J0IHtDcmVkZW50aWFsc30gZnJvbSBcIi4vaW50ZXJmYWNlcy9hcGkvYXBpXCI7XHJcbmltcG9ydCB7Q29udGV4dCBhcyBBcGlDb250ZXh0LCBSZWdpc3RyYXRpb25Ub2tlbiwgU2t5cGVUb2tlbn0gZnJvbSBcIi4vaW50ZXJmYWNlcy9hcGkvY29udGV4dFwiO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tIFwiLi9pbnRlcmZhY2VzL2lvXCI7XHJcbmltcG9ydCB7RGljdGlvbmFyeX0gZnJvbSBcIi4vaW50ZXJmYWNlcy91dGlsc1wiO1xyXG5pbXBvcnQgKiBhcyBtZXNzYWdlc1VyaSBmcm9tIFwiLi9tZXNzYWdlcy11cmlcIjtcclxuaW1wb3J0ICogYXMgbWljcm9zb2Z0QWNjb3VudCBmcm9tIFwiLi9wcm92aWRlcnMvbWljcm9zb2Z0LWFjY291bnRcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuaW1wb3J0IHtobWFjU2hhMjU2fSBmcm9tIFwiLi91dGlscy9obWFjLXNoYTI1NlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dpbk9wdGlvbnMge1xyXG4gIGlvOiBpby5IdHRwSW87XHJcbiAgY3JlZGVudGlhbHM6IENyZWRlbnRpYWxzO1xyXG4gIHZlcmJvc2U/OiBib29sZWFuO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgTG9naW5LZXlzIHtcclxuICBwaWU6IHN0cmluZztcclxuICBldG06IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIFNreXBlVG9rZW5SZXF1ZXN0IHtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgcGllOiBzdHJpbmc7XHJcbiAgZXRtOiBzdHJpbmc7XHJcbiAgdGltZXpvbmVfZmllbGQ6IHN0cmluZztcclxuICBqc190aW1lOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJb09wdGlvbnMge1xyXG4gIGlvOiBpby5IdHRwSW87XHJcbiAgamFyOiByZXF1ZXN0LkNvb2tpZUphcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkcyBhbiBBcGkgY29udGV4dCB0cm91Z2ggYSBuZXcgYXV0aGVudGljYXRpb24uXHJcbiAqIFRoaXMgaW52b2x2ZXMgdGhlIHJlcXVlc3RzOlxyXG4gKiBHRVQgPGxvZ2luVXJsPiB0byBzY3JhcCB0aGUgTG9naW5LZXlzIChwaWUgJiBldG0pXHJcbiAqIFBPU1QgPGxvZ2luVXJsPiB0byBnZXQgdGhlIFNreXBlVG9rZW4gZnJvbSB0aGUgY3JlZGVudGlhbHMgYW5kIExvZ2luS2V5c1xyXG4gKiBQT1NUIDxyZWdpc3RyYXRpb25Vcmw+IHRvIGdldCBSZWdpc3RyYXRpb25Ub2tlbiBmcm9tIHRoZSBTa3lwZVRva2VuXHJcbiAqICAgRXZlbnR1YWxseSwgZm9sbG93IGEgcmVkaXJlY3Rpb24gdG8gdXNlIHRoZSBhc3NpZ25lZCBob3N0XHJcbiAqIFBPU1QgPHN1YnNjcmlwdGlvbj4gdG8gZ2FpbiBhY2Nlc3MgdG8gcmVzb3VyY2VzIHdpdGggdGhlIFJlZ2lzdHJhdGlvblRva2VuXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtCbHVlYmlyZDxBcGlDb250ZXh0Pn1cclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihvcHRpb25zOiBMb2dpbk9wdGlvbnMpOiBQcm9taXNlPEFwaUNvbnRleHQ+IHtcclxuICBjb25zdCBqYXI6IHJlcXVlc3QuQ29va2llSmFyID0gcmVxdWVzdC5qYXIoKTtcclxuICBjb25zdCBpb09wdGlvbnM6IElvT3B0aW9ucyA9IHtpbzogb3B0aW9ucy5pbywgamFyOiBqYXJ9O1xyXG5cclxuICBjb25zdCBnZXRTa3lwZVRva2VuT3B0aW9uczogbWljcm9zb2Z0QWNjb3VudC5HZXRTa3lwZVRva2VuT3B0aW9ucyA9IHtcclxuICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgIGxvZ2luOiBvcHRpb25zLmNyZWRlbnRpYWxzLnVzZXJuYW1lLFxyXG4gICAgICBwYXNzd29yZDogb3B0aW9ucy5jcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgfSxcclxuICAgIGh0dHBJbzogb3B0aW9ucy5pbyxcclxuICAgIGNvb2tpZUphcjogamFyXHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2t5cGVUb2tlbjogU2t5cGVUb2tlbiA9IGF3YWl0IG1pY3Jvc29mdEFjY291bnQuZ2V0U2t5cGVUb2tlbihnZXRTa3lwZVRva2VuT3B0aW9ucyk7XHJcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJBY3F1aXJlZCBTa3lwZVRva2VuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVnaXN0cmF0aW9uVG9rZW46IFJlZ2lzdHJhdGlvblRva2VuID0gYXdhaXQgZ2V0UmVnaXN0cmF0aW9uVG9rZW4oXHJcbiAgICBpb09wdGlvbnMsXHJcbiAgICBza3lwZVRva2VuLFxyXG4gICAgQ29uc3RzLlNLWVBFV0VCX0RFRkFVTFRfTUVTU0FHRVNfSE9TVFxyXG4gICk7XHJcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJBY3F1aXJlZCBSZWdpc3RyYXRpb25Ub2tlblwiKTtcclxuICB9XHJcblxyXG4gIGF3YWl0IHN1YnNjcmliZVRvUmVzb3VyY2VzKGlvT3B0aW9ucywgcmVnaXN0cmF0aW9uVG9rZW4pO1xyXG4gIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiU3Vic2NyaWJlZCB0byByZXNvdXJjZXNcIik7XHJcbiAgfVxyXG5cclxuICBhd2FpdCBjcmVhdGVQcmVzZW5jZURvY3MoaW9PcHRpb25zLCByZWdpc3RyYXRpb25Ub2tlbik7XHJcbiAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJDcmVhdGVkIHByZXNlbmNlIGRvY3NcIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdXNlcm5hbWU6IG9wdGlvbnMuY3JlZGVudGlhbHMudXNlcm5hbWUsXHJcbiAgICBza3lwZVRva2VuOiBza3lwZVRva2VuLFxyXG4gICAgY29va2llSmFyOiBqYXIsXHJcbiAgICByZWdpc3RyYXRpb25Ub2tlbjogcmVnaXN0cmF0aW9uVG9rZW5cclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMb2NrQW5kS2V5UmVzcG9uc2UodGltZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICBjb25zdCBpbnB1dEJ1ZmZlcjogQnVmZmVyID0gQnVmZmVyLmZyb20oU3RyaW5nKHRpbWUpLCBcInV0ZjhcIik7XHJcbiAgY29uc3QgYXBwSWRCdWZmZXI6IEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKENvbnN0cy5TS1lQRVdFQl9MT0NLQU5ES0VZX0FQUElELCBcInV0ZjhcIik7XHJcbiAgY29uc3Qgc2VjcmV0QnVmZmVyOiBCdWZmZXIgPSBCdWZmZXIuZnJvbShDb25zdHMuU0tZUEVXRUJfTE9DS0FOREtFWV9TRUNSRVQsIFwidXRmOFwiKTtcclxuICByZXR1cm4gaG1hY1NoYTI1NihpbnB1dEJ1ZmZlciwgYXBwSWRCdWZmZXIsIHNlY3JldEJ1ZmZlcik7XHJcbn1cclxuXHJcbi8vIEdldCB0aGUgdG9rZW4gdXNlZCB0byBzdWJzY3JpYmUgdG8gcmVzb3VyY2VzXHJcbmZ1bmN0aW9uIGdldFJlZ2lzdHJhdGlvblRva2VuKG9wdGlvbnM6IElvT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2t5cGVUb2tlbjogU2t5cGVUb2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNIb3N0OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHJ5OiBudW1iZXIgPSAyKTogQmx1ZWJpcmQ8UmVnaXN0cmF0aW9uVG9rZW4+IHtcclxuICByZXR1cm4gQmx1ZWJpcmRcclxuICAgIC50cnkoKCkgPT4ge1xyXG4gICAgICBjb25zdCBzdGFydFRpbWU6IG51bWJlciA9IHV0aWxzLmdldEN1cnJlbnRUaW1lKCk7XHJcbiAgICAgIGNvbnN0IGxvY2tBbmRLZXlSZXNwb25zZTogc3RyaW5nID0gZ2V0TG9ja0FuZEtleVJlc3BvbnNlKHN0YXJ0VGltZSk7XHJcbiAgICAgIGNvbnN0IGhlYWRlcnM6IERpY3Rpb25hcnk8c3RyaW5nPiA9IHtcclxuICAgICAgICBMb2NrQW5kS2V5OiB1dGlscy5zdHJpbmdpZnlIZWFkZXJQYXJhbXMoe1xyXG4gICAgICAgICAgYXBwSWQ6IENvbnN0cy5TS1lQRVdFQl9MT0NLQU5ES0VZX0FQUElELFxyXG4gICAgICAgICAgdGltZTogU3RyaW5nKHN0YXJ0VGltZSksXHJcbiAgICAgICAgICBsb2NrQW5kS2V5UmVzcG9uc2U6IGxvY2tBbmRLZXlSZXNwb25zZVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIENsaWVudEluZm86IHV0aWxzLnN0cmluZ2lmeUhlYWRlclBhcmFtcyh7XHJcbiAgICAgICAgICBvczogXCJXaW5kb3dzXCIsXHJcbiAgICAgICAgICBvc1ZlcjogXCIxMFwiLFxyXG4gICAgICAgICAgcHJvYzogXCJXaW42NFwiLFxyXG4gICAgICAgICAgbGNpZDogXCJlbi11c1wiLFxyXG4gICAgICAgICAgZGV2aWNlVHlwZTogXCIxXCIsXHJcbiAgICAgICAgICBjb3VudHJ5OiBcIm4vYVwiLFxyXG4gICAgICAgICAgY2xpZW50TmFtZTogQ29uc3RzLlNLWVBFV0VCX0NMSUVOVElORk9fTkFNRSxcclxuICAgICAgICAgIGNsaWVudFZlcjogQ29uc3RzLlNLWVBFV0VCX0NMSUVOVElORk9fVkVSU0lPTlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIEF1dGhlbnRpY2F0aW9uOiB1dGlscy5zdHJpbmdpZnlIZWFkZXJQYXJhbXMoe1xyXG4gICAgICAgICAgc2t5cGV0b2tlbjogc2t5cGVUb2tlbi52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogaW8uUG9zdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiBtZXNzYWdlc1VyaS5lbmRwb2ludHMobWVzc2FnZXNIb3N0KSxcclxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxyXG4gICAgICAgIGphcjogb3B0aW9ucy5qYXIsXHJcbiAgICAgICAgYm9keTogXCJ7fVwiIC8vIFNreXBlIHJlcXVpcmVzIHlvdSB0byBzZW5kIGFuIGVtcHR5IG9iamVjdCBhcyBhIGJvZHlcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKG9wdGlvbnMuaW8ucG9zdChyZXF1ZXN0T3B0aW9ucykpXHJcbiAgICAgICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAxICYmIHJlcy5zdGF0dXNDb2RlICE9PSAzMDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJsdWViaXJkLnJlamVjdChuZXcgSW5jaWRlbnQoXCJuZXRcIiwgXCJVbmFibGUgdG8gcmVnaXN0ZXIgYW4gZW5kcG9pbnRcIikpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gVE9ETzogaGFuZGxlIHN0YXR1c0NvZGUgMjAxICYgMzAxXHJcblxyXG4gICAgICAgICAgY29uc3QgbG9jYXRpb25IZWFkZXI6IHN0cmluZyA9IHJlcy5oZWFkZXJzW1wibG9jYXRpb25cIl07XHJcblxyXG4gICAgICAgICAgY29uc3QgbG9jYXRpb246IFVybCA9IHBhcnNlVXJpKGxvY2F0aW9uSGVhZGVyKTsgLy8gVE9ETzogcGFyc2UgaW4gbWVzc2FnZXMtdXJpLnRzXHJcbiAgICAgICAgICBpZiAobG9jYXRpb24uaG9zdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbmNpZGVudChcInBhcnNlLWVycm9yXCIsIFwiRXhwZWN0ZWQgbG9jYXRpb24gdG8gZGVmaW5lIGhvc3RcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAobG9jYXRpb24uaG9zdCAhPT0gbWVzc2FnZXNIb3N0KSB7IC8vIG1haW5seSB3aGVuIDMwMSwgYnV0IHNvbWV0aW1lcyB3aGVuIDIwMVxyXG4gICAgICAgICAgICBtZXNzYWdlc0hvc3QgPSBsb2NhdGlvbi5ob3N0O1xyXG4gICAgICAgICAgICBpZiAocmV0cnkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGdldFJlZ2lzdHJhdGlvblRva2VuKG9wdGlvbnMsIHNreXBlVG9rZW4sIG1lc3NhZ2VzSG9zdCwgcmV0cnktLSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIEJsdWViaXJkLnJlamVjdChuZXcgSW5jaWRlbnQoXCJuZXRcIiwgXCJFeGNlZWRlZCBtYXggdHJpZXNcIikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gcmVnaXN0cmF0aW9uVG9rZW5IZWFkZXIgaXMgbGlrZSBcInJlZ2lzdHJhdGlvblRva2VuPXNvbWVTdHJpbmc7IGV4cGlyZXM9c29tZU51bWJlcjsgZW5kcG9pbnRJZD17c29tZVN0cmluZ31cIlxyXG4gICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uVG9rZW5IZWFkZXI6IHN0cmluZyA9IHJlcy5oZWFkZXJzW1wic2V0LXJlZ2lzdHJhdGlvbnRva2VuXCJdO1xyXG4gICAgICAgICAgY29uc3QgcGFyc2VkSGVhZGVyOiBEaWN0aW9uYXJ5PHN0cmluZz4gPSB1dGlscy5wYXJzZUhlYWRlclBhcmFtcyhyZWdpc3RyYXRpb25Ub2tlbkhlYWRlcik7XHJcblxyXG4gICAgICAgICAgaWYgKCFwYXJzZWRIZWFkZXJbXCJyZWdpc3RyYXRpb25Ub2tlblwiXSB8fCAhcGFyc2VkSGVhZGVyW1wiZXhwaXJlc1wiXSB8fCAhcGFyc2VkSGVhZGVyW1wiZW5kcG9pbnRJZFwiXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcInByb3RvY29sXCIsIFwiTWlzc2luZyBwYXJhbWV0ZXJzIGZvciB0aGUgcmVnaXN0cmF0aW9uVG9rZW5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGV4cGlyZXM6IG51bWJlciA9IHBhcnNlSW50KHBhcnNlZEhlYWRlcltcImV4cGlyZXNcIl0sIDEwKTsgLy8gaW4gc2Vjb25kc1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvblRva2VuOiBSZWdpc3RyYXRpb25Ub2tlbiA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IHBhcnNlZEhlYWRlcltcInJlZ2lzdHJhdGlvblRva2VuXCJdLFxyXG4gICAgICAgICAgICBleHBpcmF0aW9uRGF0ZTogbmV3IERhdGUoMTAwMCAqIGV4cGlyZXMpLFxyXG4gICAgICAgICAgICBlbmRwb2ludElkOiBwYXJzZWRIZWFkZXJbXCJlbmRwb2ludElkXCJdLFxyXG4gICAgICAgICAgICByYXc6IHJlZ2lzdHJhdGlvblRva2VuSGVhZGVyLFxyXG4gICAgICAgICAgICBob3N0OiBtZXNzYWdlc0hvc3RcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmV0dXJuIEJsdWViaXJkLnJlc29sdmUocmVnaXN0cmF0aW9uVG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1YnNjcmliZVRvUmVzb3VyY2VzKGlvT3B0aW9uczogSW9PcHRpb25zLCByZWdpc3RyYXRpb25Ub2tlbjogUmVnaXN0cmF0aW9uVG9rZW4pOiBCbHVlYmlyZDxhbnk+IHtcclxuICAvLyBUT0RPKGRlbXVyZ29zKTogdHlwZWRlZlxyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0eXBlZGVmXHJcbiAgY29uc3QgcmVxdWVzdERvY3VtZW50ID0ge1xyXG4gICAgaW50ZXJlc3RlZFJlc291cmNlczogW1xyXG4gICAgICBcIi92MS90aHJlYWRzL0FMTFwiLFxyXG4gICAgICBcIi92MS91c2Vycy9NRS9jb250YWN0cy9BTExcIixcclxuICAgICAgXCIvdjEvdXNlcnMvTUUvY29udmVyc2F0aW9ucy9BTEwvbWVzc2FnZXNcIixcclxuICAgICAgXCIvdjEvdXNlcnMvTUUvY29udmVyc2F0aW9ucy9BTEwvcHJvcGVydGllc1wiXHJcbiAgICBdLFxyXG4gICAgdGVtcGxhdGU6IFwicmF3XCIsXHJcbiAgICBjaGFubmVsVHlwZTogXCJodHRwTG9uZ1BvbGxcIi8vIFRPRE86IHVzZSB3ZWJzb2NrZXRzID9cclxuICB9O1xyXG5cclxuICBjb25zdCByZXF1ZXN0T3B0aW9uczogaW8uUG9zdE9wdGlvbnMgPSB7XHJcbiAgICB1cmk6IG1lc3NhZ2VzVXJpLnN1YnNjcmlwdGlvbnMocmVnaXN0cmF0aW9uVG9rZW4uaG9zdCksXHJcbiAgICBqYXI6IGlvT3B0aW9ucy5qYXIsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0RG9jdW1lbnQpLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBSZWdpc3RyYXRpb25Ub2tlbjogcmVnaXN0cmF0aW9uVG9rZW4ucmF3XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIEJsdWViaXJkLnJlc29sdmUoaW9PcHRpb25zLmlvLnBvc3QocmVxdWVzdE9wdGlvbnMpKVxyXG4gICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDEpIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcIm5ldFwiLCBcIlVuYWJsZSB0byBzdWJzY3JpYmUgdG8gcmVzb3VyY2VzXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRXhhbXBsZSByZXNwb25zZTpcclxuICAgICAgLy8ge1xyXG4gICAgICAvLyAgIFwic3RhdHVzQ29kZVwiOiAyMDEsXHJcbiAgICAgIC8vICAgXCJib2R5XCI6IFwie31cIixcclxuICAgICAgLy8gICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAvLyAgICAgXCJjYWNoZS1jb250cm9sXCI6IFwibm8tc3RvcmUsIG11c3QtcmV2YWxpZGF0ZSwgbm8tY2FjaGVcIixcclxuICAgICAgLy8gICAgICAgXCJwcmFnbWFcIjogXCJuby1jYWNoZVwiLFxyXG4gICAgICAvLyAgICAgICBcImNvbnRlbnQtbGVuZ3RoXCI6IFwiMlwiLFxyXG4gICAgICAvLyAgICAgICBcImNvbnRlbnQtdHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIixcclxuICAgICAgLy8gICAgICAgXCJsb2NhdGlvblwiOiBcImh0dHBzOi8vZGI1LWNsaWVudC1zLmdhdGV3YXkubWVzc2VuZ2VyLmxpdmUuY29tL3YxL3VzZXJzL01FL2VuZHBvaW50cy9TRUxGL3N1YnNjcmlwdGlvbnMvMFwiLFxyXG4gICAgICAvLyAgICAgICBcIngtY29udGVudC10eXBlLW9wdGlvbnNcIjogXCJub3NuaWZmXCIsXHJcbiAgICAgIC8vICAgICAgIFwiY29udGV4dGlkXCI6IFwidGNpZD0zNDM0OTgzMTUxMjIxOTIyNzAyLHNlcnZlcj1EQjVTQ0gxMDExMjE1MzVcIixcclxuICAgICAgLy8gICAgICAgXCJkYXRlXCI6IFwiU2F0LCAxNCBNYXkgMjAxNiAxNjo0MToxNyBHTVRcIixcclxuICAgICAgLy8gICAgICAgXCJjb25uZWN0aW9uXCI6IFwiY2xvc2VcIlxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfVxyXG5cclxuICAgICAgcmV0dXJuIEJsdWViaXJkLnJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUHJlc2VuY2VEb2NzKGlvT3B0aW9uczogSW9PcHRpb25zLCByZWdpc3RyYXRpb25Ub2tlbjogUmVnaXN0cmF0aW9uVG9rZW4pOiBCbHVlYmlyZDxhbnk+IHtcclxuICByZXR1cm4gQmx1ZWJpcmRcclxuICAgIC50cnkoKCkgPT4ge1xyXG4gICAgICBpZiAoIXJlZ2lzdHJhdGlvblRva2VuLmVuZHBvaW50SWQpIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcIk1pc3NpbmcgZW5kcG9pbnQgaWQgaW4gcmVnaXN0cmF0aW9uIHRva2VuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdGhpcyBpcyB0aGUgZXhhY3QganNvbiB0aGF0IGlzIG5lZWRlZCB0byByZWdpc3RlciBlbmRwb2ludCBmb3Igc2V0dGluZyBvZiBzdGF0dXMuXHJcbiAgICAgIC8vIFRPRE86IHR5cGVkZWZcclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnR5cGVkZWZcclxuICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XHJcbiAgICAgICAgaWQ6IFwiZW5kcG9pbnRNZXNzYWdpbmdTZXJ2aWNlXCIsXHJcbiAgICAgICAgdHlwZTogXCJFbmRwb2ludFByZXNlbmNlRG9jXCIsXHJcbiAgICAgICAgc2VsZkxpbms6IFwidXJpXCIsXHJcbiAgICAgICAgcHJpdmF0ZUluZm86IHtcclxuICAgICAgICAgIGVwbmFtZTogXCJza3lwZVwiIC8vIE5hbWUgb2YgdGhlIGVuZHBvaW50IChub3JtYWxseSB0aGUgbmFtZSBvZiB0aGUgaG9zdClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHB1YmxpY0luZm86IHtcclxuICAgICAgICAgIGNhcGFiaWxpdGllczogXCJ2aWRlb3xhdWRpb1wiLFxyXG4gICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgIHNreXBlTmFtZVZlcnNpb246IENvbnN0cy5TS1lQRVdFQl9DTElFTlRJTkZPX05BTUUsXHJcbiAgICAgICAgICBub2RlSW5mbzogXCJ4eFwiLFxyXG4gICAgICAgICAgdmVyc2lvbjogQ29uc3RzLlNLWVBFV0VCX0NMSUVOVElORk9fVkVSU0lPTiArIFwiLy9cIiArIENvbnN0cy5TS1lQRVdFQl9DTElFTlRJTkZPX05BTUVcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCB1cmk6IHN0cmluZyA9IG1lc3NhZ2VzVXJpLmVuZHBvaW50TWVzc2FnaW5nU2VydmljZShcclxuICAgICAgICByZWdpc3RyYXRpb25Ub2tlbi5ob3N0LFxyXG4gICAgICAgIG1lc3NhZ2VzVXJpLkRFRkFVTFRfVVNFUixcclxuICAgICAgICByZWdpc3RyYXRpb25Ub2tlbi5lbmRwb2ludElkXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogaW8uUHV0T3B0aW9ucyA9IHtcclxuICAgICAgICB1cmk6IHVyaSxcclxuICAgICAgICBqYXI6IGlvT3B0aW9ucy5qYXIsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFJlZ2lzdHJhdGlvblRva2VuOiByZWdpc3RyYXRpb25Ub2tlbi5yYXdcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gaW9PcHRpb25zLmlvLnB1dChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcIm5ldFwiLCBcIlVuYWJsZSB0byBjcmVhdGUgcHJlc2VuY2UgZW5kcG9pbnRcIikpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvZ2luO1xyXG4iXX0=
