import axios from 'axios'
import Vue from 'vue'

// 为经过数据处理，直接经过$axios发送，会有无用数据，会接受如config，heads等信息

const env = process.env.NODE_ENV 
// 在生产环境，process.env.NODE_ENV设置为production
// 在开发环境，process.env.NODE_ENV设置为development
let baseURL = env == 'development' ? '/api' : '/'
const instance = axios.create({
    baseURL,
    timeout: 15000
})

// let instance = axios.create({
//     baseURL: process.env.NODE_ENV == 'development' ? '/api' : '/'
// })

const xhr = {
    get(url, data, config) {
        return new Promise((resolve, reject) => {
            instance.get(url, {params: data}, config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    fatch(url, data, config, methods){
        return new Promise((resolve, reject) => {
            instance[methods](url, data, config).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, data, config){
        return this.fatch(url, data, config, 'post')
    },
    del(url, data, config){
        return this.fatch(url, data, config, 'delete')
    },
}

export default xhr