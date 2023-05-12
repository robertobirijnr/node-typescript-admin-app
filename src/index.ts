require('dotenv').config();

import { routes } from './routes/index';
import { DataSource } from "typeorm"
import  express  from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';


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
 .then(() => {
    const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:['http:localhost:3000']
}))


routes(app);


app.listen(8000,()=>{
    console.log('listening to port 8000');
});
 })
 .catch((error) => console.log(error))

 export default appDataSource;
