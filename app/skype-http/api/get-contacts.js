"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var incident_1 = require("incident");
var _ = require("lodash");
var contactsUri = require("../contacts-uri");
var formatters_1 = require("../utils/formatters");
function getContacts(io, apiContext) {
    return Bluebird
        .try(function () {
        var requestOptions = {
            uri: contactsUri.contacts(apiContext.username),
            jar: apiContext.cookieJar,
            headers: {
                "X-Skypetoken": apiContext.skypeToken.value
            }
        };
        return io.get(requestOptions);
    })
        .then(function (res) {
        if (res.statusCode !== 200) {
            return Bluebird.reject(new incident_1.Incident("net", "Unable to fetch contacts"));
        }
        var body = JSON.parse(res.body);
        return _.map(body.contacts, formatters_1.formatContact);
    });
}
exports.getContacts = getContacts;
exports.default = getContacts;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvZ2V0LWNvbnRhY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXFDO0FBQ3JDLHFDQUFrQztBQUNsQywwQkFBNEI7QUFDNUIsNkNBQStDO0FBSy9DLGtEQUFrRDtBQVFsRCxxQkFBNEIsRUFBYSxFQUFFLFVBQW1CO0lBQzVELE1BQU0sQ0FBQyxRQUFRO1NBQ1osR0FBRyxDQUFDO1FBQ0gsSUFBTSxjQUFjLEdBQWtCO1lBQ3BDLEdBQUcsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDOUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxTQUFTO1lBQ3pCLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2FBQzVDO1NBQ0YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxVQUFDLEdBQWdCO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFRLENBQUMsS0FBSyxFQUFFLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBQ0QsSUFBTSxJQUFJLEdBQXFCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsMEJBQWEsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5CRCxrQ0FtQkM7QUFFRCxrQkFBZSxXQUFXLENBQUMiLCJmaWxlIjoibGliL2FwaS9nZXQtY29udGFjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBCbHVlYmlyZCBmcm9tIFwiYmx1ZWJpcmRcIjtcclxuaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBjb250YWN0c1VyaSBmcm9tIFwiLi4vY29udGFjdHMtdXJpXCI7XHJcbmltcG9ydCB7Q29udGFjdH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpL2NvbnRhY3RcIjtcclxuaW1wb3J0IHtDb250ZXh0fSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGkvY29udGV4dFwiO1xyXG5pbXBvcnQgKiBhcyBpbyBmcm9tIFwiLi4vaW50ZXJmYWNlcy9pb1wiO1xyXG5pbXBvcnQge0NvbnRhY3QgYXMgTmF0aXZlQ29udGFjdH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbmF0aXZlLWFwaS9jb250YWN0XCI7XHJcbmltcG9ydCB7Zm9ybWF0Q29udGFjdH0gZnJvbSBcIi4uL3V0aWxzL2Zvcm1hdHRlcnNcIjtcclxuXHJcbmludGVyZmFjZSBDb250YWN0c1Jlc3BvbnNlIHtcclxuICBjb250YWN0czogTmF0aXZlQ29udGFjdFtdO1xyXG4gIGNvdW50OiBudW1iZXI7IC8vIGNvbnRhY3RzLmxlbmd0aFxyXG4gIHNjb3BlOiBcImZ1bGxcIiB8IHN0cmluZzsgLy8gYW4gZW51bSA/XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250YWN0cyhpbzogaW8uSHR0cElvLCBhcGlDb250ZXh0OiBDb250ZXh0KTogQmx1ZWJpcmQ8Q29udGFjdFtdPiB7XHJcbiAgcmV0dXJuIEJsdWViaXJkXHJcbiAgICAudHJ5KCgpID0+IHtcclxuICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IGlvLkdldE9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiBjb250YWN0c1VyaS5jb250YWN0cyhhcGlDb250ZXh0LnVzZXJuYW1lKSxcclxuICAgICAgICBqYXI6IGFwaUNvbnRleHQuY29va2llSmFyLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiWC1Ta3lwZXRva2VuXCI6IGFwaUNvbnRleHQuc2t5cGVUb2tlbi52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGlvLmdldChyZXF1ZXN0T3B0aW9ucyk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlczogaW8uUmVzcG9uc2UpID0+IHtcclxuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICByZXR1cm4gQmx1ZWJpcmQucmVqZWN0KG5ldyBJbmNpZGVudChcIm5ldFwiLCBcIlVuYWJsZSB0byBmZXRjaCBjb250YWN0c1wiKSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYm9keTogQ29udGFjdHNSZXNwb25zZSA9IEpTT04ucGFyc2UocmVzLmJvZHkpO1xyXG4gICAgICByZXR1cm4gXy5tYXAoYm9keS5jb250YWN0cywgZm9ybWF0Q29udGFjdCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2V0Q29udGFjdHM7XHJcbiJdfQ==
