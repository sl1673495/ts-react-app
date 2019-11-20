// 联合类型
type Union = string | number

let u:Union

u = '2'

u = 3


// 交叉类型
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

// 类型收缩
// TODO: asd
type Unknown = Foo | Bar
function judge(val: Unknown): void {
  if (val.hasOwnProperty('foo')) {
    (val as Foo).foo = 'ok'
  }else if (val.hasOwnProperty('bar')) {
    (val as Bar).bar = 'ok'
  }
}

// 类型收缩方案2
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