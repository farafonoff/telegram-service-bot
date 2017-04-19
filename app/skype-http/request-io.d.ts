import Bluebird = require("bluebird");
import * as io from "./interfaces/io";
/**
 * Send a GET request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
export declare function get(options: io.GetOptions): Bluebird<io.Response>;
/**
 * Send a POST request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
export declare function post(options: io.PostOptions): Bluebird<io.Response>;
/**
 * Send a PUT request
 *
 * @param options
 * @returns {Bluebird<any>}
 */
export declare function put(options: io.PutOptions): Bluebird<io.Response>;
export declare const requestIo: io.HttpIo;
export default requestIo;
