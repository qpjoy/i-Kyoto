import { TodoItem } from "./todoItem";
export class TodoCollection {
  private nextId: number = 1;
  constructor(
    public userName: string,
    private todoItems: TodoItem[] = []
  ) {}

  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.todoItems.push(new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number): TodoItem {
    return this.todoItems.find((item) => item.id === id)!;
  }

  markComplete(id: number, complete: boolean) {
    const item = this.getTodoById(id);
    if (item) {
      item.complete = complete;
    }
  }
}
