####前言

typescript中声明一个类型，我们通常会有两种做法：
1.使用class
```
  export default class state {
    userInfo: {
        name: string,
        age: number
    }
}
```

2.使用interface
```
 export interface STATE {
    userInfo : {
        name: string,
        age: number
    }
}
```

那么这两种声明类型的方案有什么区别？
>由于typescript的宗旨是兼容js，运行时要擦除所有类型信息，因此interface在运行时是会被完全**消除**的。而class经过编译后，在运行时依然**存在**。因此如果要声明的类型只是纯粹的类型信息，只需要声明interface即可。

