"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var request = require("request");
/**
 * Converts implementation-independant IO options to the concrete
 * options used by the `request` library.
 *
 * @param ioOptions Implementation independent IO options
 * @returns {request.Options} Corresponding `request` options
 */
function asRequestOptions(ioOptions) {
    var result = Object.assign({}, ioOptions);
    if (ioOptions.queryString) {
        result.qs = ioOptions.queryString;
    }
    return result;
}
/**
 * Send a GET request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
function get(options) {
    return Bluebird.fromCallback(function (cb) {
        request.get(asRequestOptions(options), function (error, response, body) {
            if (error) {
                return cb(error);
            }
            if (response.statusCode === undefined) {
                return cb(new Error("Missing status code"));
            }
            var ioResponse = {
                statusCode: response.statusCode,
                body: body,
                headers: response.headers
            };
            cb(null, ioResponse);
        });
    });
}
exports.get = get;
/**
 * Send a POST request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
function post(options) {
    return Bluebird.fromCallback(function (cb) {
        request.post(asRequestOptions(options), function (error, response, body) {
            if (error) {
                return cb(error);
            }
            if (response.statusCode === undefined) {
                return cb(new Error("Missing status code"));
            }
            var ioResponse = {
                statusCode: response.statusCode,
                body: body,
                headers: response.headers
            };
            cb(null, ioResponse);
        });
    });
}
exports.post = post;
/**
 * Send a PUT request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
function put(options) {
    return Bluebird.fromCallback(function (cb) {
        request.put(asRequestOptions(options), function (error, response, body) {
            if (error) {
                return cb(error);
            }
            if (response.statusCode === undefined) {
                return cb(new Error("Missing status code"));
            }
            var ioResponse = {
                statusCode: response.statusCode,
                body: body,
                headers: response.headers
            };
            cb(null, ioResponse);
        });
    });
}
exports.put = put;
exports.requestIo = {
    get: get,
    post: post,
    put: put
};
exports.default = exports.requestIo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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WUFDbkIsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUVELElBQU0sVUFBVSxHQUFnQjtnQkFDOUIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2dCQUMvQixJQUFJLEVBQUUsSUFBSTtnQkFDVixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87YUFDMUIsQ0FBQztZQUVGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuQkQsa0JBbUJDO0FBRVksUUFBQSxTQUFTLEdBQWM7SUFDbEMsR0FBRyxFQUFFLEdBQUc7SUFDUixJQUFJLEVBQUUsSUFBSTtJQUNWLEdBQUcsRUFBRSxHQUFHO0NBQ1QsQ0FBQztBQUVGLGtCQUFlLGlCQUFTLENBQUMiLCJmaWxlIjoibGliL3JlcXVlc3QtaW8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmx1ZWJpcmQgPSByZXF1aXJlKFwiYmx1ZWJpcmRcIik7XHJcbmltcG9ydCByZXF1ZXN0ID0gcmVxdWlyZShcInJlcXVlc3RcIik7XHJcbmltcG9ydCAqIGFzIGlvIGZyb20gXCIuL2ludGVyZmFjZXMvaW9cIjtcclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBpbXBsZW1lbnRhdGlvbi1pbmRlcGVuZGFudCBJTyBvcHRpb25zIHRvIHRoZSBjb25jcmV0ZVxyXG4gKiBvcHRpb25zIHVzZWQgYnkgdGhlIGByZXF1ZXN0YCBsaWJyYXJ5LlxyXG4gKlxyXG4gKiBAcGFyYW0gaW9PcHRpb25zIEltcGxlbWVudGF0aW9uIGluZGVwZW5kZW50IElPIG9wdGlvbnNcclxuICogQHJldHVybnMge3JlcXVlc3QuT3B0aW9uc30gQ29ycmVzcG9uZGluZyBgcmVxdWVzdGAgb3B0aW9uc1xyXG4gKi9cclxuZnVuY3Rpb24gYXNSZXF1ZXN0T3B0aW9ucyAoaW9PcHRpb25zOiBpby5HZXRPcHRpb25zIHwgaW8uUG9zdE9wdGlvbnMgfCBpby5QdXRPcHRpb25zKTogcmVxdWVzdC5PcHRpb25zIHtcclxuICBjb25zdCByZXN1bHQ6IHJlcXVlc3QuT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGlvT3B0aW9ucyk7XHJcbiAgaWYgKGlvT3B0aW9ucy5xdWVyeVN0cmluZykge1xyXG4gICAgcmVzdWx0LnFzID0gaW9PcHRpb25zLnF1ZXJ5U3RyaW5nO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogU2VuZCBhIEdFVCByZXF1ZXN0XHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtCbHVlYmlyZDxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldCAob3B0aW9uczogaW8uR2V0T3B0aW9ucyk6IEJsdWViaXJkPGlvLlJlc3BvbnNlPiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkLmZyb21DYWxsYmFjaygoY2IpID0+IHtcclxuICAgIHJlcXVlc3QuZ2V0KGFzUmVxdWVzdE9wdGlvbnMob3B0aW9ucyksIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGNiKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcihcIk1pc3Npbmcgc3RhdHVzIGNvZGVcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpb1Jlc3BvbnNlOiBpby5SZXNwb25zZSA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxyXG4gICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY2IobnVsbCwgaW9SZXNwb25zZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgYSBQT1NUIHJlcXVlc3RcclxuICpcclxuICogQHBhcmFtIG9wdGlvbnNcclxuICogQHJldHVybnMge0JsdWViaXJkPGFueT59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcG9zdCAob3B0aW9uczogaW8uUG9zdE9wdGlvbnMpOiBCbHVlYmlyZDxpby5SZXNwb25zZT4ge1xyXG4gIHJldHVybiBCbHVlYmlyZC5mcm9tQ2FsbGJhY2soKGNiKSA9PiB7XHJcbiAgICByZXF1ZXN0LnBvc3QoYXNSZXF1ZXN0T3B0aW9ucyhvcHRpb25zKSwgKGVycm9yLCByZXNwb25zZSwgYm9keSkgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gY2IoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gY2IobmV3IEVycm9yKFwiTWlzc2luZyBzdGF0dXMgY29kZVwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGlvUmVzcG9uc2U6IGlvLlJlc3BvbnNlID0ge1xyXG4gICAgICAgIHN0YXR1c0NvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXHJcbiAgICAgICAgYm9keTogYm9keSxcclxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjYihudWxsLCBpb1Jlc3BvbnNlKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogU2VuZCBhIFBVVCByZXF1ZXN0XHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zXHJcbiAqIEByZXR1cm5zIHtCbHVlYmlyZDxhbnk+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHB1dCAob3B0aW9uczogaW8uUHV0T3B0aW9ucyk6IEJsdWViaXJkPGlvLlJlc3BvbnNlPiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkLmZyb21DYWxsYmFjaygoY2IpID0+IHtcclxuICAgIHJlcXVlc3QucHV0KGFzUmVxdWVzdE9wdGlvbnMob3B0aW9ucyksIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGNiKGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNiKG5ldyBFcnJvcihcIk1pc3Npbmcgc3RhdHVzIGNvZGVcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpb1Jlc3BvbnNlOiBpby5SZXNwb25zZSA9IHtcclxuICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxyXG4gICAgICAgIGJvZHk6IGJvZHksXHJcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVyc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY2IobnVsbCwgaW9SZXNwb25zZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlcXVlc3RJbzogaW8uSHR0cElvID0ge1xyXG4gIGdldDogZ2V0LFxyXG4gIHBvc3Q6IHBvc3QsXHJcbiAgcHV0OiBwdXRcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlcXVlc3RJbztcclxuIl19
