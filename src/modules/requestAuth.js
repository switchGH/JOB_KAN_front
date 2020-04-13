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
        .then((payload) => ({ payload }))
        .catch((err) => ({ err }));
};

export default requestAuth;
