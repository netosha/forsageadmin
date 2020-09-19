import React from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
export default function Input({...props}) {
    const className = cn(styles.button,
        {
            [styles.disabled]:props.disabled,
            [styles.active]:props.active,
        }
    )
    return(
        <button className={className} {...props}>
            {props.children}
        </button>
    )
}