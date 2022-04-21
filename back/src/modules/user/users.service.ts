import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Cryptography } from 'src/tools/cryptography/cryptography.class';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { jwtConstants } from 'src/tools/auth/constants';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(data: CreateUserDto, res: Response): Promise<void> {
    try {
      const userExists = await this.userRepository.findOne({
        email: data.email,
      });

      if (userExists) {
        res.status(HttpStatus.CONFLICT);
      }

      data.password = await Cryptography.encrypt(data.password);

      let user = this.userRepository.create(data);
      await this.userRepository.save(user);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  async userProfile(token: string, res: Response): Promise<User> {
    try{
      token = token.replace('Bearer ', '');
      const validate: any = jwt.verify(token, jwtConstants.secret);
      const user = await this.userRepository.findOne({id: validate.userId});
      delete  user.password;
      return user;
    } catch(err) {
      res.status(HttpStatus.BAD_REQUEST);
    }

  }
}
