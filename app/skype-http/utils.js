"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Returns the number of seconds since epoch.
 *
 * @returns {number}
 */
function getCurrentTime() {
    return Math.floor((new Date().getTime()) / 1000);
}
exports.getCurrentTime = getCurrentTime;
/**
 * Adds zeros to the left of the string representation of number until its length is equal to len.
 * @param number
 * @param len
 * @returns {string}
 */
function zeroPad(number, len) {
    return padLeft(number, len, "0");
}
exports.zeroPad = zeroPad;
function padLeft(str, len, char) {
    if (char === void 0) { char = " "; }
    var result = String(str);
    var missing = len - result.length;
    if (missing > 0) {
        result = stringFromChar(char, missing) + str;
    }
    return result;
}
exports.padLeft = padLeft;
function padRight(str, len, char) {
    if (char === void 0) { char = " "; }
    var result = String(str);
    var missing = len - result.length;
    if (missing > 0) {
        result = str + stringFromChar(char, missing);
    }
    return result;
}
exports.padRight = padRight;
function stringFromChar(char, count) {
    // TODO: count+1 ?
    return new Array(count - 1).join(char);
}
exports.stringFromChar = stringFromChar;
function getTimezone() {
    var sign;
    var timezone = (new Date()).getTimezoneOffset() * (-1);
    if (timezone >= 0) {
        sign = "+";
    }
    else {
        sign = "-";
    }
    var absTmezone = Math.abs(timezone);
    var minutes = absTmezone % 60;
    var hours = (absTmezone - minutes) / 60;
    return "" + sign + zeroPad(hours, 2) + "|" + zeroPad(minutes, 2);
}
exports.getTimezone = getTimezone;
var HTTP_HEADER_SEPARATOR = ";";
var HTTP_HEADER_OPERATOR = "=";
function stringifyHeaderParams(params) {
    var headerPairs = _.map(params, function (value, key) {
        if (value === undefined) {
            throw new Error("Undefined value for the header: " + key);
        }
        return key.replace(/%20/gm, "+") + "=" + value.replace(/%20/gm, "+");
    });
    // The space after the separator is important, otherwise Skype is unable to parse the header
    return headerPairs.join(HTTP_HEADER_SEPARATOR + " ");
}
exports.stringifyHeaderParams = stringifyHeaderParams;
// TODO: check with skype-web-reversed
function parseHeaderParams(params) {
    var result = {};
    params
        .split(HTTP_HEADER_SEPARATOR)
        .forEach(function (paramString) {
        paramString = _.trim(paramString);
        var operatorIdx = paramString.indexOf(HTTP_HEADER_OPERATOR);
        var key;
        var val;
        // Ensure that the operator is not at the start or end of the parameters string
        if (1 <= operatorIdx && operatorIdx + HTTP_HEADER_OPERATOR.length < paramString.length - 1) {
            key = _.trim(paramString.substring(0, operatorIdx));
            val = _.trim(paramString.substring(operatorIdx + HTTP_HEADER_OPERATOR.length));
        }
        else {
            key = val = _.trim(paramString);
        }
        if (key.length > 0) {
            result[key] = val;
        }
    });
    return result;
}
exports.parseHeaderParams = parseHeaderParams;
var hmac_sha256_1 = require("./utils/hmac-sha256");
exports.getHMAC128 = hmac_sha256_1.hmacSha256;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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U0FBUyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUwsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBdkJELDhDQXVCQztBQUVELG1EQUE2RDtBQUFyRCxtQ0FBQSxVQUFVLENBQWMiLCJmaWxlIjoibGliL3V0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7RGljdGlvbmFyeX0gZnJvbSBcIi4vaW50ZXJmYWNlcy91dGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIGVwb2NoLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRUaW1lKCk6IG51bWJlciB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoKG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDEwMDApO1xyXG59XHJcblxyXG4vKipcclxuICogQWRkcyB6ZXJvcyB0byB0aGUgbGVmdCBvZiB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIG51bWJlciB1bnRpbCBpdHMgbGVuZ3RoIGlzIGVxdWFsIHRvIGxlbi5cclxuICogQHBhcmFtIG51bWJlclxyXG4gKiBAcGFyYW0gbGVuXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gemVyb1BhZChudW1iZXI6IG51bWJlciB8IHN0cmluZywgbGVuOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIHJldHVybiBwYWRMZWZ0KG51bWJlciwgbGVuLCBcIjBcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWRMZWZ0KHN0cjogYW55LCBsZW46IG51bWJlciwgY2hhcjogc3RyaW5nID0gXCIgXCIpOiBzdHJpbmcge1xyXG4gIGxldCByZXN1bHQ6IHN0cmluZyA9IFN0cmluZyhzdHIpO1xyXG4gIGNvbnN0IG1pc3Npbmc6IG51bWJlciA9IGxlbiAtIHJlc3VsdC5sZW5ndGg7XHJcbiAgaWYgKG1pc3NpbmcgPiAwKSB7XHJcbiAgICByZXN1bHQgPSBzdHJpbmdGcm9tQ2hhcihjaGFyLCBtaXNzaW5nKSArIHN0cjtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhZFJpZ2h0KHN0cjogYW55LCBsZW46IG51bWJlciwgY2hhcjogc3RyaW5nID0gXCIgXCIpOiBzdHJpbmcge1xyXG4gIGxldCByZXN1bHQ6IHN0cmluZyA9IFN0cmluZyhzdHIpO1xyXG4gIGNvbnN0IG1pc3Npbmc6IG51bWJlciA9IGxlbiAtIHJlc3VsdC5sZW5ndGg7XHJcbiAgaWYgKG1pc3NpbmcgPiAwKSB7XHJcbiAgICByZXN1bHQgPSBzdHIgKyBzdHJpbmdGcm9tQ2hhcihjaGFyLCBtaXNzaW5nKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ0Zyb21DaGFyKGNoYXI6IHN0cmluZywgY291bnQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgLy8gVE9ETzogY291bnQrMSA/XHJcbiAgcmV0dXJuIG5ldyBBcnJheShjb3VudCAtIDEpLmpvaW4oY2hhcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lem9uZSgpOiBzdHJpbmcge1xyXG4gIGxldCBzaWduOiBzdHJpbmc7XHJcbiAgY29uc3QgdGltZXpvbmU6IG51bWJlciA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lem9uZU9mZnNldCgpICogKC0xKTtcclxuICBpZiAodGltZXpvbmUgPj0gMCkge1xyXG4gICAgc2lnbiA9IFwiK1wiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzaWduID0gXCItXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhYnNUbWV6b25lOiBudW1iZXIgPSBNYXRoLmFicyh0aW1lem9uZSk7XHJcbiAgY29uc3QgbWludXRlczogbnVtYmVyID0gYWJzVG1lem9uZSAlIDYwO1xyXG4gIGNvbnN0IGhvdXJzOiBudW1iZXIgPSAoYWJzVG1lem9uZSAtIG1pbnV0ZXMpIC8gNjA7XHJcblxyXG4gIHJldHVybiBgJHtzaWdufSR7emVyb1BhZChob3VycywgMil9fCR7emVyb1BhZChtaW51dGVzLCAyKX1gO1xyXG59XHJcblxyXG5jb25zdCBIVFRQX0hFQURFUl9TRVBBUkFUT1I6IHN0cmluZyA9IFwiO1wiO1xyXG5jb25zdCBIVFRQX0hFQURFUl9PUEVSQVRPUjogc3RyaW5nID0gXCI9XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5SGVhZGVyUGFyYW1zIChwYXJhbXM6IERpY3Rpb25hcnk8c3RyaW5nPikge1xyXG4gIGNvbnN0IGhlYWRlclBhaXJzOiBzdHJpbmdbXSA9IF8ubWFwKHBhcmFtcywgKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZGVmaW5lZCB2YWx1ZSBmb3IgdGhlIGhlYWRlcjogJHtrZXl9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7a2V5LnJlcGxhY2UoLyUyMC9nbSwgXCIrXCIpfT0ke3ZhbHVlLnJlcGxhY2UoLyUyMC9nbSwgXCIrXCIpfWA7XHJcbiAgfSk7XHJcblxyXG4gIC8vIFRoZSBzcGFjZSBhZnRlciB0aGUgc2VwYXJhdG9yIGlzIGltcG9ydGFudCwgb3RoZXJ3aXNlIFNreXBlIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgaGVhZGVyXHJcbiAgcmV0dXJuIGhlYWRlclBhaXJzLmpvaW4oSFRUUF9IRUFERVJfU0VQQVJBVE9SICsgXCIgXCIpO1xyXG59XHJcblxyXG4vLyBUT0RPOiBjaGVjayB3aXRoIHNreXBlLXdlYi1yZXZlcnNlZFxyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIZWFkZXJQYXJhbXMgKHBhcmFtczogc3RyaW5nKTogRGljdGlvbmFyeTxzdHJpbmc+IHtcclxuICBjb25zdCByZXN1bHQ6IERpY3Rpb25hcnk8c3RyaW5nPiA9IHt9O1xyXG5cclxuICBwYXJhbXNcclxuICAgIC5zcGxpdChIVFRQX0hFQURFUl9TRVBBUkFUT1IpXHJcbiAgICAuZm9yRWFjaCgocGFyYW1TdHJpbmcpID0+IHtcclxuICAgICAgcGFyYW1TdHJpbmcgPSBfLnRyaW0ocGFyYW1TdHJpbmcpO1xyXG4gICAgICBjb25zdCBvcGVyYXRvcklkeDogbnVtYmVyID0gcGFyYW1TdHJpbmcuaW5kZXhPZihIVFRQX0hFQURFUl9PUEVSQVRPUik7XHJcbiAgICAgIGxldCBrZXk6IHN0cmluZztcclxuICAgICAgbGV0IHZhbDogc3RyaW5nO1xyXG4gICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgb3BlcmF0b3IgaXMgbm90IGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIHBhcmFtZXRlcnMgc3RyaW5nXHJcbiAgICAgIGlmICgxIDw9IG9wZXJhdG9ySWR4ICYmIG9wZXJhdG9ySWR4ICsgSFRUUF9IRUFERVJfT1BFUkFUT1IubGVuZ3RoIDwgcGFyYW1TdHJpbmcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIGtleSA9IF8udHJpbShwYXJhbVN0cmluZy5zdWJzdHJpbmcoMCwgb3BlcmF0b3JJZHgpKTtcclxuICAgICAgICB2YWwgPSBfLnRyaW0ocGFyYW1TdHJpbmcuc3Vic3RyaW5nKG9wZXJhdG9ySWR4ICsgSFRUUF9IRUFERVJfT1BFUkFUT1IubGVuZ3RoKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAga2V5ID0gdmFsID0gXy50cmltKHBhcmFtU3RyaW5nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoa2V5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7aG1hY1NoYTI1NiBhcyBnZXRITUFDMTI4fSBmcm9tIFwiLi91dGlscy9obWFjLXNoYTI1NlwiO1xyXG4iXX0=