import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  getRepository,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FactInterventions } from '../PG/FactInterventions';
import { Buildings } from './Buildings';
import { Columns } from './Columns';

@Index('index_batteries_on_building_id', ['buildingId'], {})
@Index('index_batteries_on_employee_id', ['employeeId'], {})
@ObjectType('batteries')
@Entity('batteries', { schema: process.env.MYSQLDB })
export class Batteries extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field({ nullable: true })
  @Column('bigint', { name: 'building_id', nullable: true })
  buildingId: string;

  @Field({ nullable: true })
  @Column('bigint', { name: 'employee_id', nullable: true })
  employeeId: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'battery_type', nullable: true, length: 255 })
  batteryType: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'battery_status', nullable: true, length: 255 })
  batteryStatus: string;

  @Field({ nullable: true })
  @Column('date', { name: 'date_of_commissioning', nullable: true })
  dateOfCommissioning: string;

  @Field({ nullable: true })
  @Column('date', { name: 'date_of_last_inspection', nullable: true })
  dateOfLastInspection: string;

  @Field({ nullable: true })
  @Column('varchar', {
    name: 'certificate_of_operations',
    nullable: true,
    length: 255,
  })
  certificateOfOperations: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'information', nullable: true, length: 255 })
  information: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'notes', nullable: true, length: 255 })
  notes: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Buildings)
  @ManyToOne(() => Buildings, building => building.batteries)
  @JoinColumn({ name: 'building_id', referencedColumnName: 'id' })
  building: Buildings;

  @Field(() => [Columns])
  @OneToMany(() => Columns, columns => columns.battery)
  columns: Columns[];

  @Field(() => [FactInterventions], { nullable: true })
  async interventions(): Promise<FactInterventions[]> {
    return await getRepository(FactInterventions, 'pg').find({
      where: {
        batteryId: this.id,
      },
    });
  }
}
