"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var messagesUri = require("../messages-uri");
var utils_1 = require("../utils");
function sendMessage(io, apiContext, message, conversationId) {
    return Bluebird
        .try(function () {
        var query = {
            clientmessageid: String(utils_1.getCurrentTime() + Math.floor(10000 * Math.random())),
            content: String(message.textContent),
            messagetype: "RichText",
            contenttype: "text"
        };
        var requestOptions = {
            uri: messagesUri.messages(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId),
            jar: apiContext.cookieJar,
            body: JSON.stringify(query),
            headers: {
                RegistrationToken: apiContext.registrationToken.raw
            }
        };
        return io.post(requestOptions)
            .then(function (res) {
            console.log(JSON.stringify(res, null, 2));
            if (res.statusCode !== 201) {
                return Bluebird.reject(new incident_1.Incident("send-message", "Received wrong return code"));
            }
            var body = JSON.parse(res.body);
            return {
                clientMessageId: query.clientmessageid,
                arrivalTime: body.OriginalArrivalTime,
                textContent: query.content
            };
        });
    });
}
exports.sendMessage = sendMessage;
exports.default = sendMessage;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvc2VuZC1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFDO0FBQ3JDLHFDQUFrQztBQUlsQyw2Q0FBK0M7QUFDL0Msa0NBQXdDO0FBYXhDLHFCQUE0QixFQUFhLEVBQUUsVUFBbUIsRUFBRSxPQUF1QixFQUMzRCxjQUFzQjtJQUNoRCxNQUFNLENBQUMsUUFBUTtTQUNaLEdBQUcsQ0FBQztRQUNILElBQU0sS0FBSyxHQUFxQjtZQUM5QixlQUFlLEVBQUUsTUFBTSxDQUFDLHNCQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUM3RSxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsV0FBVyxFQUFFLFVBQVU7WUFDdkIsV0FBVyxFQUFFLE1BQU07U0FDcEIsQ0FBQztRQUNGLElBQU0sY0FBYyxHQUFtQjtZQUNyQyxHQUFHLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDO1lBQ3RHLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FBUztZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO2FBQ3BEO1NBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUMzQixJQUFJLENBQUMsVUFBQyxHQUFnQjtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxtQkFBUSxDQUFDLGNBQWMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFDckYsQ0FBQztZQUNELElBQU0sSUFBSSxHQUF3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUM7Z0JBQ0wsZUFBZSxFQUFFLEtBQUssQ0FBQyxlQUFlO2dCQUN0QyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQjtnQkFDckMsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQzNCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhDRCxrQ0FnQ0M7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJmaWxlIjoibGliL2FwaS9zZW5kLW1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcbmltcG9ydCAqIGFzIGFwaSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGkvYXBpXCI7XHJcbmltcG9ydCB7Q29udGV4dH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL2NvbnRleHRcIjtcclxuaW1wb3J0ICogYXMgaW8gZnJvbSBcIi4uL2ludGVyZmFjZXMvaW9cIjtcclxuaW1wb3J0ICogYXMgbWVzc2FnZXNVcmkgZnJvbSBcIi4uL21lc3NhZ2VzLXVyaVwiO1xyXG5pbXBvcnQge2dldEN1cnJlbnRUaW1lfSBmcm9tIFwiLi4vdXRpbHNcIjtcclxuXHJcbmludGVyZmFjZSBTZW5kTWVzc2FnZVJlc3BvbnNlIHtcclxuICBPcmlnaW5hbEFycml2YWxUaW1lOiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBTZW5kTWVzc2FnZVF1ZXJ5IHtcclxuICBjbGllbnRtZXNzYWdlaWQ6IHN0cmluZztcclxuICBjb250ZW50OiBzdHJpbmc7XHJcbiAgbWVzc2FnZXR5cGU6IHN0cmluZztcclxuICBjb250ZW50dHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoaW86IGlvLkh0dHBJbywgYXBpQ29udGV4dDogQ29udGV4dCwgbWVzc2FnZTogYXBpLk5ld01lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nKTogQmx1ZWJpcmQ8YXBpLlNlbmRNZXNzYWdlUmVzdWx0PiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkXHJcbiAgICAudHJ5KCgpID0+IHtcclxuICAgICAgY29uc3QgcXVlcnk6IFNlbmRNZXNzYWdlUXVlcnkgPSB7XHJcbiAgICAgICAgY2xpZW50bWVzc2FnZWlkOiBTdHJpbmcoZ2V0Q3VycmVudFRpbWUoKSArIE1hdGguZmxvb3IoMTAwMDAgKiBNYXRoLnJhbmRvbSgpKSksXHJcbiAgICAgICAgY29udGVudDogU3RyaW5nKG1lc3NhZ2UudGV4dENvbnRlbnQpLFxyXG4gICAgICAgIG1lc3NhZ2V0eXBlOiBcIlJpY2hUZXh0XCIsXHJcbiAgICAgICAgY29udGVudHR5cGU6IFwidGV4dFwiXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zOiBpby5Qb3N0T3B0aW9ucyA9IHtcclxuICAgICAgICB1cmk6IG1lc3NhZ2VzVXJpLm1lc3NhZ2VzKGFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW4uaG9zdCwgbWVzc2FnZXNVcmkuREVGQVVMVF9VU0VSLCBjb252ZXJzYXRpb25JZCksXHJcbiAgICAgICAgamFyOiBhcGlDb250ZXh0LmNvb2tpZUphcixcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShxdWVyeSksXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgUmVnaXN0cmF0aW9uVG9rZW46IGFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW4ucmF3XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gaW8ucG9zdChyZXF1ZXN0T3B0aW9ucylcclxuICAgICAgICAudGhlbigocmVzOiBpby5SZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzLCBudWxsLCAyKSk7XHJcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcInNlbmQtbWVzc2FnZVwiLCBcIlJlY2VpdmVkIHdyb25nIHJldHVybiBjb2RlXCIpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGJvZHk6IFNlbmRNZXNzYWdlUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcy5ib2R5KTtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsaWVudE1lc3NhZ2VJZDogcXVlcnkuY2xpZW50bWVzc2FnZWlkLFxyXG4gICAgICAgICAgICBhcnJpdmFsVGltZTogYm9keS5PcmlnaW5hbEFycml2YWxUaW1lLFxyXG4gICAgICAgICAgICB0ZXh0Q29udGVudDogcXVlcnkuY29udGVudFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZW5kTWVzc2FnZTtcclxuIl19
