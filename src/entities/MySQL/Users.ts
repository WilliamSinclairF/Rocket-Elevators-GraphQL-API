import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customers } from './Customers';

@Index('index_users_on_email', ['email'], { unique: true })
@Index('index_users_on_reset_password_token', ['resetPasswordToken'], {
  unique: true,
})
@Entity('users', { schema: process.env.MYSQLDB })
@ObjectType('users')
export class Users extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field(() => String)
  fullName(): string {
    return `${this.title} ${this.firstName} ${this.lastName}`;
  }

  @Field(() => Customers, { nullable: true })
  customer: Customers;

  @Field(() => String)
  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string | null;

  @Field(() => String)
  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string | null;

  @Field(() => String)
  @Column('varchar', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column('varchar', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('varchar', { name: 'encrypted_password', length: 255 })
  encryptedPassword: string;

  @Column('varchar', {
    name: 'reset_password_token',
    nullable: true,
    unique: true,
    length: 255,
  })
  resetPasswordToken: string | null;

  @Column('datetime', { name: 'reset_password_sent_at', nullable: true })
  resetPasswordSentAt: Date | null;

  @Column('datetime', { name: 'remember_created_at', nullable: true })
  rememberCreatedAt: Date | null;

  @Column('tinyint', {
    name: 'is_admin',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isAdmin: boolean | null;

  @Column('tinyint', {
    name: 'is_employee',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isEmployee: boolean | null;

  @Column('tinyint', {
    name: 'is_user',
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  isUser: boolean | null;

  @Field({ nullable: true })
  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string;
}
