import React from 'react'
import Router from 'next/router'
import { mutate } from 'swr'
import { Cookies } from 'react-cookie';
import useUser from "../hooks/useUser";
import * as api from '../api'
import Header from "../components/header";
const cookies = new Cookies();

function Login(){
    const [email, setEmail] = React.useState('asdasd@asdasd.asdasd')
    const [password, setPassword] = React.useState('asdasd1488')

    // Redirect to main page if user already authorized
    React.useEffect(() => {
        if(cookies.get('token')){
            Router.replace('/')
        }
    })

    // Authorize user
    async function auth(e){
        e.preventDefault()
        try{
            const lox = await api.user.auth(email, password)
            cookies.set('token',lox.token)
            Router.push('/')
        }catch(error){
            console.log(error.data)
        }

    }

    return(
        <div>
            <Header />
            <form>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={'email'}
                />
                <br />
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'password'}
                    type={'password'}
                />
                <br />
                <button onClick={auth}>
                    Войти
                </button>
            </form>
            

        </div>
    )
}

export default Login