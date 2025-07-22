const axios = require("axios");
const { ServerConfig } = require("../config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { BookingRepository } = require("../repositories");
const db = require("../models");

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data;
    if (data.noofSeats > flightData.data.totalSeats) {
      throw new AppError(
        "Not Enough Seats Available For Booking",
        StatusCodes.BAD_REQUEST
      );
    }

    const totalBillingAmount = data.noofSeats * flightData.data.price;
    const bookingPayload = { ...data, totalCost: totalBillingAmount };
    const booking = await bookingRepository.create(bookingPayload, transaction);

    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noofSeats,
      }
    );
    await transaction.commit();
    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { createBooking };
