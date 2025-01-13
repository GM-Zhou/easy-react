import type { Container } from 'hostConfig';
import type { Key, Props, ReactElement, Ref } from 'shared/ReactTypes';

import { type Flags, NoFlags } from './fiberFlags';
import { FunctionComponent, HostComponent, type WorkTag } from './workTags';

/**
 * FiberNode 类
 * 保存 React DOM 渲染过程中的一些信息
 * 包含当前节点的信息和父节点的信息
 * 可以看作 React 的一个虚拟 DOM 节点
 * 除了作为一个节点的实例，保存了节点的类型和属性，还保存了工作流程中的一些信息，也描述了与其他节点的关系
 * @implements {IReactFiberNode}
 */
export class FiberNode {
  tag: WorkTag;
  key: Key;

  /**
   * 对于 function 组件，tag 是 0，type 保存的是函数本身
   * 对于 class 组件，tag 是 1，type 保存的是类实例
   */
  type: any;

  /**
   * 当前节点对应的真实 DOM 节点
   * 对于 HostComponent 来说，stateNode 就可能是 div DOM
   */
  stateNode: any;

  /**
   * 指向父 FiberNode
   */
  return: FiberNode | null;

  child: FiberNode | null;

  sibling: FiberNode | null;

  /**
   * 当前节点在父节点中的位置
   */
  index: number;

  /**
   * 当前节点的 ref
   */
  ref: Ref;

  /**
   * 当前节点准备工作时的 props
   */
  pendingProps: Props;

  updateQueue: any;

  /**
   * 当前节点工作完成后确定下来的 props
   */
  memoizedProps: Props | null;
  memoizedState: any;

  alternate: FiberNode | null;

  /**
   * 副作用
   */
  flags: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // 实例
    this.tag = tag;
    this.key = key;
    this.type = null;
    this.stateNode = null;

    // 作为树状结构
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    // 作为工作单元
    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.ref = null;
    this.alternate = null;

    // 副作用
    this.flags = NoFlags;
  }
}

export class FiberRootNode {
  /**
   * 不同宿主环境有不同的 Container 实现，所以这里不能指定从当前 src 的某个文件引入
   */
  container: Container;

  /**
   * 指向 HostRootFiber
   */
  current: FiberNode;

  /**
   * 指向已经完成更新的 HostRootFiber
   */
  finishedWork: FiberNode | null;

  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.current = hostRootFiber;
    this.finishedWork = null;
    hostRootFiber.stateNode = this;
  }
}

export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode => {
  // workInProgress
  let wip = current.alternate;
  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.type = current.type;
    wip.stateNode = current.stateNode;
    wip.alternate = current;
    current.alternate = wip;
  } else {
    // update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
    wip.updateQueue = current.updateQueue;
    wip.child = current.child;
    wip.memoizedProps = current.memoizedProps;
    wip.memoizedState = current.memoizedState;
  }
  return wip;
};

export const createFiberFromElement = (element: ReactElement): FiberNode => {
  const { type, key, props } = element;
  let fiberTag: WorkTag = FunctionComponent;
  if (typeof type === 'string') {
    // <div/> -> div
    fiberTag = HostComponent;
  } else if (typeof type !== 'function') {
    console.warn('未实现的类型', type);
  }
  const fiber: FiberNode = new FiberNode(fiberTag, props, key);
  fiber.type = type;
  return fiber;
};
