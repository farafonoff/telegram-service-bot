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
var cheerio = require("cheerio");
var path = require("path");
var tough_cookie_1 = require("tough-cookie");
var url = require("url");
exports.skypeWebUri = "https://web.skype.com/";
exports.skypeLoginUri = "https://login.skype.com/login/";
exports.liveLoginUri = "https://login.live.com/";
exports.webClientLiveLoginId = "578134";
function getSkypeToken(options) {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, liveKeys, sendCredOpts, liveToken, stOpt, res, scrapped, expiresIn, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = Date.now();
                    return [4 /*yield*/, getLiveKeys(options)];
                case 1:
                    liveKeys = _a.sent();
                    sendCredOpts = {
                        username: options.credentials.login,
                        password: options.credentials.password,
                        httpIo: options.httpIo,
                        jar: options.cookieJar,
                        liveKeys: liveKeys
                    };
                    return [4 /*yield*/, getLiveToken(sendCredOpts)];
                case 2:
                    liveToken = _a.sent();
                    stOpt = {
                        liveToken: liveToken,
                        jar: options.cookieJar,
                        httpIo: options.httpIo
                    };
                    return [4 /*yield*/, requestSkypeToken(stOpt)];
                case 3:
                    res = _a.sent();
                    scrapped = scrapSkypeTokenResponse(res.body);
                    expiresIn = typeof scrapped.expires_in === "number" ? scrapped.expires_in : 864000;
                    result = {
                        value: scrapped.skypetoken,
                        expirationDate: new Date(startTime + expiresIn * 1000)
                    };
                    if (typeof result.value !== "string") {
                        throw new Error("Expected value of Skype token to be a string");
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.getSkypeToken = getSkypeToken;
function getLiveKeys(options) {
    return __awaiter(this, void 0, void 0, function () {
        var response, mspRequ, mspOk, cookies, _i, cookies_1, cookie, ppftKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestLiveKeys(options)];
                case 1:
                    response = _a.sent();
                    cookies = options.cookieJar.getCookies("https://login.live.com/");
                    for (_i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
                        cookie = cookies_1[_i];
                        switch (cookie.key) {
                            case "MSPRequ":
                                mspRequ = cookie.value;
                                break;
                            case "MSPOK":
                                mspOk = cookie.value;
                                break;
                        }
                    }
                    if (mspOk === undefined || mspRequ === undefined) {
                        throw new Error("Unable to find cookie MSPRequ or MSPOK");
                    }
                    ppftKey = scrapLivePpftKey(response.body);
                    return [2 /*return*/, {
                            MSPRequ: mspRequ,
                            MSPOK: mspOk,
                            PPFT: ppftKey
                        }];
            }
        });
    });
}
exports.getLiveKeys = getLiveKeys;
function requestLiveKeys(options) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, queryString, getOptions;
        return __generator(this, function (_a) {
            uri = url.resolve(exports.skypeLoginUri, path.posix.join("oauth", "microsoft"));
            queryString = {
                client_id: exports.webClientLiveLoginId,
                redirect_uri: exports.skypeWebUri
            };
            getOptions = { uri: uri, queryString: queryString, jar: options.cookieJar };
            // Also, now the Jar should contain:
            // MSPRequ
            // MSPOK
            return [2 /*return*/, options.httpIo.get(getOptions)];
        });
    });
}
exports.requestLiveKeys = requestLiveKeys;
// TODO: parse HTML, JS and traverse AST
function scrapLivePpftKey(html) {
    // tslint:disable-next-line:max-line-length
    var ppftRegExp = /<input\s+type="hidden"\s+name="PPFT"\s+id="i0327"\s+value="([\!*0-9a-zA-Z]+\${1,2})"\s*\/>/;
    var regExpResult = ppftRegExp.exec(html);
    if (regExpResult === null) {
        throw new Error("Unable to scrap PPFT key");
    }
    if (regExpResult.length !== 2) {
        throw new Error("Expected regExpResult length to be exactly 2");
    }
    return regExpResult[1];
}
exports.scrapLivePpftKey = scrapLivePpftKey;
function getLiveToken(options) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestLiveToken(options)];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, scrapLiveToken(response.body)];
            }
        });
    });
}
exports.getLiveToken = getLiveToken;
// Get live token from live keys and credentials
function requestLiveToken(options) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, queryString, jar, millisecondsSinceEpoch, ckTstCookie, formData, postOptions;
        return __generator(this, function (_a) {
            uri = url.resolve(exports.liveLoginUri, path.posix.join("ppsecure", "post.srf"));
            queryString = {
                wa: "wsignin1.0",
                wp: "MBI_SSL",
                // tslint:disable-next-line:max-line-length
                wreply: "https://lw.skype.com/login/oauth/proxy?client_id=578134&site_name=lw.skype.com&redirect_uri=https%3A%2F%2Fweb.skype.com%2F"
            };
            jar = options.jar;
            millisecondsSinceEpoch = Date.now();
            ckTstCookie = new tough_cookie_1.Cookie({
                key: "CkTst",
                value: millisecondsSinceEpoch.toString(10)
            });
            jar.setCookie(ckTstCookie, "https://login.live.com/");
            formData = {
                login: options.username,
                passwd: options.password,
                PPFT: options.liveKeys.PPFT
            };
            postOptions = {
                uri: uri,
                queryString: queryString,
                jar: jar,
                form: formData
            };
            return [2 /*return*/, options.httpIo.post(postOptions)];
        });
    });
}
exports.requestLiveToken = requestLiveToken;
/**
 * Scrap the result of a sendCredentials requests to retrieve the value of the `t` paramater
 * @param html
 * @returns {string}
 */
function scrapLiveToken(html) {
    var $ = cheerio.load(html);
    var tokenNode = $("#t");
    var tokenValue = tokenNode.val();
    if (tokenValue === "") {
        throw new Error("Unable to scrap token");
    }
    return tokenValue;
}
exports.scrapLiveToken = scrapLiveToken;
// Get Skype token from Live token
function requestSkypeToken(options) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, queryString, formData, postOptions;
        return __generator(this, function (_a) {
            uri = url.resolve(exports.skypeLoginUri, "microsoft");
            queryString = {
                client_id: "578134",
                redirect_uri: "https://web.skype.com"
            };
            formData = {
                t: options.liveToken,
                client_id: "578134",
                oauthPartner: "999",
                site_name: "lw.skype.com",
                redirect_uri: "https://web.skype.com"
            };
            postOptions = {
                uri: uri,
                queryString: queryString,
                form: formData
            };
            return [2 /*return*/, options.httpIo.post(postOptions)];
        });
    });
}
exports.requestSkypeToken = requestSkypeToken;
/**
 * Scrap to get the Skype token
 *
 * @param html
 * @returns {string}
 */
function scrapSkypeTokenResponse(html) {
    var $ = cheerio.load(html);
    var skypeTokenNode = $("input[name=skypetoken]");
    // In seconds
    var expiresInNode = $("input[name=expires_in]");
    var skypeToken = skypeTokenNode.val();
    var expiresIn = parseInt(expiresInNode.val(), 10);
    // if (!skypetoken || !expires_in) {
    //   const skypeErrorMessage = $(".message_error").text();
    //   const errorName = "authentication-failed";
    //   const errorMessage = "Failed to get skypetoken. Username or password is incorrect OR you've hit a CAPTCHA wall.";
    //   if (skypeErrorMessage) {
    //     const skypeError = new Incident("skype-error", skypeErrorMessage);
    //     throw new Incident(skypeError, errorName, errorMessage);
    //   } else {
    //     throw new Incident(errorName, errorMessage);
    //   }
    // }
    // return result;
    return {
        skypetoken: skypeToken,
        expires_in: expiresIn
    };
}
exports.scrapSkypeTokenResponse = scrapSkypeTokenResponse;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9wcm92aWRlcnMvbWljcm9zb2Z0LWFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFvQztBQUNwQywyQkFBNkI7QUFFN0IsNkNBQW9DO0FBQ3BDLHlCQUEyQjtBQUtkLFFBQUEsV0FBVyxHQUFXLHdCQUF3QixDQUFDO0FBQy9DLFFBQUEsYUFBYSxHQUFXLGdDQUFnQyxDQUFDO0FBQ3pELFFBQUEsWUFBWSxHQUFXLHlCQUF5QixDQUFDO0FBQ2pELFFBQUEsb0JBQW9CLEdBQVcsUUFBUSxDQUFDO0FBZ0NyRCx1QkFBb0MsT0FBNkI7O1lBQ3pELFNBQVMsWUFHVCxZQUFZLGFBVVosS0FBSyxPQVFMLFFBQVEsRUFFUixTQUFTLEVBRVQsTUFBTTs7OztnQ0F6QmMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFFVCxxQkFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUE7OytCQUExQixTQUEwQjttQ0FDUjt3QkFDM0MsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSzt3QkFDbkMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUTt3QkFDdEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO3dCQUN0QixHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVM7d0JBQ3RCLFFBQVEsVUFBQTtxQkFDVDtvQkFFeUIscUJBQU0sWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFBOztnQ0FBaEMsU0FBZ0M7NEJBRVQ7d0JBQy9DLFNBQVMsV0FBQTt3QkFDVCxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVM7d0JBQ3RCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtxQkFDdkI7b0JBRXdCLHFCQUFNLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFBOzswQkFBOUIsU0FBOEI7K0JBRWxCLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0NBRTVDLE9BQU8sUUFBUSxDQUFDLFVBQVUsS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNOzZCQUVyRTt3QkFDekIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVO3dCQUMxQixjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUM7cUJBQ3ZEO29CQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7b0JBQ2xFLENBQUM7b0JBRUQsc0JBQU8sTUFBTSxFQUFDOzs7O0NBQ2Y7QUFwQ0Qsc0NBb0NDO0FBZ0NELHFCQUFrQyxPQUE0Qjs7c0JBR3hELE9BQU8sRUFDUCxLQUFLLEVBR0gsT0FBTyxpQkFDRixNQUFNLEVBZVgsT0FBTzs7O3dCQXRCaUIscUJBQU0sZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFBOzsrQkFBOUIsU0FBOEI7OEJBTWxDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDO29CQUNqRixHQUFHLENBQUMsOEJBQWlCLHFCQUFPLEVBQVAsSUFBTzs7d0JBQzFCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixLQUFLLFNBQVM7Z0NBQ1osT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0NBQ3ZCLEtBQUssQ0FBQzs0QkFDUixLQUFLLE9BQU87Z0NBQ1YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0NBQ3JCLEtBQUssQ0FBQzt3QkFDVixDQUFDO3FCQUNGO29CQUVELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztvQkFDNUQsQ0FBQzs4QkFFdUIsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDdkQsc0JBQU87NEJBQ0wsT0FBTyxFQUFFLE9BQU87NEJBQ2hCLEtBQUssRUFBRSxLQUFLOzRCQUNaLElBQUksRUFBRSxPQUFPO3lCQUNkLEVBQUM7Ozs7Q0FDSDtBQTdCRCxrQ0E2QkM7QUFFRCx5QkFBc0MsT0FBNEI7O1lBQzFELEdBQUcsRUFDSCxXQUFXLEVBSVgsVUFBVTs7a0JBTEksR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQzswQkFDN0M7Z0JBQ3RDLFNBQVMsRUFBRSw0QkFBb0I7Z0JBQy9CLFlBQVksRUFBRSxtQkFBVzthQUMxQjt5QkFDaUMsRUFBQyxHQUFHLEtBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBQztZQUM1RSxvQ0FBb0M7WUFDcEMsVUFBVTtZQUNWLFFBQVE7WUFDUixzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBQzs7O0NBQ3ZDO0FBWEQsMENBV0M7QUFFRCx3Q0FBd0M7QUFDeEMsMEJBQWlDLElBQVk7SUFDM0MsMkNBQTJDO0lBQzNDLElBQU0sVUFBVSxHQUFXLDRGQUE0RixDQUFDO0lBQ3hILElBQU0sWUFBWSxHQUEyQixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRW5FLEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBZEQsNENBY0M7QUFVRCxzQkFBbUMsT0FBK0I7Ozs7O3dCQUNsQyxxQkFBTSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBQTs7K0JBQS9CLFNBQStCO29CQUM3RCxzQkFBTyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDOzs7O0NBQ3RDO0FBSEQsb0NBR0M7QUFFRCxnREFBZ0Q7QUFDaEQsMEJBQXdDLE9BQStCOztZQUMvRCxHQUFHLEVBQ0gsV0FBVyxFQU1YLEdBQUcsRUFHSCxzQkFBc0IsRUFDdEIsV0FBVyxFQU1YLFFBQVEsRUFNUixXQUFXOztrQkF2QkcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzswQkFDOUM7Z0JBQ3RDLEVBQUUsRUFBRSxZQUFZO2dCQUNoQixFQUFFLEVBQUUsU0FBUztnQkFDYiwyQ0FBMkM7Z0JBQzNDLE1BQU0sRUFBRSw0SEFBNEg7YUFDckk7a0JBQ3NCLE9BQU8sQ0FBQyxHQUFHO3FDQUdLLElBQUksQ0FBQyxHQUFHLEVBQUU7MEJBQ3JCLElBQVcscUJBQU8sQ0FBQztnQkFDN0MsR0FBRyxFQUFFLE9BQU87Z0JBQ1osS0FBSyxFQUFFLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDM0MsQ0FBQztZQUNGLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLHlCQUF5QixDQUFDLENBQUM7dUJBRWpCO2dCQUNuQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSTthQUM1QjswQkFFbUM7Z0JBQ2xDLEdBQUcsS0FBQTtnQkFDSCxXQUFXLGFBQUE7Z0JBQ1gsR0FBRyxLQUFBO2dCQUNILElBQUksRUFBRSxRQUFRO2FBQ2Y7WUFFRCxzQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQzs7O0NBQ3pDO0FBaENELDRDQWdDQztBQUVEOzs7O0dBSUc7QUFDSCx3QkFBK0IsSUFBWTtJQUN6QyxJQUFNLENBQUMsR0FBbUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxJQUFNLFNBQVMsR0FBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLElBQU0sVUFBVSxHQUFXLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQVJELHdDQVFDO0FBUUQsa0NBQWtDO0FBQ2xDLDJCQUF5QyxPQUEwQzs7WUFDM0UsR0FBRyxFQUVILFdBQVcsRUFLWCxRQUFRLEVBUVIsV0FBVzs7a0JBZkcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLFdBQVcsQ0FBQzswQkFFbkI7Z0JBQ3RDLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixZQUFZLEVBQUUsdUJBQXVCO2FBQ3RDO3VCQUVvQztnQkFDbkMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTO2dCQUNwQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFNBQVMsRUFBRSxjQUFjO2dCQUN6QixZQUFZLEVBQUUsdUJBQXVCO2FBQ3RDOzBCQUVtQztnQkFDbEMsR0FBRyxLQUFBO2dCQUNILFdBQVcsYUFBQTtnQkFDWCxJQUFJLEVBQUUsUUFBUTthQUNmO1lBRUQsc0JBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUM7OztDQUN6QztBQXZCRCw4Q0F1QkM7QUFPRDs7Ozs7R0FLRztBQUNILGlDQUF3QyxJQUFZO0lBQ2xELElBQU0sQ0FBQyxHQUFtQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLElBQU0sY0FBYyxHQUFvQixDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNwRSxhQUFhO0lBQ2IsSUFBTSxhQUFhLEdBQW9CLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBRW5FLElBQU0sVUFBVSxHQUFXLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoRCxJQUFNLFNBQVMsR0FBVyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRTVELG9DQUFvQztJQUNwQywwREFBMEQ7SUFDMUQsK0NBQStDO0lBQy9DLHNIQUFzSDtJQUN0SCw2QkFBNkI7SUFDN0IseUVBQXlFO0lBQ3pFLCtEQUErRDtJQUMvRCxhQUFhO0lBQ2IsbURBQW1EO0lBQ25ELE1BQU07SUFDTixJQUFJO0lBQ0osaUJBQWlCO0lBRWpCLE1BQU0sQ0FBQztRQUNMLFVBQVUsRUFBRSxVQUFVO1FBQ3RCLFVBQVUsRUFBRSxTQUFTO0tBQ3RCLENBQUM7QUFDSixDQUFDO0FBMUJELDBEQTBCQyIsImZpbGUiOiJsaWIvcHJvdmlkZXJzL21pY3Jvc29mdC1hY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoZWVyaW8gPSByZXF1aXJlKFwiY2hlZXJpb1wiKTtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge0Nvb2tpZUphcn0gZnJvbSBcInJlcXVlc3RcIjtcclxuaW1wb3J0IHtDb29raWV9IGZyb20gXCJ0b3VnaC1jb29raWVcIjtcclxuaW1wb3J0ICogYXMgdXJsIGZyb20gXCJ1cmxcIjtcclxuaW1wb3J0IHtTa3lwZVRva2VufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGkvY29udGV4dFwiO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tIFwiLi4vaW50ZXJmYWNlcy9pb1wiO1xyXG5pbXBvcnQge0RpY3Rpb25hcnl9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3V0aWxzXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc2t5cGVXZWJVcmk6IHN0cmluZyA9IFwiaHR0cHM6Ly93ZWIuc2t5cGUuY29tL1wiO1xyXG5leHBvcnQgY29uc3Qgc2t5cGVMb2dpblVyaTogc3RyaW5nID0gXCJodHRwczovL2xvZ2luLnNreXBlLmNvbS9sb2dpbi9cIjtcclxuZXhwb3J0IGNvbnN0IGxpdmVMb2dpblVyaTogc3RyaW5nID0gXCJodHRwczovL2xvZ2luLmxpdmUuY29tL1wiO1xyXG5leHBvcnQgY29uc3Qgd2ViQ2xpZW50TGl2ZUxvZ2luSWQ6IHN0cmluZyA9IFwiNTc4MTM0XCI7XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSB1c2VyIGB1c2VybmFtZWAgZXhpc3RzXHJcbiAqL1xyXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gdXNlckV4aXN0cyh1c2VybmFtZTogc3RyaW5nLCBodHRwSW86IGlvLkh0dHBJbyA9IHJlcXVlc3RJbyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4vLyAgIGNvbnN0IG1pY3Jvc29mdEFjY291bnRzID0gXCJmam9zaVwiO1xyXG4vLyAgIGNvbnN0IHVyaSA9IGAke21pY3Jvc29mdEFjY291bnRzfS9HZXRDcmVkZW50aWFsVHlwZS5zcmZgO1xyXG4vL1xyXG4vLyAgIGNvbnN0IHJlczogaW8uUmVzcG9uc2UgPSBhd2FpdCBodHRwSW8ucG9zdCh7XHJcbi8vICAgICB1cmk6IHVyaSxcclxuLy8gICAgIGZvcm06IHtcclxuLy8gICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lXHJcbi8vICAgICB9XHJcbi8vICAgfSk7XHJcbi8vXHJcbi8vICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UocmVzLmJvZHkpO1xyXG4vLyAgIHJldHVybiBkYXRhW1wiSWZFeGlzdHNSZXN1bHRcIl07XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ3JlZGVudGlhbHMge1xyXG4gIC8vIFNreXBlIHVzZXJuYW1lIG9yIGVtYWlsIGFkZHJlc3NcclxuICBsb2dpbjogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0U2t5cGVUb2tlbk9wdGlvbnMge1xyXG4gIGNyZWRlbnRpYWxzOiBDcmVkZW50aWFscztcclxuICBodHRwSW86IGlvLkh0dHBJbztcclxuICBjb29raWVKYXI6IENvb2tpZUphcjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNreXBlVG9rZW4ob3B0aW9uczogR2V0U2t5cGVUb2tlbk9wdGlvbnMpOiBQcm9taXNlPFNreXBlVG9rZW4+IHtcclxuICBjb25zdCBzdGFydFRpbWU6IG51bWJlciA9IERhdGUubm93KCk7XHJcblxyXG4gIGNvbnN0IGxpdmVLZXlzOiBMaXZlS2V5cyA9IGF3YWl0IGdldExpdmVLZXlzKG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNlbmRDcmVkT3B0czogU2VuZENyZWRlbnRpYWxzT3B0aW9ucyA9IHtcclxuICAgIHVzZXJuYW1lOiBvcHRpb25zLmNyZWRlbnRpYWxzLmxvZ2luLFxyXG4gICAgcGFzc3dvcmQ6IG9wdGlvbnMuY3JlZGVudGlhbHMucGFzc3dvcmQsXHJcbiAgICBodHRwSW86IG9wdGlvbnMuaHR0cElvLFxyXG4gICAgamFyOiBvcHRpb25zLmNvb2tpZUphcixcclxuICAgIGxpdmVLZXlzXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbGl2ZVRva2VuOiBzdHJpbmcgPSBhd2FpdCBnZXRMaXZlVG9rZW4oc2VuZENyZWRPcHRzKTtcclxuXHJcbiAgY29uc3Qgc3RPcHQ6IEdldFNreXBlVG9rZW5Gcm9tTGl2ZVRva2VuT3B0aW9ucyA9IHtcclxuICAgIGxpdmVUb2tlbixcclxuICAgIGphcjogb3B0aW9ucy5jb29raWVKYXIsXHJcbiAgICBodHRwSW86IG9wdGlvbnMuaHR0cElvXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzOiBpby5SZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RTa3lwZVRva2VuKHN0T3B0KTtcclxuXHJcbiAgY29uc3Qgc2NyYXBwZWQ6IFNreXBlVG9rZW5SZXNwb25zZSA9IHNjcmFwU2t5cGVUb2tlblJlc3BvbnNlKHJlcy5ib2R5KTtcclxuICAvLyBFeHBpcmVzIGluIChzZWNvbmRzKSAoZGVmYXVsdDogMSBkYXkpXHJcbiAgY29uc3QgZXhwaXJlc0luOiBudW1iZXIgPSB0eXBlb2Ygc2NyYXBwZWQuZXhwaXJlc19pbiA9PT0gXCJudW1iZXJcIiA/IHNjcmFwcGVkLmV4cGlyZXNfaW4gOiA4NjQwMDA7XHJcblxyXG4gIGNvbnN0IHJlc3VsdDogU2t5cGVUb2tlbiA9IHtcclxuICAgIHZhbHVlOiBzY3JhcHBlZC5za3lwZXRva2VuLFxyXG4gICAgZXhwaXJhdGlvbkRhdGU6IG5ldyBEYXRlKHN0YXJ0VGltZSArIGV4cGlyZXNJbiAqIDEwMDApXHJcbiAgfTtcclxuXHJcbiAgaWYgKHR5cGVvZiByZXN1bHQudmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIHZhbHVlIG9mIFNreXBlIHRva2VuIHRvIGJlIGEgc3RyaW5nXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2FkTGl2ZUtleXNPcHRpb25zIHtcclxuICBodHRwSW86IGlvLkh0dHBJbztcclxuICBjb29raWVKYXI6IENvb2tpZUphcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaXZlS2V5cyB7XHJcbiAgLyoqXHJcbiAgICogTWljcm9Tb2Z0IFAgUmVxdSA/XHJcbiAgICpcclxuICAgKiBFeGFtcGxlczpcclxuICAgKiAtIGBcIiR1dWlkLTQ2ZjZkMmIyLWZmOTgtNDQ0Ni1hYWZiLTJiYTk5YzBjMDYzOFwiYFxyXG4gICAqL1xyXG4gIE1TUFJlcXU6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogTWljcm9Tb2Z0IFAgT0sgP1xyXG4gICAqXHJcbiAgICogRXhhbXBsZXM6XHJcbiAgICogLSBgXCJsdD0xNDgzODI2NjM1JmNvPTEmaWQ9MjkzMjkwXCJgXHJcbiAgICovXHJcbiAgTVNQT0s6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogUFBGIFRva2VuID9cclxuICAgKlxyXG4gICAqIEV4YW1wbGVzOiAoc2VlIHNwZWMpXHJcbiAgICovXHJcbiAgUFBGVDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGl2ZUtleXMob3B0aW9uczogTG9hZExpdmVLZXlzT3B0aW9ucyk6IFByb21pc2U8TGl2ZUtleXM+IHtcclxuICBjb25zdCByZXNwb25zZTogaW8uUmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0TGl2ZUtleXMob3B0aW9ucyk7XHJcblxyXG4gIGxldCBtc3BSZXF1OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgbGV0IG1zcE9rOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8vIFJldHJpZXZlIHZhbHVlcyBmb3IgdGhlIGNvb2tpZXMgXCJNU1BSZXF1XCIgYW5kIFwiTVNQT0tcIlxyXG4gIGNvbnN0IGNvb2tpZXM6IENvb2tpZVtdID0gb3B0aW9ucy5jb29raWVKYXIuZ2V0Q29va2llcyhcImh0dHBzOi8vbG9naW4ubGl2ZS5jb20vXCIpO1xyXG4gIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZXMpIHtcclxuICAgIHN3aXRjaCAoY29va2llLmtleSkge1xyXG4gICAgICBjYXNlIFwiTVNQUmVxdVwiOlxyXG4gICAgICAgIG1zcFJlcXUgPSBjb29raWUudmFsdWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJNU1BPS1wiOlxyXG4gICAgICAgIG1zcE9rID0gY29va2llLnZhbHVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1zcE9rID09PSB1bmRlZmluZWQgfHwgbXNwUmVxdSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gZmluZCBjb29raWUgTVNQUmVxdSBvciBNU1BPS1wiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBwZnRLZXk6IHN0cmluZyA9IHNjcmFwTGl2ZVBwZnRLZXkocmVzcG9uc2UuYm9keSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIE1TUFJlcXU6IG1zcFJlcXUsXHJcbiAgICBNU1BPSzogbXNwT2ssXHJcbiAgICBQUEZUOiBwcGZ0S2V5XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3RMaXZlS2V5cyhvcHRpb25zOiBMb2FkTGl2ZUtleXNPcHRpb25zKTogUHJvbWlzZTxpby5SZXNwb25zZT4ge1xyXG4gIGNvbnN0IHVyaTogc3RyaW5nID0gdXJsLnJlc29sdmUoc2t5cGVMb2dpblVyaSwgcGF0aC5wb3NpeC5qb2luKFwib2F1dGhcIiwgXCJtaWNyb3NvZnRcIikpO1xyXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nOiBEaWN0aW9uYXJ5PHN0cmluZz4gPSB7XHJcbiAgICBjbGllbnRfaWQ6IHdlYkNsaWVudExpdmVMb2dpbklkLFxyXG4gICAgcmVkaXJlY3RfdXJpOiBza3lwZVdlYlVyaVxyXG4gIH07XHJcbiAgY29uc3QgZ2V0T3B0aW9uczogaW8uR2V0T3B0aW9ucyA9IHt1cmksIHF1ZXJ5U3RyaW5nLCBqYXI6IG9wdGlvbnMuY29va2llSmFyfTtcclxuICAvLyBBbHNvLCBub3cgdGhlIEphciBzaG91bGQgY29udGFpbjpcclxuICAvLyBNU1BSZXF1XHJcbiAgLy8gTVNQT0tcclxuICByZXR1cm4gb3B0aW9ucy5odHRwSW8uZ2V0KGdldE9wdGlvbnMpO1xyXG59XHJcblxyXG4vLyBUT0RPOiBwYXJzZSBIVE1MLCBKUyBhbmQgdHJhdmVyc2UgQVNUXHJcbmV4cG9ydCBmdW5jdGlvbiBzY3JhcExpdmVQcGZ0S2V5KGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gIGNvbnN0IHBwZnRSZWdFeHA6IFJlZ0V4cCA9IC88aW5wdXRcXHMrdHlwZT1cImhpZGRlblwiXFxzK25hbWU9XCJQUEZUXCJcXHMraWQ9XCJpMDMyN1wiXFxzK3ZhbHVlPVwiKFtcXCEqMC05YS16QS1aXStcXCR7MSwyfSlcIlxccypcXC8+LztcclxuICBjb25zdCByZWdFeHBSZXN1bHQ6IFJlZ0V4cEV4ZWNBcnJheSB8IG51bGwgPSBwcGZ0UmVnRXhwLmV4ZWMoaHRtbCk7XHJcblxyXG4gIGlmIChyZWdFeHBSZXN1bHQgPT09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBzY3JhcCBQUEZUIGtleVwiKTtcclxuICB9XHJcblxyXG4gIGlmIChyZWdFeHBSZXN1bHQubGVuZ3RoICE9PSAyKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCByZWdFeHBSZXN1bHQgbGVuZ3RoIHRvIGJlIGV4YWN0bHkgMlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiByZWdFeHBSZXN1bHRbMV07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VuZENyZWRlbnRpYWxzT3B0aW9ucyB7XHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIGxpdmVLZXlzOiBMaXZlS2V5cztcclxuICBodHRwSW86IGlvLkh0dHBJbztcclxuICBqYXI6IENvb2tpZUphcjtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExpdmVUb2tlbihvcHRpb25zOiBTZW5kQ3JlZGVudGlhbHNPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICBjb25zdCByZXNwb25zZTogaW8uUmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0TGl2ZVRva2VuKG9wdGlvbnMpO1xyXG4gIHJldHVybiBzY3JhcExpdmVUb2tlbihyZXNwb25zZS5ib2R5KTtcclxufVxyXG5cclxuLy8gR2V0IGxpdmUgdG9rZW4gZnJvbSBsaXZlIGtleXMgYW5kIGNyZWRlbnRpYWxzXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1ZXN0TGl2ZVRva2VuIChvcHRpb25zOiBTZW5kQ3JlZGVudGlhbHNPcHRpb25zKTogUHJvbWlzZTxpby5SZXNwb25zZT4ge1xyXG4gIGNvbnN0IHVyaTogc3RyaW5nID0gdXJsLnJlc29sdmUobGl2ZUxvZ2luVXJpLCBwYXRoLnBvc2l4LmpvaW4oXCJwcHNlY3VyZVwiLCBcInBvc3Quc3JmXCIpKTtcclxuICBjb25zdCBxdWVyeVN0cmluZzogRGljdGlvbmFyeTxzdHJpbmc+ID0ge1xyXG4gICAgd2E6IFwid3NpZ25pbjEuMFwiLFxyXG4gICAgd3A6IFwiTUJJX1NTTFwiLFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgd3JlcGx5OiBcImh0dHBzOi8vbHcuc2t5cGUuY29tL2xvZ2luL29hdXRoL3Byb3h5P2NsaWVudF9pZD01NzgxMzQmc2l0ZV9uYW1lPWx3LnNreXBlLmNvbSZyZWRpcmVjdF91cmk9aHR0cHMlM0ElMkYlMkZ3ZWIuc2t5cGUuY29tJTJGXCJcclxuICB9O1xyXG4gIGNvbnN0IGphcjogQ29va2llSmFyID0gb3B0aW9ucy5qYXI7XHJcbiAgLy8gTVNQUmVxdSBzaG91bGQgYWxyZWFkeSBiZSBzZXRcclxuICAvLyBNU1BPSyBzaG91bGQgYWxyZWFkeSBiZSBzZXRcclxuICBjb25zdCBtaWxsaXNlY29uZHNTaW5jZUVwb2NoOiBudW1iZXIgPSBEYXRlLm5vdygpOyAvLyBNaWxsaXNlY29uZHMgc2luY2UgZXBvY2hcclxuICBjb25zdCBja1RzdENvb2tpZTogQ29va2llID0gbmV3ICg8YW55PiBDb29raWUpKHtcclxuICAgIGtleTogXCJDa1RzdFwiLFxyXG4gICAgdmFsdWU6IG1pbGxpc2Vjb25kc1NpbmNlRXBvY2gudG9TdHJpbmcoMTApXHJcbiAgfSk7XHJcbiAgamFyLnNldENvb2tpZShja1RzdENvb2tpZSwgXCJodHRwczovL2xvZ2luLmxpdmUuY29tL1wiKTtcclxuXHJcbiAgY29uc3QgZm9ybURhdGE6IERpY3Rpb25hcnk8c3RyaW5nPiA9IHtcclxuICAgIGxvZ2luOiBvcHRpb25zLnVzZXJuYW1lLFxyXG4gICAgcGFzc3dkOiBvcHRpb25zLnBhc3N3b3JkLFxyXG4gICAgUFBGVDogb3B0aW9ucy5saXZlS2V5cy5QUEZUXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcG9zdE9wdGlvbnM6IGlvLlBvc3RPcHRpb25zID0ge1xyXG4gICAgdXJpLFxyXG4gICAgcXVlcnlTdHJpbmcsXHJcbiAgICBqYXIsXHJcbiAgICBmb3JtOiBmb3JtRGF0YVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvcHRpb25zLmh0dHBJby5wb3N0KHBvc3RPcHRpb25zKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNjcmFwIHRoZSByZXN1bHQgb2YgYSBzZW5kQ3JlZGVudGlhbHMgcmVxdWVzdHMgdG8gcmV0cmlldmUgdGhlIHZhbHVlIG9mIHRoZSBgdGAgcGFyYW1hdGVyXHJcbiAqIEBwYXJhbSBodG1sXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NyYXBMaXZlVG9rZW4oaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCAkOiBjaGVlcmlvLlN0YXRpYyA9IGNoZWVyaW8ubG9hZChodG1sKTtcclxuICBjb25zdCB0b2tlbk5vZGU6IGNoZWVyaW8uQ2hlZXJpbyA9ICQoXCIjdFwiKTtcclxuICBjb25zdCB0b2tlblZhbHVlOiBzdHJpbmcgPSB0b2tlbk5vZGUudmFsKCk7XHJcbiAgaWYgKHRva2VuVmFsdWUgPT09IFwiXCIpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBzY3JhcCB0b2tlblwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHRva2VuVmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2V0U2t5cGVUb2tlbkZyb21MaXZlVG9rZW5PcHRpb25zIHtcclxuICBsaXZlVG9rZW46IHN0cmluZztcclxuICBodHRwSW86IGlvLkh0dHBJbztcclxuICBqYXI6IENvb2tpZUphcjtcclxufVxyXG5cclxuLy8gR2V0IFNreXBlIHRva2VuIGZyb20gTGl2ZSB0b2tlblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFNreXBlVG9rZW4gKG9wdGlvbnM6IEdldFNreXBlVG9rZW5Gcm9tTGl2ZVRva2VuT3B0aW9ucyk6IFByb21pc2U8aW8uUmVzcG9uc2U+IHtcclxuICBjb25zdCB1cmk6IHN0cmluZyA9IHVybC5yZXNvbHZlKHNreXBlTG9naW5VcmksIFwibWljcm9zb2Z0XCIpO1xyXG5cclxuICBjb25zdCBxdWVyeVN0cmluZzogRGljdGlvbmFyeTxzdHJpbmc+ID0ge1xyXG4gICAgY2xpZW50X2lkOiBcIjU3ODEzNFwiLFxyXG4gICAgcmVkaXJlY3RfdXJpOiBcImh0dHBzOi8vd2ViLnNreXBlLmNvbVwiXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZm9ybURhdGE6IERpY3Rpb25hcnk8c3RyaW5nPiA9IHtcclxuICAgIHQ6IG9wdGlvbnMubGl2ZVRva2VuLFxyXG4gICAgY2xpZW50X2lkOiBcIjU3ODEzNFwiLFxyXG4gICAgb2F1dGhQYXJ0bmVyOiBcIjk5OVwiLFxyXG4gICAgc2l0ZV9uYW1lOiBcImx3LnNreXBlLmNvbVwiLFxyXG4gICAgcmVkaXJlY3RfdXJpOiBcImh0dHBzOi8vd2ViLnNreXBlLmNvbVwiXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcG9zdE9wdGlvbnM6IGlvLlBvc3RPcHRpb25zID0ge1xyXG4gICAgdXJpLFxyXG4gICAgcXVlcnlTdHJpbmcsXHJcbiAgICBmb3JtOiBmb3JtRGF0YVxyXG4gIH07XHJcblxyXG4gIHJldHVybiBvcHRpb25zLmh0dHBJby5wb3N0KHBvc3RPcHRpb25zKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTa3lwZVRva2VuUmVzcG9uc2Uge1xyXG4gIHNreXBldG9rZW46IHN0cmluZztcclxuICBleHBpcmVzX2luOiBudW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTY3JhcCB0byBnZXQgdGhlIFNreXBlIHRva2VuXHJcbiAqXHJcbiAqIEBwYXJhbSBodG1sXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2NyYXBTa3lwZVRva2VuUmVzcG9uc2UoaHRtbDogc3RyaW5nKTogU2t5cGVUb2tlblJlc3BvbnNlIHtcclxuICBjb25zdCAkOiBjaGVlcmlvLlN0YXRpYyA9IGNoZWVyaW8ubG9hZChodG1sKTtcclxuICBjb25zdCBza3lwZVRva2VuTm9kZTogY2hlZXJpby5DaGVlcmlvID0gJChcImlucHV0W25hbWU9c2t5cGV0b2tlbl1cIik7XHJcbiAgLy8gSW4gc2Vjb25kc1xyXG4gIGNvbnN0IGV4cGlyZXNJbk5vZGU6IGNoZWVyaW8uQ2hlZXJpbyA9ICQoXCJpbnB1dFtuYW1lPWV4cGlyZXNfaW5dXCIpO1xyXG5cclxuICBjb25zdCBza3lwZVRva2VuOiBzdHJpbmcgPSBza3lwZVRva2VuTm9kZS52YWwoKTtcclxuICBjb25zdCBleHBpcmVzSW46IG51bWJlciA9IHBhcnNlSW50KGV4cGlyZXNJbk5vZGUudmFsKCksIDEwKTtcclxuXHJcbiAgLy8gaWYgKCFza3lwZXRva2VuIHx8ICFleHBpcmVzX2luKSB7XHJcbiAgLy8gICBjb25zdCBza3lwZUVycm9yTWVzc2FnZSA9ICQoXCIubWVzc2FnZV9lcnJvclwiKS50ZXh0KCk7XHJcbiAgLy8gICBjb25zdCBlcnJvck5hbWUgPSBcImF1dGhlbnRpY2F0aW9uLWZhaWxlZFwiO1xyXG4gIC8vICAgY29uc3QgZXJyb3JNZXNzYWdlID0gXCJGYWlsZWQgdG8gZ2V0IHNreXBldG9rZW4uIFVzZXJuYW1lIG9yIHBhc3N3b3JkIGlzIGluY29ycmVjdCBPUiB5b3UndmUgaGl0IGEgQ0FQVENIQSB3YWxsLlwiO1xyXG4gIC8vICAgaWYgKHNreXBlRXJyb3JNZXNzYWdlKSB7XHJcbiAgLy8gICAgIGNvbnN0IHNreXBlRXJyb3IgPSBuZXcgSW5jaWRlbnQoXCJza3lwZS1lcnJvclwiLCBza3lwZUVycm9yTWVzc2FnZSk7XHJcbiAgLy8gICAgIHRocm93IG5ldyBJbmNpZGVudChza3lwZUVycm9yLCBlcnJvck5hbWUsIGVycm9yTWVzc2FnZSk7XHJcbiAgLy8gICB9IGVsc2Uge1xyXG4gIC8vICAgICB0aHJvdyBuZXcgSW5jaWRlbnQoZXJyb3JOYW1lLCBlcnJvck1lc3NhZ2UpO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuICAvLyByZXR1cm4gcmVzdWx0O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2t5cGV0b2tlbjogc2t5cGVUb2tlbixcclxuICAgIGV4cGlyZXNfaW46IGV4cGlyZXNJblxyXG4gIH07XHJcbn1cclxuIl19
