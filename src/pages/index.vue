<template>
    <div>
        <p>
            欢迎{{$store.getters.userInfo.account}}~
        </p>
        <p>
            您的密码是：{{$store.getters.userInfo.password}}
        </p>
        <p>
            这是从后台获取的token，将会存储在store中：
            {{$store.getters.token}}
        </p>
        <div>
            <p>测试请求：</p>
            <button @click="doRequest">这个请求会返回code: 10001</button>
            <button @click="doRequest2">这个请求会成功</button>
        </div>
    </div>
</template>

<script>
    import httpMethods from '@/http/httpMethods'
    export default {
        name: "index",
        methods: {
            async doRequest(){
                let res = await httpMethods.testGet({
                    query: '123'
                })
                alert(res.message)
            },
            async doRequest2(){
                let res = await httpMethods.testGet2({
                    query: '123'
                })
                alert(res.message)
            }
        }
    }
</script>

<style scoped>

</style>