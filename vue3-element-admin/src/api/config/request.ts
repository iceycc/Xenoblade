import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from '../../utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 100000
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) { // 携带token
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { code, message } = response.data
  if (code !== 0) { // 错误提示
    ElMessage.error(message)
    return Promise.reject(message)
  }
  return response.data
}, (error: AxiosError) => {
  const res = error?.response
  if (res && res.status === 401) { // 未登录 token失效
    store.dispatch('user/resetToken').then(() => {
      window.location.reload()
    })
  }
  ElMessage.error(error.message)
  return Promise.reject(error)
})

export default service
