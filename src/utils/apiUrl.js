const prodDomain = 'http://128.199.91.159:8888' + '/api' // match docker service's environment variable setting
const devDomain = 'http://localhost:8888/api'
export default (process.env.NODE_ENV === 'production' ? prodDomain : devDomain)
