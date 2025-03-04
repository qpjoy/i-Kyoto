import { PUBLIC_PATH, PUBLIC_PATH_NAME } from './appRoot';

interface FileMapper {
  file: any;
  req: any;
}

interface FilesMapper {
  files: any[];
  req: any;
}

export const fileMapper = ({ file, req }: FileMapper) => {
  // const file_url = `${req.protocol}://${req.headers.host}/${file.path}`;
  const file_url = `${req.protocol}://${req.headers.host}/${PUBLIC_PATH_NAME}/${file.filename}`;
  return {
    originalname: file.originalname,
    filename: file.filename,
    file_url,
  };
};

export const filesMapper = ({ files, req }: FilesMapper) => {
  return files.map((file) => {
    const file_url = `${req.protocol}://${req.headers.host}/${file.path}`;
    return {
      originalname: file.originalname,
      filename: file.filename,
      file_url,
    };
  });
};
