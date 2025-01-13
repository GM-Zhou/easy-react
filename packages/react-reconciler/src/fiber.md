# Fiber

## 为什么需要 Fiber

由 JSX 生成的 ReactElement 不能直接作为 Reconciler 操作的数据结构，因为

1. ReactElement 中只包含了自己的信息，而没有包含父节点和兄弟节点的信息
2. ReactElement 中没有包含节点状态及更新标记等信息

所以，需要一种新的数据结构，他的特点：

- 介于 React Element 与真实 UI 节点之间
- 能够表达节点之间的联系
- 方便拓展（不仅作为数据存储单元，也能作为工作单元）

这就是 FiberNode（虚拟 DOM 在 React 中的实现， 而在 Vue 中， 虚拟 DOM 的实现是 VNode）。

当前我们了解的节点类型：

- JSX
- React Element
- FiberNode
- DOM Element

reconciler的工作方式：

对于同一个节点，比较其 React Element 与 fiberNode，生成子 fiberNode。并根据比较的结果生成不同标记（插入、删除、移动……），对应不同宿主环境 API 的执行。

## 什么是 Fiber

## Fiber 的数据结构

## Fiber 的创建

## Fiber 的调度

## Fiber 的更新
