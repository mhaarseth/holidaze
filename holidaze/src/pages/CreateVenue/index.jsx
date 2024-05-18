import React from "react";

import styles from "./CreateVenue.module.css";

import { useForm } from "react-hook-form";
import { useApiAuth } from "../../hooks/useApiAuth";

import { ALL_VENUES_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  venueName: yup.string().required("Venue Name is required"),
  venuePicture: yup.string().required("Venue Picture is required"),
  venuePictureDescription: yup
    .string()
    .required("Venue Picture Description is required"),
  venueDescription: yup.string().required("Venue Description is required"),
  address: yup.string(),
  town: yup.string().required("Town is required"),
  zipCode: yup.number().positive().integer(),
  country: yup.string().required("Country is required"),
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
  const venueUrl = ALL_VENUES_URL;

  const { data } = useApiAuth(venueUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
        alert("Venue created");
        window.location.href = "/profile";
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="venueName">Venue name:</label>
      <input id="venueName" {...register("venueName")} />
      {errors.venueName && <p>{errors.venueName.message}</p>}

      <label htmlFor="venuePicture">Venue Picture:</label>
      <input id="venuePicture" {...register("venuePicture")} />
      {errors.venuePicture && <p>{errors.venuePicture.message}</p>}

      <label htmlFor="venuePictureDescription">Venue picture alt. text:</label>
      <input {...register("venuePictureDescription")}></input>
      {errors.venuePictureDescription && (
        <p>{errors.venuePictureDescription.message}</p>
      )}

      <label htmlFor="venueDescription">Venue Description:</label>
      <textarea {...register("venueDescription")}></textarea>
      {errors.venueDescription && <p>{errors.venueDescription.message}</p>}

      <label htmlFor="address">Address:</label>
      <input id="address" {...register("address")} />
      {errors.address && <p>{errors.address.message}</p>}

      <label htmlFor="town">City:</label>
      <input id="town" {...register("town")} />
      {errors.town && <p>{errors.town.message}</p>}

      <label htmlFor="zipCode">Zip Code:</label>
      <input id="zipCode" {...register("zipCode")} type="number" />
      {errors.zipCode && <p>{errors.zipCode.message}</p>}

      <label htmlFor="country">Country:</label>
      <input id="country" {...register("country")} />
      {errors.country && <p>{errors.country.message}</p>}

      <label htmlFor="maxGuests">Max Guests:</label>
      <input id="maxGuests" {...register("maxGuests")} type="number" />
      {errors.maxGuests && <p>{errors.maxGuests.message}</p>}

      <label htmlFor="price">Price:</label>
      <input id="price" {...register("price")} type="number" />
      {errors.price && <p>{errors.price.message}</p>}

      <label htmlFor="breakfast">Breakfast:</label>

      <input id="breakfast" {...register("breakfast")} type="checkbox" />

      {errors.breakfast && <p>{errors.breakfast.message}</p>}

      <label htmlFor="pets">Pets:</label>
      <input id="pets" {...register("pets")} type="checkbox" />
      {errors.pets && <p>{errors.pets.message}</p>}

      <label htmlFor="parking">Parking:</label>
      <input id="parking" {...register("parking")} type="checkbox" />
      {errors.parking && <p>{errors.parking.message}</p>}

      <label htmlFor="wifi">WiFi:</label>
      <input id="wifi" {...register("wifi")} type="checkbox" />
      {errors.wifi && <p>{errors.wifi.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
