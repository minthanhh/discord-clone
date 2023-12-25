import axios from 'axios'

class Http {
	constructor() {
		this.instance = axios.create({baseURL: 'http://localhost:3001/api/v1/', withCredentials: false})

		this.instance.interceptors.response.use(
			(response) => response,
			(error) => {
				throw Error(error.response.data.message)
			},
		)

		this.instance.interceptors.request.use((config) => {
			if (localStorage.getItem('token')) config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
			return config
		})
	}
}
export const http = new Http().instance
