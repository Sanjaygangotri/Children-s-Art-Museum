import React, { useEffect, useState, useRef } from "react";
import { FaTrash, FaPlus, FaCamera } from "react-icons/fa"; // 🆕
import { BiPencil } from "react-icons/bi";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artPosts, setArtPosts] = useState([]);
  const fileInputRef = useRef(null);
  const dpInputRef = useRef(null); // 🆕 for profile picture upload
  const [selectedFile, setSelectedFile] = useState(null);

  // Form inputs
  const [title, setTitle] = useState("");
  const [artBy, setArtBy] = useState("");
  const [age, setAge] = useState("");
  const [school, setSchool] = useState("");
  const [description, setDescription] = useState("");

  // Fetch profile + artworks
  useEffect(() => {
    const fetchProfileAndArt = async () => {
      try {
        const profileRes = await fetch("http://localhost:5000/api/profile", {
          credentials: "include",
        });
        if (profileRes.ok) setUser(await profileRes.json());
        else setUser(null);

        const artRes = await fetch("http://localhost:5000/api/artwork", {
          credentials: "include",
        });
        if (artRes.ok) setArtPosts(await artRes.json());
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndArt();
  }, []);

  // Handle artwork file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  // 🆕 Handle DP (profile pic) change
  const handleDpChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await fetch("http://localhost:5000/api/profile/upload-dp", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        // ✅ Merge the new image URL into existing user state
        setUser((prev) => ({
          ...prev,
          profileImageUrl: data.profileImageUrl,
        }));

        alert("Profile picture updated!");
      } else {
        alert(data.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading profile picture");
    }
  };


  // Upload artwork
  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", title);
    formData.append("artBy", artBy);
    formData.append("age", age);
    formData.append("school", school);
    formData.append("description", description);

    try {
      const res = await fetch("http://localhost:5000/api/artwork", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const newArt = await res.json();
        setArtPosts((prev) => [newArt, ...prev]);
        setSelectedFile(null);
        setTitle("");
        setArtBy("");
        setAge("");
        setSchool("");
        setDescription("");
      } else {
        alert("Failed to upload artwork");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading artwork");
    }
  };

  // Delete artwork
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/artwork/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) setArtPosts((prev) => prev.filter((art) => art._id !== id));
      else alert("Failed to delete artwork");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="loading-text">Loading...</div>;
  if (!user) return <div className="login-text">Please log in to view your profile.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Info */}
        <div className="profile-header">
          <div className="profile-avatar-container"> {/* 🆕 wrapper */}
            <img
              src={
                user.profileImageUrl
                  ? user.profileImageUrl
                  : "https://api.dicebear.com/7.x/initials/svg?seed=User"
              }
              alt="Profile"
              className="profile-avatar"
              
            />
            <div className="Hero" onClick={() => dpInputRef.current.click()}>
              <BiPencil className="Inside_hero" size={30}/>
            </div>
            {/* 🆕 Camera button */}
            <button
              className="change-dp-btn"
              onClick={() => dpInputRef.current.click()}
            >
              <FaCamera size={18}/>
            </button>
            <input
              type="file"
              ref={dpInputRef}
              className="hidden-file-input"
              accept="image/*"
              onChange={handleDpChange}
            />
          </div>

          <div className="profile-info">
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email}</p>
            <p className="school">{user.school}</p>
          </div>
        </div>

        <hr className="divider" />

        {/* Art Upload */}
        <div className="art-header">
          <h2>Your Art Gallery</h2>
          <button className="add-art-btn" onClick={() => fileInputRef.current.click()}>
            <FaPlus /> Add Art
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden-file-input"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Upload Form */}
        {selectedFile && (
          <div className="upload-box">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="preview-img"
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Art by"
              value={artBy}
              onChange={(e) => setArtBy(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="School/College"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="upload-btn" onClick={handleUpload}>
              Upload
            </button>
          </div>
        )}

        {/* Art Grid */}
        {artPosts.length === 0 ? (
          <p className="no-art">No art uploaded yet.</p>
        ) : (
          <div className="art-grid">
            {artPosts.map((art) => (
              <div key={art._id} className="art-card">
                <img src={art.imageUrl} alt={art.title || "Artwork"} />
                <div className="art-info">
                  <h3>{art.title}</h3>
                  {art.artBy && <p><b>Art by: </b>{art.artBy}</p>}
                  {art.age && <p><b>Age: </b>{art.age}</p>}
                  {art.school && <p><b>School/College: </b>{art.school}</p>}
                  {art.description && <p>{art.description}</p>}
                  <p className="art-date">{new Date(art.createdAt).toLocaleString()}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDelete(art._id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
