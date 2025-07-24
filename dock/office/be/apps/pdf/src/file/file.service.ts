import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './models/file.entity';
import { Repository } from 'typeorm';
import { Express } from 'express';
import * as fs from 'fs';
import { promisify } from 'util';
import { exec, execFile } from 'child_process';
import { User } from '@pdf/user/models/user.entity';
import { basename, dirname, join } from 'path';

const execPromise = promisify(exec);
const execFilePromise = promisify(execFile);

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
  private readonly pythonScriptPath = join(
    '/root/workspace/rocks/PaddleOCR/ppstructure/pdf2word/pdf2word_server.py',
  );
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  async saveFile(file: Express.Multer.File, description?: string, user?: User) {
    const fileEntity = this.fileRepo.create({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      description,
      user,
    });
    const fileRes = await this.fileRepo.save(fileEntity);
    return {
      url: 'http://localhost:9101/api/uploads/' + file.filename,
      ...fileRes,
    };
  }

  async saveInitialFileRecord(
    file: Express.Multer.File,
    user?: any, // Type this correctly based on your User entity/authentication
  ): Promise<FileEntity> {
    const newFile = this.fileRepo.create({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      conversionStatus: 'PENDING', // Initial status
      user: user, // Assign user if available
    });
    return await this.fileRepo.save(newFile);
  }

  async updateFileRecordAfterConversion(
    fileId: number,
    convertedFilePath: string,
  ): Promise<FileEntity> {
    const fileRecord = await this.fileRepo.findOne({ where: { id: fileId } });
    if (!fileRecord) {
      this.logger.error(`File record with ID ${fileId} not found for update.`);
      throw new InternalServerErrorException(
        'File record not found after conversion.',
      );
    }

    const convertedFileSize = fs.statSync(convertedFilePath).size;

    fileRecord.convertedPath = convertedFilePath;
    fileRecord.convertedSize = convertedFileSize;
    fileRecord.conversionStatus = 'COMPLETED';
    return await this.fileRepo.save(fileRecord);
  }

  async updateFileRecordStatus(
    fileId: number,
    status: string,
  ): Promise<FileEntity> {
    const fileRecord = await this.fileRepo.findOne({ where: { id: fileId } });
    if (!fileRecord) {
      this.logger.error(
        `File record with ID ${fileId} not found for status update.`,
      );
      throw new InternalServerErrorException(
        'File record not found for status update.',
      );
    }
    fileRecord.conversionStatus = status;
    return await this.fileRepo.save(fileRecord);
  }

  async convertPdfToWord(
    inputPdfPath: string,
    fileId: number,
    convertedFileNameWithoutExt: string,
  ): Promise<string> {
    const outputFileName = `${basename(inputPdfPath, '.pdf')}.docx`;
    const outputDirPath = dirname(inputPdfPath);
    const outputDocxPath = join(outputDirPath, outputFileName);
    console.log(`[outputDocxPath --output]: `, outputDocxPath);

    this.logger.log(
      `Attempting to convert PDF for record ID ${fileId}: ${inputPdfPath} to DOCX: ${outputDocxPath}`,
    );

    try {
      fs.accessSync(this.pythonScriptPath, fs.constants.X_OK);
    } catch (err) {
      this.logger.error(
        `Python script not executable or found at ${this.pythonScriptPath}: ${err.message}`,
      );
      throw new InternalServerErrorException(
        `Python script not executable or found: ${err.message}`,
      );
    }

    try {
      const { stdout, stderr } = await execFilePromise(
        'python3',
        [
          this.pythonScriptPath,
          '--input',
          inputPdfPath,
          '--output',
          outputDirPath,
          '--use_pdf2docx',
        ],
        { timeout: 120000 },
      );

      if (stderr) {
        this.logger.warn(
          `Python script stderr for record ID ${fileId}: ${stderr}`,
        );
      }

      this.logger.log(
        `Python script stdout for record ID ${fileId}: ${stdout}`,
      );

      if (!fs.existsSync(outputDocxPath)) {
        throw new Error(
          'Python script completed but output file was not found.',
        );
      }

      this.logger.log(
        `PDF successfully converted to Word for record ID ${fileId}: ${outputDocxPath}`,
      );
      return outputDocxPath;
    } catch (error) {
      console.log(`[inside error]:  before lang cn`);
      try {
        const { stdout, stderr } = await execFilePromise(
          'python3',
          [
            this.pythonScriptPath,
            '--input',
            inputPdfPath,
            '--output',
            outputDirPath,
          ],
          { timeout: 120000 },
        );

        if (stderr) {
          this.logger.warn(
            `Python script imageBasedOcr stderr for record ID ${fileId}: ${stderr}`,
          );
        }

        this.logger.log(
          `Python script imageBasedOcr stdout for record ID ${fileId}: ${stdout}`,
        );

        if (!fs.existsSync(outputDocxPath)) {
          throw new Error(
            'Python script imageBasedOcr completed but output file was not found.',
          );
        }

        this.logger.log(
          `PDF imageBasedOcr successfully converted to Word for record ID ${fileId}: ${outputDocxPath}`,
        );
        return outputDocxPath;
      } catch (e) {
        this.logger.error(
          `Error during Python imageBasedOcr script execution for record ID ${fileId}: ${e.message}`,
        );
        if (e.code === 'ERR_CHILD_PROCESS_STDIO_TIMEOUT') {
          throw new InternalServerErrorException(
            'PDF imageBasedOcr conversion timed out. The file might be too large or complex.',
          );
        }
        throw new InternalServerErrorException(
          `PDF imageBasedOcr conversion failed: ${e.message}`,
        );
      }

      this.logger.error(
        `Error during Python script execution for record ID ${fileId}: ${error.message}`,
      );
      if (error.code === 'ERR_CHILD_PROCESS_STDIO_TIMEOUT') {
        throw new InternalServerErrorException(
          'PDF conversion timed out. The file might be too large or complex.',
        );
      }
      throw new InternalServerErrorException(
        `PDF conversion failed: ${error.message}`,
      );
    }
  }

  cleanupTempFiles(inputPath: string, outputPath?: string) {
    fs.unlink(inputPath, (err) => {
      if (err)
        this.logger.error(
          `Failed to delete input temp file ${inputPath}: ${err.message}`,
        );
      else this.logger.log(`Deleted input temp file: ${inputPath}`);
    });

    // if (outputPath && fs.existsSync(outputPath)) {
    //   fs.unlink(outputPath, (err) => {
    //     if (err)
    //       this.logger.error(
    //         `Failed to delete output temp file ${outputPath}: ${err.message}`,
    //       );
    //     else this.logger.log(`Deleted output temp file: ${outputPath}`);
    //   });
    // }
  }

  async findAll() {
    return this.fileRepo.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return this.fileRepo.findOne({ where: { id }, relations: ['user'] });
  }
}
