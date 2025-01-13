export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
/**
 * 元素类型
 *
 * 1. 组件
 * 2. 原生标签
 * 3. 函数
 * 4. 字符串
 * 5. 数字
 * 6. 布尔
 * 7. null
 * 8. undefined
 */
export type ElementType = any;

export interface ReactElement {
  $$typeof: symbol | number;
  type: ElementType;
  key: Key;
  ref: Ref;
  props: Props;
  __mark: string;
}

export type Action<State> = State | ((prevState: State) => State);

// type UseStateType = <State>(state: State | (() => State)) => [State, Dispatch<Action<State>>];
