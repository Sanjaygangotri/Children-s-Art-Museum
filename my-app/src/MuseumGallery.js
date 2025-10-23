import React, { useEffect, useState } from "react";
import ArtCard from "./artCard";
import "./MuseumGallery.css";

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [school, setSchool] = useState("");
  const [age, setAge] = useState("");
  const [total, setTotal] = useState(0);

  const limit = 6;

  useEffect(() => {
    fetchArtworks();
  }, [page, search, school, age]);

  const fetchArtworks = async () => {
    try {
      const query = new URLSearchParams({
        search,
        school,
        age,
        page,
        limit,
      }).toString();

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/gallery/museum?${query}`);
      const data = await res.json();

      setArtworks(data.artworks);
      setTotal(data.total);
    } catch (err) {
      console.error("Failed to fetch artworks:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="gallery-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by artwork or artist name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
      </div>

      <div className="art-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => <ArtCard key={art._id} art={art} />)
        ) : (
          <p>No artworks found.</p>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
      </div>
    </div>
  );
};

export default ArtGallery;
