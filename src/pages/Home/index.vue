<template>
    <div>
        <!-- 全局组件 -->
        <TypeNav></TypeNav>
        <!-- <div class="blank"></div> -->
        <!-- 轮播图组件 -->
        <ListContainer></ListContainer>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floor in homeFloorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'


import {mapState} from 'vuex'

export default {
    name: 'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    // Floor中存在组件复用，数据应该再Home组件中发请求
    mounted() {
        this.$store.dispatch('getFloorList');
    },
    computed:{
        ...mapState({
            homeFloorList: state=>state.home.floorList
        })
    }
}
</script>

<style>
/* .blank{
    height: 40px ;
} */
</style>