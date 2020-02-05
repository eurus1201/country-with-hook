import  baseRequest from "./baseRequest";

export const countryServices = {
    all:{
        get: async()=>baseRequest(undefined,'/rest/v2/all','get')
    }
}