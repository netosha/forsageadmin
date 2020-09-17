import React from 'react'
import styles from './Menu.module.scss'
import cn from 'classnames'

import * as Icon from 'react-feather'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Menu(){
    const router = useRouter()
    return(
        <div className={styles.wrapper}>
            <Link href={'/'}>
                <a className={cn(styles.primary_box,{[styles.active]:router.pathname === '/'})}>
                    <Icon.Briefcase size={24} className={styles.icon}/>
                    <p className={styles.text}>Главная</p>
                </a>
            </Link>
            <Link href={'/partners/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/partners')})}>
                    <Icon.UserCheck size={24} className={styles.icon}/>
                    <p className={styles.text}>Партнеры</p>
                </a>
            </Link>
            <Link href={'/leads/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/leads')})}>
                    <Icon.Users size={24} className={styles.icon}/>
                    <p className={styles.text}>Лиды</p>
                </a>
            </Link>
        </div>
    )
}

export default Menu