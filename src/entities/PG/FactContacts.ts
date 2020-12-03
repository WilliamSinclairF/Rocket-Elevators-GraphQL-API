import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('fact_contacts_pkey', ['id'], { unique: true })
@ObjectType('fact_contacts')
@Entity('fact_contacts', { database: process.env.PGDB, schema: 'public' })
export class FactContacts {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field()
  @Column('integer', { name: 'contact_id', nullable: true })
  contactId: number;

  @Field()
  @Column('date', { name: 'creation_date', nullable: true })
  creationDate: string;

  @Field()
  @Column('character varying', { name: 'company_name', nullable: true })
  companyName: string;

  @Field()
  @Column('character varying', { name: 'email', nullable: true })
  email: string;

  @Field()
  @Column('character varying', { name: 'project_name', nullable: true })
  projectName: string;

  @Field()
  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;
}
