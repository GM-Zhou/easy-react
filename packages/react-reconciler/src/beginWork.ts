import type { ReactElement } from 'shared/ReactTypes';
import type { FiberNode } from './fiber';
import { processUpdateQueue, type UpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, reconcileChildFibers } from './childFibers';

/**
 * 当前节点的递阶段，开始处理当前节点，返回当前节点的子 Fiber 或 null
 * @param wip workInProgress 节点
 */
export const beginWork = (wip: FiberNode) => {
  if (wip.tag === HostRoot) {
    return updateHostRoot(wip);
  } else if (wip.tag === HostComponent) {
    return updateHostComponent(wip);
  } else if (wip.tag === HostText) {
    return null;
  } else {
    if (__DEV__) {
      console.warn('beginWork未实现的类型', wip.tag);
    }
    return null;
  }
};

/**
 * 更新 HostRoot
 * 计算状态的最新值
 * 创造子 fiber
 * @param wip
 */
const updateHostRoot = (wip: FiberNode) => {
  // 对于首次渲染，baseState 为 null
  const baseState = wip.memoizedState;
  const updateQueue = wip.updateQueue as UpdateQueue<Element>;
  const pending = updateQueue.shared.pending;
  updateQueue.shared.pending = null;
  // 因为 updateContainer 中，update 的 action 为 <APP/> element，所以这里的 memoizedState 为 <APP/> element
  const { memoizedState } = processUpdateQueue(baseState, pending!);
  wip.memoizedState = memoizedState;
  const nextChildren = wip.memoizedState;
  // wip.alternate 为当前节点的 current node
  reconcileChildren(wip, nextChildren);
  return wip.child;
};

const updateHostComponent = (wip: FiberNode) => {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(wip, nextChildren);
  return wip.child;
};

const reconcileChildren = (wip: FiberNode, children?: ReactElement | null) => {
  const current = wip.alternate;
  if (current !== null) {
    // update
    wip.child = reconcileChildFibers(wip, current?.child, children);
  } else {
    // mount
    wip.child = mountChildFibers(wip, null, children);
  }
};
