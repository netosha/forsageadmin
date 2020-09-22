import fetcher from "./fetchJson";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export async function leadInfo(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow'
    };
    const resp = await fetcher('/partner/lead/info?id='+id, requestOptions)
    return resp
}

export async function createStudyModule(name, text, pub=0){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({name, text, public:pub})
    };
    const resp = await fetcher('/partner/study_module', requestOptions)
    return resp
}

export async function setStudyModuleOrder(funnel_id, study_modules){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({funnel_id, study_modules})
    };
    const resp = await fetcher('/partner/study_module/order', requestOptions)
    return resp
}

export async function leadFunnelInfo(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow',
    };
    const resp = await fetcher('/partner/funnel/info?id='+id, requestOptions)
    return resp
}

export async function leadFunnelList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow',
    };
    const resp = await fetcher('/partner/funnel/list', requestOptions)
    return resp
}

export async function editLeadFunnel(id, name, study_time, mode, entryVideos, business_offer=0, preset=0){
    console.log(JSON.stringify({id, name, study_time, mode, entryVideos, business_offer, preset}))
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'PUT',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({id, name, study_time, mode, entryVideos, business_offer, preset})
    };
    const resp = await fetcher('/partner/funnel', requestOptions)
    return resp
}

export async function createLeadFunnel(name, study_time, mode, entryVideos, business_offer=0, preset=0){
    console.log(JSON.stringify({name, study_time, mode, entryVideos, business_offer, preset}))
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({name, study_time, mode, entryVideos, business_offer, preset})
    };
    const resp = await fetcher('/partner/funnel', requestOptions)
    console.l
    return resp
}

export async function deleteLeadFunnel(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'DELETE',
        headers: requestHeaders,
        redirect: 'follow',
    };
    const resp = await fetcher('/partner/funnel?id='+id, requestOptions)
    return resp
}


export async function updateStudyModule(id, name, text, pub=0){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    requestHeaders.append("Content-Type", `application/json`);
    var requestOptions = {
        method: 'PUT',
        headers: requestHeaders,
        redirect: 'follow',
        body:JSON.stringify({id, name, text, public:pub})
    };
    const resp = await fetcher('/partner/study_module', requestOptions)
    return resp
}

export async function deleteStudyModule(id){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'DELETE',
        headers: requestHeaders,
        redirect: 'follow',
    };
    const resp = await fetcher('/partner/study_module?id='+id, requestOptions)
    return resp
}

export async function landingList(){
    var requestHeaders = new Headers();
    requestHeaders.append("Authorization", `Token ${cookies.get('token')}`);
    var requestOptions = {
        method: 'GET',
        headers: requestHeaders,
        redirect: 'follow',
    };
    const resp = await fetcher('/partner/landing/list', requestOptions)
    return resp
}