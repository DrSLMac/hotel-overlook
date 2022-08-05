import chai from 'chai';
const expect = chai.expect;
import sampleDataSet from '../src/data/sampleDataSet';
import Customer from "../src/classes/Customer"

describe('Customer Class', () => {
    let newCustomer, newCustomer2, customersData, bookingsData, roomsData

    beforeEach(() => {
      customersData = sampleDataSet.customersData;
      newCustomer = new Customer(customersData[0])
      newCustomer2 = new Customer(customersData[1])
    });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(newCustomer).to.be.an.instanceOf(Customer);
  });

  it("should have an id", () => {
    expect(newCustomer.customerId).to.equal(1)
  });

  it("shoud have a name", () => {
    expect(newCustomer.name).to.equal('Leatha Ullrich');
    expect(newCustomer2.name).to.equal("Rocio Schuster")
  })

  it("should have a username", () => {
    expect(newCustomer.username).to.equal(`customer1`);
  });

  it("should have a password", () => {
    expect(newCustomer.password).to.equal("overlook2021")
  });

  it("should start with zero dollars spent", () => {
    expect(newCustomer.totalSpent).to.equal(0)
  })

  it("should be able to keep track of past bookings", () => {

    expect(newCustomer.roomBookings).to.deep.equal()
  })
});