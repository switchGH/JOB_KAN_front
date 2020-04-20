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

export const post = (req) => {
    const url = req.url;

    return fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${req.jwt}`,
        },
        body: JSON.stringify(req.body),
    })
        .catch((e) => {
            throw Error(e);
        })
        .then(handleErrors)
        .then((response) => response.json());
};

export const get = (req) => {
    const url = req.url;

    let headers = { 'Content-Type': 'application/json; charset=utf-8' };
    if (req.jwt) {
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${req.jwt}`,
        };
    }
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers,
    })
        .catch((e) => {
            throw Error(e);
        })
        .then(handleErrors)
        .then((res) => {
            return res.json();
        });
};

export const del = (req) => {
    const url = req.url;

    return fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${req.jwt}`,
        },
    })
        .catch((e) => {
            throw Error(e);
        })
        .then(handleErrors)
        .then((res) => {
            return res.json();
        });
};

export const put = (req) => {
    const url = req.url;
    return fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            authorization: `Bearer ${req.jwt}`,
        },
        body: JSON.stringify(req.body),
    })
        .catch((e) => {
            throw Error(e);
        })
        .then(handleErrors)
        .then((res) => {
            return res.json();
        });
};
