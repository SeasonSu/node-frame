# node

### 初始化数据库视图
```
sequelize-auto -o "./models" -d test -h localhost -u season -p 3307 -x suhuang123 -e mysql
```

#### 目录结构

----------
* doc `数据库文件，项目文档`
    - .doc
    - .sql
* backEnd `后台文件`
    - Semantic UI `（样式框架）`
    - vue／angular `（mvc框架）`
* frontEnd `前端文件 vue/ng/react`
    - app `原文件`
    - release `编译文件`
    - bower.json `引用`
* server `服务端文件`
    - config `配置模块（数据库配置，环境配置）`
        - index.js
    - controller `控制器，统一入口模块`
    - routers `路由文件`
        - (user) `接口处理模块`
        - index.js `入口文件`
    - codes `code编码模块`
        - code.js
        - index.js
    - models `数据库模型模块Sequelize`
    - services `业务模块，处理封装数据库models`
    - upload  `文件上传目录`
    - utils `工具类`
    - views `node模版引擎`
        - handlebars
    - logs `日志模块`
