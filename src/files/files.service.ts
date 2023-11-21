import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
  ) {}

  async updateUserAvatarUrl(file: Express.Multer.File, user: User) {
    const { secure_url } = await this.cloudinaryService.uploadImage(file);
    return await this.usersService.update(user.id, {
      avatarUrl: secure_url,
    });
  }
}
