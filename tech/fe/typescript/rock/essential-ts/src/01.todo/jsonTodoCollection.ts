import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { Low, LowSync } from "lowdb";
import { JSONFile, JSONFilePreset, JSONFileSync } from "lowdb/node";
import path from "path";

type task = {
  id: number;
  task: string;
  complete: boolean;
};
type schemaType = {
  tasks: task[];
} | null;

// export class JsonTodoCollection extends TodoCollection {
export class JsonTodoCollection extends TodoCollection {
  private database: LowSync<schemaType>;

  constructor(
    public userName: string,
    todoItems: TodoItem[] = []
  ) {
    super(userName, []);
    this.database = new LowSync<schemaType>(
      new JSONFileSync<schemaType>(path.join(__dirname, "../../Todos.json")),
      null
    );
    this.database.read();

    if (this.database.data == null) {
      this.database.data = { tasks: todoItems };
      this.database.write();
      todoItems.forEach((item) => this.itemMap.set(item.id, item));
    } else {
      this.database.data.tasks.forEach((item) =>
        this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete))
      );
    }
  }

  async init() {}

  addTodo(task: string): number {
    let result = super.addTodo(task);
    this.storeTasks();
    return result;
  }

  markComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);
    this.storeTasks();
  }

  removeComplete(): void {
    super.removeComplete();
    this.storeTasks();
  }

  private async storeTasks() {
    this.database.data.tasks = [...this.itemMap.values()];
    await this.database.write();
  }
}
