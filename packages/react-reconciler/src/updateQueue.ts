import type { Action } from 'shared/ReactTypes';

export interface Update<State> {
  action: Action<State>;
}

export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  };
}

export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return { action };
};

export const createUpdateQueue = <State>(): UpdateQueue<State> => {
  return {
    shared: {
      pending: null
    }
  };
};

export const enqueueUpdate = <State>(updateQueue: UpdateQueue<State>, update: Update<State>) => {
  updateQueue.shared.pending = update;
};

/**
 * 消费 update
 *  baseState 1 update 2 -> memorizedState 2
    baseState 1 update (x) => 4x -> memorizedState 4
 */
export const processUpdateQueue = <State>(baseState: State, pendingUpdate: Update<State>): { memoizedState: State } => {
  const result = { memoizedState: baseState };

  if (pendingUpdate !== null) {
    const { action } = pendingUpdate;
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }

  return result;
};
