import Folder from "./folder";

export default interface IComponent {
  referenceToParent?: Folder;
  dir(index: string): void;

  detach(): void;
}
