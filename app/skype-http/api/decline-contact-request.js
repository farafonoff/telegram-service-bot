"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var apiUri = require("../api-uri");
function declineContactRequest(io, apiContext, contactUsername) {
    return Bluebird
        .try(function () {
        var requestOptions = {
            uri: apiUri.authRequestDecline(apiContext.username, contactUsername),
            jar: apiContext.cookieJar,
            headers: {
                "X-Skypetoken": apiContext.skypeToken.value
            }
        };
        return io.put(requestOptions);
    })
        .then(function (res) {
        if (res.statusCode !== 201) {
            return Bluebird.reject(new incident_1.Incident("net", "Failed to decline contact"));
        }
        var body = JSON.parse(res.body);
        return Bluebird.resolve(null);
    });
}
exports.declineContactRequest = declineContactRequest;
exports.default = declineContactRequest;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvZGVjbGluZS1jb250YWN0LXJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBcUM7QUFDckMscUNBQWtDO0FBQ2xDLG1DQUFxQztBQUlyQywrQkFBdUMsRUFBYSxFQUFFLFVBQW1CLEVBQUUsZUFBdUI7SUFDaEcsTUFBTSxDQUFDLFFBQVE7U0FDWixHQUFHLENBQUM7UUFDSCxJQUFNLGNBQWMsR0FBa0I7WUFDcEMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQztZQUNwRSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUs7YUFDNUM7U0FDRixDQUFDO1FBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLFVBQUMsR0FBZ0I7UUFDckIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksbUJBQVEsQ0FBQyxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxJQUFNLElBQUksR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuQkQsc0RBbUJDO0FBRUQsa0JBQWUscUJBQXFCLENBQUMiLCJmaWxlIjoibGliL2FwaS9kZWNsaW5lLWNvbnRhY3QtcmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gXCJibHVlYmlyZFwiO1xyXG5pbXBvcnQge0luY2lkZW50fSBmcm9tIFwiaW5jaWRlbnRcIjtcclxuaW1wb3J0ICogYXMgYXBpVXJpIGZyb20gXCIuLi9hcGktdXJpXCI7XHJcbmltcG9ydCB7Q29udGV4dH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL2NvbnRleHRcIjtcclxuaW1wb3J0ICogYXMgaW8gZnJvbSBcIi4uL2ludGVyZmFjZXMvaW9cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNsaW5lQ29udGFjdFJlcXVlc3QgKGlvOiBpby5IdHRwSW8sIGFwaUNvbnRleHQ6IENvbnRleHQsIGNvbnRhY3RVc2VybmFtZTogc3RyaW5nKTogQmx1ZWJpcmQ8YW55PiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkXHJcbiAgICAudHJ5KCgpID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IGlvLkdldE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiBhcGlVcmkuYXV0aFJlcXVlc3REZWNsaW5lKGFwaUNvbnRleHQudXNlcm5hbWUsIGNvbnRhY3RVc2VybmFtZSksXHJcbiAgICAgICAgamFyOiBhcGlDb250ZXh0LmNvb2tpZUphcixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIlgtU2t5cGV0b2tlblwiOiBhcGlDb250ZXh0LnNreXBlVG9rZW4udmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBpby5wdXQocmVxdWVzdE9wdGlvbnMpO1xyXG4gICAgfSlcclxuICAgIC50aGVuKChyZXM6IGlvLlJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSAhPT0gMjAxKSB7XHJcbiAgICAgICAgcmV0dXJuIEJsdWViaXJkLnJlamVjdChuZXcgSW5jaWRlbnQoXCJuZXRcIiwgXCJGYWlsZWQgdG8gZGVjbGluZSBjb250YWN0XCIpKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBib2R5OiBhbnkgPSBKU09OLnBhcnNlKHJlcy5ib2R5KTtcclxuICAgICAgcmV0dXJuIEJsdWViaXJkLnJlc29sdmUobnVsbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVjbGluZUNvbnRhY3RSZXF1ZXN0O1xyXG4iXX0=
