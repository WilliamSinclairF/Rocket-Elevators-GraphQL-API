import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FactInterventions } from '../PG/FactInterventions';
import { Buildings } from './Buildings';

@Index('index_employees_on_user_id', ['userId'], {})
@ObjectType('employees')
@Entity('employees', { schema: process.env.MYSQLDB })
export class Employees extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field(() => String)
  employeeName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @Field(() => String)
  employeeContactInfo(): string {
    return ` ${this.email}, ${this.phone}`;
  }

  @Field()
  @Column('varchar', { name: 'first_name', nullable: true, length: 255 })
  firstName: string;

  @Field()
  @Column('varchar', { name: 'last_name', nullable: true, length: 255 })
  lastName: string;

  @Field()
  @Column('varchar', { name: 'function', nullable: true, length: 255 })
  function: string;

  @Field()
  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string;

  @Field()
  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string;

  @Field(() => [Buildings], { nullable: true })
  @OneToMany(() => Buildings, buildings => buildings.adminContact)
  @JoinColumn([{ name: 'id', referencedColumnName: 'admin_contact_id' }])
  adminContactFor: Buildings[];

  @Field(() => [Buildings], { nullable: true })
  @OneToMany(() => Buildings, buildings => buildings.technicalContact)
  @JoinColumn([{ name: 'id', referencedColumnName: 'technical_contact_id' }])
  technicalContactFor: Buildings[];

  @Field(() => [FactInterventions], { nullable: true })
  interventions: FactInterventions[];
}
