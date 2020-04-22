const handleErrors = (res) => {
    const json = res.json();

    if (!res.ok) {
        return json.then((err) => {
            throw Error(err.message);
        });
    }

    return json;
};

const requestAuth = (req) => {
    let endpoint = 'http://localhost:3002/api/v1/users' + req.endpoint;
    let headers = { 'Content-Type': 'application/json; charset=utf-8' };

    if (req.type === 'GET') {
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${req.jwt}`,
        };
    }
    return fetch(endpoint, {
        method: req.type,
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers,
        body: JSON.stringify(req.body),
    })
        .then(handleErrors)
        .then((payload) => ({ payload }))
        .catch((err) => ({ err }));
};

export default requestAuth;
