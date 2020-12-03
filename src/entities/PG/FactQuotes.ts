import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('fact_quotes_pkey', ['id'], { unique: true })
@ObjectType('fact_quotes')
@Entity('fact_quotes', { database: process.env.PGDB, schema: 'public' })
export class FactQuotes {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field()
  @Column('integer', { name: 'quote_id', nullable: true })
  quoteId: number;

  @Field()
  @Column('timestamp without time zone', {
    name: 'quote_created_at',
    nullable: true,
  })
  quoteCreatedAt: Date;

  @Field()
  @Column('character varying', { name: 'company_name', nullable: true })
  companyName: string;

  @Field()
  @Column('character varying', { name: 'email', nullable: true })
  email: string;

  @Field()
  @Column('integer', { name: 'elevator_number', nullable: true })
  elevatorNumber: number;

  @Field()
  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;
}
