import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Cryptography } from 'src/tools/cryptography/cryptography.class';
import * as jwt from 'jsonwebtoken';
import { QueryFailedError, Repository } from 'typeorm';
import { Response } from 'express';
import { jwtConstants } from 'src/tools/auth/constants';
import { eError } from 'src/tools/enum/error.definition';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseError } from 'pg-protocol';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(data: CreateUserDto, res?: Response): Promise<void> {
    try {
      if (data.email == null || data.password == null || data.permission == null || data.name == null || data.lastName == null) {
        throw eError.NOT_ENOUGTH_PARAMETERS;
      }

      if (await this.userRepository.findOne({
        email: data.email,
      })) {
        throw eError.USER_ALREADY_EXISTS;
      }

      data.password = await Cryptography.encrypt(data.password);

      let user = this.userRepository.create(data);
      await this.userRepository.save(user);
    }
    catch (err) {
      if (!res) {
        throw err;
      }
      switch (err) {
        case eError.USER_ALREADY_EXISTS: {
          res.status(HttpStatus.CONFLICT);
          break;
        }
        default: {
          res.status(HttpStatus.BAD_REQUEST);
          break;
        }
      }
    }
  }

  async userProfile(token: string, res: Response): Promise<User> {
    try {
      token = token.replace('Bearer ', '');
      const validate: any = jwt.verify(token, jwtConstants.secret);
      const user = await this.userRepository.findOne({ id: validate.userId });
      delete user.password;
      return user;
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST);
    }
  }

  async updateProfile(user: UpdateUserDto, res: Response): Promise<void> {
    try {
      const registeredUser = await this.userRepository.findOne({ id: user.id });

      if (!registeredUser) {
        throw eError.RESOURCE_NOT_FOUND;
      }

      if (user.email) {
        registeredUser.email = user.email;
      }

      if (user.lastName) {
        registeredUser.lastName = user.lastName;
      }

      if (user.name) {
        registeredUser.name = user.name;
      }

      if (user.phoneNumber) {
        registeredUser.phoneNumber = user.phoneNumber;
      }

      await this.userRepository.save(registeredUser);

      res.status(HttpStatus.OK);
    }
    catch (err) {
      if (!res) {
        throw err;
      }

      if (err instanceof QueryFailedError) {
        const error = err.driverError as DatabaseError;
        switch (error.code) {
          case 'ER_DUP_ENTRY': {
            res.status(HttpStatus.CONFLICT);
            break;
          }

          default: {
            res.status(HttpStatus.BAD_REQUEST);
            break;
          }
        }
      }
      else {
        switch (err) {
          case eError.RESOURCE_NOT_FOUND: {
            res.status(HttpStatus.NOT_FOUND);
            break;
          }

          default: {
            res.status(HttpStatus.BAD_REQUEST);
            break;
          }
        }
      }
    }
  }

}
