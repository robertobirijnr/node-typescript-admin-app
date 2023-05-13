require('dotenv').config();
import { DataSource } from "typeorm"
import { Permission } from "../entity/permissionEntity";
import { Role } from "../entity/roleEntity";

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

    const permissionData = appDataSource.getRepository(Permission);

    let permissions:any = []

    const perms = ["view_users","edit_users","view_roles","edit_roles","view_products","edit_products","view_orders","edit_orders"];

    for(let i = 0; i < perms.length; i++){

        permissions.push( await permissionData.save({
            name: perms[i]
        }) )
       
    };

    const roleData = appDataSource.getRepository(Role);

    await roleData.save({name:'Admin', permissions})

    delete permissions[3];

    await roleData.save({name:'Editor', permissions})

    delete permissions[1];
    delete permissions[5];
    delete permissions[7];

    await roleData.save({name:'Viewer', permissions})

    process.exit(0)

  })
  .catch((error) => console.log(error))