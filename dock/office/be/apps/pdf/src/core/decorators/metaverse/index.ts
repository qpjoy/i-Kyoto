import 'reflect-metadata';

// for sequelize rawAttributes
import { Readonly as _Readonly, READONLY_FIELD_KEY } from './readonly';
import { Searchable as _Searchable, SEARCHABLE_FIELD_KEY } from './search';
import {
  MetaVerseResponse as _MetaVerseResponse,
  returnMetaVerseFields as _returnMetaVerseFields,
  META_READONLY as _META_READONLY,
  META_SEARCHABLE as _META_SEARCHABLE,
} from './metaVerseResponse';

export const getSearchableFields = function (model) {
  return Object.keys(model.rawAttributes).filter((fieldName) =>
    Reflect.getMetadata(SEARCHABLE_FIELD_KEY, model.prototype, fieldName),
  );
};

export const getReadonlyFields = function (model) {
  return Object.keys(model.rawAttributes).filter((fieldName) =>
    Reflect.getMetadata(READONLY_FIELD_KEY, model.prototype, fieldName),
  );
};

export function MarkAsReadonly() {
  return Reflect.metadata('custom:readonly', true);
}

export function returnReadonlyFields<T>(classType: { new (): T }): string[] {
  // const prototype = Object.getPrototypeOf(new classType());
  const prototype = Object.getPrototypeOf(new classType());
  console.log(`[prototype]: `, prototype);
  return Object.getOwnPropertyNames(prototype).filter(
    (property) =>
      Reflect.getMetadata('custom:readonly', prototype, property) === true,
  );
}

export const Readonly = _Readonly;
export const Searchable = _Searchable;

// MetaVerse response
export const MetaVerseResponse = _MetaVerseResponse;
export const returnMetaVerseFields = _returnMetaVerseFields;
export const META_READONLY = _META_READONLY;
export const META_SEARCHABLE = _META_SEARCHABLE;
