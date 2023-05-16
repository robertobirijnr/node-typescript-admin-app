require('dotenv').config();
import { DataSource } from "typeorm"
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";
import { Order } from "../entity/orderEntity";
import { OrderItem } from "../entity/orderItemEntity";

const appDataSource = new DataSource({
    type:'mysql',
    host:process.env.DB_HOST,
    port:3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORDT,
    database: process.env.DB,
    entities: ["src/entity/*.ts"],
    synchronize: true,
    logging: false,
  });
 
  appDataSource.initialize()
  .then(async() => {

    const prodData = appDataSource.getRepository(Order);
    const orderItem = appDataSource.getRepository(OrderItem);

    for(let i=0; i< 30; i++){
      const order = await prodData.save({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email()
      })

      for(let j=0; j < randomInt(1,5); j++){
          await orderItem.save({
            order,
          product_title: faker.lorem.words(2),
          price: randomInt(10,100),
          quantity: randomInt(1,5)
        })
  

    }
    }

 

    process.exit(0)

  })
  .catch((error) => console.log(error))