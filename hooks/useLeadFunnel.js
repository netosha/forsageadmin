import useSWR from 'swr'
import * as api from '../api'

export default function useLeadFunnel(id, ...options) {
    const { data, error, isValidating, mutate } = useSWR(id ? ['/partner/funnel/info', id] : null, (url,id) => api.partner.leadFunnelInfo(id))
    return { funnel:data, error, isValidating, mutate }
}

