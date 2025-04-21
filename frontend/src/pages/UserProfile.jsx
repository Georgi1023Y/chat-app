import { useState, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";

const UserProfile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useUserStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    twitter: "",
    linkedin: "",
    bio: "",
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [isRemovingImage, setIsRemovingImage] = useState(false);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        twitter: authUser.twitter || "",
        linkedin: authUser.linkedin || "",
        bio: authUser.bio || "",
      });
      setSelectedImg(authUser.profilePic || null);
    }
  }, [authUser]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      await updateProfile({ ...formData });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Update failed. Try again.");
    }
  };

  const removeImage = async () => {
    try {
      setIsRemovingImage(true);
      setSelectedImg(null);
      await updateProfile({ profilePic: null });
      toast.success("Profile picture removed.");
    } catch (err) {
      toast.error("Failed to remove image.");
    } finally {
      setIsRemovingImage(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setSelectedImg(base64);
    await updateProfile({ profilePic: base64 });
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  return (
    <div className="h-screen pt-20">
      <Toaster />
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update Your Account</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-base-content
                  p-2 rounded-full cursor-pointer transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                {selectedImg ? (
                  <Icon
                    icon="line-md:remove"
                    className="w-5 h-5 text-base-200"
                    onClick={removeImage}
                  />
                ) : (
                  <Icon
                    icon="majesticons:camera-line"
                    className="w-5 h-5 text-base-200"
                  />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : isRemovingImage
                ? "Removing..."
                : selectedImg
                ? "Remove profile picture"
                : "Add profile picture"}
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <ProfileInput
              label="Full Name"
              icon="solar:user-linear"
              type="text"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              placeholder="Enter your full name"
            />

            <ProfileInput
              label="Email Address"
              icon="material-symbols-light:mail-outline-rounded"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="Enter your email"
            />

            <div className="space-y-1.5">
              <label className="text-sm text-zinc-400">Bio</label>
              <textarea
                rows={3}
                className="px-4 py-2.5 bg-base-200 rounded-lg border w-full resize-none"
                placeholder="Tell us a bit about yourself"
                value={formData.bio}
                maxLength={300}
                onChange={handleChange("bio")}
              />
            </div>

            <ProfileInput
              label="Twitter"
              icon="si:twitter-line"
              type="url"
              value={formData.twitter}
              onChange={handleChange("twitter")}
              placeholder="https://twitter.com/yourhandle"
            />

            <ProfileInput
              label="LinkedIn"
              icon="bi:linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange("linkedin")}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Status</span>
            <span className="text-green-500 text-sm">Verified</span>
          </div>

          <button
            onClick={handleSave}
            className="btn btn-outline btn-primary"
            disabled={isUpdatingProfile || isRemovingImage}
          >
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const ProfileInput = ({ label, icon, ...props }) => (
  <div className="space-y-1.5">
    <div className="text-sm text-zinc-400 flex items-center gap-2">
      <Icon icon={icon} className="w-4 h-4" />
      {label}
    </div>
    <input
      {...props}
      className="px-4 py-2.5 bg-base-200 rounded-lg border w-full"
    />
  </div>
);

export default UserProfile;
