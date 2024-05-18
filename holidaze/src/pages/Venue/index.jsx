import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { ALL_VENUES_URL } from "../../constants/constants";
import { Link } from "react-router-dom";

import Booking from "../../components/Booking/Booking";

import styles from "./Venue.module.css";

export default function Venue() {
  let params = useParams();
  const venueId = params.id;
  const venueUrl = ALL_VENUES_URL + venueId + "?_bookings=true&_owner=true";
  const fetchVenue = useApi(venueUrl);
  const venue = fetchVenue.data;

  return (
    <div className={styles.venueContainer}>
      <div className={styles.venueContentContainer}>
        <h2 className={styles.venueHeading}>{venue.name}</h2>
        <div className={styles.venueContent}>
          <div className={styles.venueImgContainer}>
            {venue.media && (
              <img src={venue.media[0].url} alt={venue.media[0].alt} />
            )}
          </div>
          <p className={styles.venueDescription}>{venue.description}</p>
          <div className={styles.venueBookingContainer}>
            <Booking />
          </div>
          <div className={styles.venueInfoContainer}>
            <div className={styles.venueInfoLeftContainer}>
              <div className={styles.venueAddressContainer}>
                {venue.location && (
                  <div>
                    <p>{venue.location.city}</p>
                    <p>{venue.location.country}</p>
                  </div>
                )}
              </div>
              <p>Max guests: {venue.maxGuests}</p>
              <p>Price: {venue.price}kr</p>
              {venue.meta && (
                <div className={styles.venueAmenitiesContainer}>
                  {venue.meta.wifi === false ? (
                    <div>Wifi: No</div>
                  ) : (
                    <div>Wifi: Yes</div>
                  )}
                  {venue.meta.parking === false ? (
                    <div>Parking: No</div>
                  ) : (
                    <div>Parking: Yes</div>
                  )}
                  {venue.meta.breakfast === false ? (
                    <div>Breakfast: No</div>
                  ) : (
                    <div>Breakfast: Yes</div>
                  )}
                  {venue.meta.pets === false ? (
                    <div>Pets: No</div>
                  ) : (
                    <div>Pets: Yes</div>
                  )}
                </div>
              )}
            </div>
            <div>
              {venue.owner && (
                <p>
                  Managed by&nbsp;
                  <Link to={`/profile/${venue.owner.name}`}>
                    {venue.owner.name}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
