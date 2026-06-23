# HarmonyStream 智联音悦

## 1. 项目简介

HarmonyStream（智联音悦）是一个基于 HarmonyOS ArkTS Stage 模型开发的音乐类移动应用项目。项目主体位于 `entry` 模块，应用入口为 `EntryAbility`，首屏加载 `WelcomeScreen`，用户确认隐私协议后进入主界面 `MainIndex`。主界面采用底部 Tabs 组织“主页、分类、我的”三个核心模块，并包含音乐推荐、歌曲分类、个人中心、账号设置、服务卡片等页面与组件。

项目中同时包含一个 Node.js 原生 HTTP 示例服务，位于 `server/server`，当前仅提供 `Hello World` 响应，尚未与 HarmonyOS 客户端页面形成实际接口联动。

本 README 根据当前代码实际内容编写，用于课程实验报告、项目验收材料或后续二次开发参考。

## 2. 项目功能介绍

### 2.1 已实现功能

1. 启动欢迎页与隐私确认
   - `entry/src/main/ets/pages/WelcomeScreen.ets` 作为应用首屏。
   - 使用 `@ohos.data.preferences` 存储隐私协议确认状态。
   - 首次进入应用时弹出自定义隐私协议弹窗 `UserPrivacyDialogo.ets`。
   - 用户同意后写入 `YinYueAppStore/isPrivacy`，并跳转到主界面。

2. 主界面底部导航
   - `entry/src/main/ets/pages/MainIndex/MainIndex.ets` 使用 `Tabs` 实现三个一级页面：
     - 主页：`HomeContent`
     - 分类：`Classify`
     - 我的：`Mine`

3. 主页推荐内容
   - `HomeContent.ets` 包含搜索入口、日期展示、轮播图、每日推荐、推荐歌单。
   - 本地资源图片用于轮播图。
   - 推荐卡片图片、歌单图片使用远程 OSS 地址加载。

4. 音乐分类模块
   - `Classify.ets` 提供“音乐分类、歌手分类、专辑分类”顶部 Tabs。
   - `MusicClassification.ets` 提供“流行、摇滚、古典、电子、民谣”二级 Tabs。
   - `Popular.ets` 内置流行歌曲列表，展示歌曲封面、歌名、歌手信息。

5. 个人中心模块
   - `Mine.ets` 展示用户头像、昵称、关注数、粉丝数、等级、听歌时长等静态信息。
   - `Detail.ets` 提供“音乐、历史、动态”Tabs。
   - `Dynamic.ets` 内置互动广场动态列表，展示作者、头像、动态内容、关联歌曲、评论数和点赞数。

6. 登录、注册与账号设置页面
   - 登录页：`pages/Login/Login.ets`
   - 注册页：`pages/Login/Enroll/Enroll.ets`
   - 找回密码页：`pages/Login/Retrieve/Retrieve.ets`
   - 设置页：`pages/SetUp/SetUp.ets`
   - 账号管理页：`pages/SetUp/AccountManage/AccountManage.ets`
   - 修改密码页：`pages/SetUp/ChangePassword/ChangePassword.ets`
   - 更换手机号页：`pages/SetUp/ChangePhone/ChangePhone.ets`

7. 服务卡片
   - 项目配置了两个 2*2 服务卡片：
     - `widgetCard_l2_1`
     - `widgetCard_l3_1`
   - 卡片源码分别位于：
     - `entry/src/main/ets/WidgetCard_l2_1/pages/WidgetCard_l2_1.ets`
     - `entry/src/main/ets/WidgetCard_l3_1/pages/WidgetCard_l3_1.ets`
   - 卡片支持通过数据库或 HTTP 方式更新数据，其中当前启用的是数据库更新逻辑。

8. 本地 Node.js 示例服务
   - `server/server/index.js` 使用 Node.js 原生 `http` 模块创建服务。
   - 监听端口：`2597`
   - 请求成功时返回：`Hello World`

### 2.2 当前未完全接入或预留功能

1. 登录、注册、修改密码、更换手机号页面当前主要是静态 UI，未接入真实后端接口。
2. `utils/Request.ets` 中封装了 `get`、`post` 请求方法，基础地址为 `http://123.56.141.187:4001`，但当前页面代码中未发现实际调用。
3. `server/server` 的 Node.js 服务当前只返回 `Hello World`，没有用户、音乐、歌单等业务接口。
4. 搜索页 `Search.ets` 当前只展示“搜索页面...”。
5. 摇滚、古典、电子、民谣、歌手分类、专辑分类等页面当前为占位文本。
6. `Popular.ets` 中点击歌曲会跳转到 `pages/play`，但 `main_pages.json` 未注册该页面，当前代码中也未包含对应播放页文件。
7. `AVPlayerClass.ets` 封装了播放器逻辑，但当前代码未发现对 `AVPlayerClass.init()` 的调用，直接播放前需要补充播放器初始化流程。

## 3. 技术栈

| 类型 | 技术/框架 | 项目中的体现 |
| --- | --- | --- |
| 客户端平台 | HarmonyOS | `build-profile.json5` 中 `runtimeOS` 为 `HarmonyOS` |
| 应用模型 | Stage 模型 | `entry/build-profile.json5` 中 `apiType` 为 `stageMode` |
| 开发语言 | ArkTS / ETS | `entry/src/main/ets` |
| UI 构建 | ArkUI 声明式 UI | `@Entry`、`@Component`、`Tabs`、`List`、`Column`、`Row` 等 |
| 路由 | HarmonyOS Router | `@kit.ArkUI`、`@ohos.router` |
| 数据持久化 | Preferences | 隐私协议状态、服务卡片 formId 存储 |
| 数据库 | RelationalStore | 服务卡片数据库 `form.db` |
| 多媒体 | AVPlayer | `utils/AVPlayerClass.ets` |
| 服务卡片 | Form Kit | `EntryFormAbility.ets`、`form_config.json` |
| 日志 | `@nzy/logger`、HarmonyOS `hilog` | 欢迎页与 Ability 生命周期日志 |
| 服务端 | Node.js 原生 HTTP | `server/server/index.js` |
| 测试 | Hypium / Hamock | `entry/src/test`、`entry/src/ohosTest` |

## 4. 项目目录结构

```text
HarmonyStream
├── AppScope
│   ├── app.json5                         # 应用全局配置：bundleName、版本、图标、应用名称
│   └── resources                          # AppScope 级资源
├── entry
│   ├── build-profile.json5                # entry 模块构建配置
│   ├── hvigorfile.ts                      # entry 模块 Hvigor 构建入口
│   ├── oh-package.json5                   # entry 模块依赖配置
│   └── src
│       ├── main
│       │   ├── ets
│       │   │   ├── api                    # 接口调用预留目录
│       │   │   ├── components             # 公共组件，如 Nav、NavBar
│       │   │   ├── dialog                 # 自定义弹窗
│       │   │   ├── entryability           # 应用 UIAbility 入口
│       │   │   ├── entrybackupability     # 备份恢复扩展 Ability
│       │   │   ├── entryformability       # 服务卡片扩展 Ability
│       │   │   ├── formcommon             # 服务卡片更新、偏好存储、数据库工具
│       │   │   ├── gedan                  # 歌曲、动态数据类型定义
│       │   │   ├── model                  # 页面数据模型定义
│       │   │   ├── pages                  # 应用页面
│       │   │   ├── utils                  # 日期、HTTP、播放器等工具类
│       │   │   ├── WidgetCard_l2_1        # 2*2 音乐卡片
│       │   │   └── WidgetCard_l3_1        # 2*2 快捷入口卡片
│       │   ├── module.json5               # entry 模块能力、权限、页面与扩展能力配置
│       │   └── resources                  # 页面资源、图片、颜色、字符串、配置文件
│       ├── mock                           # Mock 配置
│       ├── ohosTest                       # 设备测试
│       └── test                           # 本地单元测试
├── hvigor
│   └── hvigor-config.json5                # Hvigor 构建系统配置
├── server
│   └── server
│       ├── index.js                       # Node.js HTTP 示例服务入口
│       └── package.json                   # Node.js 服务包配置
├── build-profile.json5                    # HarmonyOS 工程构建配置
├── code-linter.json5                      # ETS 代码检查配置
├── hvigorfile.ts                          # 工程级 Hvigor 构建入口
├── oh-package.json5                       # 工程级 OHPM 依赖配置
└── oh-package-lock.json5                  # OHPM 锁定依赖版本
```

## 5. 环境配置

### 5.1 HarmonyOS 开发环境

建议使用 DevEco Studio 打开本项目。如果命令行未配置全局 `ohpm`、`hvigor`、`hdc` 命令，可以直接在 DevEco Studio 内运行，或手动配置 DevEco Studio 自带工具路径。

项目构建配置如下：

| 配置项 | 当前值 | 来源文件 |
| --- | --- | --- |
| `modelVersion` | `5.0.0` | `oh-package.json5`、`hvigor/hvigor-config.json5` |
| `apiType` | `stageMode` | `entry/build-profile.json5` |
| `compatibleSdkVersion` | `5.0.0(12)` | `build-profile.json5` |
| `targetSdkVersion` | `6.1.1(24)` | `build-profile.json5` |
| `runtimeOS` | `HarmonyOS` | `build-profile.json5` |
| 支持设备 | `phone`、`tablet`、`2in1` | `entry/src/main/module.json5` |

如果需要在命令行使用 DevEco Studio 自带工具，可参考以下 macOS 路径示例配置。实际路径需按本机 DevEco Studio 安装位置调整。

```bash
export DEVECO_SDK_HOME="/Applications/DevEco-Studio.app/Contents/sdk/default"
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/tools/ohpm/bin"
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin"
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains"
```

检查工具是否可用：

```bash
ohpm --version
hvigorw --version
hdc --version
```

本次检查环境通过 DevEco Studio 内置工具检测到：

```text
ohpm 6.1.2.268
hvigor 6.24.1
Node.js v20.16.0
npm 10.8.1
```

### 5.2 OHPM 依赖

工程级依赖位于 `oh-package.json5`：

```json5
{
  "dependencies": {
    "@hzw/logger": "^1.0.0",
    "@nzy/logger": "^1.0.6"
  },
  "devDependencies": {
    "@ohos/hypium": "1.0.19",
    "@ohos/hamock": "1.0.0"
  }
}
```

锁定版本位于 `oh-package-lock.json5`：

| 依赖 | 锁定版本 | 用途 |
| --- | --- | --- |
| `@hzw/logger` | `1.0.0` | 日志库，当前代码未发现直接使用 |
| `@nzy/logger` | `1.0.6` | 欢迎页隐私状态写入日志 |
| `@ohos/hypium` | `1.0.19` | HarmonyOS 测试框架 |
| `@ohos/hamock` | `1.0.0` | HarmonyOS Mock 测试依赖 |

安装依赖：

```bash
ohpm install
```

说明：该命令会根据 `oh-package.json5` 与 `oh-package-lock.json5` 安装或校验 `oh_modules` 中的 HarmonyOS 依赖。

### 5.3 Node.js 服务端环境

服务端代码位于 `server/server`，当前不依赖第三方 npm 包，仅使用 Node.js 内置 `http` 模块。

建议版本：

```text
Node.js >= 14
```

当前已验证环境：

```text
Node.js v20.16.0
npm 10.8.1
```

服务端 `package.json` 当前没有 `start` 脚本，因此需要直接执行 `index.js`。

## 6. 数据库、配置文件与环境变量说明

### 6.1 应用全局配置

`AppScope/app.json5`：

| 配置项 | 当前值 | 说明 |
| --- | --- | --- |
| `bundleName` | `com.example.harmonystream` | 应用包名 |
| `vendor` | `example` | 供应商标识 |
| `versionCode` | `1000000` | 应用版本号 |
| `versionName` | `1.0.0` | 应用显示版本 |
| `icon` | `$media:app_icon` | 应用图标 |
| `label` | `$string:app_name` | 应用名称资源 |

`AppScope/resources/base/element/string.json` 中 `app_name` 当前为：

```text
harmonystream
```

### 6.2 模块配置

`entry/src/main/module.json5`：

| 配置项 | 说明 |
| --- | --- |
| `mainElement` | 主 Ability 为 `EntryAbility` |
| `srcEntry` | `./ets/entryability/EntryAbility.ets` |
| `pages` | `$profile:main_pages` |
| `requestPermissions` | 申请 `ohos.permission.INTERNET` 网络权限 |
| `extensionAbilities` | 包含备份扩展 Ability 与服务卡片扩展 Ability |

注意：`module.json5` 中 `EntryFormAbility` 配置出现了两段相同的 form 扩展配置，后续整理时可以保留一份，减少重复配置。

### 6.3 页面路由配置

`entry/src/main/resources/base/profile/main_pages.json` 当前注册页面如下：

```json
{
  "src": [
    "pages/WelcomeScreen",
    "pages/MainIndex/MainIndex",
    "pages/SetUp/SetUp",
    "pages/SetUp/AccountManage/AccountManage",
    "pages/SetUp/ChangePassword/ChangePassword",
    "pages/SetUp/ChangePhone/ChangePhone",
    "pages/Search/Search",
    "pages/Login/Login",
    "pages/Login/Enroll/Enroll",
    "pages/Login/Retrieve/Retrieve"
  ]
}
```

### 6.4 Preferences 配置

项目中使用了两个 Preferences 存储：

| 存储名称 | Key | 使用位置 | 说明 |
| --- | --- | --- | --- |
| `YinYueAppStore` | `isPrivacy` | `WelcomeScreen.ets` | 记录用户是否同意隐私协议 |
| `formPreference` | `formId -> formName` | `FormPreference.ets` | 记录服务卡片实例与卡片名称关系 |

### 6.5 关系型数据库配置

服务卡片数据库配置位于 `entry/src/main/ets/formcommon/utils/dbutils/RdbUtils.ets`：

| 配置项 | 当前值 |
| --- | --- |
| 数据库名称 | `form.db` |
| 安全等级 | `dataRdb.SecurityLevel.S1` |

当前服务卡片数据库表：

| 表名 | 来源 | 说明 |
| --- | --- | --- |
| `widgetCard_l2_1Table` | `WidgetCard_l2_1Info.ets` | 存储 2*2 音乐卡片变量 |
| `widgetCard_l3_1Table` | `WidgetCard_l3_1Info.ets` | 存储 2*2 快捷入口卡片变量 |

当前 `FormDbInfo` 未配置初始化数据，因此服务卡片数据库创建后默认无业务数据，定时更新时可能不会改变卡片显示内容。

### 6.6 HTTP 配置

`entry/src/main/ets/utils/Request.ets` 中配置了通用 HTTP 请求封装：

```ts
const baseURL = 'http://123.56.141.187:4001';
```

该文件提供：

```ts
get<T>(url: string): Promise<T | null>
post<P, T>(url: string, postData: P): Promise<T | null>
```

说明：

1. 当前页面中未发现对该请求封装的实际调用。
2. 项目已在 `module.json5` 中申请 `ohos.permission.INTERNET`。
3. 首页、歌曲列表、动态列表中存在大量远程图片和音频地址，运行时需要设备或模拟器具备网络访问能力。

服务卡片 HTTP 更新配置位于 `formcommon/formsetting/formhttpsetting`，当前示例 URL 为：

```text
https://example.com/api/products
```

该 URL 是示例占位地址，当前 `EntryFormAbility.ets` 中启用的是数据库更新方式，HTTP 更新逻辑处于注释状态。

## 7. 部署与运行步骤

### 7.1 获取项目代码

进入项目目录：

```bash
cd HarmonyStream
```

说明：后续所有命令均以项目根目录为基准。

### 7.2 安装 HarmonyOS 依赖

使用 OHPM 安装工程依赖：

```bash
ohpm install
```

作用说明：

1. 读取根目录 `oh-package.json5`。
2. 按 `oh-package-lock.json5` 锁定版本下载依赖。
3. 生成或更新 `oh_modules` 目录。

如果命令行未配置 `ohpm`，可以在 DevEco Studio 中打开项目后执行 Sync，或将 DevEco Studio 自带的 `ohpm/bin` 加入 `PATH`。

### 7.3 使用 DevEco Studio 部署客户端

推荐部署方式：

1. 打开 DevEco Studio。
2. 选择 `Open`，打开项目根目录 `HarmonyStream`。
3. 等待 Hvigor/OHPM 同步完成。
4. 在 SDK Manager 中确认已安装与项目匹配的 HarmonyOS SDK。
5. 连接 HarmonyOS 设备，或启动本地模拟器。
6. 在顶部运行配置中选择 `entry` 模块。
7. 点击 `Run`，将应用安装并启动到设备或模拟器。

运行成功后，应用会先进入欢迎页，再根据隐私协议确认状态跳转主界面。

### 7.4 使用命令行构建客户端

如果本机已正确配置 `ohpm`、`hvigorw`、`DEVECO_SDK_HOME` 和 HarmonyOS SDK，可参考以下命令：

```bash
ohpm install
hvigorw assembleHap --mode module -p product=default -p module=entry@default
```

命令说明：

1. `ohpm install`：安装 HarmonyOS 工程依赖。
2. `hvigorw assembleHap`：构建 HarmonyOS HAP 安装包。
3. `--mode module`：按模块构建。
4. `-p product=default`：使用 `build-profile.json5` 中的 `default` 产品配置。
5. `-p module=entry@default`：构建 `entry` 模块的默认目标。

如果需要查看当前工程可用任务：

```bash
hvigorw tasks --no-daemon
```

本次命令行检查时出现过如下 SDK 配置问题：

```text
Invalid value of 'DEVECO_SDK_HOME' in the system environment path.
SDK component missing.
```

解决方法见“常见问题与解决方法”。

### 7.5 部署并运行 Node.js 示例服务

进入服务端目录：

```bash
cd server/server
```

启动服务：

```bash
node index.js
```

启动成功后终端输出：

```text
server is running at http://127.0.0.1:2597
```

使用浏览器或 `curl` 验证：

```bash
curl -i http://127.0.0.1:2597
```

预期响应：

```text
HTTP/1.1 200 OK
Content-Type: text/plain

Hello World
```

说明：该服务当前只是独立示例，不是客户端实际业务接口。

## 8. 前端运行方式

本项目的前端是 HarmonyOS ArkTS 客户端，不是 Web 前端，因此不能通过浏览器直接打开 `index.html` 运行。

运行方式如下：

1. 使用 DevEco Studio 打开项目。
2. 完成 OHPM 依赖同步。
3. 选择 `entry` 模块。
4. 选择 HarmonyOS 真机或模拟器。
5. 点击运行。

运行入口：

```text
entry/src/main/ets/entryability/EntryAbility.ets
```

首屏加载代码：

```text
windowStage.loadContent('pages/WelcomeScreen')
```

页面运行流程：

```text
EntryAbility
└── WelcomeScreen
    ├── 未同意隐私协议：打开 UserPrivacyDiaLogo 弹窗
    └── 已同意隐私协议：跳转 MainIndex
        ├── 主页 HomeContent
        ├── 分类 Classify
        └── 我的 Mine
```

## 9. 后端运行方式

后端当前为 Node.js 原生 HTTP 服务。

运行入口：

```text
server/server/index.js
```

运行命令：

```bash
cd server/server
node index.js
```

服务地址：

```text
http://127.0.0.1:2597
```

接口说明：

| 方法 | 地址 | 响应类型 | 当前响应内容 |
| --- | --- | --- | --- |
| `GET` | `/` | `text/plain` | `Hello World` |

当前 `package.json` 没有配置 `start` 脚本，因此以下命令不能直接使用：

```bash
npm start
```

如需支持 `npm start`，可后续在 `server/server/package.json` 中补充：

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

## 10. 接口或核心功能调用说明

### 10.1 客户端页面路由

| 功能 | 触发位置 | 目标页面 |
| --- | --- | --- |
| 欢迎页进入主界面 | `WelcomeScreen.jumpToMain()` | `pages/MainIndex/MainIndex` |
| 首页搜索框点击 | `HomeContent.ets` | `pages/Search/Search` |
| 我的页头像点击 | `Mine.ets` | `pages/Login/Login` |
| 我的页设置按钮点击 | `Mine.ets` | `pages/SetUp/SetUp` |
| 登录页注册账号点击 | `Login.ets` | `pages/Login/Enroll/Enroll` |
| 登录页忘记密码点击 | `Login.ets` | `pages/Login/Retrieve/Retrieve` |
| 设置页账号管理点击 | `SetUp.ets` | `pages/SetUp/AccountManage/AccountManage` |
| 账号管理更换手机号点击 | `AccountManage.ets` | `pages/SetUp/ChangePhone/ChangePhone` |
| 账号管理修改密码点击 | `AccountManage.ets` | `pages/SetUp/ChangePassword/ChangePassword` |

### 10.2 隐私协议状态写入流程

```text
WelcomeScreen.aboutToAppear()
└── 读取 Preferences：YinYueAppStore/isPrivacy
    ├── true：2 秒后 replaceUrl 到 MainIndex
    └── false：打开 UserPrivacyDiaLogo
        ├── 同意：写入 isPrivacy=true，flush 后跳转 MainIndex
        └── 不同意：terminateSelf 退出应用
```

### 10.3 服务卡片更新流程

```text
EntryFormAbility.onAddForm()
└── FormPreference.persistForm()
    └── 持久化 formId 与 formName

EntryAbility.onCreate()
└── createDbInsertData()
    └── 创建 form.db 与卡片表

EntryFormAbility.onUpdateForm()
└── FormDbUpdate.updateForm()
    └── 根据 formId 查询 formName
        └── 查询对应数据库表
            └── formProvider.updateForm()
```

### 10.4 播放器封装说明

`entry/src/main/ets/utils/AVPlayerClass.ets` 封装了以下能力：

| 方法 | 说明 |
| --- | --- |
| `init()` | 创建 `media.AVPlayer` 并监听状态、总时长、播放进度 |
| `singPlay(song)` | 播放指定歌曲，并维护播放列表 |
| `changeMode(mode)` | 切换播放模式：`auto`、`repeat`、`random` |
| `prev()` | 播放上一首 |
| `next()` | 播放下一首 |
| `pauseOrplay()` | 暂停或继续播放 |
| `updateState()` | 通过 `emitter` 广播播放状态 |

当前代码中未发现 `AVPlayerClass.init()` 调用，也未提供注册到 `main_pages.json` 的播放详情页，因此播放能力仍需补充完整页面与初始化流程。

## 11. 系统运行流程

```text
应用启动
  ↓
EntryAbility.onCreate()
  ├── 处理服务卡片路由参数
  └── 创建服务卡片数据库表
  ↓
EntryAbility.onWindowStageCreate()
  ↓
加载 pages/WelcomeScreen
  ↓
读取隐私协议确认状态
  ├── 未确认：显示隐私协议弹窗
  │   ├── 同意：写入 Preferences 并进入主界面
  │   └── 不同意：退出应用
  └── 已确认：进入主界面
  ↓
MainIndex
  ├── 主页：搜索入口、轮播图、每日推荐、推荐歌单
  ├── 分类：音乐分类、歌手分类、专辑分类
  └── 我的：个人信息、音乐、历史、动态、设置入口
```

## 12. 功能演示与运行截图

### 12.1 环境配置与安装依赖截图

![image-20260514155144570](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155144570.png)

![image-20260514155158983](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155158983.png)

![image-20260514155217044](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155217044.png)

### 12.2 项目启动截图

![image-20260514155331815](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155331815.png)

### 12.3 运行成功截图

![image-20260514160146590](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514160146590.png)

![image-20260514160241631](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514160241631.png)

![image-20260514155416912](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155416912.png)

![image-20260514155841207](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155841207.png)

![image-20260514155858996](https://ycc123666.oss-cn-beijing.aliyuncs.com/img/image-20260514155858996.png)



## 13. 常见问题与解决方法

### 13.1 命令行提示 `ohpm: command not found`

原因：DevEco Studio 自带的 OHPM 工具未加入系统 `PATH`。

解决方法：

```bash
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/tools/ohpm/bin"
ohpm --version
```

也可以直接通过 DevEco Studio 打开项目并执行依赖同步。

### 13.2 命令行提示 `hvigorw: command not found`

原因：Hvigor 命令未加入系统 `PATH`。

解决方法：

```bash
export PATH="$PATH:/Applications/DevEco-Studio.app/Contents/tools/hvigor/bin"
hvigorw --version
```

### 13.3 构建时报 `Invalid value of 'DEVECO_SDK_HOME'`

原因：`DEVECO_SDK_HOME` 未配置，或配置到了错误目录。

解决方法：

```bash
export DEVECO_SDK_HOME="/Applications/DevEco-Studio.app/Contents/sdk/default"
hvigorw tasks --no-daemon
```

如果仍然失败，请在 DevEco Studio 的 SDK Manager 中确认 HarmonyOS SDK 是否完整安装。

### 13.4 构建时报 `SDK component missing`

原因：当前 SDK 组件不完整，或项目目标 SDK 与本机安装 SDK 不匹配。

解决方法：

1. 打开 DevEco Studio。
2. 进入 SDK Manager。
3. 安装或修复 HarmonyOS SDK。
4. 确认项目 `targetSdkVersion` 为 `6.1.1(24)`，本机 SDK 需要能支持该目标版本。
5. 重新 Sync 项目并构建。

### 13.5 `npm start` 无法启动服务端

原因：`server/server/package.json` 当前没有 `start` 脚本。

解决方法：直接执行入口文件。

```bash
cd server/server
node index.js
```

### 13.6 前端页面图片或音频无法加载

原因：首页推荐图、歌曲封面、音频地址使用远程 OSS 链接，设备或模拟器需要可访问外网。

解决方法：

1. 检查模拟器或真机网络。
2. 确认 `entry/src/main/module.json5` 中存在 `ohos.permission.INTERNET`。
3. 如运行环境无法访问远程地址，可将图片和音频替换为本地资源。

### 13.7 点击流行歌曲后页面跳转失败

原因：`Popular.ets` 中点击歌曲会跳转到 `pages/play`，但当前 `main_pages.json` 未注册该页面，项目中也未发现对应页面文件。

解决方法：

1. 新增播放页文件，例如 `entry/src/main/ets/pages/Play/Play.ets`。
2. 在 `main_pages.json` 中注册页面路径。
3. 将 `Popular.ets` 中的路由地址改为真实页面路径。
4. 在播放页或应用启动阶段调用 `AVPlayerClass.init()`。

### 13.8 服务卡片更新后内容没有变化

原因：当前 `FormDbInfo` 中未配置初始化数据，`form.db` 对应表中可能没有可用于更新卡片的数据。

解决方法：

1. 在 `WidgetCard_l2_1Info.ets` 或 `WidgetCard_l3_1Info.ets` 的 `FormDbInfo` 中补充 `insertData`。
2. 或启用 `EntryFormAbility.ets` 中被注释的 `FormHttpUpdate`，并将 `https://example.com/api/products` 替换为真实接口。

### 13.9 登录、注册、修改密码功能没有实际提交

原因：当前相关页面仅实现表单 UI，没有调用接口。

解决方法：

1. 在服务端补充用户相关接口。
2. 在客户端使用 `utils/Request.ets` 的 `post` 方法发起请求。
3. 根据接口返回值补充表单校验、错误提示和登录态存储。

## 14. 项目运行结果说明

在当前代码状态下，项目运行结果如下：

1. HarmonyOS 客户端启动后进入欢迎页。
2. 首次进入时弹出隐私协议确认弹窗。
3. 用户点击“同意”后，应用记录隐私协议状态并进入主界面。
4. 主界面底部包含“主页、分类、我的”三个 Tab。
5. 主页展示搜索入口、轮播图、每日推荐、推荐歌单。
6. 分类页可查看音乐分类 Tabs，其中“流行”分类展示内置歌曲列表。
7. 我的页展示用户信息、设置入口和动态广场。
8. 设置页可进入账号管理、修改密码、更换手机号等页面。
9. Node.js 示例服务启动后，访问 `http://127.0.0.1:2597` 返回 `Hello World`。

当前项目已经具备音乐类 HarmonyOS 应用的基础页面结构、资源组织、路由流程、服务卡片配置和本地示例服务。后续若要形成完整业务闭环，需要继续补充真实后端接口、登录注册逻辑、播放详情页、播放器初始化、搜索功能以及各分类页面的动态数据来源。

## 15. 总结说明

HarmonyStream 目前是一个以 HarmonyOS ArkTS 客户端为主体的音乐应用项目，代码重点集中在页面展示、Tab 导航、音乐列表、个人中心、设置页面、隐私确认和服务卡片基础能力。
## 16. 一次开发多端部署说明
1. 配置适配：在entry/build-profile.json5中添加`"deviceTypes": ["phone","tablet","2in1"]`，实现一套源码适配手机、平板、二合一设备；
2. 界面自适应：页面布局统一使用vp/fp自适应单位，GridRow栅格布局完成列表多尺寸适配，大屏平板侧边导航、手机底部Tab自动切换；
3. 打包部署：项目可一次性编译生成多设备安装包，一次发布即可在手机、平板、折叠屏设备安装运行，实现一次开发多端部署。
< ! - -   F i n a l   d o c s   - - >  
    
      
        
 