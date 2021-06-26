# vite2 + typescript + vue3.0 重构足球App移动端

## 预览地址 [Jacky懂⚽帝 http://zhoup.top:7005/dist](http://zhoup.top:7005/football)
> 备注：由于没有UI图，所以只能自己脑补结合官方的UI和app的UI作为参考，请大家谅解🤣😂😥，当然在这里希望各位使用正规官方应用，此项目目的是为了体验一把目前新兴的前端技术框架，大家看球直接去懂球帝哈！

## 背景
本人是一名足球迷（主队Liverpool😁😀😋），同时又是一名开发者，所以一直有个爱好就是把自己感兴趣的应用通过代码实现，
由于2年前使用vue2.x全家桶写过仿某足球app，但当时限于技术水平，项目搭建的有些缺陷，虽然可以启动运行，但没有将其发布到社区，而现在vue社区的各种生态再次风起云涌，如vue3.x，vant3.0以及vite2.0已经陆续发布，所以决定将此项目重构，顺便试一下水，踩一下坑。

该项目启动于2021年清明前，之前是为了保证项目能够运行且整体框架能基本搭建起来，所以一直在本地开发并未提交，现在基本可以确定这一套技术栈构建的该应用能run起来，所以决定发布到git与大家交流，技术栈的选取为

### 前端
+ vue3.x
+ vue router4.x
+ vuex 4.x
+ typescript
+ vite2
+ vant3.x
+ sass
+ postcss
+ axios

### 后端 [git地址](https://github.com/chensidi/football-api)
后端比较简单，只是用中间件转发了官方接口，并配置跨域设置
+ node.js
+ koa2
+ got

## 预览图片
![预览图片](http://zhoup.top:7005/vue3img/f1.png)
![预览图片](http://zhoup.top:7005/vue3img/f2.png)
![预览图片](http://zhoup.top:7005/vue3img/f3.png)
![预览图片](http://zhoup.top:7005/vue3img/f4.png)
![预览图片](http://zhoup.top:7005/vue3img/f5.png)
![预览图片](http://zhoup.top:7005/vue3img/f6.png)

> 在此声明，本项目只作为学习交流，不作为商业盈利目的，若有侵犯到官方app的任何利益，立即删除仓库，若有人用作牟利，则后果自负，与本人无关。

## 开发思路及细节

1. 与传统的vue2.x的版本类似，只不过在选脚手架或者叫构建工具的时候，并非vue/cli，而是尤老大最近搞出来的vite，现在已经是2.0版本了，`npm init @vitejs/app`， 或者`yarn create @vitejs/app`去初始化工程模板，感受下光速启动。
2. 和vue/cli一样，按照流程选择需要的配置，如ts，sass等。
3. 安装vant3.0，postcss等相关第三方依赖包。
4. 跟vue2.x的流程差不多了，定义好每个文件夹模块，如api层，组件components层，router路由层，store状态层，和放置静态资源的assets。
5. 由于vue3.x的写法有一些改变的地方，所以vuex，router都需要使用新的compositionAPI的方式，具体写法参考官方文档。
6. keepALive组件有明显改动，需要写成
```jsx
    <keep-alive :include="['Home', 'Match', 'Live']">
      <component :is="Component" />
    </keep-alive>
```
7. 需要先熟悉vue3.0的新语法，以及compositionAPI的代码整合思想。
8. ts相关配置。
9. 最后就是配置文件编写，不同于vue.config.js的编写，里面还是有很多不一样的地方，需要去查阅官方文档。

最后说一下开发感受吧，因为这个项目和其他两个项目是并行进行的，在去年国庆前夕，我决定将网易云/QQ的移动端app，用vue3.0进行编写，但当时主要是为了体验vue3.0的新语法，像ref，reactive，setup这些compositionAPI的用法，以及新版的computed，watch，历时几个月是写出来了，但后来发现vue3.0的推出，除了用proxy代替defineProperty，采用reactive和ref这样的响应式api之外，compositionAPI其实是一种代码构建的思想，在2.x中的optionsAPI（选项式API）将data，methods，computed，watch，分别放到对应的位置上，让开发者自己往里面塞内容，就有可能导致代码分散，上下横跳，而在组合式API中，会建议用户将一个功能块的代码都放到一个区域，包括变量和函数，这样更加内聚，当然这样的思想借鉴于react中的hook，再有一个就是vue2.x本身不是ts编写的，所以对于有ts需求的用户，要么采用装饰器的写法，但我个人感觉用了装饰器，就不像是在写vue了，或者说写起来没有js那么顺，有种蹩脚的感觉，而vue3本身用ts重构，所以综上，决定用这些技术栈去再完成一次重构。

有的人说，新的事物出现，并不代表它会取代现有的东西，就像vue3已经发布大半年了，但大家还是觉得是新鲜的东西，甚至有声音说学不动了，与其花时间在研究框架上，不如花时间在原生底层，因为所有东西都是建立在底层上的，尤大佬的vue也是用原生js写的，所以就停留在现有的脚步，把当前的弄扎实就够了，什么都是万变不离其宗，就有一批人带着观望的态度等待行情。当然我不否认这种观点，所有的框架都是建立在原生上的，但这并不妨碍我们去接受新的东西，比别人早走一步，早踩坑，不是对自己的一种锻炼吗，所以个人的看法就是，对技术有敬畏，多看，多学，尤大佬在今年春节期间，三天十次更新的vite，这不就是我们学习的榜样吗？

> 友情链接
+ [vue3.0仿网易云移动端app](https://github.com/chensidi/vue3-project)
+ [react17仿网易云PC端](https://github.com/chensidi/react17-project)
