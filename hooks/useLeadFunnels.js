import useSWR from 'swr'
import * as api from '../api'

export default function useLeadFunnels(...options) {
    const { data, error, isValidating, mutate } = useSWR('/partner/funnel/list', api.partner.leadFunnelList)
    return { funnels:data?.funnels, error, isValidating, mutate }
}

