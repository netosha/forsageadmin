import Router from 'next/router'
import useSWR from 'swr'
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
import * as api from '../api'

export default function useUser(...options) {
    const { data:user, error, isValidating, mutate } = useSWR('/user/info', api.user.info)
    return { user, error, isValidating, mutate }
}