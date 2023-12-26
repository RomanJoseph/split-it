import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { IUserPostgresAdapter } from '../interfaces/IUserPostgresAdapter';

@Injectable()
export class UsersPostgresAdapter implements IUserPostgresAdapter {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { login } })
  }

  async save (user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}