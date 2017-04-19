import * as Bluebird from "bluebird";
import * as api from "./api";
import { Credentials } from "./interfaces/api/api";
export interface StateContainer {
    state: any;
}
export interface ConnectOptions {
    credentials?: Credentials;
    state?: any;
    verbose?: boolean;
}
export declare function connect(options: ConnectOptions): Bluebird<api.Api>;
