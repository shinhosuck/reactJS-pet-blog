

export const getTopicData = async(url)=> {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    })
    const data = resp.json()
    return data
}


export const getPostData = async(url)=> {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const getMyData = async(url, token)=> {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const updatePost = async(url, body, token)=> {
    const resp = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: body
    })
    const data = await resp.json()
    return data
}


export const deletePost = async(url, token)=> {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const createPost = async(url, form, token)=>  {
    console.log(token)
    const resp =  await fetch(url, {
        method: 'POST', 
        headers: {
            'Authorization': `Token ${token}`
        },
        body: form
    })
    const data = await resp.json()
    return data
}


export const addLikes = async(url, token)=> {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const replyPost = async(url, body, token)=> {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
    })
    const data = await resp.json()
    return data
}


export const getRepliedPosts = async(url)=> {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': null
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const hasReplied = async(url, token) => {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: null
    })
    const data = await resp.json()
    return data
}


export const register = async(url, body)=> {
    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await resp.json()
        return data

    } catch (error) {
        console.log({name:error.name, message:error.message})
    }
}


export const login = async(url, body)=> {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const data = await resp.json()
    return data
}