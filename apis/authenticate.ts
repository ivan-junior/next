import axios from "axios"
import { IUserCredentials } from "../interfaces/userCredentials"
axios.defaults.baseURL = 'http://bluesol-api-identity-hml.eastus2.azurecontainer.io'

export default async function authenticate(params: IUserCredentials) {
    try {
        const response = await axios.post(`/api/v1/Auth/Login`, params)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}