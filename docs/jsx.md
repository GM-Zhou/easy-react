# JSX

传统的前端开发，使用 Jquery 或原生 JS 操作宿主环境 API，从而操作 DOM。是过程驱动的开发方式。JS -> 宿主环境API -> UI

React 或 Vue 允许我们使用 JSX 或模板语法描述 UI，通过编译（Vue会优化），将 JSX 或模板语法转换为 JS 代码，然后通过 JS 操作 DOM。是状态驱动的开发方式。JSX/模板语法 -> JS -> 宿主环境API -> UI

同时，因为 JSX 或模板语法是不与宿主环境耦合的，所以可以兼容不同的宿主环境

## JSX 转换

包括两部分

1. 编译时：由 babel 实现
2. 运行时（由我来实现）
   1. 实现 jsx 方法
   2. 实现打包流程
   3. 实现调试打包结果的环境

## 实现 jsx 方法

包括：

* jsxDev 方法
* jsx 方法（prod）
* React.createElement 方法

jsx 的结果就是 React.createElement 的结果，即返回一个 ReactElement 对象，但是 ReactElement 不能作为 Reconciler 操作的数据结构，因为

1. ReactElement 中只包含了自己的信息，而没有包含父节点和兄弟节点的信息
2. ReactElement 中没有包含节点状态及更新标记等信息

所以需要将 ReactElement 转换为 Fiber 对象，Fiber 对象中包含了自己的信息，还包含父节点和兄弟节点的信息。

所以节点类型应该是 JSX —> ReactElement —> Fiber —> DOM
