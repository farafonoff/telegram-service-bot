"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var messagesUri = require("../messages-uri");
function setStatus(io, apiContext, status) {
    return Bluebird
        .try(function () {
        var requestBody = {
            status: status
        };
        var requestOptions = {
            uri: messagesUri.userMessagingService(apiContext.registrationToken.host),
            jar: apiContext.cookieJar,
            body: JSON.stringify(requestBody),
            headers: {
                RegistrationToken: apiContext.registrationToken.raw
            }
        };
        return io.put(requestOptions);
    })
        .then(function (res) {
        if (res.statusCode !== 200) {
            return Bluebird.reject(new incident_1.Incident("send-message", "Received wrong return code"));
        }
        return;
    });
}
exports.setStatus = setStatus;
exports.default = setStatus;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvc2V0LXN0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFxQztBQUNyQyxxQ0FBa0M7QUFLbEMsNkNBQStDO0FBTS9DLG1CQUEyQixFQUFhLEVBQUUsVUFBbUIsRUFBRSxNQUFrQjtJQUMvRSxNQUFNLENBQUMsUUFBUTtTQUNaLEdBQUcsQ0FBQztRQUNILElBQU0sV0FBVyxHQUFnQjtZQUMvQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUM7UUFDRixJQUFNLGNBQWMsR0FBbUI7WUFDckMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ3hFLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDakMsT0FBTyxFQUFFO2dCQUNQLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO2FBQ3BEO1NBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxVQUFDLEdBQWdCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFRLENBQUMsY0FBYyxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBQ0QsTUFBTSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEJELDhCQXNCQztBQUVELGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJsaWIvYXBpL3NldC1zdGF0dXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcblxyXG5pbXBvcnQgKiBhcyBhcGkgZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL2FwaVwiO1xyXG5pbXBvcnQge0NvbnRleHR9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2FwaS9jb250ZXh0XCI7XHJcbmltcG9ydCAqIGFzIGlvIGZyb20gXCIuLi9pbnRlcmZhY2VzL2lvXCI7XHJcbmltcG9ydCAqIGFzIG1lc3NhZ2VzVXJpIGZyb20gXCIuLi9tZXNzYWdlcy11cmlcIjtcclxuXHJcbmludGVyZmFjZSBSZXF1ZXN0Qm9keSB7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0dXMgKGlvOiBpby5IdHRwSW8sIGFwaUNvbnRleHQ6IENvbnRleHQsIHN0YXR1czogYXBpLlN0YXR1cyk6IEJsdWViaXJkPGFueT4ge1xyXG4gIHJldHVybiBCbHVlYmlyZFxyXG4gICAgLnRyeSgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RCb2R5OiBSZXF1ZXN0Qm9keSA9IHtcclxuICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCByZXF1ZXN0T3B0aW9uczogaW8uUG9zdE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiBtZXNzYWdlc1VyaS51c2VyTWVzc2FnaW5nU2VydmljZShhcGlDb250ZXh0LnJlZ2lzdHJhdGlvblRva2VuLmhvc3QpLFxyXG4gICAgICAgIGphcjogYXBpQ29udGV4dC5jb29raWVKYXIsXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFJlZ2lzdHJhdGlvblRva2VuOiBhcGlDb250ZXh0LnJlZ2lzdHJhdGlvblRva2VuLnJhd1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGlvLnB1dChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcInNlbmQtbWVzc2FnZVwiLCBcIlJlY2VpdmVkIHdyb25nIHJldHVybiBjb2RlXCIpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2V0U3RhdHVzO1xyXG4iXX0=
