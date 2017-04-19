import * as Bluebird from "bluebird";
import * as api from "../interfaces/api/api";
import { Context } from "../interfaces/api/context";
import * as io from "../interfaces/io";
export declare function setStatus(io: io.HttpIo, apiContext: Context, status: api.Status): Bluebird<any>;
export default setStatus;
