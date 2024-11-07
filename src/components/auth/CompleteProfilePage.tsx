"use client";

import { useState } from "react";
import Image from 'next/image';

export default function CompleteProfilePage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setProfileImage(file);
  };

  const handleProfileCompletion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg rounded-4 p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Complete Your Profile</h2>
        
        <form onSubmit={handleProfileCompletion}>
          <div className="text-center mb-4">
            <label htmlFor="profileImage" className="form-label d-block mb-2 fw-semibold">Profile Image</label>
            {profileImage ? (
              <Image
                src={URL.createObjectURL(profileImage)}
                alt="Profile Preview"
                className="rounded-circle shadow-sm"
                width={120}
                height={120}
                style={{ objectFit: "cover" }}
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
              onChange={handleImageUpload}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="bio" className="form-label fw-semibold">Bio</label>
            <textarea
              className="form-control shadow-sm"
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
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
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
