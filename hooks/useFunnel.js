import useSWR from 'swr'
import * as api from '../api'

export default function useFunnel(id, ...options) {
    const { data:funnel, error, isValidating, mutate } = useSWR(id ? ['/admin/partner/partner_funnel/info', id] : null, (url, id) => api.admin.partnerFunnelInfo(id))
    return {funnel, error, isValidating, mutate }
}

