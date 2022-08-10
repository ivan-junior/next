import axios from "axios"

export default async function getCep(cep: string) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
        return Promise.resolve(response.data)
    } catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}