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
                    <Icon.PieChart size={24} className={styles.icon}/>
                    <p className={styles.text}>Главная</p>
                </a>
            </Link>
            <Link href={'/partners/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/partners')})}>
                    <Icon.UserCheck size={24} className={styles.icon}/>
                    <p className={styles.text}>Статистика партнеров</p>
                </a>
            </Link>
            <Link href={'/leads/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/leads')})}>
                    <Icon.Users size={24} className={styles.icon}/>
                    <p className={styles.text}>Статистика лидов</p>
                </a>
            </Link>
            <Link href={'/presets/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/preset')})}>
                    <Icon.Filter size={24} className={styles.icon}/>
                    <p className={styles.text}>Пресеты воронок</p>
                </a>
            </Link>
            <Link href={'/adreffer/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/adreffer')})}>
                    <Icon.Flag size={24} className={styles.icon}/>
                    <p className={styles.text}>Рефералки и цена лида</p>
                </a>
            </Link>
            <Link href={'/funnels/list'}>
                <a className={cn(styles.secondary_box,{[styles.active]:router.pathname.startsWith('/funnels')})}>
                    <Icon.Book size={24} className={styles.icon}/>
                    <p className={styles.text}>Обучающие модули</p>
                </a>
            </Link>
        </div>
    )
}

export default Menu