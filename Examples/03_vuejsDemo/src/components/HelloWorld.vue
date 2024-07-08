<script setup>
    import { ref } from 'vue'

    defineProps({
        msg: String,
    })
    const htmlTag = ref("<h2>Hello, World</h2>");
    const imgURL = ref("https://www.baidu.com/img/flexible/logo/pc/result.png");
    const count = ref(0)
    const todoList = ref( ['task 1', 'task 2', 'task 3']);
    const userInfo = ref( { name: 'Bruce Wayne', age: 38, gender: 'male' });
</script>

<template>
    <!-- <h1>{{ msg }}</h1> -->
    <h1 v-text="msg"></h1>
   
    <div v-html="htmlTag"></div>

    <div id="example-img ">
        <img :src="imgURL" v-show="imgURL!=''">
    </div>
    <table>
        <tr><th>属性</th><th>值</th></tr>
        <tr v-for="( value, key ) in userInfo">
           <td> {{ key }} </td>
            <td> {{ value }} </td>
        </tr>
    </table>

    <ul>
        <li v-for="( item, index ) in todoList">
            {{ item }} ——> 列表索引：{{ index }}
        </li>
    </ul>
    

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
        >create-vue</a
        >, the official Vue + Vite starter
    </p>
    <p>
        Install
        <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<style scoped>
    .read-the-docs {
    color: #888;
    }
</style>
