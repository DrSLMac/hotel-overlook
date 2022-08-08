import chai from 'chai';
const expect = chai.expect;
import sampleDataSet from '../src/data/sampleDataSet';
import Customer from "../src/classes/Customer"

describe('Customer Class', () => {
    let newCustomer, newCustomer2, customersData, bookingsRepo, roomsData

    beforeEach(() => {
      customersData = sampleDataSet.customersData;
      newCustomer = new Customer(customersData[0])
      newCustomer2 = new Customer(customersData[1])

      bookingsRepo = [{ //10 bookings
          id: "5fwrgu4i7k55hl6t7",
          userID: 20,
          date: "2022/02/16",
          roomNumber: 7
          },
          {
            id: "5fwrgu4i7k55hl6ui",
            userID: 20,
            date: "2022/02/07",
            roomNumber: 24
            },
          {  
          id: "5fwrgu4i7k55hl6sz",
          userID: 9,
          date: "2022/04/22",
          roomNumber: 15
          },
          {
          id: "5fwrgu4i7k55hl6t5",
          userID: 43,
          date: "2022/01/24",
          roomNumber: 24
          },
          {
          id: "5fwrgu4i7k55hl6t6",
          userID: 13,
          date: "2022/01/10",
          roomNumber: 12
          },
          {
          id: "5fwrgu4i7k55hl6t8",
          userID: 1,
          date: "2022/02/05",
          roomNumber: 12
          },
          {
          id: "5fwrgu4i7k55hl6t9",
          userID: 38,
          date: "2023/12/14",
          roomNumber: 14
          },
          {
          id: "5fwrgu4i7k55hl6ta",
          userID: 25,
          date: "2022/01/11",
          roomNumber: 9
          },
          {
          id: "5fwrgu4i7k55hl6tb",
          userID: 49,
          date: "2022/02/06",
          roomNumber: 5
          },
          {
          id: "5fwrgu4i7k55hl6tc",
          userID: 22,
          date: "2023/11/30",
          roomNumber: 13
          },
          {
          id: "5fwrgu4i7k55hl6td",
          userID: 27,
          date: "2022/01/31",
          roomNumber: 20
          }
      ]

      roomsData = [
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4
          },
          {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38
          },
          {
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14
          },
          {
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44
          },
          {
          number: 5,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 340.17
          },
          {
          number: 6,
          roomType: "junior suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 397.02
          },
          {
          number: 7,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 231.46
          },
          {
          number: 8,
          roomType: "junior suite",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 261.26
          },
          {
          number: 9,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 200.39
          },
          {
          number: 10,
          roomType: "suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 497.64
          },
          {
          number: 11,
          roomType: "single room",
          bidet: true,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 207.24
          },
          {
          number: 12,
          roomType: "single room",
          bidet: false,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 172.09
          },
          {
          number: 13,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 423.92
          },
          {
          number: 14,
          roomType: "residential suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 1,
          costPerNight: 457.88
          },
          {
          number: 15,
          roomType: "residential suite",
          bidet: false,
          bedSize: "full",
          numBeds: 1,
          costPerNight: 294.56
          },
          {
          number: 16,
          roomType: "single room",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 325.6
          },
          {
          number: 17,
          roomType: "junior suite",
          bidet: false,
          bedSize: "twin",
          numBeds: 2,
          costPerNight: 328.15
          },
          {
          number: 18,
          roomType: "junior suite",
          bidet: false,
          bedSize: "king",
          numBeds: 2,
          costPerNight: 496.41
          },
          {
          number: 19,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 374.67
          },
          {
          number: 20,
          roomType: "residential suite",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 343.95
          }
      ]
    });

  it("should be a function", () => {
    expect(Customer).to.be.a("function");
  });

  it("should be an instance of Customer", () => {
    expect(newCustomer).to.be.an.instanceOf(Customer);
  });

  it("should have an id", () => {
    expect(newCustomer.customerId).to.equal(1);
    expect(newCustomer2.customerId).to.equal(2);
  });

  it("shoud have a name", () => {
    expect(newCustomer.name).to.equal('Leatha Ullrich');
    expect(newCustomer2.name).to.equal("Rocio Schuster")
  })

  it("should have a username", () => {
    expect(newCustomer.username).to.equal(`customer1`);
    expect(newCustomer2.username).to.equal(`customer2`)
  });

  it("should have a password", () => {
    expect(newCustomer.password).to.equal("overlook2021");
    expect(newCustomer2.password).to.equal("overlook2021")
  });

  it("should start with zero dollars spent", () => {
    expect(newCustomer.totalSpent).to.equal(0)
  })

  it("should start out with no rooms booked", () => {
    expect(newCustomer.roomsBooked).to.deep.equal([]);
  })

  it("should be able to get full booking room details", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    expect(newCustomer.bookingRoomDetails[0]).to.deep.equal({
          bookingId: '5fwrgu4i7k55hl6sz',
          customerID: 9,
          roomNumber: 15,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 1,
          costPerNight: 294.56,
          dateOfStay: '2022/04/22'
        })
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
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6sz");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6t7");
    expect(newCustomer.bookingRoomDetails).to.deep.equal([
        {
          bookingId: '5fwrgu4i7k55hl6t6',
          customerID: 13,
          roomNumber: 12,
          roomType: 'single room',
          bidet: false,
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 172.09,
          dateOfStay: '2022/01/10'
        },
        {
          bookingId: '5fwrgu4i7k55hl6t8',
          customerID: 1,
          roomNumber: 12,
          roomType: 'single room',
          bidet: false,
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 172.09,
          dateOfStay: '2022/02/05'
        },
        {
          bookingId: '5fwrgu4i7k55hl6t9',
          customerID: 38,
          roomNumber: 14,
          roomType: 'residential suite',
          bidet: false,
          bedSize: 'twin',
          numBeds: 1,
          costPerNight: 457.88,
          dateOfStay: '2023/12/14'
        },
        {
          bookingId: '5fwrgu4i7k55hl6ta',
          customerID: 25,
          roomNumber: 9,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 200.39,
          dateOfStay: '2022/01/11'
        },
        {
          bookingId: '5fwrgu4i7k55hl6tb',
          customerID: 49,
          roomNumber: 5,
          roomType: 'single room',
          bidet: true,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 340.17,
          dateOfStay: '2022/02/06'
        },
        {
          bookingId: '5fwrgu4i7k55hl6tc',
          customerID: 22,
          roomNumber: 13,
          roomType: 'single room',
          bidet: false,
          bedSize: 'queen',
          numBeds: 2,
          costPerNight: 423.92,
          dateOfStay: '2023/11/30'
        },
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
      ]
    )
  })

  it("should be able to remove booked rooms from the list of filtered rooms", () => {
    newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
    newCustomer.filterRooms("2023/12/14", "residential suite");
    newCustomer.bookHotelRoom("5fwrgu4i7k55hl6t9");
    expect(newCustomer.filteredBookings).to.deep.equal([]);
  })

  it("should be able to view previously booked rooms", () => {
      newCustomer.getHotelRoomDetails(bookingsRepo, roomsData);
      newCustomer.findPastBookings();
      expect(newCustomer.roomsBooked[0]).to.deep.equal({
                  bookingId: '5fwrgu4i7k55hl6t8',
                  customerID: 1,
                  roomNumber: 12,
                  roomType: 'single room',
                  bidet: false,
                  bedSize: 'twin',
                  numBeds: 2,
                  costPerNight: 172.09,
                  dateOfStay: '2022/02/05'
          })
          console.log('findPastBookings(): ', findPastBookings())
  })

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