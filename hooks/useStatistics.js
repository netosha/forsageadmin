import useSWR from 'swr'
import * as api from '../api'

export default function useStatistics(period, ...options) {
    const { data, error, isValidating, mutate } = useSWR(['/admin/statistics', period], (url, period) => api.admin.statistics(period))
    return {data, error, isValidating, mutate }
}

