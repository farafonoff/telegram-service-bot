import { CookieJar } from "request";
import { SkypeToken } from "../interfaces/api/context";
import * as io from "../interfaces/io";
export declare const skypeWebUri: string;
export declare const skypeLoginUri: string;
export declare const liveLoginUri: string;
export declare const webClientLiveLoginId: string;
/**
 * Checks if the user `username` exists
 */
export interface Credentials {
    login: string;
    password: string;
}
export interface GetSkypeTokenOptions {
    credentials: Credentials;
    httpIo: io.HttpIo;
    cookieJar: CookieJar;
}
export declare function getSkypeToken(options: GetSkypeTokenOptions): Promise<SkypeToken>;
export interface LoadLiveKeysOptions {
    httpIo: io.HttpIo;
    cookieJar: CookieJar;
}
export interface LiveKeys {
    /**
     * MicroSoft P Requ ?
     *
     * Examples:
     * - `"$uuid-46f6d2b2-ff98-4446-aafb-2ba99c0c0638"`
     */
    MSPRequ: string;
    /**
     * MicroSoft P OK ?
     *
     * Examples:
     * - `"lt=1483826635&co=1&id=293290"`
     */
    MSPOK: string;
    /**
     * PPF Token ?
     *
     * Examples: (see spec)
     */
    PPFT: string;
}
export declare function getLiveKeys(options: LoadLiveKeysOptions): Promise<LiveKeys>;
export declare function requestLiveKeys(options: LoadLiveKeysOptions): Promise<io.Response>;
export declare function scrapLivePpftKey(html: string): string;
export interface SendCredentialsOptions {
    username: string;
    password: string;
    liveKeys: LiveKeys;
    httpIo: io.HttpIo;
    jar: CookieJar;
}
export declare function getLiveToken(options: SendCredentialsOptions): Promise<string>;
export declare function requestLiveToken(options: SendCredentialsOptions): Promise<io.Response>;
/**
 * Scrap the result of a sendCredentials requests to retrieve the value of the `t` paramater
 * @param html
 * @returns {string}
 */
export declare function scrapLiveToken(html: string): string;
export interface GetSkypeTokenFromLiveTokenOptions {
    liveToken: string;
    httpIo: io.HttpIo;
    jar: CookieJar;
}
export declare function requestSkypeToken(options: GetSkypeTokenFromLiveTokenOptions): Promise<io.Response>;
export interface SkypeTokenResponse {
    skypetoken: string;
    expires_in: number;
}
/**
 * Scrap to get the Skype token
 *
 * @param html
 * @returns {string}
 */
export declare function scrapSkypeTokenResponse(html: string): SkypeTokenResponse;
