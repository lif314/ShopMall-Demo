<template>
    <div>
        <!-- 全局组件 -->
        <TypeNav></TypeNav>
        <!-- 轮播图组件 -->
         <ListContainer></ListContainer>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor/>
        <Floor/>
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

export default {
    name: 'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    }
}
</script>

<style>

</style>