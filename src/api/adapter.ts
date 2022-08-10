import axios from 'axios';
import RaspberrypiServerError from "./RaspberrypiServerError";

export type Config = { method: string, data?: { payload: any }, headers?: Map<string, string> }
export type Headers = { authorization: string, databasename: string, collectionname: string }

const adapter = (defaultHeaders: Headers) => ({
    fetch(url: string, config: Config = {method: "GET"}): Promise<Map<string, any> | Array<any>> {
        return new Promise((resolve, reject) => {
            const headers: any = {...defaultHeaders, ...config.headers}
            axios({url, ...config, headers})
                .then((res) => resolve(res.data))
                .catch((error) => reject(new RaspberrypiServerError(error.response?.data || {message: "some error occurred"})));
        });
    }
})


export default adapter;
