import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';

describe('Room Class', () => {
  let newRoom;

  beforeEach(() => {
    const roomSample = {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    }

    newRoom = new Room(roomSample);
  })

  it('should be a function', () => {
    expect(Room).to.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(newRoom).to.be.an.instanceOf(Room)
  });

  it('should have a room number', () => {
    expect(newRoom.number).to.equal(1)
  });

  it('should have a room type', () => {
    expect(newRoom.roomType).to.equal("residential suite")
  });

  it('should have a bidet', () => {
    expect(newRoom.bidet).to.equal(true)
  });

  it('should have a bed size', () => {
    expect(newRoom.bedSize).to.equal('queen')
  });

  it('should clarify how many beds are in the room', () => {
    expect(newRoom.numBeds).to.equal(1)
  });

  it('should give a price per night', () => {
    expect(newRoom.costPerNight).to.equal(358.4)
  })
});