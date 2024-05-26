import React from "react";

import styles from "./EditProfile.module.css";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useApiAuth } from "../../hooks/useApiAuth";

import { PROFILE_BASE_URL } from "../../constants/constants";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  profilePicture: yup.string().matches(
    // eslint-disable-next-line
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)(\?(.*))?/,
    "A valid picture url is required"
  ),
  profilePictureDescription: yup
    .string()
    .required("Please provide a description of the picture"),
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
        window.location.href = "/profile";
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <h2 className={styles.editProfileHeading}>Update profile</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.editProfileForm}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="profilePicture" className={styles.heading}>
            Profile picture
          </label>
          {data.avatar && (
            <input
              id="profilePicture"
              {...register("profilePicture")}
              defaultValue={data.avatar.url}
              className={styles.profilePictureInput}
            />
          )}
          {errors.profilePicture && (
            <p className={styles.errorMessage}>
              {errors.profilePicture.message}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="profilePictureDescription" className={styles.heading}>
            Profile picture alt. text
          </label>
          {data.avatar && (
            <input
              {...register("profilePictureDescription")}
              defaultValue={data.avatar.alt}
            ></input>
          )}
          {errors.profilePictureDescription && (
            <p className={styles.errorMessage}>
              {errors.profilePictureDescription.message}
            </p>
          )}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="profileBio" className={styles.heading}>
            Profile bio
          </label>
          <textarea
            {...register("profileBio")}
            defaultValue={data.bio}
          ></textarea>
          {errors.profileBio && (
            <p className={styles.errorMessage}>{errors.profileBio.message}</p>
          )}
        </div>
        <div className={styles.venueManagerContainer}>
          <label htmlFor="venueManager">Venue manager</label>
          <input
            id="venueManager"
            {...register("venueManager")}
            type="checkbox"
            defaultChecked={data.venueManager}
          />
          {errors.venueManager && <p>{errors.venueManager.message}</p>}
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.editProfileButton}>
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
