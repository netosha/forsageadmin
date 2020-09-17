import fetcher from "./fetchJson";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export async function partnerList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/list', requestOptions)
    return resp
}

export async function partnerInfo(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/info?id='+id, requestOptions)
    return resp
}

export async function leadsList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/lead/list/all', requestOptions)
    return resp
}
