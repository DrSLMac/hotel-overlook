class Customer {
    constructor(customerDetails, allBookings) {
        this.customerId = customerDetails.id;
        this.name = customerDetails.name;
        this.username = `customer${this.customerId}`;
        this.password = "overlook2021";
        this.totalSpent = 0;
        this.allBookings = allBookings
        this.bookingRoomDetails = [];
        this.roomsBooked = [];
        this.pastBookings = [];
        this.filteredBookings = [];
        this.futureBookings = [];
        this.errorMessage = "";
    }

    // getAllBookings() {
    //     this.allBookings = this.futureBookings.reduce((fullArray, booking) => {
    //         // console.log('booking: ', booking)
    //         fullArray.push(booking);
    //         this.pastBookings.map(booking => fullArray.push(booking))
    //         // console.log('fullArray: ', fullArray)
    //         return fullArray
    //     }, [])
    //     // console.log('this.allBookings: ', this.allBookings)
    //     return this.allBookings
    // }
    
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
                this.futureBookings.push(hotelRoom)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(hotelRoom), 1)
            }
        })
        this.filteredBookings.forEach(filteredRoom => {
            if(filteredRoom.bookingId === roomId) {
                this.futureBookings.push(filteredRoom)
                this.filteredBookings.splice(this.filteredBookings.indexOf(filteredRoom), 1)
            }
        })
    };

    findAllBookings() {
        this.bookingRoomDetails.forEach(booking => {
            if(this.customerId === booking.customerID && new Date(booking.dateOfStay) >= new Date()) {
                this.futureBookings.push(booking);
                this.futureBookings = this.futureBookings.sort((a, b) => new Date(a.dateOfStay) - new Date(b.dateOfStay))
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(booking), 1)
            } else if(this.customerId === booking.customerID && new Date(booking.dateOfStay) < new Date()) {
                this.pastBookings.push(booking)
                this.pastBookings = this.pastBookings.sort((a, b) => new Date(a.dateOfStay) - new Date(b.dateOfStay))
            }
        })
        // console.log('this.futureBookings: ', this.futureBookings)
        // console.log('this.pastBookings: ', this.pastBookings)
    };

    getPastTotalSpent() {
        const totalPastMoneySpent = this.pastBookings.reduce((totalPastSum, booking) => {
            totalPastSum += booking.costPerNight
            return totalPastSum
        }, 0)
        console.log('totalPastMoneySpent: ', totalPastMoneySpent)
        this.totalSpent = totalPastMoneySpent.toFixed(2)
    return totalPastMoneySpent
    };

    getFutureTotalSpent() {
        const totalFutureMoneySpent = this.futureBookings.reduce((totalFutureSum, booking) => {
            totalFutureSum += booking.costPerNight
            return totalFutureSum
        }, 0)
        console.log('totalFutureMoneySpent: ', totalFutureMoneySpent)
        this.totalSpent = totalFutureMoneySpent.toFixed(2)
    return totalFutureMoneySpent
    }

};

export default Customer;