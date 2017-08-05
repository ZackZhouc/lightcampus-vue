const debug = process.env.NODE_ENV !== 'production'
const base = debug ? 'http://localhost:8081' : 'http://123.207.239.49:8081'

const findLoginByPhone = '/findLoginByPhone/'
const sendSms = '/sendSms/'
const checkCode = '/checkCode/'
const register = '/register/'
export default {
  base,
  findLoginByPhone,
  sendSms,
  checkCode,
  register
}
