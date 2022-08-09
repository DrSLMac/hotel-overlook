class Customer {
    constructor(customerDetails) {
        this.customerId = customerDetails.id;
        this.name = customerDetails.name;
        this.username = `customer${this.customerId}`;
        this.password = "overlook2021";
        this.totalSpent = 0;
        this.roomsBooked = [];//need past booking and future booking
        this.bookingRoomDetails = [];
        this.filteredBookings = [];
        this.errorMessage = "";
    }
    
    getHotelRoomDetails(bookingsRepo, roomsData) {//checked and good
        // console.log('bookRepo ln 15: ', bookingsRepo)
        const fullBookingDetails = bookingsRepo.reduce((roomsArray, booking) => {
            // console.log('roomsData ln 16: ', roomsData)
            // console.log('bookingsRepo ln 17: ', bookingsRepo)
            roomsData.forEach(room => {
                if(room.number === booking.roomNumber) {
                    const fullBookingDetails = {
                        bookingId: booking.id,
                        customerID: booking.userID,
                        roomNumber: booking.roomNumber,
                        roomType: room.roomType,
                        bidet: room.bidet,
                        bedSize: room.bedSize,
                        numBeds: room.numBeds,
                        costPerNight: room.costPerNight,
                        dateOfStay: booking.date,
                    }
                    roomsArray.push(fullBookingDetails)
                }
            })
            // console.log('roomsArray: ', roomsArray)
            return roomsArray
        }, [])
        this.bookingRoomDetails = fullBookingDetails;
// console.log('this.bookingRoomDetails: ', this.bookingRoomDetails)
// console.log('fullBookingDetails: ', fullBookingDetails)
        return fullBookingDetails
    }

    filterRooms(date, type) {
        const bookingFilter = this.bookingRoomDetails
        .some(booking => booking.dateOfStay === date && booking.roomType === type)
        if (bookingFilter) {
            return this.filteredBookings = this.bookingRoomDetails.filter(room => room.dateOfStay === date && room.roomType === type)
        } else {
            return false
        }
    }

    bookHotelRoom(roomId) {
        this.bookingRoomDetails.forEach(hotelRoom => {
// console.log('hotelRoom: ', hotelRoom.length)
            if(hotelRoom.bookingId === roomId) {
                this.roomsBooked.push(hotelRoom)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(hotelRoom), 1)
            }
        })
// console.log("this.roomsBooked ln 57: ", this.roomsBooked)
// console.log('bookingRoomDetails: ', this.bookingRoomDetails)
        this.filteredBookings.forEach(filteredRoom => {
            if(filteredRoom.bookingId === roomId) {
                this.filteredBookings.splice(this.filteredBookings.indexOf(filteredRoom), 1)
            }
        })
    };

    findPastBookings() {
        this.bookingRoomDetails.forEach(booking => {
            if(this.customerId === booking.customerID) {
                this.roomsBooked.push(booking)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(booking), 1)
            }
        })
        console.log('this.roomsBooked: ', this.roomsBooked)
        return this.roomsBooked
    };

    getTotalSpent() {
// console.log('this.roomsBooked: ', this.roomsBooked)
        const totalCost = this.roomsBooked.reduce((totalSum, room) => {
// console.log('room: ', room.costPerNight)
            totalSum += room.costPerNight
            return totalSum;
        }, 0)
// console.log('this.totalSpent: ', this.totalSpent)
        return this.totalSpent = totalCost.toFixed(2)
    };

}

export default Customer;