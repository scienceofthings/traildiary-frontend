import {config} from "../config";

export const getRegionsEndpoint = (): string => (`${config.apiUrlPrefix}/regions`)