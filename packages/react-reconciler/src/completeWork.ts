import { appendInitialChild, createInstance } from 'hostConfig';
import type { FiberNode } from './fiber';
import { HostComponent, HostRoot, HostText } from './workTags';

/**
 * 递归中的“归”
 * 在“归”的过程中生成一颗离屏的 DOM 树
 * 因为在“归”的过程中，能找获取到最深层的子节点，能够依次将子节点插入到父节点中
 */
export const completeWork = (wip: FiberNode) => {
  const newProps = wip.pendingProps;
  const current = wip.alternate;

  switch (wip.tag) {
    case HostRoot:
      return null;
    case HostComponent:
      if (current !== null && wip.stateNode) {
        // update
      } else {
        /**
         * first mount
         * 1. 构建 DOM 树
         * 2. 将 DOM 树插入到 DOM 中
         */
        // 创建宿主实例，对于浏览器环境，就是创建 DOM 节点
        const instance = createInstance(wip.type, newProps);
      }
      return null;
    case HostText:
      /**
       * 1. 构建 DOM 树
       * 2. 将 DOM 树插入到 DOM 中
       */
      return null;
    default:
      if (__DEV__) {
        console.warn('completeWork未实现的类型', wip.tag);
      }
  }
};

/**
 * 插入子节点
 * 难点在于，将 A 组件插入到 B 组件中，插入的是 A 组件中的 dom 元素，而不是 A 组件的 fiber 节点
 * 所以需要找到 A 组件的 fiber 节点，然后将其作为参数传入 appendChild 方法
 */
const appendAllChildren = (parent: FiberNode, wip: FiberNode) => {
  let node = wip.child;
  while (node) {
    if (node.tag === HostComponent || node.tag === HostText) {
      appendInitialChild(parent, node.stateNode);
    } else if (node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === wip) return;
    while (!node.sibling) {
      if (!node.return || node.return === wip) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
