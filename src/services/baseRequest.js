import axios from 'axios';
import { API ,toast, TIMEOUT_DELAY, realTimeVariables} from "../constant/other.constant";
import queryString from 'query-string';


export default async function (data,path,method,needAuthenticated,params,otherOptions,isFormData) {
    let timeout = null;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    timeout = setTimeout(()=>{source.cancel()},TIMEOUT_DELAY);
    const url = params ?  `${API}${path}?` + queryString.stringify(params) : `${API}${path}`;
    if (needAuthenticated && !realTimeVariables.token) return Promise.reject({isTimeout:false,error: 401});
    let formData = null;

    try{
        const response = await axios({
            url,
            method: method,
            headers: needAuthenticated ? { "content-type": "application/json", authorization: `Bearer ${realTimeVariables.token}` } : { "content-type": "application/json" },
            cancelToken: source.token,
            data: isFormData ? formData : data,
            ...otherOptions
        });
        if (response.status === 200) {
            if (timeout) clearTimeout(timeout);
            return response.data;
        } else {
            if (timeout) clearTimeout(timeout);
            return Promise.reject({ isTimeout: false, error: 101 });
        }
    }catch(error){
        try{
            if (timeout) clearTimeout(timeout);
            const {response:{status,data:{message:dataMessage,errors}},message} = error;
            if (status === 401) {
                realTimeVariables.openLoginDialog && path !== '/auth/login' && realTimeVariables.openLoginDialog();
            }else if (!errors) {
                if (dataMessage){
                    toast.show(dataMessage,'error');
                } else {
                    toast.show(message,'error');
                }
            }
        } catch (er) {
            toast.show(er.toString(),'error');
        }
        return Promise.reject({isTimeout:axios.isCancel(error),error});
    }
}
