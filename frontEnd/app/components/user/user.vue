
<template>
    <div>
        <h3>首页{{}}</h3>
        <router-view></router-view>
    </div>
</template>


<script>
    export default {
        created(){
            console.info(this)
        }
    }
</script>

<style>

</style>
