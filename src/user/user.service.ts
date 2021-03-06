import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async createMany(createManyUserDto: CreateUserDto[]): Promise<User[]> {
    return this.userModel.insertMany(createManyUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: ObjectId): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  update(id: ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: ObjectId) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
