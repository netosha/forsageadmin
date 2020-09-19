import React from 'react'
import cn from 'classnames'
import styles from './Input.module.scss'

export default function Input({...props}) {
    console.log()
    return(
        <input className={cn(styles.input, {[styles.error]:props.error})} {...props}>
            {props.children}
        </input>
    )
}
