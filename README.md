后台接口  https://github.com/yanfengting/GiftHelper-api


注：榜单的数据需要自己新建一个goods表，然后把src/data下的goods.json里面的数据插入到goods表里面，反正我是一个一个插入的

address.vue,addressEdit.vue数据没有链接数据库，逻辑还有点问题
加入购物车的接口，数量加减的接口，商品删除的接口都调通了，
目前的问题：提交订单和地址都采用vuex

安装 mongodb robo  nodejs vscode

mongoDB (version:4.0.6)
node (version:10.15.3)
npm (version:6.4.1)

monogoDB和robo的安装教程 https://blog.csdn.net/fengtingYan/article/details/88371232
nodejs安装教程 https://blog.csdn.net/fengtingYan/article/details/86649526
vscode下载链接：https://pan.baidu.com/s/1a-5V8O89WKja45K5sPg8og 
提取码：pvlp 

git下载链接：https://pan.baidu.com/s/1kFMcS4LZnkc81ZyOfzMMHw 
提取码：qpf4 


启动mongo服务，连接数据库
（右键底部菜单栏，选任务管理器，选服务，输入MongoDB,右键-开始）

下载模块包
分别双击打开gift文件和gift-api文件 
两个都右键  git bush here  
输入npm install 分别下载node_modules模块包

启动项目
右键git bush here(或者按住shift右键-在此打开Powershell窗口)
（gift-api）npm start
（gift）npm run serve

浏览器输入
服务器 http://localhost:3000/
前台 http://localhost:8000/
打开robo管理 GiftDB 

数据库提前保存数据
去gift/src/data下找 json文件

参考gift文件下有个截图，数据库.jpg
首页攻略和榜单的数据需要自己加到数据库
gift/src/data
攻略包括 括号前面是数据库名字，括号里面是目录
babyis(gift/src/data/送宝贝.json)
bamas(gift/src/data/送爸妈.json)
colleagues(gift/src/data/送同事.json)
cyshs(gift/src/data/创意生活.json)
gays(gift/src/data/送基友.json)
goods(gift/src/data/goods.json)
jingxuans(gift/src/data/精选.json)
kjfs(gift/src/data/科技范.json)
mmds(gift/src/data/萌萌哒.json)
nvyous(gift/src/data/送女友.json)
qpggs(gift/src/data/奇葩搞怪.json)
sjgs(gift/src/data/设计感.json)
swipers(gift/src/data/首页轮播图.json)
users(gift/src/data/users.json)
wyfs(gift/src/data/文艺风.json)

注意攻略详情就精选的前三个存了数据，其余都是引入的外部链接


# vue

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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

