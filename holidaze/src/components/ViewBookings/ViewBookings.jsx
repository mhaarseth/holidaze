import React, { useState } from "react";
import styles from "./ViewBookings.module.css";

import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";

export default function ViewBookings({ id }) {
  const venueId = JSON.stringify(id);
  const parsedVenueId = JSON.parse(venueId);
  const venueUrl = ALL_VENUES_URL + parsedVenueId + "?_bookings=true";

  const { data } = useApiAuth(venueUrl);

  return (
    <div>
      {data.bookings &&
        data.bookings.map((booking) => (
          <div key={booking.id} className={styles.customerName}>
            <div className={styles.bookedByContainer}>
              Booked by
              <span className={styles.bookedBy}> {booking.customer.name}</span>
            </div>
            <p>
              {booking.dateFrom.split("T")[0].split("-")[2]}.
              {booking.dateFrom.split("-")[1]}.{booking.dateFrom.split("-")[0]}{" "}
              - {booking.dateTo.split("T")[0].split("-")[2]}.
              {booking.dateTo.split("-")[1]}.{booking.dateTo.split("-")[0]}
            </p>
          </div>
        ))}
    </div>
  );
}
