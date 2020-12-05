import { Addresses } from '../entities/MySQL/Addresses';
import { Buildings } from '../entities/MySQL/Buildings';
import { Arg, Query, Resolver } from 'type-graphql';
import { Users } from '../entities/MySQL/Users';
import { Customers } from '../entities/MySQL/Customers';

@Resolver()
export class MySQLresolver {
  //.find returns all
  @Query(() => [Addresses])
  addresses() {
    return Addresses.find();
  }

  @Query(() => Buildings)
  async getBuildingByID(@Arg('id') id: Number): Promise<Buildings> {
    return Buildings.findOneOrFail({ where: { id: id } });
  }

  @Query(() => [Buildings])
  async buildings(@Arg('email') email: String): Promise<Buildings[]> {
    const user = await Users.findOneOrFail({
      where: { email: email },
    });
    const customer = await Customers.findOneOrFail({
      where: { userId: user.id },
    });
    return await Buildings.find({
      join: {
        alias: 'building',
        leftJoinAndSelect: {
          customer: 'building.customer',
          user: 'customer.user',
          buildingDetails: 'building.buildingDetails',
          adminContact: 'building.adminContact',
          technicalContact: 'building.technicalContact',
          address: 'building.address',
          batteries: 'building.batteries',
          columns: 'batteries.columns',
          elevators: 'columns.elevators',
        },
      },
      where: {
        customerId: customer.id,
      },
    });
  }

  @Query(() => Customers)
  async customer(@Arg('email') email: String): Promise<Customers> {
    const user = await Users.findOneOrFail({
      where: { email: email },
    });
    const customer = await Customers.findOneOrFail({
      where: { userId: user.id },
    });
    return await Customers.findOneOrFail({
      join: {
        alias: 'customer',
        leftJoinAndSelect: {
          user: 'customer.user',
        },
      },
      where: {
        customerId: customer.id,
      },
    });
  }
}
