import React, { useState, useEffect, useRef } from "react";
import { API_SEARCH_URL } from "../../constants/constants";
import styles from "./SearchField.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function SearchField() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const queryUrl = API_SEARCH_URL + `${query}`;
  const token = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const navigate = useNavigate();
  const searchRef = useRef(null);

  const search = async () => {
    const response = await fetch(queryUrl, {
      method: "GET",
      header: {
        Authorization: `Bearer ${token}`,
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setSearchResults(data.data);
  };

  useEffect(() => {
    if (query) {
      search();
    }
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    return () => {
      setQuery("");
      setSearchResults([]);
    };
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <input
        type="text"
        placeholder="Venue name or description.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInputField}
        aria-label="Search"
      />
      <div className={styles.searchResultsContainer}>
        {searchResults.map((venue) => (
          <div key={venue.id} className={styles.searchResult}>
            <Link to={`/venue/${venue.id}`}>
              {venue.name}
              {venue.location.city && <span>, {venue.location.city}</span>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
