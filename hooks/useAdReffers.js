import useSWR from 'swr'
import * as api from '../api'

export default function useAdReffers(...options) {
    const { data:adreffers, error, isValidating, mutate } = useSWR('/admin/ad_reffer/list', api.admin.adRefferList)
    return {adreffers:adreffers?.adreffers, error, isValidating, mutate }
}

