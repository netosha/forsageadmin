import useSWR from 'swr'
import * as api from '../api'

export default function useLead(id, ...options) {
    const { data:lead, error, isValidating, mutate } = useSWR(['/partner/lead/info', id], (url, id) => api.partner.leadInfo(id))
    return {lead, error, isValidating, mutate }
}

