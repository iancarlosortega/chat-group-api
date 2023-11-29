import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { FilesService } from './files.service';
import { FileUploadDto } from './dtos/file-upload.dto';

@ApiTags('Files')
@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to change user avatar image',
    type: FileUploadDto,
  })
  @ApiResponse({
    status: '2XX',
    description: 'User avatar image updated succesfully',
    type: User,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Unauthorized, send a valid token',
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.filesService.updateUserAvatarUrl(file, user);
  }
}
