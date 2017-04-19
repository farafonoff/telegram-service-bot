"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var apiUri = require("../api-uri");
function acceptContactRequest(io, apiContext, contactUsername) {
    return Bluebird
        .try(function () {
        var requestOptions = {
            uri: apiUri.authRequestAccept(apiContext.username, contactUsername),
            jar: apiContext.cookieJar,
            headers: {
                "X-Skypetoken": apiContext.skypeToken.value
            }
        };
        return io.put(requestOptions);
    })
        .then(function (res) {
        if (res.statusCode !== 201) {
            return Bluebird.reject(new incident_1.Incident("net", "Failed to accept contact"));
        }
        var body = JSON.parse(res.body);
        return Bluebird.resolve(null);
    });
}
exports.acceptContactRequest = acceptContactRequest;
exports.default = acceptContactRequest;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvYWNjZXB0LWNvbnRhY3QtcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxQztBQUNyQyxxQ0FBa0M7QUFDbEMsbUNBQXFDO0FBSXJDLDhCQUFzQyxFQUFhLEVBQUUsVUFBbUIsRUFBRSxlQUF1QjtJQUMvRixNQUFNLENBQUMsUUFBUTtTQUNaLEdBQUcsQ0FBQztRQUNILElBQU0sY0FBYyxHQUFrQjtZQUNwQyxHQUFHLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO1lBQ25FLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSzthQUM1QztTQUNGLENBQUM7UUFDRixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsVUFBQyxHQUFnQjtRQUNyQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxtQkFBUSxDQUFDLEtBQUssRUFBRSwwQkFBMEIsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUNELElBQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5CRCxvREFtQkM7QUFFRCxrQkFBZSxvQkFBb0IsQ0FBQyIsImZpbGUiOiJsaWIvYXBpL2FjY2VwdC1jb250YWN0LXJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcbmltcG9ydCAqIGFzIGFwaVVyaSBmcm9tIFwiLi4vYXBpLXVyaVwiO1xyXG5pbXBvcnQge0NvbnRleHR9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FwaS9jb250ZXh0XCI7XHJcbmltcG9ydCAqIGFzIGlvIGZyb20gXCIuLi9pbnRlcmZhY2VzL2lvXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWNjZXB0Q29udGFjdFJlcXVlc3QgKGlvOiBpby5IdHRwSW8sIGFwaUNvbnRleHQ6IENvbnRleHQsIGNvbnRhY3RVc2VybmFtZTogc3RyaW5nKTogQmx1ZWJpcmQ8YW55PiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkXHJcbiAgICAudHJ5KCgpID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IGlvLkdldE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiBhcGlVcmkuYXV0aFJlcXVlc3RBY2NlcHQoYXBpQ29udGV4dC51c2VybmFtZSwgY29udGFjdFVzZXJuYW1lKSxcclxuICAgICAgICBqYXI6IGFwaUNvbnRleHQuY29va2llSmFyLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiWC1Ta3lwZXRva2VuXCI6IGFwaUNvbnRleHQuc2t5cGVUb2tlbi52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGlvLnB1dChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDEpIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcIm5ldFwiLCBcIkZhaWxlZCB0byBhY2NlcHQgY29udGFjdFwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYm9keTogYW55ID0gSlNPTi5wYXJzZShyZXMuYm9keSk7XHJcbiAgICAgIHJldHVybiBCbHVlYmlyZC5yZXNvbHZlKG51bGwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjY2VwdENvbnRhY3RSZXF1ZXN0O1xyXG4iXX0=
