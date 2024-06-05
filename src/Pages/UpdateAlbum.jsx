import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAlbum() {
  const params = useParams();
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removeImageIds, setRemoveImageIds] = useState([]);

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    try {
      
      const { data } = await axios.get(
        `http://localhost:8000/album/${params.slug}`
      );
      setAlbumName(data.name);
      const formattedImages = data.images.map((image) => ({
        src: image.url,
        public_id: image.public_id,
        _id: image._id,
        fromDatabase: true,
      }));

      setImages(formattedImages);
      setId(data._id);
    } catch (err) {
      toast.error("Failed to load album data");
    }
  };
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      src: URL.createObjectURL(file),
      file: file,
      name: file.name, // Set the name property to the name of the file
      fromDatabase: false,
    }));
    setNewImages([...newImages, ...newFiles]);
  };
  
  const handleRemoveImage = (index) => {
    const imageToRemove = images[index];
    setRemoveImageIds([...removeImageIds, imageToRemove.public_id]);
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleRemoveNewImage = (index) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("removeImageIds", JSON.stringify(removeImageIds)); // Convert array to JSON string
      newImages.forEach((image) => {
        formData.append("newImages", image.file);
      });
      
      console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const { data } = await axios.put(`http://localhost:8000/album/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
      toast.success("Album updated successfully");
      navigate("/album-list");
    } catch (error) {
      toast.error("Failed to update album");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
console.log("new images", newImages);
  return (
    <div className="container">
      <div style={{ marginTop: "64px" }}>
        <div className="row">
          <div className="col-md-3">
            <div className="mb-3">
              <label className="form-label">Album Name</label>
              <input
                type="text"
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
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row gy-3">
              {images.map((image, i) => (
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
                      src={image.src}
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
              ))}
              {newImages.map((image, i) => (
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
                      src={image.src}
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
                      onClick={() => handleRemoveNewImage(i, false)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
