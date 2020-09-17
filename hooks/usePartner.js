import useSWR from 'swr'
import * as api from '../api'

export default function usePartner(id, ...options) {
    const { data:partner, error, isValidating, mutate } = useSWR(['/admin/partner/info', id], (url,id) => api.admin.partnerInfo(id))
    return {partner, error, isValidating, mutate }
}

