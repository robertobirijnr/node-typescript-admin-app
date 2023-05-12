import { routes } from './routes/index';
import { DataSource } from "typeorm"
import  express  from "express";
import cors from 'cors'

const appDataSource = new DataSource({
   type:"mysql",
   host:"localhost",
   port: 3306,
   username: "root",
   password: "",
   database: "node-admin",
   entities: ["src/entity/*.ts"],
   synchronize: true,
   logging: false,
 });

 appDataSource.initialize()
 .then(() => {
    const app = express()
app.use(express.json());
app.use(cors({
    origin:['http:localhost:3000']
}))


routes(app);


app.listen(8000,()=>{
    console.log('listening to port 8000');
});
 })
 .catch((error) => console.log(error))

 export default appDataSource;
