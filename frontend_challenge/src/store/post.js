const GET_POSTS = 'posts/GET_POSTS';
const ADD_POST = 'posts/ADD_POST';
const DELETE_POST = 'posts/DELETE_POST';


const getPosts = posts => ({
    type: GET_POSTS,
    posts
})


const addPost = post => ({
    type: ADD_POST,
    post
})


const deletePost = postId => ({
    type: DELETE_POST,
    postId
})


export const getAllPostsThunk = () => async dispatch => {
    const res = await fetch('/api/post')
    if(res.ok) {
        const data = await res.json()
        dispatch(getPosts(data))
        return data
    } else if(res.status < 500) {
        const data = await res.json()
        if(data.errors) {
            return data
        }
    }
}


export const addPostThunk = post => async dispatch => {
    const { title, coffee, text, rating } = post
    const res = await fetch('/api/post', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, coffee, text, rating })
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(addPost(data))
        return data
    } else if(res.status < 500) {
        const data = await res.json()
        if(data.errors) {
            return data
        }
    }
}


export const deletePostThunk = postId => async dispatch => {
    const res = await fetch(`/api/post/${postId}`, {
        method: "DELETE"
    })
    if(res.ok) {
        dispatch(deletePost(postId))
    } else if (res.status < 500) {
        const data = await res.json()
        if(data.errors) {
            return data
        }
    }
}


const initialState = { all: {}, one: {} }


const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_POSTS: {
            const newState = { ...state, all: {} }
            action.posts.forEach(post => newState.all[post.id] = post)
            return newState
        }
        case ADD_POST: {
            const newState = { ...state, all: { ...state.all } }
            newState.all[action.post.id] = action.post
            return newState
        }
        case DELETE_POST: {
            const newState = { ...state, all: { ...state.all } }
            delete newState.all[action.postId]
            return newState
        }
        default:
            return state
    }
}

export default postsReducer;
