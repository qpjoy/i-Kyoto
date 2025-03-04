import 'reflect-metadata';

export const SEARCHABLE_FIELD_KEY = Symbol('searchable');

export function Searchable(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(SEARCHABLE_FIELD_KEY, true, target, propertyKey);
  };
}
