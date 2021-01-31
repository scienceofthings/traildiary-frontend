import { Category } from '../redux/slices/category'

export const fetchCategories = async (api: string): Promise<Category[]> => {
  const response = await fetch(`${api}/category.json`)

  const categories = await response.json()
  if (!categories) throw new Error('missing data')
  return categories
}
