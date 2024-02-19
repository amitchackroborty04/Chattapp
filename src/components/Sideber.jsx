import React, { useState, createRef } from "react";
import { GoHome } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userLoginInfro } from "../pages/slice/userslice";

const Sideber = ({ active }) => {
  const navigate= useNavigate();
  const storage = getStorage();
  const dispatch = useDispatch();
  const auth = getAuth();
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  let userinfo = localStorage.getItem("name");
  let [imgeoverly, setImageoverly] = useState(false);
  const [imageInfro, setImageinfo] = useState("");
  const [imgeurl, setImgurl] = useState("");

  // croper image start
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  let [magic, setMagic] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    setMagic(true);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, "some-child");
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setImageoverly(false);
          });
        });
      });
    }
  };

  const handleimageUplode = () => {
    setImageoverly(true);
  };
  let handlecrossicon = () => {
    setImageoverly(false);
    setImage("");
    setCropData("");
    setMagic(false);
  };

  let handleLogout = () => {
    dispatch(userLoginInfro(null));
    localStorage.setItem("userinfo", JSON.stringify(""));
    navigate("/")
  };

  return (
    <div className="w-full h-screen bg-[#5F35F5] rounded-3xl">
      <div className="relative group w-[100px] h-[100px] rounded-full mx-auto">
        <img
          className=" w-[100px] h-[100px] rounded-full object-cover  pt-[10px] text-center mx-auto  group"
          src={data.photoURL}
          alt="profile"
        />

        <div
          onClick={handleimageUplode}
          className="w-0 h-[100px] rounded-full bg-[rgba(0,0,0,.5)] absolute top-[10px] left-0 group-hover:w-[100px] flex justify-center items-center "
        >
          <FaCloudUploadAlt className="text-[white]" />
        </div>
      </div>

      <p className="font-nunito text-[white] text-[20px] font-bold text-center mt-2">
        {data.displayName}
      </p>

      <div
        className={
          active == "home"
            ? "w-[160px] h-[69px] bg-[white] flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative "
            : "w-[160px] h-[69px] bg-[#5F35F5] flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative "
        }
      >
        <Link to="/home">
          <GoHome
            className={
              active == "home"
                ? "text-3xl text-[#5F35F5]  ml-[-42px]"
                : "text-3xl text-[#BAD1FF]  ml-[-42px]"
            }
          />
        </Link>

        <div className="w-2 h-[69px] bg-[#5F35F5] absolute top-0 right-0 rounded-tl-3xl rounded-bl-3xl"></div>
      </div>

      <div
        className={
          active == "message"
            ? "w-[160px] h-[69px] bg-[white] flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative "
            : "w-[160px] h-[69px] bg-[#5F35F5] flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative "
        }
      >
        <Link to="/message">
          <AiOutlineMessage
            className={
              active == "message"
                ? "text-3xl text-[#5F35F5]  ml-[-42px]"
                : "text-3xl text-[#BAD1FF]  ml-[-42px]"
            }
          />
        </Link>

        <div className="w-2 h-[69px] bg-[#5F35F5] absolute top-0 right-0 rounded-tl-3xl rounded-bl-3xl"></div>
      </div>

      <div className="w-[161px] h-[69px] bg-transparent flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative ">
        <IoNotifications className="text-4xl text-[#BAD1FF]  ml-[-42px]" />
        <div className="w-2 h-[69px] bg-[#5F35F5] absolute top-0 right-0 rounded-tl-3xl rounded-bl-3xl"></div>
      </div>

      <div className="w-[161px] h-[69px] bg-transparent flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative ">
        <IoSettingsSharp className="text-4xl text-[#BAD1FF]  ml-[-42px]" />
        <div className="w-2 h-[69px] bg-[#5F35F5] absolute top-0 right-0 rounded-tl-3xl rounded-bl-3xl"></div>
      </div>

      <div className="w-[161px] h-[69px] bg-transparent flex justify-center items-center mt-[20px] ml-auto rounded-tl-3xl rounded-bl-3xl relative ">
        <LuLogOut
          onClick={handleLogout}
          className="text-4xl text-[#BAD1FF]  ml-[-42px]"
        />
        <div className="w-2 h-[69px] bg-[#5F35F5] absolute top-0 right-0 rounded-tl-3xl rounded-bl-3xl"></div>
      </div>
      {imgeoverly && (
        <div className="w-full h-screen bg-[rgba(0,0,0,.8)] absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className="w-[500px] bg-[white] rounded-[10px] relative p-7 ">
            <GiCrossMark
              onClick={handlecrossicon}
              className="absolute top-1 right-3 text-2xl text-[red]"
            />

            <div class="flex items-center justify-center w-full">
              <input onChange={onChange} type="file" />
            </div>
            {magic && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
            )}

            <button
              onClick={getCropData}
              className=" w-full  bg-[#3c4fe0] rounded-[10px] py-3 font-nunito text-[20px] font-bold text-[white] mt-7"
            >
              Uplode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sideber;
