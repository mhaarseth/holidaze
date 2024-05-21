import React from "react";

import styles from "./EditVenue.module.css";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  venueName: yup.string().required("Venue Name is required"),
  venuePicture: yup.string().matches(
    // eslint-disable-next-line
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)(\?(.*))?/,
    "Valid url is required"
  ),
  venuePictureDescription: yup.string(),
  venueDescription: yup.string().required("Venue Description is required"),
  address: yup.string(),
  town: yup.string(),
  zipCode: yup.string(),
  country: yup.string(),
  maxGuests: yup
    .number()
    .required("Max Guests is required")
    .positive()
    .integer(),
  price: yup.number().required("Price is required").positive().integer(),
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
        alert("Venue edited");
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
          {errors.venueName && <p>{errors.venueName.message}</p>}
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
          {errors.venuePicture && <p>{errors.venuePicture.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="venuePictureDescription" className={styles.heading}>
            Venue picture alt. text:
          </label>
          {data.media && (
            <input
              {...register("venuePictureDescription")}
              defaultValue={data.media[0].alt}
            ></input>
          )}
          {errors.venuePictureDescription && (
            <p>{errors.venuePictureDescription.message}</p>
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
          {errors.address && <p>{errors.address.message}</p>}
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
          {errors.town && <p>{errors.town.message}</p>}
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
          {errors.zipCode && <p>{errors.zipCode.message}</p>}
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
          {errors.country && <p>{errors.country.message}</p>}
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
          {errors.maxGuests && <p>{errors.maxGuests.message}</p>}
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
          {errors.price && <p>{errors.price.message}</p>}
        </div>

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
          {errors.breakfast && <p>{errors.breakfast.message}</p>}
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
          {errors.pets && <p>{errors.pets.message}</p>}
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
          {errors.parking && <p>{errors.parking.message}</p>}
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
          {errors.wifi && <p>{errors.wifi.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
