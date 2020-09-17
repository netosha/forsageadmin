import useSWR from 'swr'
import * as api from '../api'

export default function useLeads(...options) {
    const { data:leads, error, isValidating, mutate } = useSWR('/admin/partners/lead/list/all', api.admin.leadsList)
    return {leads:leads?.leads, error, isValidating, mutate }
}

