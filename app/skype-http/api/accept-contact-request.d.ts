import * as Bluebird from "bluebird";
import { Context } from "../interfaces/api/context";
import * as io from "../interfaces/io";
export declare function acceptContactRequest(io: io.HttpIo, apiContext: Context, contactUsername: string): Bluebird<any>;
export default acceptContactRequest;
