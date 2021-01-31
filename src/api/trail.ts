import { Trail } from '../redux/slices/trail'

export const fetchTrails = async (api: string): Promise<Trail[]> => {
  const response = await fetch(`${api}/trail.json`)

  const trails = await response.json()
  if (!trails) throw new Error('missing data')
  return trails
}
