import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://fvbit.ru/'
})

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

const ApiService = {
    pageSize: 10,
    refreshTokenTimeout: 60 * 1000,

    // auth
    refreshToken() {
        let refresh = localStorage.getItem('refresh')
        if (!refresh) {
            return
        }
        axiosInstance.post('jwt-auth/user/refresh-token/', {refresh: refresh})
            .then(rsp => {
                localStorage.setItem('access', rsp.data.access)
                console.log('token refreshed')
            })
    },

    checkUsername(username, setError) {
        axiosInstance.get(`jwt-auth/user/check-username?username=${username}`)
            .then(
                () => {},
                () => setError('username', {type: 'isAvailable', message: 'Это имя уже занято'})
            )
    },

    checkEmail(email, setError) {
        axiosInstance.get(`jwt-auth/user/check-email?email=${email}`)
            .then(
                () => {},
                () => setError('email', {type: 'isAvailable', message: 'Это почта уже занята'})
            )
    },

    login(data, setIsAuthenticated, navigate) {
        axiosInstance.post('jwt-auth/user/login/', data)
            .then(rsp => {
                localStorage.setItem('access', rsp.data.access)
                localStorage.setItem('refresh', rsp.data.refresh)
                setIsAuthenticated(true)
                navigate('/')
            })
    },

    googleLogin(credential, setIsAuthenticated, navigate) {
        axiosInstance.post('jwt-auth/user/login/google/', {token: credential})
                .then(rsp => {
                    localStorage.setItem('access', rsp.data.access)
                    localStorage.setItem('refresh', rsp.data.refresh)
                    setIsAuthenticated(true)
                    navigate('/')
                })
    },

    register(data, setModalIsOpen) {
        axiosInstance.post('jwt-auth/user/register/', data)
            .then(() => setModalIsOpen(true))
        setModalIsOpen(true)
    },

    verifyEmail(userId, token, setIsLoading, setSatusIsSuccess) {
        axiosInstance.get(`jwt-auth/user/verify-email?user_id=${userId}&token=${token}`)
            .then(
                () => {
                    setIsLoading(false)
                    setSatusIsSuccess(true)
                },
                () => {
                    setIsLoading(false)
                    setSatusIsSuccess(false)
                }
            )

    },

    getUserInfo(setUserInfo) {
        axiosInstance.get('jwt-auth/user/info/')
            .then(rsp => setUserInfo(rsp.data))
    },

    checkUserIsAdmin(setIsAdmin) {
        axiosInstance.get('jwt-auth/user/info/')
            .then(
                rsp => setIsAdmin(rsp.data.is_staff),
                () => setIsAdmin(false)
            )
    },

    // items
    getItems(page, setItems, setPagesCount) {
        axiosInstance.get(`api/items?page=${page}`)
            .then(rsp => {
                setItems(rsp.data.results)
                setPagesCount(Math.ceil(rsp.data.count / this.pageSize))
            })
    },

    getItem(id, setItem, setValue) {
        axiosInstance.get(`api/items/${id}/`)
            .then(rsp => {
                setItem(rsp.data)
                setValue('title', rsp.data.title)
                setValue('description', rsp.data.description)
                setValue('categories', rsp.data.categories.map(elem => elem.id))
            })
    },

    search(title, selectedCategories, setItems, setPagesCount) {
        axiosInstance.get(`api/items/search?title=${title}&categories=${selectedCategories.join(',')}`)
            .then(rsp => {
                setItems(rsp.data.results)
                setPagesCount(Math.ceil(rsp.data.count / this.pageSize))
            })
    },

    createItem(data, setModalIsOpen) {
        let formData = new FormData()
        formData.append('title', data.title)
        formData.append('image', data.image[0])
        formData.append('description', data.description)
        data.categories.forEach(category => {
            formData.append('categories', category)
        })

        axiosInstance.post('api/items/', formData)
            .then(() => setModalIsOpen(false))
    },

    editItem(id, data, navigate) {
        let formData = new FormData()
        formData.append('title', data.title)
        if (data.image.length !== 0) {formData.append('image', data.image[0])}
        formData.append('description', data.description)
        data.categories.forEach(category => {
            formData.append('categories', category)
        })

        axiosInstance.patch(`api/items/${id}/`, formData)
            .then(() => navigate('/'))
    },

    deleteItem(id, navigate) {
        axiosInstance.delete(`api/items/${id}/`)
            .then(() => navigate('/'))
    },

    // categories
    getCategories(setCategories, convert=false) {
        axiosInstance.get('api/categories/')
            .then(rsp => convert?
                setCategories(rsp.data.map(elem => ({value: elem.id, label: elem.title}))):
                setCategories(rsp.data)
            )
    }
}

export default ApiService;
