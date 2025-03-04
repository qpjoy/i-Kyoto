import { Model } from 'sequelize';
import { DataTypes } from 'sequelize';
import { getFieldTypes } from './decorators/extractFieldTypes';
import { returnMetaVerseFields } from './decorators';
import {
  MEAT_KEYWORDS,
  META_READONLY,
  META_SEARCHABLE,
} from './decorators/metaVerseResponse';

type ModelFieldTypes<T> = {
  [P in keyof T]: {
    type: string;
    required: boolean;
    searchable: boolean;
    readonly: boolean;
  };
};

function getTypeNameFromDataTypes(type: any) {
  switch (type.key) {
    case DataTypes.STRING.key:
    case DataTypes.CHAR.key:
    case DataTypes.UUID.key:
    case DataTypes.UUIDV1.key:
    case DataTypes.UUIDV4.key:
      return 'string';

    case DataTypes.INTEGER.key:
    case DataTypes.BIGINT.key:
    case DataTypes.FLOAT.key:
    case DataTypes.DOUBLE.key:
    case DataTypes.REAL.key:
    case DataTypes.DECIMAL.key:
      return 'number';

    case DataTypes.BOOLEAN.key:
      return 'boolean';

    case DataTypes.DATE.key:
    case DataTypes.DATEONLY.key:
      return 'timestamp';

    case DataTypes.TIME.key:
      return 'time';

    case DataTypes.JSONB.key:
      return 'jsonb';

    case DataTypes.JSON.key:
      return 'jsonb';

    case DataTypes.ARRAY.key:
      return 'array';

    case DataTypes.ENUM.key:
      return 'enum';

    default:
      return 'unknown';
  }
}

export function generateMetaVerse<T extends Model>({
  model,
  createDtoClass,
  updateDtoClass,
  dtoClass,
}: any): any {
  const basic: any = {} as ModelFieldTypes<any>;
  const createDto: any = {} as ModelFieldTypes<any>;
  const updateDto: any = {} as ModelFieldTypes<any>;
  const dto: any = {} as ModelFieldTypes<any>;

  const searchableFieldsMeta = returnMetaVerseFields(dtoClass, META_SEARCHABLE);
  const readonlyFieldsMeta = returnMetaVerseFields(dtoClass, META_READONLY);
  console.log(
    `[META]: searchableFieldsMeta & readonlyFieldsMeta`,
    searchableFieldsMeta,
    readonlyFieldsMeta,
  );

  for (const [fieldName, field] of Object.entries(model.rawAttributes) as any) {
    let type: string;
    let required: boolean;
    // // Check if the field is required
    // const required = field.defaultValue === undefined;
    // Determine if the field is required based on allowNull and notEmpty attributes
    if (
      field.defaultValue !== undefined ||
      field.allowNull === false ||
      field.primaryKey === true ||
      field.autoIncrement === true ||
      (field.validate && field.validate.notEmpty) ||
      //   field.unique === true ||
      field.references !== undefined ||
      (field.validate && field.validate.customValidator !== undefined) ||
      field.type instanceof DataTypes.ENUM ||
      (field.validate && field.validate.is !== undefined) ||
      (field.validate && field.validate.isUrl === true) ||
      (field.validate && field.validate.isEmail === true) ||
      (field.validate && field.validate.isIPv4 === true) ||
      (field.validate && field.validate.isIPv6 === true) ||
      (field.validate && field.validate.isAlpha === true) ||
      (field.validate && field.validate.isAlphanumeric === true) ||
      (field.validate && field.validate.isNumeric === true) ||
      (field.validate && field.validate.isInt === true) ||
      (field.validate && field.validate.isFloat === true) ||
      (field.validate && field.validate.isDate === true) ||
      (field.validate && field.validate.isAfter !== undefined) ||
      (field.validate && field.validate.isBefore !== undefined) ||
      (field.validate && field.validate.isIn !== undefined) ||
      (field.validate && field.validate.notIn !== undefined) ||
      (field.validate && field.validate.isUUID === true) ||
      (field.validate && field.validate.isJSON === true) ||
      (field.validate && field.validate.isCreditCard === true) ||
      (field.validate && field.validate.isISBN === true) ||
      (field.validate && field.validate.isISSN === true) ||
      (field.validate && field.validate.isMobilePhone !== undefined) ||
      (field.validate && field.validate.isPostalCode !== undefined) ||
      (field.validate && field.validate.isCurrency === true)
    ) {
      required = true;
    } else {
      required = false;
    }

    const basicRes = Object.assign(
      {
        type: getTypeNameFromDataTypes(field.type),
        required,
      },
      searchableFieldsMeta[fieldName],
    );

    let dtoRes, createDtoRes, updateDtoRes;

    if (dtoClass) {
      console.log(`[dtoClass]: `, dtoClass);
      const _dto = getFieldTypes(dtoClass);
      const dtoKeys = Object.keys(_dto);
      console.log(`[dtoKeys]: ${dtoKeys}`);

      if (dtoKeys.indexOf(fieldName) >= 0) {
        // MEAT_KEYWORDS.reduce((acc, cur, idx) => {});
        const dtoSearchableFieldsMeta = returnMetaVerseFields(
          dtoClass,
          META_SEARCHABLE,
        );
        console.log(`[dto search]: `, dtoSearchableFieldsMeta);
        dtoRes = Object.assign(
          {},
          basicRes,
          dtoSearchableFieldsMeta[fieldName],
        );
        dto[fieldName] = dtoRes;
      }
    }

    if (createDtoClass) {
      const _createDto = getFieldTypes(createDtoClass);
      const createDtoKeys = Object.keys(_createDto);
      console.log(`[createDto & createDtoKeys]: `, _createDto, createDtoKeys);

      if (createDtoKeys.indexOf(fieldName) >= 0) {
        const createSearchableFieldsMeta = returnMetaVerseFields(
          createDtoClass,
          META_SEARCHABLE,
        );

        console.log(
          `[createSearchableFieldsMeta & createReadonlyFieldsMeta]: `,
          createSearchableFieldsMeta,
          // createReadonlyFieldsMeta,
        );

        createDtoRes = Object.assign(
          {},
          basicRes,
          dtoRes,
          createSearchableFieldsMeta[fieldName],
        );
        createDto[fieldName] = createDtoRes;
      }
    }

    if (updateDtoClass) {
      const _updateDto = getFieldTypes(updateDtoClass);
      const updateDtoKeys = Object.keys(_updateDto);

      if (updateDtoKeys.indexOf(fieldName) >= 0) {
        const updateSearchableFieldsMeta = returnMetaVerseFields(
          updateDtoClass,
          META_SEARCHABLE,
        );

        updateDtoRes = Object.assign(
          {},
          basicRes,
          createDtoRes,
          updateSearchableFieldsMeta[fieldName],
        );
        updateDto[fieldName] = updateDtoRes;
      }
    }

    console.log(
      `[searchableFieldsMeta -> fieldName]: `,
      searchableFieldsMeta,
      fieldName,
    );
    basic[fieldName] = basicRes;
  }

  // basic object is the reflection of sequelize model
  return {
    createDto,
    updateDto,
    dto,
    // basic
  };
}
