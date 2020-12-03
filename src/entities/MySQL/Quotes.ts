import { ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('index_quotes_on_user_id', ['userId'], {})
@Entity('quotes', { schema: process.env.MYSQLDB })
@ObjectType('quotes')
export class Quotes {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string | null;

  @Column('int', { name: 'apartments', nullable: true })
  apartments: number | null;

  @Column('int', { name: 'floors', nullable: true })
  floors: number | null;

  @Column('int', { name: 'basements', nullable: true })
  basements: number | null;

  @Column('int', { name: 'businesses', nullable: true })
  businesses: number | null;

  @Column('int', { name: 'elevator_shafts', nullable: true })
  elevatorShafts: number | null;

  @Column('int', { name: 'parking_spaces', nullable: true })
  parkingSpaces: number | null;

  @Column('int', { name: 'occupants', nullable: true })
  occupants: number | null;

  @Column('int', { name: 'opening_hours', nullable: true })
  openingHours: number | null;

  @Column('varchar', { name: 'product_line', nullable: true, length: 255 })
  productLine: string | null;

  @Column('decimal', {
    name: 'install_fee',
    nullable: true,
    precision: 8,
    scale: 2,
  })
  installFee: string | null;

  @Column('decimal', {
    name: 'total_price',
    nullable: true,
    precision: 8,
    scale: 2,
  })
  totalPrice: string | null;

  @Column('int', { name: 'unit_price', nullable: true })
  unitPrice: number | null;

  @Column('int', { name: 'elevator_number', nullable: true })
  elevatorNumber: number | null;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('varchar', { name: 'building_type', nullable: true, length: 255 })
  buildingType: string | null;

  @Column('varchar', { name: 'full_name', nullable: true, length: 255 })
  fullName: string | null;

  @Column('varchar', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('varchar', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;
}
