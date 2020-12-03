import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_leads_on_user_id', ['userId'], {})
@ObjectType('leads')
@Entity('leads', { schema: process.env.MYSQLDB })
export class Leads {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'full_name', nullable: true, length: 255 })
  fullName: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'business_name', nullable: true, length: 255 })
  businessName: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'project_name', nullable: true, length: 255 })
  projectName: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'department', nullable: true, length: 255 })
  department: string;

  @Field({ nullable: true })
  @Column('text', { name: 'project_description', nullable: true })
  projectDescription: string;

  @Field({ nullable: true })
  @Column('text', { name: 'message', nullable: true })
  message: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'attachment', nullable: true, length: 255 })
  attachment: string;

  @Field({ nullable: true })
  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string;

  @Field({ nullable: true })
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field({ nullable: true })
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;
}
