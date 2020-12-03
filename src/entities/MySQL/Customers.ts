import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Addresses } from './Addresses';
import { Buildings } from './Buildings';
import { Users } from './Users';

@Index('index_customers_on_address_id', ['addressId'], {})
@Index('index_customers_on_user_id', ['userId'], {})
@ObjectType('customers')
@Entity('customers', { schema: process.env.MYSQLDB })
export class Customers extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field({ nullable: true })
  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string;

  @Field({ nullable: true })
  @OneToOne(() => Users, u => u.customer)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @Field({ nullable: true })
  @Column('varchar', { name: 'company_name', nullable: true, length: 255 })
  companyName: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'company_contact_full_name',
    nullable: true,
    length: 255,
  })
  companyContactFullName: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'company_contact_phone',
    nullable: true,
    length: 255,
  })
  companyContactPhone: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'company_contact_email',
    nullable: true,
    length: 255,
  })
  companyContactEmail: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'company_description',
    nullable: true,
    length: 255,
  })
  companyDescription: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'technical_authority_full_name',
    nullable: true,
    length: 255,
  })
  technicalAuthorityFullName: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'technical_authority_phone_number',
    nullable: true,
    length: 255,
  })
  technicalAuthorityPhoneNumber: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'technical_manager_email_service',
    nullable: true,
    length: 255,
  })
  technicalManagerEmailService: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column('bigint', { name: 'address_id', nullable: true })
  addressId: string;

  @Field(() => Addresses)
  @OneToMany(() => Addresses, addresses => addresses.customer)
  addresses: Addresses;

  @Field(() => [Buildings])
  @OneToMany(() => Buildings, b => b.customer)
  buildings: Buildings[];
}
