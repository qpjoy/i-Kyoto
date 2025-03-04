// 类型注解(anotation)

import { type } from "os";

// 定义时候给定
let data1: number = 3;

interface Student {
  name: string;
  age: number;
  gender: string;
}
let stuObj: Student = {
  name: "张三",
  age: 18,
  gender: "男"
};

// 类型推导(type inference)
let money = "abc";
let stuObj2 = {
  name: "张三",
  age: 18,
  gender: "男"
};

// 类型注解 和 类型推导 有什么区别

// 数据类型
// let dt: Object = null;
// let dt1: {} = undefined;
let dt: Object = 1;
let dt_: object = {};

// 联合类型
let str: string | number = 1;
console.log(`[str]: `, str);

// 交叉类型
type Obj1 = { username: string };
type Obj2 = { age: number };
let obj: Obj1 = { username: "abc" };
let obj2: Obj2 = { age: 1 };
let obj3: Obj1 & Obj2 = { username: "abc", age: 1 };

// 字面量数据类型
type A = number | string;
let a: A = "Abc";
type num = number;
type num1 = 1 | 2 | 3;

type increaseFlag = 0 | 1;
function isStartUp(increase: increaseFlag) {
  if (increase) {
    console.log("open");
  } else {
    console.log("close");
  }
}

type DataFlow = string | number;
function dataFlowAnalysisWithNever(dataFlow: DataFlow) {
  if (typeof dataFlow === "string") {
    console.log("字符串类型:", dataFlow.length);
  } else if (typeof dataFlow === "number") {
    console.log("数值类型:", dataFlow.toFixed(2));
  } else {
    const _exhaustiveCheck: never = dataFlow;
    throw new Error(`Unexpected dataFlow: ${dataFlow}`);
  }
}
dataFlowAnalysisWithNever("免税店");
dataFlowAnalysisWithNever(3.199923);

// any and unknown
let dt1: any = ["1", 2];
let dt2: any = undefined;
let num: number = dt1[0];

let dt3: string | undefined = undefined;

// any, unknown, undefined 可以接受 undefined
// any, unknown, null 可以接受 null
let data: unknown = undefined;
// 前端 -> 后端
