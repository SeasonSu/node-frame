<template lang="html">
    <keep-alive>
    <transition name="fade" mode="out-in" appear>
        <div class="list listWrapper" ref="listWrapper">
            <div>
            <div class="panel-table" v-for="item in list"  @click="goDetail(item.id)">
                    <router-link :to="{ path: 'detail', query: { id: item.id }}">
                <div class="panel-box">
                    <div class="panel-table-cell head-cell">
                        <div class="headImg" ><img :src="item.headImg"></div>
                    </div>
                    <div class="panel-table-cell">
                        <div class="panel-name">{{ item.name }} {{item.id}}</div>
                        <div>{{ item.time | time}}</div>
                    </div>
                </div>
                 </router-link>
            </div>
            </div>
        </div>
    </transition>
</keep-alive>
</template>

<script>

import '../../filter/time.js'
import BScroll from 'better-scroll'
import axios from 'axios'

export default {
    created() {

        axios.get('http://localhost:9090/list').then((res) => {
           this.list = res.data
           this.$nextTick(() => {
               this.initScroll()
           })

        })
     },
    data(){

        return {
            list:[],
            listWrapper:null,
            listScrollY:0
        }
    },
    methods:{
        //初始化滚动条
        initScroll(){
            this.listWrapper = new BScroll(this.$refs.listWrapper, {
              click: true,
              probeType: 3
            })
            let scrollTop = sessionStorage.getItem("scrollTop");
            if(scrollTop){
                 this.listWrapper.scrollTo(0,-scrollTop, 0)
            }
            this.listWrapper.on('scroll', (pos) => {
              this.listScrollY = Math.abs(Math.round(pos.y))
              sessionStorage.setItem("scrollTop",this.listScrollY);
            })
        },
        goDetail(id){
            console.log(id)
        }
    }

}
</script>

<style lang="scss">
    .list{
        position:fixed;
        width:100%;
        height:100%;
    }
    .panel-table{
        display:table;
        width:100%;
        box-sizing: border-box;
        vertical-align: middle;
        padding:.5rem .5rem 0 .5rem;
        .panel-box{
            background-color:#fff;
        }
        .panel-table-cell{
            display:table-cell;
            box-sizing: border-box;
            vertical-align: middle;
            .headImg img{
                width:80px;
                height:80px;
            }
        }
        .headImg{
            padding: .5rem;
        }
        .panel-name{
            padding-bottom:1rem;
        }
        .head-cell{
            width:80px;
            padding-right:.5rem;
        }
    }
</style>
