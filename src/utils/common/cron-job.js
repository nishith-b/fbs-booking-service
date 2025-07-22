// src/utils/common/cron-job.js
const { BookingService } = require("../../services");
const cron = require("node-cron");

//Removes Unmodified/Unbooked Bookings From DB which was 30 min Old
function cronSchedule() {
  cron.schedule("*/30 * * * * ", async () => {
    try {
      await BookingService.cancelOldBookings();
    } catch (error) {
      console.error("[NODE-CRON] [ERROR]", error);
    }
  });
}
module.exports = { cronSchedule };
