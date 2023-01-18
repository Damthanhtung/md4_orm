declare class OrderService {
    private orderRepository;
    private orderDetailRepository;
    constructor();
    orderLoad: () => Promise<any>;
    saveOrderDetail: (orderDetail: any) => Promise<any>;
    findByStatus: () => Promise<any>;
    findByOderId: (id: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
