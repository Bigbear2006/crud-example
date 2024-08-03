import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/'
})

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

const ApiService = {
    pageSize: 1,
    refreshTokenTimeout: 60 * 1000,

    refreshToken() {
        axiosInstance.post('jwt-auth/user/refresh-token/', {refresh: localStorage.getItem('refresh')})
            .then(rsp => {
                localStorage.setItem('access', rsp.data.access)
                console.log('token refreshed')
            })
    },

    // auth
    login(data) {
        axiosInstance.post('jwt-auth/user/login/', data)
            .then(rsp => {
                localStorage.setItem('access', rsp.data.access)
                localStorage.setItem('refresh', rsp.data.refresh)
            })
    },

    googleLogin(credential) {
        axiosInstance.post('jwt-auth/user/login/google/', {token: credential})
                .then(rsp => {
                    localStorage.setItem('access', rsp.data.access)
                    localStorage.setItem('refresh', rsp.data.refresh)
                })
    },

    register(data) {
        axiosInstance.post('jwt-auth/user/register/', data)
            .then(rsp => alert('Письмо для завершения регистрации отправлено на почту (проверьте папку спам)'))
    },

    verifyEmail(userId, token, navigate) {
        axiosInstance.post(`jwt-auth/user/verify-email?user_id=${userId}&token=${token}`)
            .then(
                rsp => {
                    alert('Авторизация успешно завершена! Войдите при помощи своей почти и пароля.')
                    navigate('/login')
                },
                err => alert('Что-то пошло не так...')
            )
    },

    getUserInfo(setUserInfo) {
        axiosInstance.get('jwt-auth/user/info/')
            .then(rsp => setUserInfo(rsp.data))
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

        axiosInstance.post('api/items/', formData)
            .then(rsp => setModalIsOpen(false))
    },

    editItem(id, data, navigate) {
        let {title, image, description} = data
        let formData = new FormData()

        formData.append('title', title)
        if (image.length !== 0) {formData.append('image', image[0])}
        formData.append('description', description)

        axiosInstance.patch(`api/items/${id}/`, formData)
            .then(rsp => navigate('/'))
    },

    deleteItem(id, navigate) {
        axiosInstance.delete(`api/items/${id}/`)
            .then(rsp => navigate('/'))
    },
}

export default ApiService;
