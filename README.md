[![CircleCI](https://circleci.com/gh/Robocup-ssl-China/ssl-game-controller/tree/master.svg?style=svg)](https://circleci.com/gh/RoboCup-SSL/ssl-game-controller/tree/master)
[![Go Report Card](https://goreportcard.com/badge/github.com/Robocup-ssl-China/ssl-game-controller?style=flat-square)](https://goreportcard.com/report/github.com/Robocup-ssl-China/ssl-game-controller)
[![Go Doc](https://img.shields.io/badge/godoc-reference-blue.svg?style=flat-square)](https://godoc.org/github.com/Robocup-ssl-China/ssl-game-controller)
[![Release](https://img.shields.io/github/release/Robocup-ssl-China/ssl-game-controller.svg?style=flat-square)](https://github.com/Robocup-ssl-China/ssl-game-controller/releases/latest)
[![Coverage](https://img.shields.io/badge/coverage-report-blue.svg)](https://circleci.com/api/v1.1/project/github/Robocup-ssl-China/ssl-game-controller/latest/artifacts/0/coverage?branch=master)

# ssl-game-controller

这是一个专门为 RoboCup 小型组（RoboCup SSL）开发的比赛控制系统。该系统在 2019 年的 RoboCup 比赛中首次投入使用，旨在替代原有的 [ssl-refbox](https://github.com/RoboCup-SSL/ssl-refbox) 裁判盒

![Screenshot of Interface](./doc/screenshot_interface.png)

## 添加您的队伍

如果您是新队伍，或者您没有在列表中找到您的队伍名称，请在 [internal/app/engine/config.go](internal/app/engine/config.go) 中添加您的队伍名称。

## 使用

如果您只是想使用本应用程序，只需从[Release](https://github.com/Robocup-ssl-China/ssl-game-controller/releases/latest)下载最新的发布版本即可。该二进制文件是独立的，无需其他依赖。

您也可以使用预构建的 Docker 镜像(此方法仅适用于原版的GC)：

```shell script
docker pull robocupssl/ssl-game-controller
# 使用默认配置运行GC
docker run -p 8081:8081 robocupssl/ssl-game-controller -address :8081
# 挂载本地目录
docker run -p 8081:8081 \
  # 本地配置目录
  -v "$(pwd)"/config:/config \
  # 本地数据目录（当前状态）
  -v "$(pwd)"/data:/data \
  robocupssl/ssl-game-controller
```

GC在首次启动时会在 [config/](./config/) 目录下生成默认配置。之后，您可以在那里修改所有设置。

例如，如果您想临时添加一个新的队伍名称，可以将其添加到 [config/engine.yaml](./config/engine.yaml) 中。如果您想永久添加您的队伍，请将其添加到 [internal/app/engine/config.go](internal/app/engine/config.go) 中的 `defaultTeams` 并在 GitHub 上创建一个拉取请求。

### 运行环境要求

* 无软件依赖（开发除外，见下文）
* 预构建二进制文件支持(原版)：64位 Linux、Windows、OSX
* 现代浏览器（主要在 Chrome 上测试）

### 外部运行依赖

* [ssl-vision](https://github.com/RoboCup-SSL/ssl-vision) - 接收几何数据包以获取正确的场地尺寸
* 如果没有 ssl-vision，请确保在 [config/ssl-game-controller.yaml](config/ssl-game-controller.yaml) 中配置正确的尺寸

需要一个能产生 [TrackerWrapperPacket](https://github.com/RoboCup-SSL/ssl-vision/blob/master/src/shared/proto/messages_robocup_ssl_wrapper_tracked.proto) 的跟踪源实现来获取球和机器人位置.  
   
这对以下功能是必需的：
* 检查放球进度
* 检查每队机器人数量是否正确
* 检查比赛是否可以继续（球和机器人准备就绪）
* 检查比赛僵持状态
* 检查是否可以通过remote-control更换守门员

[TIGERs AutoRef](https://github.com/TIGERs-Mannheim/AutoReferee) 和 [ER-Force AutoRef](https://github.com/robotics-erlangen/autoref) 是跟踪源的实现示例。如果没有可用的跟踪源，上述功能将无法工作。在国内的比赛中，我们主要使用TIGERs的AutoRef

### 参考样例
官方项目提供了以下参考客户端，便于各队伍开发自己的软件：
 * [ssl-ref-client](./cmd/ssl-ref-client): 接收裁判消息的客户端
 * [ssl-auto-ref-client](./cmd/ssl-auto-ref-client/README.md): 作为自动裁判连接到GC的客户端
 * [ssl-team-client](./cmd/ssl-team-client/README.md): 作为队伍连接到GC的客户端
 * [ssl-remote-control-client](./cmd/ssl-remote-control-client/README.md): 作为远程控制连接到GC的客户端
 * [ssl-ci-test-client](./cmd/ssl-ci-test-client/README.md): 连接到GC的 CI 接口的客户端

### 在命令行运行ssl-game-controller可使用的参数

  -address string
        提供UI 和 API 服务的地址（默认为 "localhost:8081"）
  
  -backendOnly
        仅运行后端，不启动 UI 和 API 服务
  
  -ciAddress string
        提供 CI 连接服务的地址
  
  -publishAddress string
        发送裁判命令的地址（IP+端口）
  
  -skipInterfaces string
        接收多播数据包时要忽略的网络接口名称列表（用逗号分隔）
  
  -timeAcquisitionMode string
        使用的时间获取模式（system：系统时间，ci：CI模式，vision：视觉系统时间）
  
  -trackerAddress string
        接收追踪源数据包的地址（IP+端口）
  
  -verbose
        输出详细日志信息
  
  -visionAddress string
        接收视觉系统数据包的地址（IP+端口）

### 集成到您自己的框架
如果您不想为测试目的实现自己的控制器，游戏控制器设计为可以集成到您自己的 AI 框架中。

从 Github 发布页面下载发布版本的二进制文件，并在您的框架内运行它。您可以调整首次启动时生成的 `ssl-game-controller.yaml` 配置文件，比如更改默认端口。某些参数也可以通过命令行传递。使用 `-h` 选项可以查看可用参数。请尽可能使用非标准端口，以避免与实际场地设置产生干扰。

游戏控制器可以在以下三种模式下运行：

1. `system`（默认）：使用系统时间
2. `vision`：接收来自 ssl-vision 的消息，并使用这些消息中的时间戳作为时间源。这在从仿真中生成自己的 ssl-vision 帧时特别有用。
3. `ci`：通过 TCP 直接将您的软件连接到控制器。您发送当前时间戳和跟踪数据包，并将收到相应的裁判消息。

当您将控制器与自己的仿真器集成时，强烈建议使用 `ci` 模式。它具有以下优势：

1. 不需要可能发布到本地网络的多播网络流量（确保取消设置 `network.publish-address`）
2. 您可以完全控制数据流。控制器不会在后台异步执行任何操作
3. 您可以定义时间，从而控制速度
4. 您可以直接提供 ssl-vision 跟踪数据

如果您使用外部仿真器（如 grSim，rocos），可以考虑使用 `vision` 模式。这样，游戏控制器将使用仿真器的时间和速度，即使它不是实时运行的。如果需要上述功能，仍然需要运行一个跟踪源实现，如Autoref。

启用 `ci` 模式时，裁判消息仍将通过多播发布，除非地址未设置（设置为空字符串）。这样，您仍然可以集成自动裁判或其他软件。有关如何以 CI 方式集成自动裁判的详细信息，请参阅 [Auto-referee CI](doc/AutoRefCi.md)。

启用 `ci` 模式时（通过 `ssl-game-controller.yaml` -> `time-acquisition-mode`），将打开一个 TCP 端口（默认：10009）。协议在 [proto/ssl_gc_ci.proto](./proto/ssl_gc_ci.proto) 中定义。您发送 `CiInput` 消息并接收 `CiOutput` 消息。协议与 [team-client](./cmd/ssl-team-client/README.md) 相同。每个输入将产生一个或多个输出。这是因为某些更改会生成多个消息。`CiOutput` 消息也会在 UI 或 UI API 中手动更改时推送到 CI 客户端。

GC 需要一些输入数据，请参阅 [外部运行依赖](#外部运行依赖)。在 `ci` 模式下，您必须在 [config/ssl-game-controller.yaml](config/ssl-game-controller.yaml) 中静态提供几何数据，或通过 `CiInput` 发送。球和机器人位置必须通过 `CiInput` 发送。只需填写必填字段，保持可选字段为空即可。

这里有一个 `ci` 模式的小型测试客户端示例：[ssl-ci-test-client](./cmd/ssl-ci-test-client/README.md)

如果不能使用 `ci` 模式，您可以通过 UI WebSocket API 连接到 GC。API 在 [proto/ssl_gc_api.proto](./proto/ssl_gc_api.proto) 中定义，并在与 UI 相同的端口下的路径 `/api/control` 提供。

#### 示例
 * 二进制集成示例：https://github.com/TIGERs-Mannheim/AutoReferee/blob/master/modules/moduli-referee/src/main/java/edu/tigers/sumatra/referee/SslGameControllerProcess.java
 * Java 中的 WebSocket API 示例：https://github.com/TIGERs-Mannheim/AutoReferee/blob/master/modules/moduli-referee/src/main/java/edu/tigers/sumatra/referee/control

## 开发

### 环境要求

首先需要安装以下依赖：

* Go 语言环境
* Node.js 环境

具体兼容版本请参考 [.circleci/config.yml](.circleci/config.yml)。

### 前端开发

详见 [frontend/README.md](frontend/README.md)

### 构建

构建并安装所有二进制文件：

```bash
make install
```

### 运行

```bash
go run cmd/ssl-game-controller/main.go
```

### 与Autorefs联合使用

要快速运行GC并集成Autorefs及其他常用组件，请执行：

```bash
docker compose up
```

### 更新协议缓冲区生成的代码

如果您修改了任何 `.proto` 文件，需要重新生成代码：

```bash
make proto
```
