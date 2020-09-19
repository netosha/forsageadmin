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

export async function applyLeadToPartner(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/lead/apply?id='+id, requestOptions)
    return resp
}

export async function partnerFunnelList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/partner_funnel/list', requestOptions)
    return resp
}

export async function partnerFunnelInfo(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/partner_funnel/info?id='+id, requestOptions)
    return resp
}

export async function editPartnerFunnel(id, name){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'PUT',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({id, name})
    };
    const resp = await fetcher('/admin/partner/partner_funnel', requestOptions)
    return resp
}

export async function createPartnerFunnel(name){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({name})
    };
    const resp = await fetcher('/admin/partner/partner_funnel', requestOptions)
    return resp
}

export async function deletePartnerFunnel(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'DELETE',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/partner/partner_funnel?id='+id, requestOptions)
    return resp
}

export async function applyPartnerToNextStage(funnel_id, partner_id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher(`/admin/partner/partner_funnel/apply_next_stage?partner_id=${partner_id}&funnel_id=${funnel_id}`, requestOptions)
    return resp
}



export async function adRefferList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/admin/ad_reffer/list', requestOptions)
    return resp
}