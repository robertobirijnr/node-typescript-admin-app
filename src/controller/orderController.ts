import { Request, Response } from "express";
import appDataSource from "..";
import { Order } from "../entity/orderEntity";
import { Parser } from "json2csv";
import { OrderItem } from "../entity/orderItemEntity";

export const getOrders = async(req:Request,res:Response)=>{

    const paginateNum = 15;

    const page = parseInt(req.query.page as string || '1')

    const orderData = appDataSource.getRepository(Order);
   const [orders,total] = await orderData.findAndCount({
    take:paginateNum,
    skip:(page - 1) * paginateNum,
    relations: ['order_items']
   })

   res.send({
    data:orders.map((order:Order)=>({
        id: order.id,
        name:order.name,
        email:order.email,
        total: order.total,
        created_at: order.created_at,
        order_items: order.order_items
    })),
    meta:{
        total,
        page,
        last_page:Math.ceil(total/paginateNum)
    }
   });
    
    

   

   
}

export const Export = async(req:Request,res:Response)=>{

    const parser = new Parser({
        fields:['ID','Name','Email','Product Title','Pirce','Quantity']
    })

    const orderData = appDataSource.getRepository(Order);

    const orders = await orderData.find({relations:['order_items']});

    const json = [];

    orders.forEach((order:Order)=>{
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title':'',
            price:'',
            Quanity:''
        })

        order.order_items.forEach((item:OrderItem)=>{
            json.push({
                ID:'',
                Name: '',
                Email: '',
                'Product Title':item.product_title,
                price:item.price,
                Quanity:item.quantity
            })
        })
    })

    const csv = parser.parse(json);

    res.header('Content-Type','text/csv');
    res.attachment('orders.csv')

    res.send(csv);

}