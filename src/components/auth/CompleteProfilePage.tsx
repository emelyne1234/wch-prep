"use client";

import { useRef, useState } from "react";
import Image from 'next/image';
import { Spinner } from "react-bootstrap";
import { useUpdateProfile } from "@/hooks/users/useProfile";
import { uploadImageToCloudinary } from "@/services/users/profile";
export default function CompleteProfilePage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");

  const {
    Data,
    setData,
    handleSubmit,
    handleInputChanges,
    isPending,
    errors,
    handleAddressChange,
    removeImage
  } = useUpdateProfile();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(file);
      setData((prev) => ({ ...prev, profileImage: imageUrl }));

      try {
        const newProfileImageUrl = await uploadImageToCloudinary(file);
        setData((prev) => ({ ...prev, profileImage: newProfileImageUrl }));
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Complete Your Profile</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
          <div className="text-center mb-4">
            <label htmlFor="profileImage" className="form-label d-block mb-2 fw-semibold">Profile Image</label>
            {profileImage ? (
              <Image
                src={Data.profileImage}
                alt="Profile Preview"
                className="rounded-circle shadow-sm"
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
                onClick={handleImageClick}
              />
            ) : (
              <div className="placeholder-img bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ width: "120px", height: "120px", color: "white" }}>
                <span className="fs-3">+</span>
              </div>
            )}
            <input
              type="file"
              className="form-control mt-3"
              id="profileImage"
              accept="image/*"
              ref={fileInputRef}

              onChange={handleImageChange}
            />
            
          </div>

          <div className="form-group mb-4">
            <label htmlFor="bio" className="form-label fw-semibold">Bio</label>
            <textarea
              className="form-control shadow-sm"
              id="bio"
              placeholder="Tell us about yourself"
              value={Data.bio}
              onChange={handleInputChanges}
              required
              rows={4}
              style={{ resize: "none" }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="expertise" className="form-label fw-semibold">Expertise</label>
            <select
              className="form-select shadow-sm"
              id="expertise"
              value={Data.expertise}
              onChange={handleInputChanges as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>}
              required
            >
              <option value="">Select your expertise</option>
              <option value="wildlifeSpecialist">Wildlife Specialist</option>
              <option value="advisor">Advisor</option>
              <option value="researcher">Researcher</option>
              <option value="scientist">Scientist</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 shadow mt-3" style={{ transition: "all 0.2s" }}>
            {isPending ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
