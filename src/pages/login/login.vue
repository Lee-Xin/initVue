<template>
    <div>
        <p style="color: red;">{{errorMsg}}</p>
        <div>
            <label>
                姓名：
                <input type="text" v-model="account">
            </label>
        </div>
        <div>
            <label>
                密码：
                <input type="password" v-model="password">
            </label>
        </div>
        <div>
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
    import httpMethods from '@/http/httpMethods'
    export default {
        name: "login",
        data(){
            return {
                account: '',
                password: '',
                errorMsg: ''
            }
        },
        methods: {
            async login(){
                if(!this.account || !this.password){
                    this.errorMsg = '请输入账号或密码'
                    return
                }
                this.errorMsg = ''
                let res = await httpMethods.login({
                    account: this.account,
                    password: this.password
                })
                if(res.success){
                    await this.$store.dispatch('setUserInfo', {
                        account: res.data.account,
                        password: res.data.password
                    })
                    await this.$store.dispatch('setToken', res.data.token)
                    this.$router.push({
                        name: 'index'
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>