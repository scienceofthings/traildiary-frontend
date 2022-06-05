import React from 'react'
import styles from './Headline.module.scss'


type HeadingProps = {
    as?: 'h1' | 'h2'
    children: React.ReactNode
}

const Headline: React.FunctionComponent<HeadingProps> = ({
                                                      as = 'h2',
                                                      children
                                                  }) => {
    const Headline = as
    return <Headline className={styles.headline}>{children}</Headline>
}

export default Headline