<template>
    <header class="d-flex justify-content-between align-items-center">
        <h1 class="text-start">个人信息管理</h1>
        <span class="text-end">
            欢迎回来，{{ userData.username }}！
        </span>
    </header>
    <section class="my-3 p-3">
        <form id="baseinfoForm">
            <div class="p-2 row border border-2 rounded-2">
                <div class="col-9">
                    <div class="mb-3 row">
                        <label for="username" class="col-form-label-sm col-3">
                            你的昵称：
                        </label>
                        <div class="col-9">
                            <input type="text" name="username"
                                class="form-control" v-model="userData.username"
                            />
                            <div id="checkname"></div>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="phone" class="col-form-label-sm col-3">
                            手机号码：
                        </label>
                        <div class="col-9">
                            <input type="text" name="phone"
                                class="form-control" v-model="userData.phone"
                            />
                            <div id="checkphone"></div>
                        </div>    
                    </div>
                    <div class="mb-3 row">
                        <label for="phone" class="col-form-label-sm col-3">
                            电子邮件：
                        </label>
                        <div class="col-9">
                            <input type="text" name="email"
                                class="form-control" v-model="userData.email"
                            />
                            <div id="checkemail"></div>
                        </div>    
                    </div>
                    <div class="mb-3 row">
                        <label for="address" class="col-form-label-sm col-3">
                            收货地址：
                        </label>
                        <div class="col-9">
                            <input type="text" name="address"
                                class="form-control" v-model="userData.address"
                            />
                            <div id="checkaddress"></div>
                        </div>    
                    </div>
                </div>
                <div class="col-3 text-center">
                    <img class="rounded-circle" name="outputAvatar"
                        width="100" src="../assets/img/unknown.jpg">
                    <label class="m-2">
                        <input type="file" name="avatar" 
                            style="display: none;"
                        />
                        <input type="button" name="uploadAvatar" 
                            class="btn btn-outline-secondary btn-sm"
                            value="上传头像"
                            onclick="document.querySelector('#baseinfoForm').avatar.click()"
                            /> 
                    </label>
                    <input type="submit" value="更新信息" 
                        class="btn btn-primary btn-sm" />
                </div>
            </div>
        </form>
    </section>
</template>

<script setup>
    import { reactive } from 'vue';
    const userData = reactive({
        username: 'lingjie',
        phone: '1356666666',
        email: 'lingjie@abcd.com',
        address: '浙江省杭州市',
        avatar: ''    
    });
</script>

<style scoped>
/* 添加样式 */
</style>