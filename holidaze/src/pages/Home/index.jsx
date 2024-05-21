import React from "react";
import { useApi } from "../../hooks/useApi";
import { ALL_VENUES_URL } from "../../constants/constants";
import { Link } from "react-router-dom";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./Home.module.css";

export default function Home() {
  const { data, isLoading, isError } = useApi(ALL_VENUES_URL);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContentContainer}>
        <div className={styles.headingContainer}>
          <h2 className={styles.homeHeading}>All venues</h2>
        </div>
        <div className={styles.container}>
          {data.map((venue) => (
            <div className={styles.card} key={venue.id}>
              <div className={styles.imgContainer}>
                {venue.media.length > 0 && (
                  <img src={venue.media[0].url} alt={venue.media[0].alt} />
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
                <Link to={`/venue/${venue.id}`} className={styles.button}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
