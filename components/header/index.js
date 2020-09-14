import React from 'react'
import styles from './Header.module.scss'
import cn from 'classnames'
import {Cookies} from "react-cookie";
import Router from "next/router";
import useUser from "../../hooks/useUser";

const cookies = new Cookies();

function Header({...props}){
    const {user, error, mutate} = useUser()

    return(
        <div className={styles.wrapper} {...props} >
            {user ? <button onClick={() => {cookies.set('token', ''); Router.replace('/login'); mutate(null)}}>Выйти</button> : ''}
        </div>
    )
}

export default Header