// custom-decorators.ts
import { ValidationSchema } from 'class-validator';

interface PropertyOptions {
  readonly?: boolean;
  searchable?: any;
}

export const META_READONLY = 'readonly';
export const META_SEARCHABLE = 'searchable';
export const META_COMPONENT = 'component';
export const META_HIDDEN = 'hidden';
export const META_AS = 'as';

export const MEAT_KEYWORDS = [
  META_READONLY,
  META_SEARCHABLE,
  META_COMPONENT,
  META_HIDDEN,
  META_AS,
];

export function MetaVerseResponse(options: any = {}): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const schema: any = Reflect.getMetadata(
      'class-validator:schema',
      target.constructor,
    ) || {
      properties: {},
    };
    const decorators: any[] = [];

    for (const keyword of MEAT_KEYWORDS) {
      if (
        !!options[keyword] ||
        options[keyword] === 0 ||
        options[keyword] === false ||
        options[keyword] === ''
      ) {
        decorators.push({
          type: keyword,
          constraints: [],
          message: `This field is ${keyword}.`,
          value: options,
        });
      }
    }

    schema.properties[propertyKey] = decorators;
    Reflect.defineMetadata(
      'class-validator:schema',
      schema,
      target.constructor,
    );
  };
}

export function returnMetaVerseFields<T>(
  classType: { new (...args: any[]): T },
  decoratorName: string,
): string[] {
  const markedFields: any = {};

  const schema: ValidationSchema = Reflect.getMetadata(
    'class-validator:schema',
    classType,
  );
  if (schema && schema.properties) {
    for (const propertyName in schema.properties) {
      const propertyDecorators = schema.properties[propertyName];
      console.log(
        `[Properties]: `,
        propertyName,
        schema.properties[propertyName],
      );

      for (const decorator of propertyDecorators) {
        // if (decorator.type === decoratorName) {
        markedFields[propertyName] =
          schema.properties[propertyName]?.[0]?.['value'];
        // }
      }
      // const hasDecorator = propertyDecorators.some(
      //   (decorator) => decorator.type === decoratorName,
      // );
      // if (hasDecorator) {
      //   markedFields.push({
      //     [propertyName]: schema.properties[propertyName],
      //   });
      // }
    }
  }

  return markedFields;
}
