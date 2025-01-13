# React 核心概念

> 我将以 WWH（What+Why+How）的方式来介绍 React 的核心概念。

## 编译

### JSX

#### What

- JSX 是 React 的标记语言，它是一种 JavaScript 的语法扩展，用于描述 UI 的结构。
- 在 React 的当前版本（18.x）源码中， jsx 作为一个函数 export，用以配合 Babel 编译器将 JSX 语法转换为 ReactElement。

在 Babel 官网的[在线工具](https://www.babeljs.cn/repl)中，可以看到 JSX 语法转换为 ReactElement 的示例：

```jsx
// JSX 语法
const element = <h1>Hello, world!</h1>;
```

```js
// 从 react 中导入 jsx 函数
import { jsx as _jsx } from "react/jsx-runtime";
// 转换后的 ReactElement
const element = /*#__PURE__*/_jsx("div", {
  children: "123123"
});
```

#### Why

- 使用 JSX 可以更直观地描述 UI 的结构，提高开发效率。

#### How

ReactElement 是 React 的虚拟 DOM 对象，它是一个纯 JavaScript 对象，包含了 UI 的结构、属性和子元素等信息。

JSX 通过 Babel 编译器转换为 ReactElement，ReactElement 通过 ReactDOM.render 方法渲染为真实的 DOM 元素。
