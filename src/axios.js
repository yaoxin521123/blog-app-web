import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'
import el from "element-ui/src/locale/lang/el";

axios.defaults.baseURL = "http://8.142.29.250:8088"
axios.interceptors.request.use(config => {

    return config
})

axios.interceptors.response.use(response => {
        let res = response.data;
        console.log("===============")
        console.log(res)
        console.log("=============")

        if (res.code === 200) {
            return response
        } else {
            Element.Message.error(res.msg, {duration: 3 * 1000});
            return Promise.reject(response.data.msg)
        }


    },
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        Element.Message.error(error.message, {duration: 3 * 1000});
        return Promise.reject(error)
    }
)