export const validatePassword = () => {
  return (
    rrule: any,
    value: any,
    callback: (error?: string | Error) => void
  ) => {
    if (value.length < 6) {
      callback(new Error('密码不能少于6位'))
    } else {
      callback()
    }
  }
}
