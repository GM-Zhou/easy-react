import type { Container } from 'hostConfig';
import type { ReactElement } from 'shared/ReactTypes';

import { FiberNode, FiberRootNode } from './fiber';
import { createUpdate, createUpdateQueue, enqueueUpdate } from './updateQueue';
import { scheduleUpdateOnFiber } from './workLoop';
import { HostRoot } from './workTags';

/**
 * createRoot 会执行 createContainer
 */
export const createContainer = (container: Container) => {
  const hostRootFiber = new FiberNode(HostRoot, {}, null);
  const fiberRoot = new FiberRootNode(container, hostRootFiber);
  hostRootFiber.updateQueue = createUpdateQueue();
  return fiberRoot;
};

/**
 * createRoot().render 会执行 updateContainer
 */
export const updateContainer = (element: ReactElement | null, root: FiberRootNode) => {
  const hostRootFiber = root.current;
  const update = createUpdate(element);
  enqueueUpdate(hostRootFiber.updateQueue, update);
  scheduleUpdateOnFiber(hostRootFiber);
  return element;
};
