import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import type { ReactElement } from 'shared/ReactTypes';

import { createFiberFromElement, FiberNode } from './fiber';
import { Placement } from './fiberFlags';
import { HostText } from './workTags';

const childReconciler = (shouldTrackEffects: boolean) => {
  const reconcileSingleElement = (returnFiber: FiberNode, currentFiber: FiberNode | null, element: ReactElement) => {
    const fiber = createFiberFromElement(element);
    fiber.return = returnFiber;
    return fiber;
  };

  const reconcileSingleTextNode = (
    returnFiber: FiberNode, 
    currentFiber: FiberNode | null,
    content: string | number
  ) => {
    const fiber = new FiberNode(HostText, { content }, null);
    fiber.return = returnFiber;
    return fiber;
  };

  /**
   * 插入单一节点
   * @param fiber
   */
  const placeSingleChild = (fiber: FiberNode) => {
    const isFirstMount = fiber.alternate === null;
    if (shouldTrackEffects && isFirstMount) {
      fiber.flags |= Placement;
    }
    return fiber;
  };

  return (returnFiber: FiberNode, currentFiber: FiberNode | null, newChild?: ReactElement | null) => {
    // return FiberNode
    if (newChild != null && typeof newChild === 'object') {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const child = reconcileSingleElement(returnFiber, currentFiber, newChild);
          const placeChild = placeSingleChild(child);
          return placeChild;
        }
        default: {
          if (__DEV__) {
            console.warn('未实现的类型', newChild);
          }
          return null;
        }
      }
    }
    // TODO 多节点的情况
    // 文本节点
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      const child = reconcileSingleTextNode(returnFiber, currentFiber, newChild);
      const placeChild = placeSingleChild(child);
      return placeChild;
    }
    return null;
  };
};

export const reconcileChildFibers = childReconciler(false);
export const mountChildFibers = childReconciler(true);
