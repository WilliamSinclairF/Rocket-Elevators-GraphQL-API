import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('dim_customers_pkey', ['id'], { unique: true })
@ObjectType('dim_customers')
@Entity('dim_customers', { database: process.env.PGDB, schema: 'public' })
export class DimCustomers extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field()
  @Column('date', { name: 'customer_creation_date', nullable: true })
  customerCreationDate: string;

  @Field()
  @Column('character varying', { name: 'company_name', nullable: true })
  companyName: string;

  @Field()
  @Column('character varying', {
    name: 'company_contact_full_name',
    nullable: true,
  })
  companyContactFullName: string;

  @Field()
  @Column('character varying', {
    name: 'company_contact_email',
    nullable: true,
  })
  companyContactEmail: string;

  @Field()
  @Column('integer', { name: 'elevator_number', nullable: true })
  elevatorNumber: number;

  @Field()
  @Column('character varying', { name: 'customer_city', nullable: true })
  customerCity: string;

  @Field()
  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;
}
