import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  getRepository,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FactInterventions } from '../PG/FactInterventions';
import { Columns } from './Columns';

@Index('index_elevators_on_column_id', ['columnId'], {})
@ObjectType('elevators')
@Entity('elevators', {
  database: process.env.MYSQLDB,
  schema: process.env.MYSQLDB,
})
export class Elevators extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field()
  @Column('bigint', { name: 'column_id', nullable: true })
  columnId: string;

  @Field()
  @Column('varchar', { name: 'serial_number', nullable: true, length: 255 })
  serialNumber: string;

  @Field()
  @Column('varchar', { name: 'elevator_model', nullable: true, length: 255 })
  elevatorModel: string;

  @Field()
  @Column('varchar', { name: 'elevator_type', nullable: true, length: 255 })
  elevatorType: string;

  @Field()
  @Column('varchar', { name: 'elevator_status', nullable: true, length: 255 })
  elevatorStatus: string;

  @Field()
  @Column('date', { name: 'date_of_commissioning', nullable: true })
  dateOfCommissioning: string;

  @Field()
  @Column('date', { name: 'date_of_last_inspection', nullable: true })
  dateOfLastInspection: string;

  @Field()
  @Column('varchar', {
    name: 'certificate_of_inspection',
    nullable: true,
    length: 255,
  })
  certificateOfInspection: string;

  @Field()
  @Column('varchar', { name: 'information', nullable: true, length: 255 })
  information: string;

  @Field()
  @Column('varchar', { name: 'notes', nullable: true, length: 255 })
  notes: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Columns)
  @ManyToOne(() => Columns, column => column.elevators)
  @JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
  column: Columns;

  @Field(() => [FactInterventions], { nullable: true })
  async interventions(): Promise<FactInterventions[]> {
    return await getRepository(FactInterventions, 'pg').find({
      where: {
        elevatorId: this.id,
      },
    });
  }
}
