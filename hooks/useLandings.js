import useSWR from 'swr'
import * as api from '../api'

export default function useLandings(...options) {
    const { data:landings, error, isValidating, mutate } = useSWR('/partner/landing/list', api.partner.landingList)
    return {landings:landings?.landings, error, isValidating, mutate }
}

