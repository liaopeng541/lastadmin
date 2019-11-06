<template>
    <div :is="navMenus.sub?'el-submenu':'el-menu-item'" :key="navMenus.id" :data="navMenus" :index="navMenus.id">
        <template slot="title">
            <i v-if="navMenus.sub || navMenus.icon" :class="navMenus.icon?navMenus.icon:'el-icon-tickets'"></i>
            <span> {{navMenus.name}}</span>
        </template>
        <LpMenu v-if="navMenus.sub" v-for="item in navMenus.sub" :navMenus="item"></LpMenu>
    </div>
</template>

<script>
    export default {
        name: 'LpMenu',
        props: ['navMenus'],
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>

</style>
