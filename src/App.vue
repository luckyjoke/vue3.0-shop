<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <div id="nav">
    <router-link to='/' class='tab-bar-item'>
      <div class="icon"><i class="iconfont icon-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to='/category' class='tab-bar-item'>
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>      
    </router-link>
    <router-link to='/shopcart' class='tab-bar-item'>
      <div class="icon">
          <van-badge :content="5" max="9" color='#F24405'>
            <i class="iconfont icon-gouwuche2"></i>
          </van-badge>        
      </div>
      <div>购物车</div>      
    </router-link>
    <router-link to='/user' class='tab-bar-item'>
      <div class="icon"><i class="iconfont icon-yonghu"></i></div>
      <div>我的</div>      
    </router-link>
  </div>
</template>

<script>
  // import { onMounted } from 'vue'
  // import { request } from 'network/request'
  export default{
    setup(){
    }
  }
</script>


<style lang="less">
  @import "assets/css/base.css";
  @import "assets/css/icon/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0; 
  box-shadow: 0 -3px 1px rgba(100,100,100,0.1);

  a {
    font-weight: bold;
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-bar-item{
    flex: 1;
    height: 50px;
    text-align: center;
    font-size: var(--font-size)
  }

   .tab-bar-item .icon{
      width: 14px;
      height: 24px;
      margin-top: 5px;
      vertical-align: center;
      display: inline-block;
   }
}
</style>
