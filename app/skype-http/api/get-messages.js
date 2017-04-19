// import * as Bluebird from "bluebird";
// import * as _ from "lodash";
// import {Incident} from "incident";
//
// import * as io from "../interfaces/io";
// import {Conversation} from "../interfaces/api";
// import {Conversation as NativeConversation} from "../interfaces/native-api";
// import {ApiContext} from "../interfaces/api-context";
// import * as messagesUri from "../messages-uri";
// import {formatConversation} from "../utils/formatters";
//
// interface GetMessagesQuery {
//   startTime: number, // a timestamp ?
//   view: "msnp24Equivalent" | string;
//   targetType: string; // seen: Passport|Skype|Lync|Thread
// }
//
// export function getMessages (io: io.HttpIo, apiContext: ApiContext, conversationId: string): Bluebird<Message[]> {
//   return Bluebird
//     .try(() => {
//       const query: GetMessagesQuery = {
//         startTime: 0,
//         view: "msnp24Equivalent",
//         targetType: "Passport|Skype|Lync|Thread"
//       };
//
//       const requestOptions: io.GetOptions = {
//         uri: messagesUri.conversation(apiContext.registrationToken.host, messagesUri.DEFAULT_USER, conversationId),
//         jar: apiContext.cookieJar,
//         qs: query,
//         headers: {
//           "RegistrationToken": apiContext.registrationToken.raw
//         }
//       };
//       return io.get(requestOptions);
//     })
//     .then((res: io.Response) => {
//       if (res.statusCode !== 200) {
//         return Bluebird.reject(new Incident("net", "Unable to fetch conversations"));
//       }
//       const body: ConversationsBody = JSON.parse(res.body);
//       return _.map(body.conversations, formatConversation);
//     });
// }
//
// export default getMessages;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hcGkvZ2V0LW1lc3NhZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHdDQUF3QztBQUN4QywrQkFBK0I7QUFDL0IscUNBQXFDO0FBQ3JDLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUMsa0RBQWtEO0FBQ2xELCtFQUErRTtBQUMvRSx3REFBd0Q7QUFDeEQsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCxFQUFFO0FBQ0YsK0JBQStCO0FBQy9CLHdDQUF3QztBQUN4Qyx1Q0FBdUM7QUFDdkMsNERBQTREO0FBQzVELElBQUk7QUFDSixFQUFFO0FBQ0YscUhBQXFIO0FBQ3JILG9CQUFvQjtBQUNwQixtQkFBbUI7QUFDbkIsMENBQTBDO0FBQzFDLHdCQUF3QjtBQUN4QixvQ0FBb0M7QUFDcEMsbURBQW1EO0FBQ25ELFdBQVc7QUFDWCxFQUFFO0FBQ0YsZ0RBQWdEO0FBQ2hELHNIQUFzSDtBQUN0SCxxQ0FBcUM7QUFDckMscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixrRUFBa0U7QUFDbEUsWUFBWTtBQUNaLFdBQVc7QUFDWCx1Q0FBdUM7QUFDdkMsU0FBUztBQUNULG9DQUFvQztBQUNwQyxzQ0FBc0M7QUFDdEMsd0ZBQXdGO0FBQ3hGLFVBQVU7QUFDViw4REFBOEQ7QUFDOUQsOERBQThEO0FBQzlELFVBQVU7QUFDVixJQUFJO0FBQ0osRUFBRTtBQUNGLDhCQUE4QiIsImZpbGUiOiJsaWIvYXBpL2dldC1tZXNzYWdlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCAqIGFzIEJsdWViaXJkIGZyb20gXCJibHVlYmlyZFwiO1xyXG4vLyBpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuLy8gaW1wb3J0IHtJbmNpZGVudH0gZnJvbSBcImluY2lkZW50XCI7XHJcbi8vXHJcbi8vIGltcG9ydCAqIGFzIGlvIGZyb20gXCIuLi9pbnRlcmZhY2VzL2lvXCI7XHJcbi8vIGltcG9ydCB7Q29udmVyc2F0aW9ufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9hcGlcIjtcclxuLy8gaW1wb3J0IHtDb252ZXJzYXRpb24gYXMgTmF0aXZlQ29udmVyc2F0aW9ufSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9uYXRpdmUtYXBpXCI7XHJcbi8vIGltcG9ydCB7QXBpQ29udGV4dH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYXBpLWNvbnRleHRcIjtcclxuLy8gaW1wb3J0ICogYXMgbWVzc2FnZXNVcmkgZnJvbSBcIi4uL21lc3NhZ2VzLXVyaVwiO1xyXG4vLyBpbXBvcnQge2Zvcm1hdENvbnZlcnNhdGlvbn0gZnJvbSBcIi4uL3V0aWxzL2Zvcm1hdHRlcnNcIjtcclxuLy9cclxuLy8gaW50ZXJmYWNlIEdldE1lc3NhZ2VzUXVlcnkge1xyXG4vLyAgIHN0YXJ0VGltZTogbnVtYmVyLCAvLyBhIHRpbWVzdGFtcCA/XHJcbi8vICAgdmlldzogXCJtc25wMjRFcXVpdmFsZW50XCIgfCBzdHJpbmc7XHJcbi8vICAgdGFyZ2V0VHlwZTogc3RyaW5nOyAvLyBzZWVuOiBQYXNzcG9ydHxTa3lwZXxMeW5jfFRocmVhZFxyXG4vLyB9XHJcbi8vXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRNZXNzYWdlcyAoaW86IGlvLkh0dHBJbywgYXBpQ29udGV4dDogQXBpQ29udGV4dCwgY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IEJsdWViaXJkPE1lc3NhZ2VbXT4ge1xyXG4vLyAgIHJldHVybiBCbHVlYmlyZFxyXG4vLyAgICAgLnRyeSgoKSA9PiB7XHJcbi8vICAgICAgIGNvbnN0IHF1ZXJ5OiBHZXRNZXNzYWdlc1F1ZXJ5ID0ge1xyXG4vLyAgICAgICAgIHN0YXJ0VGltZTogMCxcclxuLy8gICAgICAgICB2aWV3OiBcIm1zbnAyNEVxdWl2YWxlbnRcIixcclxuLy8gICAgICAgICB0YXJnZXRUeXBlOiBcIlBhc3Nwb3J0fFNreXBlfEx5bmN8VGhyZWFkXCJcclxuLy8gICAgICAgfTtcclxuLy9cclxuLy8gICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnM6IGlvLkdldE9wdGlvbnMgPSB7XHJcbi8vICAgICAgICAgdXJpOiBtZXNzYWdlc1VyaS5jb252ZXJzYXRpb24oYXBpQ29udGV4dC5yZWdpc3RyYXRpb25Ub2tlbi5ob3N0LCBtZXNzYWdlc1VyaS5ERUZBVUxUX1VTRVIsIGNvbnZlcnNhdGlvbklkKSxcclxuLy8gICAgICAgICBqYXI6IGFwaUNvbnRleHQuY29va2llSmFyLFxyXG4vLyAgICAgICAgIHFzOiBxdWVyeSxcclxuLy8gICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICBcIlJlZ2lzdHJhdGlvblRva2VuXCI6IGFwaUNvbnRleHQucmVnaXN0cmF0aW9uVG9rZW4ucmF3XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9O1xyXG4vLyAgICAgICByZXR1cm4gaW8uZ2V0KHJlcXVlc3RPcHRpb25zKTtcclxuLy8gICAgIH0pXHJcbi8vICAgICAudGhlbigocmVzOiBpby5SZXNwb25zZSkgPT4ge1xyXG4vLyAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4vLyAgICAgICAgIHJldHVybiBCbHVlYmlyZC5yZWplY3QobmV3IEluY2lkZW50KFwibmV0XCIsIFwiVW5hYmxlIHRvIGZldGNoIGNvbnZlcnNhdGlvbnNcIikpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIGNvbnN0IGJvZHk6IENvbnZlcnNhdGlvbnNCb2R5ID0gSlNPTi5wYXJzZShyZXMuYm9keSk7XHJcbi8vICAgICAgIHJldHVybiBfLm1hcChib2R5LmNvbnZlcnNhdGlvbnMsIGZvcm1hdENvbnZlcnNhdGlvbik7XHJcbi8vICAgICB9KTtcclxuLy8gfVxyXG4vL1xyXG4vLyBleHBvcnQgZGVmYXVsdCBnZXRNZXNzYWdlcztcclxuIl19
