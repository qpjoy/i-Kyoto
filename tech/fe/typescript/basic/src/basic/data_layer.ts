class Book {
  constructor(
    public author: string,
    public title: string
  ) {}
}

class Movie {
  constructor(public director: string) {}
}

class Song {
  constructor(public artist: string) {}
}

declare module "fem-data" {
  interface EntityMap {
    song: Song;
  }
}

interface EntityMap {
  book: Book;
  movie: Movie;
  song: Song;
}

class Store {
  get<K extends keyof EntityMap>(kind: K, id: string): EntityMap[K] {}
  getAll<K extends keyof EntityMap>(kind: K): EntityMap[K][] {}
  create<K extends keyof EntityMap>(kind: K, toCreate: EntityMap[K]): void {}
  update<K extends keyof EntityMap>(kind: K, id: string, props: Partial<EntityMap[K]>) {}
}

const myBook = new Book("Mike");
const store = new Store();
store.get("movie", "123");
store.getAll("book");
store.create("book", { author: "Mark G.", title: "How to build a video course company." });
store.update("book", "123", { title: "A new title" });
