import domain from '@/js/domain.js'
import http from './http'
import qs from 'qs'

const requestHost = domain.requestHost

export default {
    testGet(param){
        return http.get(requestHost + '/testGet?' + qs.stringify(param))
    },
    testGet2(param){
        return http.get(requestHost + '/testGet2?' + qs.stringify(param))
    },
    login(param){
        return http.post(requestHost + '/login', param)
    }
}
