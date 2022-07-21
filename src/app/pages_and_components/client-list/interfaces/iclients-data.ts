export interface IClientsData {
    "nomeCliente"?: string,
    "cognomeCliente"?: string,
    "ragioneSociale": string,
    "partitaIva"?: number,
    "tipoCliente"?: string,
    "telefono"?: number,
    "email"?: string,
    "pec"?: string,
    "indirizzoSedeOperativa"?: {
        "via"?: string,
        "civico"?: number,
        "cap"?: number,
        "localita"?: {
            "comune"?: string,
            "provincia"?: string
        }
    },
    "indirizzoSedeLegale"?: {
        "via"?: string,
        "civico"?: number,
        "cap"?: number,
        "localita"?: {
            "comune"?: string,
            "provincia"?: string
        }
    },
    "id"?: number

}
