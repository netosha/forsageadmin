import React from 'react'
import styles from './Input.module.scss'

export default function TextArea({...props}) {
    return(
        <textarea className={styles.input} {...props}>
            {props.children}
        </textarea>
    )
}
