import React from "react";

import styles from "./CreateVenue.module.css";

import { useForm } from "react-hook-form";
import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  venueName: yup.string().required("Venue name is required"),
  venuePicture: yup
    .string()
    .matches(
      // eslint-disable-next-line
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)(\?(.*))?/,
      "Valid url is required"
    )
    .required("Venue picture is required"),
  venuePictureDescription: yup.string().required("Alt text is required"),
  venueDescription: yup.string().required("Venue description is required"),
  address: yup.string(),
  town: yup.string().required("Town is required"),
  zipCode: yup.string(),
  country: yup.string().required("Country is required"),
  maxGuests: yup
    .number()
    .required("Max guests is required")
    .positive()
    .integer(),
  price: yup.number().required("Price is required").positive().integer(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
  parking: yup.boolean(),
  wifi: yup.boolean(),
});

export default function EditVenue() {
  const venueUrl = ALL_VENUES_URL;

  const { data } = useApiAuth(venueUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      maxGuests: 1,
      price: 1,
    },
  });

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(venueUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          name: data.venueName,
          description: data.venueDescription,
          media: [
            {
              url: data.venuePicture,
              alt: data.venuePictureDescription,
            },
          ],
          price: data.price,
          maxGuests: data.maxGuests,
          meta: {
            wifi: data.wifi,
            parking: data.parking,
            breakfast: data.breakfast,
            pets: data.pets,
          },
          location: {
            address: data.address,
            city: data.town,
            zip: data.zip,
            country: data.country,
          },
        }),
      });
      if (response.ok) {
        window.location.href = "/profile";
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.createVenueContainer}>
      <h2 className={styles.createVenueHeading}>Create venue</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.createVenueForm}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="venueName" className={styles.heading}>
            Venue name:
          </label>
          <input id="venueName" {...register("venueName")} />
          {errors.venueName && (
            <p className={styles.errorMessage}>{errors.venueName.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venuePicture" className={styles.heading}>
            Venue Picture:
          </label>
          <input id="venuePicture" {...register("venuePicture")} />
          {errors.venuePicture && (
            <p className={styles.errorMessage}>{errors.venuePicture.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venuePictureDescription" className={styles.heading}>
            Venue picture alt. text:
          </label>
          <input {...register("venuePictureDescription")}></input>
          {errors.venuePictureDescription && (
            <p className={styles.errorMessage}>
              {errors.venuePictureDescription.message}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venueDescription" className={styles.heading}>
            Venue Description:
          </label>
          <textarea {...register("venueDescription")}></textarea>
          {errors.venueDescription && (
            <p className={styles.errorMessageVenueDescription}>
              {errors.venueDescription.message}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="address" className={styles.heading}>
            Address:
          </label>
          <input id="address" {...register("address")} />
          {errors.address && (
            <p className={styles.errorMessage}>{errors.address.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="town" className={styles.heading}>
            City:
          </label>
          <input id="town" {...register("town")} />
          {errors.town && (
            <p className={styles.errorMessage}>{errors.town.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="zipCode" className={styles.heading}>
            Zip Code:
          </label>
          <input id="zipCode" {...register("zipCode")} />
          {errors.zipCode && (
            <p className={styles.errorMessage}>{errors.zipCode.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="country" className={styles.heading}>
            Country:
          </label>
          <input id="country" {...register("country")} />
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="maxGuests" className={styles.heading}>
            Max Guests:
          </label>
          <input id="maxGuests" {...register("maxGuests")} type="number" />
          {errors.maxGuests && (
            <p className={styles.errorMessage}>{errors.maxGuests.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="price" className={styles.heading}>
            Price:
          </label>
          <input id="price" {...register("price")} type="number" />
          {errors.price && (
            <p className={styles.errorMessage}>{errors.price.message}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="breakfast" className={styles.heading}>
            Breakfast:
          </label>
          <input id="breakfast" {...register("breakfast")} type="checkbox" />
          {errors.breakfast && (
            <p className={styles.errorMessage}>{errors.breakfast.message}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="pets" className={styles.heading}>
            Pets:
          </label>
          <input id="pets" {...register("pets")} type="checkbox" />
          {errors.pets && (
            <p className={styles.errorMessage}>{errors.pets.message}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="parking" className={styles.heading}>
            Parking:
          </label>
          <input id="parking" {...register("parking")} type="checkbox" />
          {errors.parking && (
            <p className={styles.errorMessage}>{errors.parking.message}</p>
          )}
        </div>

        <div className={styles.checkboxContainer}>
          <label htmlFor="wifi" className={styles.heading}>
            WiFi:
          </label>
          <input id="wifi" {...register("wifi")} type="checkbox" />
          {errors.wifi && (
            <p className={styles.errorMessage}>{errors.wifi.message}</p>
          )}
        </div>

        <button type="submit" className={styles.createVenueButton}>
          Submit
        </button>
      </form>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => window.history.back()}
          className={styles.cancelEditProfileButton}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
