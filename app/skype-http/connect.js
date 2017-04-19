"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var api = require("./api");
var login_1 = require("./login");
var request_io_1 = require("./request-io");
function connect(options) {
    if (options.state !== undefined) {
        return Bluebird.reject(new incident_1.Incident("todo", "Connection from previous state is not yet supported."));
    }
    else if (options.credentials === undefined) {
        return Bluebird.reject(new incident_1.Incident("todo", "Connect must define `credentials`"));
    }
    else {
        var apiPromise = login_1.login({
            io: request_io_1.default,
            credentials: options.credentials,
            verbose: options.verbose
        });
        return Bluebird.resolve(apiPromise)
            .then(function (apiContext) {
            if (options.verbose) {
                console.log("Obtained context trough authentication:");
                console.log({
                    username: apiContext.username,
                    skypeToken: apiContext.skypeToken,
                    registrationToken: apiContext.registrationToken
                });
            }
            return new api.Api(apiContext, request_io_1.default);
        });
    }
}
exports.connect = connect;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb25uZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFDO0FBQ3JDLHFDQUFrQztBQUNsQywyQkFBNkI7QUFHN0IsaUNBQThCO0FBQzlCLDJDQUFxQztBQVlyQyxpQkFBd0IsT0FBdUI7SUFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksbUJBQVEsQ0FBQyxNQUFNLEVBQUUsc0RBQXNELENBQUMsQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksbUJBQVEsQ0FBQyxNQUFNLEVBQUUsbUNBQW1DLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQU0sVUFBVSxHQUFxQixhQUFLLENBQUM7WUFDekMsRUFBRSxFQUFFLG9CQUFTO1lBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztTQUN6QixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDaEMsSUFBSSxDQUFDLFVBQUMsVUFBbUI7WUFDeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDVixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7b0JBQzdCLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVTtvQkFDakMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLGlCQUFpQjtpQkFDaEQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLG9CQUFTLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDSCxDQUFDO0FBeEJELDBCQXdCQyIsImZpbGUiOiJsaWIvY29ubmVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gXCJibHVlYmlyZFwiO1xyXG5pbXBvcnQge0luY2lkZW50fSBmcm9tIFwiaW5jaWRlbnRcIjtcclxuaW1wb3J0ICogYXMgYXBpIGZyb20gXCIuL2FwaVwiO1xyXG5pbXBvcnQge0NyZWRlbnRpYWxzfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9hcGlcIjtcclxuaW1wb3J0IHtDb250ZXh0fSBmcm9tIFwiLi9pbnRlcmZhY2VzL2FwaS9jb250ZXh0XCI7XHJcbmltcG9ydCB7bG9naW59IGZyb20gXCIuL2xvZ2luXCI7XHJcbmltcG9ydCByZXF1ZXN0SU8gZnJvbSBcIi4vcmVxdWVzdC1pb1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZUNvbnRhaW5lciB7XHJcbiAgc3RhdGU6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0T3B0aW9ucyB7XHJcbiAgY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscztcclxuICBzdGF0ZT86IGFueTtcclxuICB2ZXJib3NlPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3Qob3B0aW9uczogQ29ubmVjdE9wdGlvbnMpOiBCbHVlYmlyZDxhcGkuQXBpPiB7XHJcbiAgaWYgKG9wdGlvbnMuc3RhdGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIEJsdWViaXJkLnJlamVjdChuZXcgSW5jaWRlbnQoXCJ0b2RvXCIsIFwiQ29ubmVjdGlvbiBmcm9tIHByZXZpb3VzIHN0YXRlIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLlwiKSk7XHJcbiAgfSBlbHNlIGlmIChvcHRpb25zLmNyZWRlbnRpYWxzID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBCbHVlYmlyZC5yZWplY3QobmV3IEluY2lkZW50KFwidG9kb1wiLCBcIkNvbm5lY3QgbXVzdCBkZWZpbmUgYGNyZWRlbnRpYWxzYFwiKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGFwaVByb21pc2U6IFByb21pc2U8Q29udGV4dD4gPSBsb2dpbih7XHJcbiAgICAgIGlvOiByZXF1ZXN0SU8sXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBvcHRpb25zLmNyZWRlbnRpYWxzLFxyXG4gICAgICB2ZXJib3NlOiBvcHRpb25zLnZlcmJvc2VcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIEJsdWViaXJkLnJlc29sdmUoYXBpUHJvbWlzZSlcclxuICAgICAgLnRoZW4oKGFwaUNvbnRleHQ6IENvbnRleHQpID0+IHtcclxuICAgICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIk9idGFpbmVkIGNvbnRleHQgdHJvdWdoIGF1dGhlbnRpY2F0aW9uOlwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IGFwaUNvbnRleHQudXNlcm5hbWUsXHJcbiAgICAgICAgICAgIHNreXBlVG9rZW46IGFwaUNvbnRleHQuc2t5cGVUb2tlbixcclxuICAgICAgICAgICAgcmVnaXN0cmF0aW9uVG9rZW46IGFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW5cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IGFwaS5BcGkoYXBpQ29udGV4dCwgcmVxdWVzdElPKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
