import React, { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from '../../../redux'
import { Trail } from '../../../redux/slices/trail'
import { loadCategories } from '../../../redux/slices/category'
import { Link } from 'wouter'
import { composeTrailDetailPageUri } from '../../../misc/uri'

const Categories: React.FunctionComponent = () => {
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  const trails = useTypedSelector((state) => state.trails.trails)
  const categories = useTypedSelector((state) => state.categories.categories)
  const getTrailsForCategory = (id: number): Trail[] => {
    return trails.filter((trail) => trail.categoryId === id)
  }
  return (
    <>
      {categories.map((category) => (
        <dl className="row" key={category.id}>
          <dt className="col">{category.title}</dt>
          {getTrailsForCategory(category.id).map((trail) => (
            <dd className="col" key={trail.id}>
              <Link to={composeTrailDetailPageUri(trail.id)}>
                {trail.title}
              </Link>
            </dd>
          ))}
        </dl>
      ))}
    </>
  )
}

export default Categories
