import axios from 'axios';

export type Config = { method: string, data?: Map<string, any> | Array<any>, headers?: Map<string, string> }
export type Headers = { authorization: string, databasename: string, collectionname: string }

const adapter = (defaultHeaders: Headers) => ({
    fetch(url: string, config: Config = {method: "GET"}): Promise<Map<string, any> | Array<any>> {
        return new Promise((resolve, reject) => {
            const headers: any = {...defaultHeaders, ...config.headers}
            axios({url, ...config, headers})
                .then((res) => resolve(res.data))
                .catch((error) => reject(error.response && error.response.data));
        });
    }
})


export default adapter;
