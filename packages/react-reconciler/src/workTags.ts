export const FunctionComponent = 0;
export const ClassComponent = 1;
export const HostRoot = 3; // 根节点对应的 FiberNode
export const HostComponent = 5; // 宿主组件对应的 FiberNode，eg. div
export const HostText = 6; // 文本节点对应的 FiberNode eg. 'hello'

export type WorkTag =
  | typeof FunctionComponent
  | typeof ClassComponent
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText;
