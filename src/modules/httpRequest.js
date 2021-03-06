require('dotenv').config();

const handleErrors = (res) => {
    if (res.ok) {
        return res;
    }

    switch (res.status) {
        case 400:
            throw Error('INVALID_TOKEN');
        case 401:
            throw Error('UNAUTHORIZED');
        case 500:
            throw Error('INTERNAL_SERVER_ERROR');
        case 502:
            throw Error('BAD_GATEWAY');
        case 404:
            throw Error('NOT_FOUND');
        default:
            throw Error('UNHANDLED_ERROR');
    }
};

export const request = (req) => {
    const url = process.env.REACT_APP_API_URL + req.endpoint;
    let obj = {
        method: req.type,
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
    };
    if (req.jwt) {
        obj.headers.authorization = `Bearer ${req.jwt}`;
    }
    if (req.type === 'POST' || req.type === 'PUT') {
        obj.body = JSON.stringify(req.body);
    }
    return fetch(url, obj)
        .catch((e) => {
            throw Error(e);
        })
        .then(handleErrors)
        .then((res) => {
            return res.json();
        });
};
