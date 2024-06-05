import { Route, Routes } from "react-router-dom";
import AddAlbum from "../Pages/AddAlbum";
import Navbar from "../Components/Navbar";
import AlbumList from "../Pages/AlbumList";
import { Toaster } from "react-hot-toast";
import UpdateAlbum from "../Pages/UpdateAlbum";

export default function MainRoutes() {
  return (
    <>
      <Navbar />
      <Toaster/>
      <Routes>
        <Route path="/" element={<AddAlbum />} />
        <Route path="/album-list" element={<AlbumList />} />
        <Route path="/album/:slug" element={<UpdateAlbum />} />
      </Routes>
    </>
  );
}
