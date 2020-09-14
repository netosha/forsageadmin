import fetcher from "./fetchJson";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export async function info(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/user/info', requestOptions)
    return resp
}

export async function auth(email, password) {
    var requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        redirect: 'follow',
        body: JSON.stringify({email,password})
    };
    const resp = await fetcher('/user/auth', requestOptions)
    return resp
}