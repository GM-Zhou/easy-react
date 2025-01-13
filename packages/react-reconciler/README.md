# react-reconciler

## reconciler 的工作方式

对于同一个节点，比较其 React Element 与 FiberNode, 生成新 FiberNode，并根据比较的结果生成不同标记（插入、删除、移动……），对应不同宿主环境 API 的执行。

当所有的 ReactElement 比较完成后，会生成一颗新的 FiberNode 树，这棵树就是 workInProgress fiber tree。

react 工作时会有两颗 fiber tree，一颗是 current fiber tree，另一颗是 workInProgress fiber tree。

- current fiber tree：是当前正在渲染的 fiber tree，它保存了当前渲染的 DOM 树，与真实 UI 对应
- workInProgress fiber tree：触发更新后，正在 Reconciler 中构建的 fiber tree，这棵树中的每个节点我们称之为 workInProgress，workInProgress 中保存了每个节点的标记，每个标记都对应着宿主环境API的执行，之后宿主环境就会执行这些 API 进行 UI 更新，更新完成后，current fiber tree 就会替换为 workInProgress fiber tree。

两棵树之间的 fiberNode 通过 alternate 属性连接，current fiber tree 中的 fiberNode 的 alternate 指向 workInProgress fiber tree 中的 fiberNode，workInProgress fiber tree 中的 fiberNode 的 alternate 指向 current fiber tree 中的 fiberNode。

fiberNode 上的 flags 属性代表当前节点需要执行的副作用，比如插入、删除、移动等。

## 流程

### JSX 消费顺序

以 DFS (深度优先遍历) 遍历 React Element，这意味着：

- 如果有子节点，遍历子节点
- 如果没有子节点，遍历兄弟节点

**更新流程的意义：**

- 生成 workInProgress fiber tree
- 标记副作用 flags

**更新流程的步骤：**

- 递：beginWork
- 归：completeWork
