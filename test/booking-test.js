import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';

describe('Booking Class', () => {
  let newBooking;

  beforeEach(() => {
    const bookingSample = {
      id: "5fwrgu4i7k55hl6sz",
      userID: 9,
      date: "2022/04/22",
      roomNumber: 15
    }

    newBooking = new Booking(bookingSample);
  })

  it('should be a function', () => {
    expect(Booking).to.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(newBooking).to.be.an.instanceOf(Booking)
  });

  it('should have an id', () => {
    expect(newBooking.id).to.equal("5fwrgu4i7k55hl6sz")
  });

  it('should have a user id', () => {
    expect(newBooking.userID).to.equal(9)
  });

  it.skip('should have a booking date', () => {
    expect(newBooking.date).to.equal("2022/04/22")
  });

  it.skip('should have a room number', () => {
    expect(newBooking.roomNumber).to.equal(15)
  });
});