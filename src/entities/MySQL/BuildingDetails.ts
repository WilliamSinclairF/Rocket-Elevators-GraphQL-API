import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Buildings } from './Buildings';

@Index('index_building_details_on_building_id', ['buildingId'], {})
@ObjectType('building_details')
@Entity('building_details', { schema: process.env.MYSQLDB })
export class BuildingDetails {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field()
  @Column('bigint', { name: 'building_id', nullable: true })
  buildingId: string;

  @Field()
  @Column('varchar', { name: 'information_key', nullable: true, length: 255 })
  informationKey: string;

  @Field()
  @Column('varchar', { name: 'value', nullable: true, length: 255 })
  value: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Buildings)
  @ManyToOne(() => Buildings, buildings => buildings.buildingDetails, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @Field(() => Buildings)
  @JoinColumn([{ name: 'building_id', referencedColumnName: 'id' }])
  building: Buildings;
}
