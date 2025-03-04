import * as appRootPath from 'app-root-path';

export const PUBLIC_PATH_NAME = 'public';
export const PUBLIC_PATH = `/${PUBLIC_PATH_NAME}/`;
export const appRoot = appRootPath;
export const ABSOLUTE_PUBLIC_PATH = appRootPath.resolve(PUBLIC_PATH);
