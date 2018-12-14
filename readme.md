# v-mysql-php

### 项目简介
```  
基于mysql,php,bootstrap,jQuery实现的错题收集系统。

```  
github地址:https://github.com/Nconsolate/phpmysql   
  
gitee地址:https://gitee.com/Nconsolate/phpmysql  


## 1，安装
 
 **git clone git@github.com:Nconsolate/phpmysql.git**  
   
 或者  
 
 **git clone git@gitee.com:Nconsolate/phpmysql.git**

## 2，使用
**在本地服务器环境下打开。可在js>index.js中进行路径配置。**
**访问 http://localhost/index.html**



 **在线查看地址： http://47.101.199.141:8085**


### 技术
> **mysql的连接，数据库的创建等mysql基础操作**
**php的语法**  
**mysql数据的排序展示**  
**bootstrap的使用**  
**popper的使用**  
**页码的样式及页面更新**  
**ajax**  
**初始无数据提示**  


### mysql数据库
操作mysql数据库进行更删改查。  
数据库已开放，具体操作在ctrl>mysql.php中查看。 
``` 
数据库名：errsave 
表名：msg
``` 

<table style="border:2px dotted gray;">
  <th><td>名</td><td>类型 </td><td>长度</td><td>小数点</td><td>不是null</td><td>主键</td></th>
     <tr><td></td><td>id</td> <td>int</td> <td>11</td> <td>0</td><td>√</td> <td>√ key1</td></tr>
     <tr><td></td><td>cont</td><td>varchar </td><td>255</td><td>0</td><td></td><td></td></tr>
     <tr><td></td><td>s</td><td>varchar </td><td>255</td><td>0</td><td></td><td></td></tr>
     <tr><td></td><td>cont</td><td>varchar </td><td>255</td><td>0</td><td></td><td></td></tr>
  </table>


  
### 操作流
1.本地运行 访问本地数据库 
2.本地运行 访问服务器数据库
3.服务器运行 访问服务器数据库


### 界面实现  
使用bootstrap,popper实现，复杂交互效果使用jQuery实现。

### 问题及解决
* 将mysql部署到服务器。
        记得在控制台开端口。
* 本地运行连接服务器mysql正常。代码部署到服务器，连接mysql正常   ，视图不显现。  
    原因：服务器搭建的PHP环境为7.0，不支持mysql。
    解决：更换服务器PHP环境  <7.0即可，我这里更换的是PHP5.6环境。


## 目录
```
│  index.html                           主入口
│  readme.md
│  
├─ctrl                                  php文件夹
│      change.php                       改
│      delete.php                       删
│      insert.php                       增
│      mysql.php                        连接mysql
│      show.php                         显示
│      
├─img           
│      new_logo.png
│      
├─js
│      ajax.js                          自封装ajax
│      index.js                         主js
│      
└─libs                                  第三方库
        bootstrap.css
        bootstrap.js
        jquery.js
        popper.js
        
```


