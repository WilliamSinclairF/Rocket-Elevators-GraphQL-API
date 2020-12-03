import { Field, Float, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Buildings } from './Buildings';
import { Customers } from './Customers';

@Index('index_addresses_on_building_id', ['buildingId'], {})
@Index('index_addresses_on_customer_id', ['customerId'], {})
@ObjectType('addresses')
@Entity('addresses', {
  database: process.env.MYSQLDB,
  schema: process.env.MYSQLDB,
})
export class Addresses extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Field(() => String, { nullable: true })
  fullAddress(): string {
    return `${this.numberAndStreet} ${this.city} ${this.state} ${this.postalCode} ${this.country}`;
  }

  @Field()
  @Column('varchar', { name: 'type_of_address', nullable: true, length: 255 })
  typeOfAddress: string;

  @Field()
  @Column('varchar', { name: 'status', nullable: true, length: 255 })
  status: string;

  @Field()
  @Column('varchar', { name: 'entity', nullable: true, length: 255 })
  entity: string;

  @Field()
  @Column('varchar', { name: 'number_and_street', nullable: true, length: 255 })
  numberAndStreet: string;

  @Field()
  @Column('varchar', {
    name: 'suite_or_apartment',
    nullable: true,
    length: 255,
  })
  suiteOrApartment: string;

  @Field()
  @Column('varchar', { name: 'city', nullable: true, length: 255 })
  city: string;

  @Field()
  @Column('varchar', { name: 'state', nullable: true, length: 255 })
  state: string;

  @Field()
  @Column('varchar', { name: 'postal_code', nullable: true, length: 255 })
  postalCode: string;

  @Field()
  @Column('varchar', { name: 'country', nullable: true, length: 255 })
  country: string;

  @Field()
  @Column('varchar', { name: 'notes', nullable: true, length: 255 })
  notes: string;

  @Field(() => Float, { nullable: true })
  @Column('float', { name: 'latitude', nullable: true, precision: 12 })
  latitude: number;

  @Field(() => Float, { nullable: true })
  @Column('float', { name: 'longitude', nullable: true, precision: 12 })
  longitude: number;

  @Field({ nullable: true })
  @Column('bigint', { name: 'building_id', nullable: true })
  buildingId: string;

  @Field()
  @Column('bigint', { name: 'customer_id', nullable: true })
  customerId: string;

  @Field()
  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Field()
  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Field({ nullable: true })
  @OneToOne(() => Buildings, b => b.address)
  @JoinColumn([{ name: 'building_id', referencedColumnName: 'id' }])
  building: Buildings;

  @Field()
  @ManyToOne(() => Customers, customers => customers.addresses, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @Field()
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
