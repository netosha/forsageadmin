import useSWR from 'swr'
import * as api from '../api'

export default function useAdReffers(...options) {
    const { data:adreffers, error, isValidating, mutate } = useSWR('/admin/landingreffer/list', api.admin.landingRefferList)
    return {adreffers:adreffers?.adreffers, error, isValidating, mutate }
}

