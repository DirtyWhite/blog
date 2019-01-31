# GitLab+Docker快速搭建CI/CD自动化部署

## 准备
- gitlab
- 装有doker和gitlab-runner的云服务器
- DokerFile和.gitlab-ci.yml

## Doker

### 应用场景
- web应用的自动化发布和打包
- 自动化测试和持续集成、发布

>本质上是个虚拟机镜像下载运行管理器，提供了虚拟机的cli接口，可以向虚拟机执行cli命令

### Dokerfile

>配置doker

## gitlab-ci

- 在gitlab的钩子触发后，通过cli执行特定脚本
- gitlab仓库配置runner
- 客户端的gitlab-runner通过配置的token，注册runner，以接受推送的钩子通知
- 服务器产生推送时，通知注册了的客户端执行脚本逻辑，脚本通过Doker命令来构建镜像，再通过Doker控制镜像构建开发环境、安装依赖、运行服务。

## jekins

- 一个平台，可以运行多个插件，来实现一些构建的脚本，比单纯命令行好一点。
- 比如将gitlab-ci直接运行构建代码，换成运行jenkins脚本，有jenkins配合插件，来执行构建作业。




