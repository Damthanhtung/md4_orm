import { OrderDetail } from "../model/orderDetail";
import {AppDataSource} from "../data-source";
import {Order} from "../model/order";

class OrderService {
    private orderRepository;
    private orderDetailRepository

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    }

    orderLoad = async () => {
        let sql = `INSERT INTO case2_shopping.order (costumer, address, phone, orderDate, status, total)
                   VALUES (1, 'Hd', '01', '01/01/2023', 'loading', 0);`
        return this.orderRepository.query(sql);
    }
    saveOrderDetail = async (orderDetail) => {
        // console.log(orderDetail.idProduct)
        let sql = `INSERT INTO order_detail(quantity, product, order_detail.order)
                   VALUES (${orderDetail.quantity}, ${orderDetail.idProduct}, ${orderDetail.idOrder})`;
        return this.orderDetailRepository.query(sql);
    }

    findByStatus = async () => {
        let order = await this.orderRepository.findOneBy({status: 'loading'});
        if (!order) {
            return null;
        }
        return order;
    }
    findByOderId = async (id) => {
    let sql = `select p.name, p.price, d.quantity, p.id as idProduct, d.id as idDetail
                   from order_detail d

                            join product p on d.product = p.id
                   where d.order = ${id};`
    let order = await this.orderDetailRepository.query(sql);
    // console.log(order)
    return order;
   }
}

export default new OrderService();