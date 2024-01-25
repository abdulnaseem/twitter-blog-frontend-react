import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    UPDATE_TWEET
} from './types';

export const getPosts = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/v1.0/tweets/all');
        //console.log(res.data)

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch(err) {
        console.log(err) 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get auth user post only
export const getPost = (loginId) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/v1.0/tweets/${loginId}`);
        console.log(res.data)

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch(err) {
        console.log(err) 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//get auth user post only
export const getReplyPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/v1.0/tweets/discussion/${id}`);
        console.log(res.data)

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch(err) {
        console.log(err) 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//like post
export const Like = (_id, createdBy) => async(dispatch) => {
    try {
        const res = await axios.put(`/api/v1.0/tweets/${createdBy}/like/${_id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { _id, likes: res.data}
        });
    } catch(err) {
        console.log(err) 
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
} 

//unlike post
export const Unlike = (_id, createdBy) => async(dispatch) => {
    try {
        const res = await axios.put(`/api/v1.0/tweets/${createdBy}/unlike/${_id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { _id, likes: res.data}
        });
    } catch(err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
} 

//delete a post
export const deletePost = (postId, createdBy) => async(dispatch) => {

    // console.log('Post id: ' + postId);
    // console.log('Post creator: ' + createdBy);
    
    try {
        const res = await axios.delete(`/api/v1.0/tweets/${createdBy}/delete/${postId}`);
        //console.log('Tweet deleted: ' + postId + ' - ' + createdBy)
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Tweet removed', 'succcess'))
    } catch(err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//add post 
export const addPost = (loginId, formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData);
    
    try {
        const res = await axios.post(`/api/v1.0/tweets/${loginId}/add`, body, config);
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Tweet Created', 'success'))
    } catch(err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add comment to post
export const addReplyPost = (postId, formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData);
    
    try {
        const res = await axios.post(`/api/v1.0/tweets/reply/${postId}`, body, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Reply Added', 'success'))
    } catch(err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


//delete the comment on a tweet
export const deleteReplyPost = (postId, replyId) => async(dispatch) => {
    console.log('Post id: ' + postId);
    console.log('Reply id: ' + replyId);
    try {
        const res = await axios.delete(`/api/v1.0/tweets/reply/${postId}/delete/${replyId}`);
        console.log(res.data)
        dispatch({
            type: REMOVE_COMMENT,
            payload: replyId
        });
        dispatch(setAlert('Reply Removed', 'success'))
    } catch(err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//add post 
export const updatePost = (loginId, postId, formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify(formData);
    
    try {
        const res = await axios.put(`/api/v1.0/tweets/${loginId}/update/${postId}`, body, config);
        dispatch({
            type: UPDATE_TWEET,
            payload: res.data
        });
        dispatch(setAlert('Tweet Updated', 'success'))
    } catch(err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

 