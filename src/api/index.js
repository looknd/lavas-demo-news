import * as user from './user';

let api = Object.assign({}, user);

const DEAULT_ERROR_MSG = 'ERROR';

Object.keys(api).forEach(apiName => {
    let request = api[apiName];
    api[apiName] = (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let ret = await request(params);
                if (!ret || !ret.data || ret.errno !== 0) {
                    reject(DEAULT_ERROR_MSG);
                }
                resolve(ret.data);
            }
            catch (e) {
                reject(e || DEAULT_ERROR_MSG);
            }
        });
    };
});

export default api;
