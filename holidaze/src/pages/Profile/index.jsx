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
        alert("Venue deleted!");
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
          <div className={styles.profileTopContent}>
            <div className={styles.profileImgContainer}>
              {data.avatar && (
                <img src={data.avatar.url} alt={data.avatar.alt} />
              )}
            </div>
            <p className={styles.profileName}>
              {data.name} {data.venueManager && ` (Venue manager)`}
            </p>
            <p className={styles.profileDescription}>{data.bio}</p>
            <p className={styles.profileEmail}>{data.email}</p>
            <div className={styles.profileButtonContainer}>
              {data.venueManager && (
                <Link
                  to="/createvenue"
                  className={`${styles.button} ${styles.createVenueButton}`}
                >
                  New venue
                </Link>
              )}

              <Link
                to={`/editprofile/${data.name}`}
                className={`${styles.button} ${styles.editProfileButton}`}
              >
                Edit profile
              </Link>
            </div>
          </div>
          {data.venueManager && (
            <div>
              <h2 className={styles.profileOwnedVenuesHeading}>Owned venues</h2>
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
                            venue.location.city.length > 8
                              ? `${venue.location.city.slice(0, 9)}..`
                              : ""}
                            {venue.location.city !== null &&
                            venue.location.city &&
                            venue.location.city.length < 9
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
                      <div className={styles.profileButtonContainer}>
                        <Link
                          to={`/editvenue/${venue.id}`}
                          className={styles.button}
                        >
                          Edit venue
                        </Link>
                        <button
                          data-id={venue.id}
                          onClick={handleDelete}
                          className={styles.deleteVenueButton}
                        >
                          Delete venue
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          <h2 className={styles.staysHeading}>Upcoming stays</h2>
          <div className={styles.cardsContainer}>
            {data.bookings &&
              data.bookings.map((booking) => (
                <div className={styles.upcomingStaysCard} key={booking.id}>
                  <Link to={`/venue/${booking.venue.id}`}>
                    {booking.venue.media.length > 0 && (
                      <img
                        src={booking.venue.media[0].url}
                        alt={booking.venue.media[0].alt}
                        className={styles.upcomingStaysImg}
                      />
                    )}
                  </Link>
                  <div className={styles.cardBottomContainer}>
                    <div className={styles.cardTextContainer}>
                      <p>
                        <Link
                          to={`/venue/${booking.venue.id}`}
                          className={styles.venueName}
                        >
                          <h3>
                            {booking.venue.name.length > 20
                              ? `${booking.venue.name.slice(0, 20)}...`
                              : `${booking.venue.name}`}
                          </h3>
                        </Link>
                      </p>
                      <p className={styles.bookingDates}>
                        {booking.dateFrom.split("T")[0].split("-")[2]}.
                        {booking.dateFrom.split("-")[1]}.
                        {booking.dateFrom.split("-")[0]} -{" "}
                        {booking.dateTo.split("T")[0].split("-")[2]}.
                        {booking.dateTo.split("-")[1]}.
                        {booking.dateTo.split("-")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <button onClick={handleLogOut} className={styles.alertButton}>
          Log out
        </button>
      </div>
    </div>
  );
}
