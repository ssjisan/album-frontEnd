import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddAlbum() {
  const [albumName, setAlbumName] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(images);
  const navigate = useNavigate();
  
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!albumName || images.length === 0) {
        alert("Please enter an album name and select at least one image.");
        setLoading(false);
        return;
      }

      const albumData = new FormData();
      albumData.append("name", albumName);

      images.forEach((image, index) => {
        albumData.append("images", image);
      });

      const { data } = await axios.post(
        "http://localhost:8000/album",
        albumData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(albumData);
      toast.success("Album created successfully!");
      navigate("/album-list");
      setAlbumName("");
      setImages([]);
    } catch (error) {
      toast.error(`Error creating album: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
console.log(images);
  return (
    <div className="container">
      <div style={{ marginTop: "64px" }}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Album Name</label>
              <input
                type="name"
                className="form-control"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="btn btn-dark" style={{ width: "100%" }}>
                Upload
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  hidden
                  multiple
                  onChange={handleFilesChange}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                />
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row gy-3">
              {images.map((image, i) => {
                return (
                  <div key={i} className="col-md-4">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        className="btn btn-danger"
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          padding: "4px 8px",
                          minWidth: "auto",
                          fontSize: "12px",
                        }}
                        onClick={() => handleRemoveImage(i)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
