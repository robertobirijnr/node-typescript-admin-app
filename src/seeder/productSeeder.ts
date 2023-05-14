require('dotenv').config();
import { DataSource } from "typeorm"
import { Product } from "../entity/productEntity";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";

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

    const prodData = appDataSource.getRepository(Product);

    for(let i=0; i< 30; i++){
       await prodData.save({
        name: faker.lorem.words(2),
        description: faker.lorem.words(10),
        price:randomInt(10,100),
        image: faker.image.avatar()
       })
    }

 

    process.exit(0)

  })
  .catch((error) => console.log(error))