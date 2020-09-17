import useSWR from 'swr'
import * as api from '../api'

export default function useUser(...options) {
    const { data:user, error, isValidating, mutate } = useSWR('/user/info', api.user.info, ...options)
    return { user, error, isValidating, mutate }
}