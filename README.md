# 为什么要用TypeScript

1. TypeScript 解决了什么痛点？ - justjavac的回答 - 知乎
   https://www.zhihu.com/question/308844713/answer/574423626

2. 渐进式，就算前期用了很多any，关键接口的类型定义已经能带来很多便利。

3. 公司统一技术栈。

# 编写第一个 TypeScript 程序

## 类型注解

```typescript
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Yee";

console.log(greeter(user));
```

## 接口

让我们继续扩展这个示例应用。这里我们使用接口来描述一个拥有 `firstName` 和 `lastName` 字段的对象。 在 `TypeScript` 里，只在两个类型内部的结构兼容，那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 `implements` 语句。

```typescript
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = {
  firstName: "Yee",
  lastName: "Huang",
};

console.log(greeter(user));
```

## 类

最后，让我们使用类来改写这个例子。 TypeScript 支持 JavaScript 的新特性，比如支持基于类的面向对象编程。

让我们创建一个 `User` 类，它带有一个构造函数和一些公共字段。因为类的字段包含了接口所需要的字段，所以他们能很好的兼容。

还要注意的是，我在类的声明上会注明所有的成员变量，这样比较一目了然。

```typescript
class User {
  fullName: string;
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = firstName + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new User("Yee", "Huang");

console.log(greeter(user));
```

# 基础类型

## 布尔值

```typescript
let isDone: boolean = false;
```

## 数字

```typescript
let decLiteral: number = 20;
```

## 字符串

```typescript
let name: string = "bob";
name = "smith";
```

## 数组

```typescript
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```typescript
let list: Array<number> = [1, 2, 3];
```

## 元组 Tuple

元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。

```typescript
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error
```

## 枚举

`enum` 类型是对 JavaScript 标准数据类型的一个补充。 像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

## any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 `any` 类型来标记这些变量：

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // 也可以是个 boolean
```

在对现有代码进行改写的时候，`any` 类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。并且当你只知道一部分数据的类型时，`any` 类型也是有用的。 比如，你有一个数组，它包含了不同的类型的数据：

```typescript
let list: any[] = [1, true, "free"];

list[1] = 100;
```

## void

某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

声明一个 `void` 类型的变量没有什么大用，因为你只能为它赋予 `undefined` 和 `null`：

```typescript
let unusable: void = undefined;
```

## null 和 undefined

TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。 和 `void` 相似，它们的本身的类型用处不是很大：

```typescript
let u: undefined = undefined;
let n: null = null;
```

## never

`never` 类型表示的是那些永不存在的值的类型。 例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。

`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 `never` 的子类型或可以赋值给`never` 类型（除了 `never` 本身之外）。 即使 `any` 也不可以赋值给 `never`。

下面是一些返回 `never` 类型的函数：

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
```

## object

`object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null`或`undefined` 之外的类型。

使用 `object` 类型，就可以更好的表示像 `Object.create` 这样的 `API`。例如：

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error

```

## 类型断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

```

# 高级类型

## 联合类型

```ts
export type Union = string | number

export let u:Union

u = '2'

u = 3

```

## 交叉类型

```ts
type Foo = {
  foo: any
}

type Bar = {
  bar : any
}
type Intersection =  Foo & Bar

let i: Intersection = {
  foo: 'foo',
  bar: 'bar',
}

```

## 索引类型

索引类型的查询操作符 keyof T 表示类型 T 的所有公共属性的字面量联合类型
```ts
interface Obj {
  a: number
  b: string
}
let key: keyof Obj // let key: "a" | "b"
```

# 类型守卫

举个简单的例子，根据某个值是Foo类型或Bar类型，分别做不同的处理。

```ts
type Foo = {
  foo: any
}

type Bar = {
  bar : any
}

type Unknown = Foo | Bar

function judge(val: Unknown): void {
  if (val.hasOwnProperty('foo')) {
    (val as Foo).foo = 'ok'
  }else if (val.hasOwnProperty('bar')) {
    (val as Bar).bar = 'ok'
  }
}

```

这里要用到类型断言，因为TypeSciprt不会根据hasOwnProperty的结果作为类型判断的依据，但是它提供了另一种方式`类型守卫`

```ts
// 类型守卫方案
function isFoo(val: any): val is Foo {
  return val.hasOwnProperty('foo')
}

function judge2(val: Unknown): void {
  if (isFoo(val)) {
    val.foo = 'ok'
  }else {
    // 自动被推断为Bar
    val.bar = 'ok'
  }
}

```

# 接口

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。例如给函数传入的参数对象中只有部分属性赋值了。

```typescript
interface Square {
  color: string;
  area: number;
}

interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly` 来指定只读属性:

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

```
## 任意属性  

用任意的字符串索引，使其可以得到任意的结果。  

```ts
interface Person {
  name: string
  age: number
  [x: string]: any
}

let man: Person = {
  name: 'James',
  age: 30,
  height: '180cm'
}
```

# 函数
## 函数类型接口
```ts
interface Add {
  (x: number, y: number): number
}

let add: Add = (a, b) => a + b
```


## 函数类型别名
除此之外，还有一种更简洁的方式就是使用类型别名  

类型别名使用 type 关键字  

```ts
type Add = (x: number, y: number) => number

let add: Add = (a, b) => a + b
```

## 函数重载

```ts
function overload (a: number, b: number): number
function overload (a: string, b: string): string
function overload (a: any, b: any): any {
  return a + b
}
```

# 泛型

## 灵活的类型传参

```ts
function make(args) {
  return args;
}

make([]);

```

这样子是没有任何提示的，ts 没法推断出返回值和传入的参数是同一个类型。

```ts
function make<T>(args: T) {
  return args;
}

const num = make<number>(2);

```

此时再输入`num.` 就会出现提示。

也可以简化成

```ts
const num = make(2);

```

此时 T 会自动被推断为 number 类型。

## 在泛型约束中使用类型参数

你可以声明一个类型参数，且它被另一个类型参数所约束。 比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 `obj` 上，因此我们需要在这两个类型之间使用约束。

```typescript
function getProperty<T, K extends keyof T> (obj: T, key: K ) {
  return obj[key]
}

let x = {a: 1, b: 2, c: 3, d: 4}

getProperty(x, 'a') // okay
getProperty(x, 'm') // error

```

## 泛型的类型推断

现在有个需求，函数 withA 接受一个对象，并且向这个对象上混入 a 属性并返回。

```ts
function withA(arg: object): object & { a: number } {
  return Object.assign(arg, { a: 2 });
}

const result = withA({ b: 2 });

```

此时不会提示 result 上应有的 b 字段，因为 ts 并不知道返回的对象拥有传入对象身上的属性。

利用泛型来约束入参和出参是相同的结构，再利用联合类型增加额外属性。

```ts
function withA<T>(arg: T): T & { a: number } {
  return Object.assign(arg, { a: 2 });
}

const result = withA({ b: 2 });

```

## 例如 React 的 useState

```ts
function useState<S>(initialState: S): [S, SetState<S>] {
  let state = initialState;
  const setState = (newState: S) => {
    state = newState;
    return state;
  };

  return [state, setState];
}

type SetState<S> = (newState: S) => void;


```

## 教程分享

### 入门

TypeScript Handbook入门教程
https://zhongsp.gitbooks.io/typescript-handbook/content/

### 进阶

巧用 TypeScript系列 一共五篇  
https://juejin.im/post/5c8a518ee51d455e4d719e2e

TS 一些工具泛型的使用及其实现  
https://zhuanlan.zhihu.com/p/40311981

### 实验

TypeScript Playground 有任何想法都可以在上面编写尝试
https://www.typescriptlang.org/play/