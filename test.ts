// 转换前数据
const arr = [
  { id: 1, parentId: 0, name: 'test1'},
  { id: 2, parentId: 1, name: 'test2'},
  { id: 3, parentId: 0, name: 'test3'}
];


// 转化后
const transfered = [
  {
    id: 1,
    parentId: 0,
    name: 'test1',
    children: [
      { id: 2, parentId: 1, name: 'test2', children: [] }
    ]
  },
  {
    id: 3,
    parentId: 0,
    name: 'test3',
    children: []
  }
]

interface Item {
  id: number;
  parentId: number;
  name: string;
}

type TreeItem<T extends string> = Item & { [key in T]: TreeItem<T>[] | [] };

const options = {
  childrenKey: 'childrenList'
}

type Option<T> = {
  childrenKey: T
}

declare function listToTree<T extends string>(list: Item[], option: Option<T>): TreeItem<T>[];

listToTree(arr, {
  childrenKey: 'childrenList'
}).forEach((tree) => tree.childrenList)