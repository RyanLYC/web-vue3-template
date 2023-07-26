import axios from 'axios'
import { useUserStore } from '@/store/userStore'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000, // 10s
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 在这个位置需要统一的去注入token
    if (userStore.token) {
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    // 配置接口国际化
    // config.headers['Accept-Language'] =  language
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      const userStore = useUserStore()
      // token超时
      userStore.logout()
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
