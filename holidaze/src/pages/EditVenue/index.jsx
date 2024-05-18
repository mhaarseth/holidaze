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
  let params = useParams();
  const venueId = params.id;
  const venueUrl = ALL_VENUES_URL + venueId;

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
            zip: data.zip,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="venueName">Venue name:</label>
      <input
        id="venueName"
        {...register("venueName")}
        defaultValue={data.name}
      />
      {errors.venueName && <p>{errors.venueName.message}</p>}

      <label htmlFor="venuePicture">Venue Picture:</label>
      {data.media && (
        <input
          id="venuePicture"
          {...register("venuePicture")}
          defaultValue={data.media[0].url}
        />
      )}
      {errors.venuePicture && <p>{errors.venuePicture.message}</p>}

      <label htmlFor="venuePictureDescription">Venue picture alt. text:</label>
      {data.media && (
        <input
          {...register("venuePictureDescription")}
          defaultValue={data.media[0].alt}
        ></input>
      )}
      {errors.venuePictureDescription && (
        <p>{errors.venuePictureDescription.message}</p>
      )}

      <label htmlFor="venueDescription">Venue Description:</label>
      <textarea
        {...register("venueDescription")}
        defaultValue={data.description}
      ></textarea>
      {errors.venueDescription && <p>{errors.venueDescription.message}</p>}

      <label htmlFor="address">Address:</label>
      {data.location && (
        <input
          id="address"
          {...register("address")}
          defaultValue={data.location.address}
        />
      )}
      {errors.address && <p>{errors.address.message}</p>}

      <label htmlFor="town">City:</label>
      {data.location && (
        <input
          id="town"
          {...register("town")}
          defaultValue={data.location.city}
        />
      )}
      {errors.town && <p>{errors.town.message}</p>}

      <label htmlFor="zipCode">Zip Code:</label>
      {data.location && (
        <input
          id="zipCode"
          {...register("zipCode")}
          type="number"
          defaultValue={data.location.zip}
        />
      )}
      {errors.zipCode && <p>{errors.zipCode.message}</p>}

      <label htmlFor="country">Country:</label>
      {data.location && (
        <input
          id="country"
          {...register("country")}
          defaultValue={data.location.country}
        />
      )}
      {errors.country && <p>{errors.country.message}</p>}

      <label htmlFor="maxGuests">Max Guests:</label>
      <input
        id="maxGuests"
        {...register("maxGuests")}
        type="number"
        defaultValue={data.maxGuests}
      />
      {errors.maxGuests && <p>{errors.maxGuests.message}</p>}

      <label htmlFor="price">Price:</label>
      <input
        id="price"
        {...register("price")}
        type="number"
        defaultValue={data.price}
      />
      {errors.price && <p>{errors.price.message}</p>}

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

      <button type="submit">Submit</button>
    </form>
  );
}
