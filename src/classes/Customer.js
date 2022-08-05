class Customer {
    constructor(customerDetails) {
        console.log('customerDetails: ', customerDetails.name)
        this.customerId = customerDetails.id;
        this.name = customerDetails.name;
        this.username = `customer${this.customerId}`;
        this.password = "overlook2021";
        this.roomBookings = [];
        this.totalSpent = 0;
    }
}

export default Customer