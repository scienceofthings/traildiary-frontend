import {config} from "../config";
import {getToken} from "../misc/jsonWebToken";

export const getAuthenticationEndpoint = (): string => `${config.apiUrlPrefix}/token/`

export const getBearerAuthenticationHeader = (): string => 'Bearer ' + getToken()