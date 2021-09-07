import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { APP_SALT } from '../config';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: BigInteger;

  @Column({ length: 128, nullable: false })
  first_name: string;

  @Column({ length: 128, nullable: false })
  last_name: string;

  @Column({ length: 64, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, type: 'longtext' })
  token: string;

  @Column({ type: 'smallint' })
  age: number;

  @Column()
  image: string;

  @Column({ length: 255 })
  description: string;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    const securePassword = await hash(this.password, APP_SALT);
    this.password = securePassword;
  }

  async PasswordIsValid(password: string) {
    return await compare(password, this.password);
  }
}
