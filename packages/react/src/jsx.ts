import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import type { ElementType, Key, Props, Ref, Type } from 'shared/ReactTypes';
import type { ReactElement } from 'shared/ReactTypes';

/**
 * 生成 ReactElement 对象，只用来存储对应节点数据，
 * 不包含节点关系，更新标记等信息。
 * @param type
 * @param key
 * @param ref
 * @param props
 */
const ReactElement = (type: Type, key: Key, ref: Ref, props: Props): ReactElement => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'jacky'
  };
  return element;
};

export const jsx = (type: ElementType, config: Record<string, any>, ...maybeChildren: any) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};
  Object.entries(config).forEach(([k, v]) => {
    if (k === 'key' && v !== undefined) key = v.toString();
    else if (k === 'ref' && v !== undefined) ref = v;
    else if (Object.hasOwn(config, k)) props[k] = v;
  });

  // 处理 maybeChildren
  if (maybeChildren.length === 1) {
    // 只有一个 child
    props.children = maybeChildren[0];
  } else if (maybeChildren.length > 1) {
    // 多个 child
    props.children = maybeChildren;
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: Record<string, any>) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};
  Object.entries(config).forEach(([k, v]) => {
    if (k === 'key' && v !== undefined) key = v.toString();
    else if (k === 'ref' && v !== undefined) ref = v;
    else if (Object.hasOwn(config, k)) props[k] = v;
  });

  return ReactElement(type, key, ref, props);
};
