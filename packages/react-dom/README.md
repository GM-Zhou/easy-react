# react-dom

## react-dom 工作方式

在 `ReactDom.createRoot(rootElement).render(<App/>)` 中，`createRoot`创建了当前应用的根 Fiber 节点`FiberRootNode`，并根据`rootElement`创建了 Fiber 节点`hostRootFiber`

![alt text](image.png)
