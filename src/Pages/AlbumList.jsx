import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    loadAlbums();
  }, []);
  console.log(albums);
  const loadAlbums = async () => {
    const { data } = await axios.get("http://localhost:8000/albums");
    setAlbums(data);
  };
  const handleRemove = async (albumId) => {
    try {
      console.log(`Attempting to delete album with id: ${albumId}`);
      await axios.delete(`http://localhost:8000/albums/${albumId}`);
      // Remove the deleted album from the state
      setAlbums(albums.filter(album => album._id !== albumId));
      toast.success("Remove Success")
    } catch (error) {
      toast.error("There was an error deleting the album!", error);
    }
  };
  const redirectEdit = (e, data) => {
    navigate(`/album/${data.slug}`);
  };
  return (
    <div className="container">
      <div style={{ marginTop: "64px" }}>
        <div className="row gy-3">
          {albums.map((data) => {
            return (
              <div key={data._id} className="col-md-3">
                <div style={{ width: "100%", height: "180px", borderRadius:"12px",overflow:"hidden" }}>
                  <img
                    src={data.images[0].url}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="mt-3 d-flex justify-content-between">
                  <p>{data.name}</p>
                  <p>{data.images.length}</p>
                  </div>
                <div className="mt-3 d-flex justify-content-end">
                  <button className="btn btn-outline-primary" style={{marginRight:"12px"}} onClick={(e) => redirectEdit(e, data)}>edit</button>
                  <button className="btn btn-danger" onClick={() => handleRemove(data._id)}>remove</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
