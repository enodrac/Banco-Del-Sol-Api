import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      console.log('error en getUsers', error);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      console.log('error en getUserById', error);
    }
  }

  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error) {
      console.log('error en createUser', error);
    }
  }

  async updateUser(id: string, user: User): Promise<User> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      console.log('error en updateUser', error);
    }
  }
}
