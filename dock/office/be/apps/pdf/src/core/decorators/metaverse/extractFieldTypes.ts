// // backend/utils/extractFieldTypes.ts
// import { plainToClass } from 'class-transformer';

// export type DtoFieldTypes<T> = {
//   [P in keyof T]: string;
// };

// export function getFieldTypes<T>(dtoClass: any): DtoFieldTypes<T> {
//   const instance = plainToClass(dtoClass, {});
//   console.log(`[getField instance]: `, instance);
//   const fieldTypes: DtoFieldTypes<T> = {} as DtoFieldTypes<T>;

//   for (const propertyKey of Object.keys(instance)) {
//     const type = Reflect.getMetadata('design:type', instance, propertyKey);
//     console.log(`[Reflect getMetadata]: `, instance, propertyKey, type);
//     const typeName = getTypeName(type);
//     fieldTypes[propertyKey as keyof T] = typeName;
//   }

//   return fieldTypes;
// }

// function getTypeName(type: any): string {
//   if (type === String) return 'string';
//   if (type === Number) return 'number';
//   if (type === Boolean) return 'boolean';
//   if (type === Date) return 'timestamp';
//   // Add more type mappings as needed
//   return 'unknown';
// }
