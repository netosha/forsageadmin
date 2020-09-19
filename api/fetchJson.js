export default async function fetcher(url, ...args) {
    try {
        const response = await fetch('http://95.179.181.235:8080'+url, ...args)
        // if the server replies, there's always some data in json
        // if there's a network error, it will throw at the previous line
        const data = await response.json()

        if (response.ok) {
            return data
        }

        const error = new Error(response.statusText)
        error.response = response
        error.data = data
        throw error
    } catch (error) {
        if (!error.data) {
            error.data = { message: error.message }
        }
        throw error
    }
}