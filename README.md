# JS-bridge
## 一、项目简介

本项目为H5内嵌APP，通过混合开发（H5与Native之间进行通信），使web不再受限于浏览器，可以通过寄生app来获取系统权限，扩展H5的功能，为web应用带来更多可能。项目核心在于对混合开发的web端进行封装，提升其易用性和可维护性。为便于测试，开发基于VUE框架的演示页面，并将相关交互功能入植入项目中。

## 二、技术分析

- H5应用：开发速度快，更新迭代快，不需要客户端更新发布。但受限于寄生应用的权限，性能较差，不适合开发复杂的高负载应用。

- Native应用：可以根据需求获取系统权限，在功能与性能上有所保障。但是开发周期长，需要进行版本发布。

目前市面上的主流app都内嵌了H5页面，通过app来获取系统权限，丰富功能，通过H5来实现产品的快速开发迭代。使用混合开发技术，在保障系统功能的前提下，实现了项目的快速更新迭代。

## 三、项目框架





## 四、开发规范

### 1.项目规划

通过之前的原型测试，发现目前移动端两大操作系统Android 和iOS，关于H5-Native通信之间存在一些差别。所以本次项目开发基于webpack的vue多页应用，即Android一套页面，iOS一套页面，通过对Android 和  iOS 的 js-bridge封装，实现对外暴露统一的应用开发接口。
	
在开发中，只需要引入不同 js-bridge模块，即可实现统一的开发。

### 2.项目目录



### 3.分支管理

- master：主分支，保证主分支内容随时可用
- dev：开发分支，日常开发分支
- fix：紧急修复分支，当主分支内容出现紧急问题时，使用fix分支进行修复

## 五、开发记录





## 六、使用手册 

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


