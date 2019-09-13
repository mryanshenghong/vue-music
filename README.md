# vue-music
To learn how to implement a music player logic in  web app
学习怎么在web app内实现一个音乐播放器的逻辑

## 碰到的问题
    -better-scroll
    在使用better scroll 移动端触摸滚动组件时,当数据是异步加载的时候(或者数据发生变化的时候))应该动态计算scroll组件的高度,并且重新渲染页面
    Recommend.js
    在这里加入倒计时事件是因为页面重新渲染时间是17ms，使用倒计时在加载完第一张图片以后立即执行scroll刷新计算dom高度，
    目前解决了scroll下拉出现大片空白的问题

    ```
    <Slider>
        <div v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
        </div>
    </Slider>

    ...
    loadImage(){
        //在这里加入倒计时事件是因为页面重新渲染时间是17ms，使用倒计时在加载完第一张图片以后立即执行scroll刷新计算dom高度，
        //目前解决了scroll下拉出现大片空白的问题
        setTimeout( () => {
        if(!this.checkLoaded){
            this.$refs.scroll.refresh()
        }
        this.checkLoaded = true
        },20)
    }    
    ```
    ---
    -css
    header组件
    /components/header/Header
    ```
    <template>
        <div class="my-header">
            <div class="icon"></div>
            <h1 class="text">Chicken Music</h1>

            <!-- 个人中心 -->
            <router-link to="/user" class="mine" tag="div">
            <i class="icon-mine"></i>
            </router-link>
        </div>
    </template>
    <style lang="scss" scope>
        .my-header {
        position: relative;
        height: 44px;
        text-align: center;
        color: $color-theme;
        font-size: 0;
        //这里设置top为0的原因，让header距离顶部没有距离
        //如果不设置当移动端触摸移动header的时候会发生组件移动，
        //非常影响用户体验
        top:0; 
        //...余下代码略
    </style> 
    ```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```


