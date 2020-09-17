import useSWR from 'swr'
import * as api from '../api'

export default function usePartners(...options) {
    const { data:partners, error, isValidating, mutate } = useSWR('/admin/partners/list', api.admin.partnerList)
    return {partners:partners?.partners, error, isValidating, mutate }
}

