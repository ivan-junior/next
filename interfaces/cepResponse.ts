export interface ICepResponse {
    cep: string,
    logradouro: string,
    complemento: string | null,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
}