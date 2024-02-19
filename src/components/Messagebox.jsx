import React, { useEffect, useState } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { GrGallery } from "react-icons/gr";
import { BsFillSendFill } from "react-icons/bs";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from "react-audio-voice-recorder";
import { v4 as uuidv4 } from "uuid";
import ScrollToBottom from 'react-scroll-to-bottom';


const Messagebox = () => {
  let uuid = uuidv4();
  const storage = getStorage();
  const db = getDatabase();
  const chatData = useSelector((state) => state.activeUsermsg.chatdata);
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  let [msg, setMsg] = useState("");
  let [msgerr, setMsgerr] = useState("");
  let [msgelist, setMsglist] = useState([]);
  let [emojimodal, setEmojimodal] = useState(false);
  // let userinfo = localStorage.getItem('chatInfo')

  let handleMsg = (e) => {
    setMsg(e.target.value);
    setMsgerr("");
  };

  let handleSend = () => {
    if (msg == "") {
      setMsgerr("Please write something");
    } else {
      set(push(ref(db, "msg/")), {
        sendername: data.displayName,
        senderid: data.uid,
        recivername: chatData.name,
        reciverid: chatData.id,
        msg: msg,
        date: `${new Date().getFullYear()}- ${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      }).then(() => {
        setEmojimodal(false);
        setMsg("");
      });
    }
  };

  useEffect(() => {
    const messegeRef = ref(db, "msg/");
    onValue(messegeRef, (snapshot) => {
      let areyy = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().senderid &&
            chatData.id == item.val().reciverid) ||
          (data.uid == item.val().reciverid &&
            chatData.id == item.val().senderid)
        ) {
          areyy.push(item.val());
        }
      });
      setMsglist(areyy);
    });
  }, [chatData.id]);

  let handleomjimodal = () => {
    setEmojimodal(!emojimodal);
  };

  let handleEmojiclick = (e) => {
    setMsg(msg + e.emoji);
  };

  let hamdleImagefile = (e) => {
    const storageRef = sref(storage, uuid);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "msg/")), {
          sendername: data.displayName,
          senderid: data.uid,
          recivername: chatData.name,
          reciverid: chatData.id,
          image: downloadURL,
          date: `${new Date().getFullYear()}- ${
            new Date().getMonth() + 1
          }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
        });
      });
    });
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const storageRef = sref(storage, uuid);

    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "msg/")), {
          sendername: data.displayName,
          senderid: data.uid,
          recivername: chatData.name,
          reciverid: chatData.id,
          audio: downloadURL,
          date: `${new Date().getFullYear()}- ${
            new Date().getMonth() + 1
          }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
        });
      });
    });
  };

  let handlePress=(e)=>{
    console.log(e.key);
    if(e.key == "Enter"){
      set(push(ref(db, "msg/")), {
        sendername: data.displayName,
        senderid: data.uid,
        recivername: chatData.name,
        reciverid: chatData.id,
        msg: msg,
        date: `${new Date().getFullYear()}- ${
          new Date().getMonth() + 1
        }-${new Date().getDate()}-${new Date().getHours()}-${new Date().getMinutes()}`,
      }).then(()=>{
        setEmojimodal(false);
        setMsg("");
      })
    }
  }
  return (
    <div className="w-[650px] h-[580px] shadow-2xl rounded-[20px]">
      <div className="p-10 ">
        <div className="flex gap-5 items-center">
          <div>
            <img
              className="w-[75px] h-[75px]"
              src="profile.png"
              alt="profile"
            />
          </div>
          <div>
            <h3 className="text-[24px] font-nunito font-semibold">
              {chatData.name}{" "}
            </h3>
            <h2 className="text-[14px] font-nunito text-[#000000]">Online</h2>
          </div>
        </div>
        <div className="border border-1 border-solid mt-5 "></div>
        <ScrollToBottom  className="h-[350px] w-full   relative">
          {/* ===============messageBox start=========== */}
          {msgelist.map((item) =>
            data.uid == item.senderid ? (
              item.msg ? (
                <div className="flex justify-end">
                  <div>
                    <div className="relative mt-[30px] bg-[#2a30d8] inline-block py-[13px] px-[52px] rounded-[10px]">
                      <BsFillTriangleFill className="absolute top-[27px] right-[-9px] text-[#2a30d8] text-2xl" />
                      <h2 className="text-[16px] font-nunito font-medium text-[white] ">
                        {item.msg}
                      </h2>
                    </div>
                    <h4 className="text-[12px] font-nunito font-medium ">
                      {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                    </h4>
                  </div>
                </div>
              ) : item.image ? (
                <div className="flex justify-end">
                  <div>
                    <div className="relative mt-[30px] bg-[#2a30d8] inline-block p-4 rounded-[10px]">
                      <BsFillTriangleFill className="absolute top-[27px] right-[-9px] text-[#2a30d8] text-2xl" />
                      <ModalImage
                        small={item.image}
                        large={item.image}
                        alt="Hello World!"
                        className="w-[250px] h-[250px] object-cover"
                      />
                    </div>
                    <h4 className="text-[12px] font-nunito font-medium ">
                      Today, 2:01pm
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="mt-5">
                  <div className="flex justify-end">
                    <audio src={item.audio} controls></audio>
                  </div>
                  <div className="flex justify-center">
                    <h4 className="text-[12px] font-nunito font-medium ">
                      {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                    </h4>
                  </div>
                </div>
              )
            ) : item.msg ? (
              <div>
                <div className="relative mt-[50px] bg-[#F1F1F1] inline-block py-[13px] px-[52px] rounded-[10px]">
                  <BsFillTriangleFill className="absolute top-[27px] left-[-9px] text-[#F1F1F1] text-2xl" />
                  <h2 className="text-[16px] font-nunito font-medium ">
                    {item.msg}
                  </h2>
                </div>
                <h4 className="text-[12px] font-nunito font-medium ">
                  {moment(item.date, "YYYYMMDDh:mm:ss").fromNow()}
                </h4>
              </div>
            ) : item.image ? (
              <div>
                <div className="relative mt-[50px] bg-[#F1F1F1] inline-block p-4 rounded-[10px]">
                  <BsFillTriangleFill className="absolute top-[27px] left-[-9px] text-[#F1F1F1] text-2xl" />
                  <ModalImage
                    small={item.image}
                    large={item.image}
                    alt="Hello World!"
                    className="w-[250px] h-[250px] object-cover"
                  />
                </div>
                <h4 className="text-[12px] font-nunito font-medium ">
                  Today, 2:01pm
                </h4>
              </div>
            ) : (
              <div className="mt-5">
                <audio src={item.audio} controls></audio>
                <h4 className="text-[12px] font-nunito font-medium ">
                      {moment(item.date, "YYYYMMDDh:mm").fromNow()}
                    </h4>
              </div>
              
            )
          )}

          {emojimodal && (
            <div className=" absolute top-0 left-0">
              <EmojiPicker onEmojiClick={handleEmojiclick} />
            </div>
          )}
          {/* ===============messageBox end=========== */}
        </ScrollToBottom >
        {/* ================massge option st======================== */}
        <div className="mt-6 relative">
          <input
            onKeyUp={handlePress}
            onChange={handleMsg}
            className="w-[90%] h-[45px] px-5  rounded-[10px] bg-[#F1F1F1] outline-none text-[black]"
            type="text"
            value={msg}
          />
          {msgerr && <h3 className="text-[red] absolute">{msgerr}</h3>}
          <HiOutlineEmojiHappy
            onClick={handleomjimodal}
            className="text-xl absolute top-[50%] translate-y-[-50%] right-[100px]"
          />
          <label>
            <input onChange={hamdleImagefile} className="hidden" type="file" />
            <GrGallery className=" absolute top-[50%] translate-y-[-50%] right-[70px]" />
          </label>
          <BsFillSendFill
            onClick={handleSend}
            className="text-2xl text-[#2e3adf] absolute top-[50%] translate-y-[-50%] right-5"
          />

          <div className=" absolute top-[50%] translate-y-[-50%] right-[140px] ">
            <AudioRecorder 
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadOnSavePress={false}
              downloadFileExtension="mp3"
            />
          </div>
        </div>

        {/* ================massge option end======================== */}
      </div>
    </div>
  );
};

export default Messagebox;
