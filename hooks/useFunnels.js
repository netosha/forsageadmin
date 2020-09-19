import useSWR from 'swr'
import * as api from '../api'

export default function useFunnels(...options) {
    const { data:funnels, error, isValidating, mutate } = useSWR('/admin/partner/partner_funnel/list', api.admin.partnerFunnelList)
    return {funnels:funnels?.funnels, error, isValidating, mutate }
}

