import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";
import { BOOK_VENUE_URL } from "../../constants/constants";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Booking.module.css";

export default function Booking() {
  let params = useParams();
  const venueId = params.id;
  const venueBookingsUrl = ALL_VENUES_URL + venueId + "?_bookings=true";
  const { data } = useApiAuth(venueBookingsUrl);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (data && data.bookings) {
      setBookings(data.bookings);
    }
  }, [data]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const excludeDates = bookings.flatMap(({ dateFrom, dateTo }) => {
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    let datesWithinRange = [];

    while (fromDate <= toDate) {
      datesWithinRange.push(new Date(fromDate));
      fromDate.setDate(fromDate.getDate() + 1);
    }

    return datesWithinRange;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(BOOK_VENUE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          dateFrom: startDate,
          dateTo: endDate,
          guests: parseInt(numberOfGuests),
          venueId: params.id,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        throw new Error(json.errors[0].message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.calendarContainer}>
      <h2>Availability & booking</h2>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        excludeDates={excludeDates}
        selectsRange
        selectsDisabledDaysInRange
        inline
      />
      <div className={styles.guestAndSubmitButtonContainer}>
        <div className={styles.numberOfGuestsContainer}>
          <label>Number of guests:</label>
          <input
            name="numberOfGuests"
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.bookingButton}
        >
          Book it!
        </button>
      </div>
    </div>
  );
}
