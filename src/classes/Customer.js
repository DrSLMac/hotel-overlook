class Customer {
    constructor(customerDetails, allBookings) {
        this.customerId = customerDetails.id;
        this.name = customerDetails.name;
        this.username = `customer${this.customerId}`;
        this.password = "overlook2021";
        this.totalSpent = 0;
        this.allBookings = allBookings;
        this.bookingRoomDetails = [];
        this.roomsBooked = [];
        this.pastBookings = [];
        this.filteredBookings = [];
        this.futureBookings = [];
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
            if(hotelRoom.bookingId === roomId) {
                this.roomsBooked.push(hotelRoom)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(hotelRoom), 1)
            }
        })
        this.filteredBookings.forEach(filteredRoom => {
            if(filteredRoom.bookingId === roomId) {
                this.roomsBooked.push(filteredRoom)
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
        return this.roomsBooked
    };

    getTotalSpent() {
        const totalCost = this.roomsBooked.reduce((totalSum, room) => {
console.log('room.CostPerNight: ', room.costPerNight)
            totalSum += room.costPerNight
            return totalSum;
        }, 0)
        this.totalSpent = totalCost.toFixed(2)
        return totalCost
    };
    
}

export default Customer;