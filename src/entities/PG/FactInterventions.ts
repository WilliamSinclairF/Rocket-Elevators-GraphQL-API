import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Batteries } from '../MySQL/Batteries';
import { Buildings } from '../MySQL/Buildings';
import { Columns } from '../MySQL/Columns';
import { Elevators } from '../MySQL/Elevators';
import { Employees } from '../MySQL/Employees';

@Index('fact_interventions_pkey', ['id'], { unique: true })
@ObjectType('fact_interventions')
@Entity('fact_interventions', { database: process.env.PGDB, schema: 'public' })
export class FactInterventions extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'employee_id', nullable: true })
  employeeId: number | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'building_id', nullable: true })
  buildingId: string;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'battery_id', nullable: true })
  batteryId: string | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'column_id', nullable: true })
  columnId: number | null;

  @Field(() => Int, { nullable: true })
  @Column('integer', { name: 'elevator_id', nullable: true })
  elevatorId: number | null;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'result', nullable: true })
  result: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { name: 'report', nullable: true })
  report: string | null;

  @Field(() => String, { nullable: true })
  @Column('character varying', { name: 'status', nullable: true })
  status: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'intervention_start_date_time',
    nullable: true,
  })
  interventionStartDateTime: Date | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', {
    name: 'intervention_end_date_time',
    nullable: true,
  })
  interventionEndDateTime: Date | null;

  @Field(() => Buildings, { nullable: true })
  building: Buildings | undefined;

  @Field(() => Batteries, { nullable: true })
  battery: Batteries | undefined;

  @Field(() => Columns, { nullable: true })
  column: Columns | undefined;

  @Field(() => Elevators, { nullable: true })
  elevator: Elevators | undefined;

  @Field(() => Employees)
  employee: Employees | undefined;
}
