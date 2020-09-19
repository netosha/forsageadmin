import React from 'react'
import styles from './LandingCard.module.scss'
import cn from 'classnames'
export default function LandingCard({...props}){

    return(
        <div className={cn(styles.LandingCard, {[styles.active]:props.active})} {...props}>
            <a className={styles.title}>{props.name}</a>
        </div>
    )
}