import axios from "axios"
axios.defaults.baseURL = 'https://viacep.com.br'

export default async function getCep(cep: string) {
    try {
        const response = await axios.get(`/ws/${cep}/json`)
        return Promise.resolve(response.data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}