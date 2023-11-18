import {config} from "../config";

export const getAuthenticationEndpoint = (): string => `${config.apiUrlPrefix}/token/`

