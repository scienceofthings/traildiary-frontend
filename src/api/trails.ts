import { Trail } from '../redux/slices/trail'

export const fetchTrails = async (api: string): Promise<Trail[]> => {
  const response = await fetch(`${api}`)

  const trails = await response.json()
  if (!trails) throw new Error('missing order data')
  return trails
}
