import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  imports: [CloudinaryModule, AuthModule, UsersModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
