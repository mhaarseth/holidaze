import React from "react";
import { Link } from "react-router-dom";

import { PROFILE_BASE_URL } from "../../constants/constants";
import { ALL_VENUES_URL } from "../../constants/constants";

import { useApiAuth } from "../../hooks/useApiAuth";
import ViewBookings from "../../components/ViewBookings/ViewBookings";

import styles from "./Profile.module.css";

export default function Profile() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }

  const profileName = localStorage.getItem("profileName");
  const profileUrl =
    PROFILE_BASE_URL + profileName + "?_bookings=true&_venues=true";

  const { data, isLoading, isError } = useApiAuth(profileUrl);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleLogOut = () => {
    alert("You have been logged out");
    localStorage.clear();
    window.location.href = "/";
  };

  async function handleDelete(event) {
    const venueId = event.target.getAttribute("data-id");
    const venueUrl = ALL_VENUES_URL + venueId;

    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(venueUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });
      if (response.ok) {
        alert("Venue deleted");
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContentContainer}>
        <h2 className={styles.profileHeading}>Profile</h2>
        <div className={styles.profileContent}>
          <div className={styles.profileImgContainer}>
            {data.avatar && <img src={data.avatar.url} alt={data.avatar.alt} />}
          </div>
          <p>
            {data.name} {data.venueManager && ` (Venue manager)`}
          </p>
          <p className={styles.profileDescription}>{data.bio}</p>
          <p>{data.email}</p>
          <Link to="/createvenue" className={styles.button}>
            Create new venue
          </Link>
          {data.venueManager && (
            <div>
              <h2>Owned venues</h2>
              <div className={styles.cardsContainer}>
                {data.venues &&
                  data.venues.map((venue) => (
                    <div className={styles.card} key={venue.id}>
                      <div className={styles.imgContainer}>
                        {venue.media.length > 0 && (
                          <img
                            src={venue.media[0].url}
                            alt={venue.media[0].alt}
                          />
                        )}
                      </div>
                      <div className={styles.cardBottomContainer}>
                        <div className={styles.cardTextContainer}>
                          <h3 className={styles.venueName}>
                            {venue.name.length > 20
                              ? `${venue.name.slice(0, 20)}...`
                              : `${venue.name}`}
                          </h3>
                          <p>
                            {venue.location.city !== null &&
                            venue.location.city &&
                            venue.location.city.length > 12
                              ? `${venue.location.city.slice(0, 13)}..`
                              : ""}
                            {venue.location.city !== null &&
                            venue.location.city &&
                            venue.location.city.length < 13
                              ? `${venue.location.city}`
                              : ""}
                            {venue.location.country !== null &&
                            venue.location.city &&
                            venue.location.city.length > 12
                              ? `${venue.location.city.slice(0, 13)}..`
                              : ""}
                            {venue.location.country !== null &&
                            venue.location.city &&
                            venue.location.city.length < 13
                              ? `, ${venue.location.country}`
                              : ""}
                          </p>
                        </div>
                        <Link
                          to={`/venue/${venue.id}`}
                          className={styles.button}
                        >
                          View
                        </Link>
                      </div>
                      <div>
                        <ViewBookings id={venue.id} />
                      </div>
                      <Link
                        to={`/editvenue/${venue.id}`}
                        className={styles.button}
                      >
                        Edit venue
                      </Link>
                      <button data-id={venue.id} onClick={handleDelete}>
                        Delete venue
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <h3>Upcoming stays:</h3>
          <div className={styles.cardsContainer}>
            {data.bookings &&
              data.bookings.map((booking) => (
                <div className={styles.card} key={booking.id}>
                  <h3>Time of stay</h3>
                  <p>
                    {booking.dateFrom.split("T")[0].split("-")[2]}.
                    {booking.dateFrom.split("-")[1]}.
                    {booking.dateFrom.split("-")[0]} -{" "}
                    {booking.dateTo.split("T")[0].split("-")[2]}.
                    {booking.dateTo.split("-")[1]}.
                    {booking.dateTo.split("-")[0]}
                  </p>
                  <div className={styles.imgContainer}>
                    {booking.venue.media.length > 0 && (
                      <img
                        src={booking.venue.media[0].url}
                        alt={booking.venue.media[0].alt}
                      />
                    )}
                  </div>
                  <div className={styles.cardBottomContainer}>
                    <div className={styles.cardTextContainer}>
                      <h3 className={styles.venueName}>
                        {booking.venue.name.length > 20
                          ? `${booking.venue.name.slice(0, 20)}...`
                          : `${booking.venue.name}`}
                      </h3>
                      <p>
                        {booking.venue.location.city !== null &&
                        booking.venue.location.city &&
                        booking.venue.location.city.length > 12
                          ? `${booking.venue.location.city.slice(0, 13)}..`
                          : ""}
                        {booking.venue.location.city !== null &&
                        booking.venue.location.city &&
                        booking.venue.location.city.length < 13
                          ? `${booking.venue.location.city}`
                          : ""}
                        {booking.venue.location.country !== null &&
                        booking.venue.location.city &&
                        booking.venue.location.city.length > 12
                          ? `${booking.venue.location.city.slice(0, 13)}..`
                          : ""}
                        {booking.venue.location.country !== null &&
                        booking.venue.location.city &&
                        booking.venue.location.city.length < 13
                          ? `, ${booking.venue.location.country}`
                          : ""}
                      </p>
                    </div>
                    <Link
                      to={`/venue/${booking.venue.id}`}
                      className={styles.button}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Link to={`/editprofile/${data.name}`} className={styles.button}>
          Edit profile
        </Link>
        <button onClick={handleLogOut}>Log out</button>
      </div>
    </div>
  );
}
