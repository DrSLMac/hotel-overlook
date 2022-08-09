import chai from 'chai';
const expect = chai.expect;
import sampleDataSet from '../src/data/sampleDataSet';
import Customer from "../src/classes/Customer"
import Booking from "../src/classes/Booking"
import Room from "../src/classes/Room"

describe('Customer Class', () => {
    let newCustomer, newCustomer2, customersData, bookingsRepo, roomsData

    beforeEach(() => {
      bookingsRepo = sampleDataSet.bookingsData;
      roomsData = sampleDataSet.roomsData;   
      customersData = sampleDataSet.customersData;
      newCustomer = new Customer(customersData[0])
      newCustomer2 = new Customer(customersData[1])
    });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(newCustomer).to.be.an.instanceOf(Customer);
    expect(newCustomer2).to.be.an.instanceOf(Customer);
  });

  it("should have an id", () => {
    expect(newCustomer.customerId).to.equal(1);
    expect(newCustomer2.customerId).to.equal(2);
  });

  it("shoud have a name", () => {
    expect(newCustomer.name).to.equal('Leatha Ullrich');
    expect(newCustomer2.name).to.equal("Rocio Schuster");
  })

  it("should have a username", () => {
    expect(newCustomer.username).to.equal(`customer1`);
    expect(newCustomer2.username).to.equal(`customer2`);
  });

  it("should have a password", () => {
    expect(newCustomer.password).to.equal("overlook2021");
    expect(newCustomer2.password).to.equal("overlook2021");
  });

  it("should start with zero dollars spent", () => {
    expect(newCustomer.totalSpent).to.equal(0)
  })

  it("should start out with no rooms booked", () => {
    expect(newCustomer.roomsBooked).to.deep.equal([]);
  })

  it("should be able to get full booking room details", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    expect(newCustomer.bookingRoomDetails.length).to.equal(31)
  })

  it("should be able to filter rooms by date", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    newCustomer.filterRooms("2022/01/31", "residential suite");
    expect(newCustomer.filteredBookings).to.deep.equal([
      {
        bookingId: '5fwrgu4i7k55hl6td',
        customerID: 27,
        roomNumber: 20,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 343.95,
        dateOfStay: '2022/01/31'
      }
    ])
// console.log("newCustomer.filteredBookings: ", newCustomer.filteredBookings)
  })

  it("should be able to book a room", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData)
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6td");
    expect(newCustomer.roomsBooked[0]).to.deep.equal({
      bookingId: '5fwrgu4i7k55hl6td',
      customerID: 27,
      roomNumber: 20,
      roomType: 'residential suite',
      bidet: false,
      bedSize: 'queen',
      numBeds: 1,
      costPerNight: 343.95,
      dateOfStay: '2022/01/31'
    })
  })

  it("should be able to book more than one room", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6sz");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6t7");
    expect(newCustomer.roomsBooked[0]).to.deep.equal(
      { bookingId: '5fwrgu4i7k55hl6sz',
        customerID: 9,
        roomNumber: 15,
        roomType: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56,
        dateOfStay: '2022/04/22'
      },
      {
        bookingId: '5fwrgu4i7k55hl6t7',
        customerID: 20,
        roomNumber: 7,
        roomType: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46,
        dateOfStay: '2022/02/16'
      }
    )
  })

  it("should be able to remove rooms from list of available rooms", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6tf");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6tg");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6th")
    expect(newCustomer.bookingRoomDetails.length).to.equal(28)
  })

  it("should be able to remove booked rooms from the list of filtered rooms", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    newCustomer.filterRooms("2023/12/14", "residential suite");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6t9");
    expect(newCustomer.filteredBookings).to.deep.equal([]);
  })

  it("should be able to view previously booked rooms", () => {
      newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
      console.log(newCustomer.findPastBookings());
      expect(newCustomer.pastBookings).to.deep.equal([
        {
          bookingId: '5fwrgu4i7k55hl6x8',
          customerID: 1,
          roomNumber: 20,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 343.95,
          dateOfStay: '2023/01/11'
        },
        {
          bookingId: '5fwrgu4i7k55hl72q',
          customerID: 1,
          roomNumber: 19,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 374.67,
          dateOfStay: '2022/01/19'
        }
      ])
  })
          // { 🤦🏼‍♀️ Future booking
          //   bookingId: '5fwrgu4i7k55hl6x8',
          //   customerID: 1,
          //   roomNumber: 20,
          //   roomType: 'residential suite',
          //   bidet: false,
          //   bedSize: 'queen',
          //   numBeds: 1,
          //   costPerNight: 343.95,
          //   dateOfStay: '2023/01/11'
          // }

  it("should be able to see sum of total money spent", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData)
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6td")
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6tc")
    newCustomer.getTotalSpent();
    expect(newCustomer.totalSpent).to.equal("767.87");
  })

  it("should receive message when no rooms are avaible on requested date", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    expect(newCustomer.filterRooms("2022/11/18", "residential suite")).to.equal(false);
  })
});