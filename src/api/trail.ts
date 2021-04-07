export const getTrailsEndpoint = (): string => ('/trails')
export const getTrailEndpoint = (trailId: number): string => (
    `${getTrailsEndpoint()}/${trailId}`
)