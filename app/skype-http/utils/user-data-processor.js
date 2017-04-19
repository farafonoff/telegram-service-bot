"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
// github:demurgos/skype-web-reversed -> utils/people/userDataProcessor.js
function sanitizeXml(xmlString) {
    return _.isString(xmlString) ? _.escape(xmlString) : "";
}
exports.sanitizeXml = sanitizeXml;
// github:demurgos/skype-web-reversed -> utils/people/userDataProcessor.js
function sanitize(str) {
    return String(str); // TODO!
    // if (_.isString(str)) {
    //   var t = str,
    //     u = i.build(r);
    //   if (str.match(o) === null) {
    //     var a = s.escapeIncomingHTML(str);
    //     t = u.encode(a, !1);
    //   }
    //   return s.escapeIncomingHTML(u.decode(t));
    // }
    // return "";
}
exports.sanitize = sanitize;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi91dGlscy91c2VyLWRhdGEtcHJvY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMEJBQTRCO0FBRTVCLDBFQUEwRTtBQUMxRSxxQkFBNkIsU0FBaUI7SUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUQsQ0FBQztBQUZELGtDQUVDO0FBRUQsMEVBQTBFO0FBQzFFLGtCQUEwQixHQUFXO0lBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRO0lBQzVCLHlCQUF5QjtJQUN6QixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGlDQUFpQztJQUNqQyx5Q0FBeUM7SUFDekMsMkJBQTJCO0lBQzNCLE1BQU07SUFDTiw4Q0FBOEM7SUFDOUMsSUFBSTtJQUNKLGFBQWE7QUFDZixDQUFDO0FBWkQsNEJBWUMiLCJmaWxlIjoibGliL3V0aWxzL3VzZXItZGF0YS1wcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbi8vIGdpdGh1YjpkZW11cmdvcy9za3lwZS13ZWItcmV2ZXJzZWQgLT4gdXRpbHMvcGVvcGxlL3VzZXJEYXRhUHJvY2Vzc29yLmpzXHJcbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZVhtbCAoeG1sU3RyaW5nOiBzdHJpbmcpIHtcclxuICByZXR1cm4gXy5pc1N0cmluZyh4bWxTdHJpbmcpID8gXy5lc2NhcGUoeG1sU3RyaW5nKSA6IFwiXCI7XHJcbn1cclxuXHJcbi8vIGdpdGh1YjpkZW11cmdvcy9za3lwZS13ZWItcmV2ZXJzZWQgLT4gdXRpbHMvcGVvcGxlL3VzZXJEYXRhUHJvY2Vzc29yLmpzXHJcbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZSAoc3RyOiBzdHJpbmcpIHtcclxuICByZXR1cm4gU3RyaW5nKHN0cik7IC8vIFRPRE8hXHJcbiAgLy8gaWYgKF8uaXNTdHJpbmcoc3RyKSkge1xyXG4gIC8vICAgdmFyIHQgPSBzdHIsXHJcbiAgLy8gICAgIHUgPSBpLmJ1aWxkKHIpO1xyXG4gIC8vICAgaWYgKHN0ci5tYXRjaChvKSA9PT0gbnVsbCkge1xyXG4gIC8vICAgICB2YXIgYSA9IHMuZXNjYXBlSW5jb21pbmdIVE1MKHN0cik7XHJcbiAgLy8gICAgIHQgPSB1LmVuY29kZShhLCAhMSk7XHJcbiAgLy8gICB9XHJcbiAgLy8gICByZXR1cm4gcy5lc2NhcGVJbmNvbWluZ0hUTUwodS5kZWNvZGUodCkpO1xyXG4gIC8vIH1cclxuICAvLyByZXR1cm4gXCJcIjtcclxufVxyXG4iXX0=
