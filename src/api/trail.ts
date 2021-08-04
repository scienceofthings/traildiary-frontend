import {config} from "../config";

export const getTrailsEndpoint = (): string => (`${config.apiUrlPrefix}/trails/`)
export const getTrailEndpoint = (trailId: number): string => (
    `${getTrailsEndpoint()}${trailId}/`
)