import 'reflect-metadata';

export const READONLY_FIELD_KEY = Symbol('readonly');

export function Readonly(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(READONLY_FIELD_KEY, true, target, propertyKey);
  };
}
