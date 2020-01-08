import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILURE,
} from '../actions/postAction';

const initalState = {
    isFetching: false,
    usersList: [],
};

const users = (state = [initalState], action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return [
                ...state,
                {
                    isFetching: true,
                    usersList: [],
                },
            ];
        case GET_POSTS_SUCCESS:
            console.log('below is action');
            console.log(action.usersList[0].record);
            return [
                ...state,
                {
                    isFetching: false,
                    usersList: action.usersList,
                    lastUpdated: action.receivedAt,
                },
            ];
        case GET_POSTS_FAILURE:
            return [
                ...state,
                {
                    isFetching: false,
                    error: action.error,
                },
            ];
        default:
            return state;
    }
};

export default users;
