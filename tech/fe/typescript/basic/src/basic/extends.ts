// true
type answer_1 = 64 extends number ? true : false;
// false
type answer_2 = number extends 64 ? true : false;
// true
type answer_3 = string[] extends any ? true : false;
// true
type answer_4 = string[] extends any[] ? true : false;
// true
type answer_5 = never extends string[] ? true : false;
// true
type answer_6 = any extends any ? true : false;
// false
// type answer_7 = Date extends { new (...args: any[]): }
