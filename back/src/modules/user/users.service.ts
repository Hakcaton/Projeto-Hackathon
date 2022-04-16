import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResult } from 'src/tools/helpers/result.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Cryptography } from 'src/tools/cryptography/cryptography.class';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({email});
 }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async addUser(data: CreateUserDto): Promise<User> {
    try {
      const userExists = await this.findOne(data.email);

      if(userExists) throw new Error ("User Already Exists!")

      data.password = await Cryptography.encrypt(data.password);

      let user = this.userRepository.create(data);
      await this.userRepository.save(data);

      user = await this.findOne(data.email);
      delete user.password;

      return user
    } catch(err) {}
  }

  async userProfile(token: string): Promise<User> {

      //const user = await this.findOne(email);

      //if(!user) return resolve(Result.InvalidResult("User Not Exists!"));

      //delete user.password
      //return resolve(Result.OKResult(user));
return
  }
}
