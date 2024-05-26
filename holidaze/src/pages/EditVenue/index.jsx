import React from "react";

import styles from "./EditVenue.module.css";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  venueName: yup.string().required("A venue name is required"),
  venuePicture: yup.string().matches(
    // eslint-disable-next-line
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)(\?(.*))?/,
    "A valid picture url is required"
  ),
  venuePictureDescription: yup
    .string()
    .required("Please provide a description of the venue picture."),
  venueDescription: yup.string().required("A venue description is required"),
  address: yup.string(),
  town: yup.string(),
  zipCode: yup.string(),
  country: yup.string(),
  maxGuests: yup
    .number()
    .required("Number of max guests is required")
    .positive("Number of guests need to be higher than 0")
    .integer(),
  price: yup
    .number()
    .required("Please provide a price")
    .positive("The price needs to be higher than 0")
    .integer(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
  parking: yup.boolean(),
  wifi: yup.boolean(),
});

export default function EditVenue() {
  let params = useParams();
  const venueId = params.id;
  const venueUrl = ALL_VENUES_URL + venueId;

  const { data } = useApiAuth(venueUrl);
  console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      venueName: data.name,
      venueDescription: data.description,
    },
  });

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(venueUrl, {
        method: "PUT",
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
            zip: data.zipCode,
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
    <div lassName={styles.editVenueContainer}>
      <h2 className={styles.editVenueHeading}>Edit venue</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="venueName" className={styles.heading}>
            Venue name:
          </label>
          <input
            id="venueName"
            {...register("venueName")}
            defaultValue={data.name}
          />
          {errors.venueName && (
            <p className={styles.errorMessage}>{errors.venueName.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venuePicture" className={styles.heading}>
            Venue Picture:
          </label>
          {data.media && (
            <input
              id="venuePicture"
              {...register("venuePicture")}
              defaultValue={data.media[0].url}
            />
          )}
          {errors.venuePicture && (
            <p className={styles.errorMessage}>{errors.venuePicture.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venuePictureDescription" className={styles.heading}>
            Venue picture description:
          </label>
          {data.media && (
            <input
              {...register("venuePictureDescription")}
              defaultValue={data.media[0].alt}
            ></input>
          )}
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
          <textarea
            {...register("venueDescription")}
            defaultValue={data.description}
          ></textarea>
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
          {data.location && (
            <input
              id="address"
              {...register("address")}
              defaultValue={data.location.address}
            />
          )}
          {errors.address && (
            <p className={styles.errorMessage}>{errors.address.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="town" className={styles.heading}>
            City:
          </label>
          {data.location && (
            <input
              id="town"
              {...register("town")}
              defaultValue={data.location.city}
            />
          )}
          {errors.town && (
            <p className={styles.errorMessage}>{errors.town.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="zipCode" className={styles.heading}>
            Zip Code:
          </label>
          {data.location && (
            <input
              id="zipCode"
              {...register("zipCode")}
              defaultValue={data.location.zip}
            />
          )}
          {errors.zipCode && (
            <p className={styles.errorMessage}>{errors.zipCode.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="country" className={styles.heading}>
            Country:
          </label>
          {data.location && (
            <input
              id="country"
              {...register("country")}
              defaultValue={data.location.country}
            />
          )}
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="maxGuests" className={styles.heading}>
            Max Guests:
          </label>
          <input
            id="maxGuests"
            {...register("maxGuests")}
            type="number"
            defaultValue={data.maxGuests}
          />
          {errors.maxGuests && (
            <p className={styles.errorMessage}>{errors.maxGuests.message}</p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="price" className={styles.heading}>
            Price:
          </label>
          <input
            id="price"
            {...register("price")}
            type="number"
            defaultValue={data.price}
          />
          {errors.price && (
            <p className={styles.errorMessage}>{errors.price.message}</p>
          )}
        </div>

        <div className={styles.checkboxContainersContainer}>
          <div className={styles.checkboxContainer}>
            <label htmlFor="breakfast">Breakfast:</label>
            {data.meta && (
              <input
                id="breakfast"
                {...register("breakfast")}
                type="checkbox"
                defaultChecked={data.meta.breakfast}
              />
            )}
            {errors.breakfast && (
              <p className={styles.errorMessage}>{errors.breakfast.message}</p>
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <label htmlFor="pets">Pets:</label>
            {data.meta && (
              <input
                id="pets"
                {...register("pets")}
                type="checkbox"
                defaultChecked={data.meta.pets}
              />
            )}
            {errors.pets && (
              <p className={styles.errorMessage}>{errors.pets.message}</p>
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <label htmlFor="parking">Parking:</label>
            {data.meta && (
              <input
                id="parking"
                {...register("parking")}
                type="checkbox"
                defaultChecked={data.meta.parking}
              />
            )}
            {errors.parking && (
              <p className={styles.errorMessage}>{errors.parking.message}</p>
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <label htmlFor="wifi">WiFi:</label>
            {data.meta && (
              <input
                id="wifi"
                {...register("wifi")}
                type="checkbox"
                defaultChecked={data.meta.wifi}
              />
            )}
            {errors.wifi && (
              <p className={styles.errorMessage}>{errors.wifi.message}</p>
            )}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.editVenueButton}>
            Save changes
          </button>
        </div>
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
