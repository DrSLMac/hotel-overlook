class Customer {
    constructor(customerDetails) {
        this.customerId = customerDetails.id;
        this.name = customerDetails.name;
        this.username = `customer${this.customerId}`;
        this.password = "overlook2021";
        this.totalSpent = 0;
        this.bookingRoomDetails = [];
        this.roomsBooked = [];
        this.pastBookings = [];
        this.filteredBookings = [];
        this.errorMessage = "";
    }
    
    getHotelRoomDetails(bookingsRepo, roomsData) {
        const fullBookingDetails = bookingsRepo.reduce((roomsArray, booking) => {
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
            return roomsArray
        }, [])
        this.bookingRoomDetails = fullBookingDetails;
        // console.log('this.bookingRoomDetails ln 36: ', this.bookingRoomDetails.length)
        return fullBookingDetails//shows 31 full booking details
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
        // console.log('this.roomsBooked ln 70: ', this.roomsBooked)
    };

    findPastBookings() {
        this.bookingRoomDetails.forEach(booking => {
            // console.log('booking ln 75: ', booking)
            if(this.customerId === booking.customerID) {
                this.pastBookings.push(booking)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(booking), 1)
            }
        })
        // console.log('this.pastBookings ln: ', this.pastBookings)
        return this.pastBookings
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