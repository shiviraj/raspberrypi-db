import axios from 'axios';
import RaspberrypiServerError from "./RaspberrypiServerError";
import {Document} from "./collection";

export type Config = { method: string, data?: { payload: any }, headers?: Record<string, string> }
export type Headers = { authorization: string, databasename: string, collectionname: string }

const adapter = (defaultHeaders: Headers) => ({
  fetch<ReturnType extends Document>(url: string, config: Config = {method: "GET"}): Promise<ReturnType> {
    return new Promise((resolve, reject) => {
      const headers: any = {...defaultHeaders, ...config.headers}
      axios({url, ...config, headers})
        .then((res) => resolve(res.data))
        .catch((error) => reject(new RaspberrypiServerError(error.response?.data || {message: "some error occurred"})));
    });
  }
})


export default adapter;
