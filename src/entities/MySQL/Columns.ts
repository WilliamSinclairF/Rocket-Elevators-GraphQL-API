import { Field, ID, Int, ObjectType } from 'type-graphql';
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
import { Batteries } from './Batteries';
import { Elevators } from './Elevators';

@Index('index_columns_on_battery_id', ['batteryId'], {})
@ObjectType('columns')
@Entity('columns', { schema: process.env.MYSQLDB })
export class Columns extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field({ nullable: true })
  @Column('bigint', { name: 'battery_id', nullable: true })
  batteryId: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'column_type', nullable: true, length: 255 })
  columnType: string;

  @Field({ nullable: true })
  @Column('varchar', { name: 'column_status', nullable: true, length: 255 })
  columnStatus: string;

  @Field({ nullable: true })
  @Column('int', { name: 'number_of_floors_served', nullable: true })
  numberOfFloorsServed: number;

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

  @Field(() => Batteries)
  @ManyToOne(() => Batteries, battery => battery.columns)
  @JoinColumn({ name: 'battery_id', referencedColumnName: 'id' })
  battery: Batteries;

  @Field(() => [Elevators])
  @OneToMany(() => Elevators, elevators => elevators.column)
  @JoinColumn({ name: 'id', referencedColumnName: 'column_id' })
  elevators: Elevators[];

  @Field(() => Int)
  elevatorCount(): number {
    return this.elevators.length;
  }

  @Field(() => [FactInterventions], { nullable: true })
  async interventions(): Promise<FactInterventions[]> {
    return await getRepository(FactInterventions, 'pg').find({
      where: {
        columnId: this.id,
      },
    });
  }
}
