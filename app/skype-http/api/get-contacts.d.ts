import * as Bluebird from "bluebird";
import { Contact } from "../interfaces/api/contact";
import { Context } from "../interfaces/api/context";
import * as io from "../interfaces/io";
export declare function getContacts(io: io.HttpIo, apiContext: Context): Bluebird<Contact[]>;
export default getContacts;
