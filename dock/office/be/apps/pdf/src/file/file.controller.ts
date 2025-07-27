import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Param,
  Res,
  Req,
  Logger,
  HttpStatus,
  NotFoundException,
  UploadedFiles,
  All,
} from '@nestjs/common';
import * as fs from 'fs';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { FileService } from './file.service';
import path, { basename, extname, join } from 'path';
import { Request, Response, Express } from 'express';
import { Auth } from '@pdf/auth/auth.decorator';
import { FileEntity } from './models/file.entity';

@Controller('uploads')
export class FileController {
  private readonly logger = new Logger(FileController.name);
  constructor(private readonly fileService: FileService) {}

  @Post()
  // @Auth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async saveFile(
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description?: string,
  ) {
    const user = request['user'] ?? null;
    console.log(`[user]: `, user);
    return this.fileService.saveFile(file, description, user);
  }

  @Get()
  @Auth()
  async getAllFiles() {
    return this.fileService.findAll();
  }

  // @Auth()
  // @Get(':path')
  // async getImage(@Param('path') path, @Res() res: Response) {
  //   res.sendFile(path, { root: './uploads' });
  // }

  @Post('pdf2word')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async pdf2word(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
    @Req() req: Request, // Use @Req() to get the request object for user info
  ) {
    if (!file) {
      this.logger.error('No file uploaded.');
      return res.status(HttpStatus.BAD_REQUEST).send('No file uploaded.');
    }

    this.logger.log(`Received file: ${file.originalname} (${file.path})`);

    let fileRecord: any; // Declare fileRecord here to make it accessible in catch block

    try {
      // 1. Save initial file metadata to database
      const user = req['user'] ?? null;
      fileRecord = await this.fileService.saveInitialFileRecord(file, user); // Cast req.user if using Passport/Auth
      console.log(`[fileRecord --input]: `, fileRecord);

      const convertedFileName = extname(fileRecord.filename);
      const convertedFileNameWithoutExt = basename(
        fileRecord.filename,
        convertedFileName,
      );

      // 2. Perform conversion
      const convertedFilePath = await this.fileService.pdf2word(
        fileRecord.path, // Use path from the saved record
        fileRecord.id, // Pass file ID for potential logging/updates in service
        convertedFileNameWithoutExt,
      );

      // 3. Update file record with converted file details
      await this.fileService.updateFileRecordAfterConversion(
        fileRecord.id,
        convertedFilePath,
      );

      // 4. Set headers for file download
      // const originalFileExtension = extname(fileRecord.originalname);
      // const fileNameWithoutExt = basename(
      //   fileRecord.originalname,
      //   originalFileExtension,
      // );
      // const convertedFileName = extname(fileRecord.filename);
      // const convertedFileNameWithoutExt = basename(
      //   fileRecord.filename,
      //   convertedFileName,
      // );
      // const downloadFileName = `${convertedFileNameWithoutExt}.docx`; // Use original name with .docx extension
      return res.status(200).json({
        url: convertedFileNameWithoutExt,
      });

      // res.setHeader(
      //   'Content-Type',
      //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // );
      // res.setHeader(
      //   'Content-Disposition',
      //   `attachment; filename="${downloadFileName}"`,
      // );
      // res.writeHead(200, {
      //   'Content-Type':
      //     'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   'Content-Disposition': `attachment; filename="${downloadFileName}"`,
      // });

      // 5. Stream the converted file back to the client
      // const fileStream = fs.createReadStream(convertedFilePath);
      // fileStream.pipe(res);

      // fileStream.on('end', () => {
      //   this.logger.log(
      //     `Successfully sent converted file for record ID: ${fileRecord.id}`,
      //   );
      //   // Clean up temporary files after successful streaming
      //   this.fileService.cleanupTempFiles(fileRecord.path, convertedFilePath);
      // });

      // fileStream.on('error', (err) => {
      //   this.logger.error(
      //     `Error streaming file for record ID ${fileRecord.id}: ${err.message}`,
      //   );
      //   this.fileService.cleanupTempFiles(fileRecord.path, convertedFilePath); // Clean up on error too
      //   res
      //     .status(HttpStatus.INTERNAL_SERVER_ERROR)
      //     .send('Error streaming converted file.');
      // });
    } catch (error) {
      this.logger.error(
        `File conversion process failed for ${file.originalname}: ${error.message}`,
      );
      // Update status to FAILED if a file record was created
      if (fileRecord && fileRecord.id) {
        await this.fileService.updateFileRecordStatus(fileRecord.id, 'FAILED');
      }
      // Ensure original uploaded file is cleaned up even if conversion fails
      fs.unlink(file.path, (err) => {
        if (err)
          this.logger.error(
            `Failed to delete original uploaded file: ${file.path}, Error: ${err.message}`,
          );
      });
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`File conversion failed: ${error.message}`);
    }
  }

  @Post('merge-pdfs')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  async mergePdfs(
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
    @Body('sortType') sortType: string,
    @Body('removeCertSign') removeCertSign: string, // note: string if from form
  ) {
    return this.fileService.mergePdfs(files, res);
  }

  // @Post('merge-pdfs')
  // proxyToStirling(@Req() req: Request, @Res() res: Response) {
  //   proxy.web(
  //     req,
  //     res,
  //     {
  //       target: 'http://localhost:8080/api/v1/general/merge-pdfs',
  //       changeOrigin: true,
  //       ignorePath: false,
  //       prependPath: false,
  //       selfHandleResponse: false,
  //     },
  //     (err) => {
  //       console.error('[Proxy Error]:', err);
  //       res.status(500).send('Proxy error');
  //     },
  //   );
  // }

  @Get(':id')
  download(@Param('id') id, @Res() res) {
    const baseDir = 'uploads';
    const plainPath = path.join(baseDir, `${id}.docx`);
    const ocrPath = path.join(baseDir, `${id}_ocr.docx`);

    let filePath: string;

    if (fs.existsSync(plainPath)) {
      filePath = plainPath;
    } else if (fs.existsSync(ocrPath)) {
      filePath = ocrPath;
    } else {
      console.log(`[filePath]: `, plainPath, ocrPath);
      throw new NotFoundException('File not found');
    }

    const downloadName = path.basename(filePath);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${downloadName}"`,
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  }
}
