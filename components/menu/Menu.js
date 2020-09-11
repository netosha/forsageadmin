import React from 'react'
import styles from './Menu.module.scss'
import cn from 'classnames'

import * as Icon from 'react-feather'
import { useRouter } from 'next/router'

function Menu(){
    const router = useRouter()
    console.log(router)
    return(
        <div className={styles.wrapper}>
            <div className={cn(styles.primary_box,{[styles.active]:router.pathname === '/' ? true : false})}>
                <Icon.Users size={24}/>
                <p className={styles.text}>Партнеры</p>
            </div>

            <div className={cn(styles.secondary_box,{[styles.active]:router.pathname === '/funnels' ? true : false})}>
                <Icon.Users size={24}/>
                <p className={styles.secondary_text}>Воронки</p>
            </div>
        </div>
    )
}

export default Menu