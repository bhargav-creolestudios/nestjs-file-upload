import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { diskStorage, fileFilter } from 'multer';
import { Helper } from './shared/helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file-upload')
  @UseInterceptors(
    FilesInterceptor('picture', 10, { 
      storage: diskStorage({
        destination: Helper.fileDirectory,
        filename: Helper.customFileUpload
      })
    })
  )
  uploadFile(@UploadedFiles() files): string {
    console.log(files)
    return 'success';
  }
}
