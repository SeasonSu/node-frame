<!--详情-->
<template id="index">
    <div class="indexBox">
        {{headimgurl}}

    </div>

</template>

<script>
    export default {
        name:'index',
        data(){
            console.log(this)
            return {
                headimgurl : 'https://static.oschina.net/uploads/cooperation/index_banner_five_Muvau.jpg'
            }
        }
    }
</script>

<style>
    .indexBox{
        width:100%;
        height:300px;
        background-color:red;
    }
</style>
