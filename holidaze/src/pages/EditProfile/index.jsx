import React from "react";

import styles from "./EditProfile.module.css";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useApiAuth } from "../../hooks/useApiAuth";

import { PROFILE_BASE_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  profilePicture: yup.string(),
  profilePictureDescription: yup
    .string()
    .required("Venue Picture Description is required"),
  profileBio: yup.string(),
  venueManager: yup.boolean(),
});

export default function EditProfile() {
  let params = useParams();
  const profileName = params.id;
  const profileUrl =
    PROFILE_BASE_URL + profileName + "?_bookings=true&_venues=true";

  const { data } = useApiAuth(profileUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      profileBio: data.bio,
      venueManager: data.venueManager,
    },
  });

  console.log(data.avatar);

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    const apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(profileUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          bio: data.profileBio,
          avatar: {
            url: data.profilePicture,
            alt: data.profilePictureDescription,
          },
          venueManager: data.venueManager,
        }),
      });
      if (response.ok) {
        alert("Profile successfully updated");
        window.location.href = "/profile";
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h2>Update profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="profilePicture">Profile picture:</label>
        {data.avatar && (
          <input
            id="profilePicture"
            {...register("profilePicture")}
            defaultValue={data.avatar.url}
          />
        )}
        {errors.venuePicture && <p>{errors.venuePicture.message}</p>}

        <label htmlFor="profilePictureDescription">
          Profile picture alt. text:
        </label>
        {data.avatar && (
          <input
            {...register("profilePictureDescription")}
            defaultValue={data.avatar.alt}
          ></input>
        )}
        {errors.profilePictureDescription && (
          <p>{errors.profilePictureDescription.message}</p>
        )}

        <label htmlFor="profileBio">Profile bio:</label>
        <textarea
          {...register("profileBio")}
          defaultValue={data.bio}
        ></textarea>
        {errors.profileBio && <p>{errors.profileBio.message}</p>}

        <label htmlFor="venueManager">Venue manager:</label>

        <input
          id="venueManager"
          {...register("venueManager")}
          type="checkbox"
          defaultChecked={data.venueManager}
        />

        {errors.venueManager && <p>{errors.venueManager.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
