# AntForest
基于Auto.js的蚂蚁森林能量自动收取脚本

# 注意事项
* 只支持支付宝简体中文版本
* 测试机型 `小米8 MIUI11`

# 使用说明
* 下载项目后解压到 /sdcard/脚本 目录下
* 在Auto.js文件界面刷新一下即可看到脚本
* 运行 `config` 配置九宫格解锁密码，各点依次由1~9表示，共线的连续线段只需要首尾点，比如 Z 型手势密码为 `1379`
* 运行 `main` 启动主程序，启动后每隔10秒钟全局收取一遍能量，注意打开Auto.js的音量上键停止所有脚本

# 版本历史
## v1.0.2
###### 2019.12.01
* `新增` 图案解锁功能 (参考 [Nick-Hopps](https://github.com/Nick-Hopps/Ant-Forest-autoscript))

## v1.0.1
###### 2019.11.25
* `新增` 好友保护罩检测
* `优化` 进入蚂蚁森林界面模式修改，启动速度更快

## v1.0.0
###### 2019.08.12 
* `新增` 支持收取自己的能量和所有好友能量
