import { Credentials } from "./interfaces/api/api";
import { Context as ApiContext } from "./interfaces/api/context";
import * as io from "./interfaces/io";
export interface LoginOptions {
    io: io.HttpIo;
    credentials: Credentials;
    verbose?: boolean;
}
/**
 * Builds an Api context trough a new authentication.
 * This involves the requests:
 * GET <loginUrl> to scrap the LoginKeys (pie & etm)
 * POST <loginUrl> to get the SkypeToken from the credentials and LoginKeys
 * POST <registrationUrl> to get RegistrationToken from the SkypeToken
 *   Eventually, follow a redirection to use the assigned host
 * POST <subscription> to gain access to resources with the RegistrationToken
 *
 * @param options
 * @returns {Bluebird<ApiContext>}
 */
export declare function login(options: LoginOptions): Promise<ApiContext>;
export default login;
