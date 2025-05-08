import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true)
];

let colletion = new TodoCollection("Adam", todos);

console.clear();
console.log(`${colletion.userName}'s Todo List`);

let newId = colletion.addTodo("Go for run");
let todoItem = colletion.getTodoById(newId);
todoItem.printDetails();
