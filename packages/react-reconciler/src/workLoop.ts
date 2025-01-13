import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, type FiberNode } from './fiber';
import { HostRoot } from './workTags';

// 当前工作节点
let workInProgress: FiberNode | null = null;

/**
 * 将当前节点与 renderRoot 流程串联起来
 * 因为传入的要处理的节点不同，所以要根据当前节点找到应用根节点
 * @param fiber
 */
export const scheduleUpdateOnFiber = (fiber: FiberNode) => {
  const fiberRoot = markUpdateFromFiberToRoot(fiber);
  if (fiberRoot != null) renderRoot(fiberRoot);
};

/**
 * 根据当前节点找到 fiberRoot
 * @param fiber
 */
export const markUpdateFromFiberToRoot = (fiber: FiberNode) => {
  let node = fiber;
  while (node.return !== null) node = node.return;
  return node.tag === HostRoot ? createWorkInProgress(node.stateNode, {}) : null;
};

/**
 * 开始渲染
 */
const renderRoot = (root: FiberNode) => {
  prepareFreshStack(root);
  do {
    try {
      workLoop();
      break;
    } catch (error) {
      if (__DEV__) {
        console.warn('workLoop error', error);
      }
      workInProgress = null;
    }
  } while (workInProgress !== null);
};

/**
 * 初始化
 * @param fiber
 */
const prepareFreshStack = (fiber: FiberNode) => {
  workInProgress = fiber;
};

const workLoop = () => {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
};

/**
 * 深度优先遍历(DFS)，先递(beginWork)后归(completeUnitOfWork)
 * 如果有子节点就遍历子节点
 * 否则就遍历兄弟节点
 * @param fiber
 */
const performUnitOfWork = (fiber: FiberNode) => {
  // 开始处理当前节点并返回子节点或 null
  const next = beginWork(fiber);
  // 当前节点处理完成后，就可以将 pendingProps 赋值给 memoizedProps
  fiber.memoizedProps = fiber.pendingProps;
  if (next === null) {
    // 没有子 fiber 了，开始递阶段，然后处理兄弟节点
    completeUnitOfWork(fiber);
  } else {
    // 还有子节点，继续处理子节点
    workInProgress = next;
  }
};

/**
 * 完成当前节点的归阶段，开始处理兄弟节点或父节点
 * @param fiber
 */
const completeUnitOfWork = (fiber: FiberNode) => {
  let node: FiberNode | null = fiber;

  do {
    // 完成当前节点的工作（归阶段）
    completeWork(node);
    // 开始处理兄弟节点或父节点
    const sibling = node.sibling;
    if (sibling !== null) {
      workInProgress = sibling;
      return;
    } else {
      // 兄弟节点没有了，开始处理父节点
      workInProgress = node = node.return;
    }
  } while (node !== null);
};
