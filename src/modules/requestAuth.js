const handleErrors = res => {
    const json = res.json();

    if (!res.ok) {
        return json.then(err => {
            throw Error(err.message);
        });
    }

    return json;
};

// const requestAuth = req => {
//     let endpoint = 'http://localhost:3002/api/v1' + req.endpoint;
//     const custom = req.custom || {}; // GET時に使用
//     const reqObj = Object.assign({}, custom, { method: req.type });
//     console.log(reqObj);
//     if (req.type === 'POST') {
//         reqObj.headers = reqObj.headers || {};
//         reqObj.mode = 'cors';
//         reqObj.headers.Accept = 'application/json';
//         reqObj.headers['Content-Type'] = 'application/json';
//         reqObj.body = JSON.stringify(req.data);
//     }

//     return fetch(endpoint, reqObj)
//         .then(handleErrors)
//         .then(payload => ({ payload }))
//         .catch(err => ({ err }));
// };

const requestAuth = req => {
    let endpoint = 'http://localhost:3002/api/v1/users' + req.endpoint;
    return fetch(endpoint, {
        method: req.type,
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(req.data),
    })
        .then(handleErrors)
        .then(payload => ({ payload }))
        .catch(err => ({ err }));
};

export default requestAuth;
