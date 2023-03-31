import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import * as Peer from "simple-peer";
import io from "socket.io-client";

const socket = io("https://service-healthcare.onrender.com");
//https://service-healthcare.onrender.com
const RoomContent = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [ipRoom, setIPRoom] = useState(false);
  const [shareCam, setShareCam] = useState(true);
  const [audio, setAudio] = useState(true);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        myVideo.current.srcObject = stream;
        console.log("Check myVideo ", myVideo.current);

        if (stream) {
          setStream(stream);
          console.log("Check streamer ", stream);

          // stream = streams
        }
      } catch (error) {
        console.log("Faild to get user media", error);
      }
    };

    getUserMedia();

    socket.on("me", (id) => {
      //IP room
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("hideCam", hideCam);
    //  socket.on("onOffAudio", onOffAudio)
  }, []);

  const hideCam = () => {
    // myVideo.current.srcObject.getVideoTracks().forEach((track) => track.stop());
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideo.current) {
          console.log("Check myvideo", myVideo.current);
          myVideo.current.srcObject
            .getTracks()
            .forEach((t) => (t.enabled = !t.enabled));
          setShareCam(!shareCam);
        }
        setStream(stream);
      });
  };

  // Nút này hơi sai sai nên để sau nha :))))
  const onOffAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myVideo.current.srcObject
          .getAudioTracks()
          .forEach((t) => (t.enabled = !t.enabled));
        setStream(stream);
      });
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const stopStream = async () => {
    myVideo.current.srcObject.getVideoTracks().forEach((track) => track.stop());
  };

  const answerCall = () => {
    // alert('answer')
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current?.destroy();
  };

  const StopShareWebcamButton = () => {
    return (
      <div
        onClick={hideCam}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          className="w-8 h-8 fill-white"
        >
          <path d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z" />
        </svg>
      </div>
    );
  };

  const StartShareWebcamButton = () => {
    return (
      <div
        onClick={hideCam}
        className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-cyan-500 hover:bg-cyan-600 hover:cursor-pointer mx-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="w-8 h-8 fill-white"
        >
          <path d="M32 399.1c0 26.51 21.49 47.1 47.1 47.1h287.1c19.57 0 36.34-11.75 43.81-28.56L32 121.8L32 399.1zM630.8 469.1l-89.21-69.92l15.99 11.02c21.22 14.59 50.41-.2971 50.41-25.8V127.5c0-25.41-29.07-40.37-50.39-25.76l-109.6 75.56l.0001 148.5l-32-25.08l.0001-188.7c0-26.51-21.49-47.1-47.1-47.1H113.9L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189C-3.066 19.63-1.249 34.72 9.189 42.89l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-black h-full absolute w-full">
      <h2 className="text-white font-bold text-[30px] text-center">
        Room Online
      </h2>
      <div className="flex gap-[2%] py-3 w-[80%] mx-auto items-center">
        {/* <h2 className="text-white">{`IP Room: ${me}`}</h2> */}
        <div>
          <label className="text-[15px] font-bold text-white mr-2">
            Tên người dùng:
          </label>
          <input
            id="nameUser"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nhập tên..."
            className="px-2 placeholder-shown:border-gray-500 focus:outline-none h-[30px]"
          ></input>
        </div>

        <CopyToClipboard text={me}>
          <button
            onClick={() => setIPRoom(true)}
            className={`text-white bg-gray-400 p-1 ${
              ipRoom ? "bg-green-400" : ""
            }`}
          >
            Copy IP Room
          </button>
        </CopyToClipboard>

        <div>
          <label className="text-[15px] font-bold text-white mr-2">
            Mã phòng:
          </label>
          <input
            id="nameUser"
            type="text"
            onChange={(e) => setIdToCall(e.target.value)}
            value={idToCall}
            className="px-2 placeholder-shown:border-gray-500 focus:outline-none h-[30px]"
            placeholder="Nhập mã để gọi..."
          ></input>
        </div>
      </div>
      <div className="">
        <div className="z-30 absolute bottom-[15px] right-[15px] cursor-move ">
          {
            stream && (
              <video
                // playsInline
                muted
                ref={myVideo}
                autoPlay
                className="z-30 w-[100vw] h-[56.25vw] text-white md:w-[320px] md:h-[180px] border-2 border-sky-200 object-cover bg-blue-100 "
              >
                {/* {shareCam === false ? <h2 className="text-white text-center">Your camera is off</h2> : null} */}
              </video>
            )

            // <div className="z-10 fixed md:absolute bottom-[3vh] right-[5vh] w-[320px] h-[180px] bg-black object-cover border-2 border-sky-200 text-white flex justify-center items-center text-2xl">
            //     <h2 className="text-white ">Your camera is off</h2>
            // </div>
          }
          {/* <button variant="contained" color="primary" onClick={hideCam}>
                        Bật/Tắt Video
                    </button>
                    <button variant="contained" color="primary" onClick={onOffAudio}>
                        Bật/Tắt Tiếng
                    </button> */}
        </div>
        <div className="">
          {callAccepted && !callEnded ? (
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="fixed md:left-[10vw] w-[80%] h-[40.25vw] object-cover border-2 border-sky-200"
            />
          ) : (
            <div className="md:flex fixed left-[10vw] w-[80%] h-[40.25vw]  animate-pulse bg-gray-700 object-cover border-2 border-sky-200 z-10 text-black flex justify-center items-center text-2xl">
              <h2 className="text-white ">Waiting another user to join...</h2>
            </div>
          )}
        </div>
        <div className="fixed z-40 flex items-center justify-center w-[100vw] md:w-[33.33333vw] md:left-[33.333333vw] bottom-[20px]">
          {shareCam ? <StartShareWebcamButton /> : <StopShareWebcamButton />}
          {callAccepted && !callEnded ? (
            <div
              onClick={leaveCall}
              className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-red-500 hover:bg-red-600 hover:cursor-pointer mx-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="h-7 w-7 fill-white"
              >
                <path d="M271.1 367.5L227.9 313.7c-8.688-10.78-23.69-14.51-36.47-8.974l-108.5 46.51c-13.91 6-21.49 21.19-18.11 35.79l23.25 100.8C91.32 502 103.8 512 118.5 512c107.4 0 206.1-37.46 284.2-99.65l-88.75-69.56C300.6 351.9 286.6 360.3 271.1 367.5zM630.8 469.1l-159.6-125.1c65.03-78.97 104.7-179.5 104.7-289.5c0-14.66-9.969-27.2-24.22-30.45L451 .8125c-14.69-3.406-29.73 4.213-35.82 18.12l-46.52 108.5c-5.438 12.78-1.771 27.67 8.979 36.45l53.82 44.08C419.2 232.1 403.9 256.2 386.2 277.4L38.81 5.111C34.41 1.673 29.19 0 24.03 0C16.91 0 9.84 3.158 5.121 9.189c-8.188 10.44-6.37 25.53 4.068 33.7l591.1 463.1c10.5 8.203 25.57 6.328 33.69-4.078C643.1 492.4 641.2 477.3 630.8 469.1z" />
              </svg>
            </div>
          ) : (
            <div
              onClick={() => callUser(idToCall)}
              className="w-16 h-16 flex items-center justify-center mx-auto rounded-full bg-green-500 hover:bg-green-600 hover:cursor-pointer mx-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
          )}
          {/* {idToCall} */}
        </div>
        <div
          className="fixed right-9 top-6 z-[1000] max-h-screen overflow-auto "
          role="alert"
        >
          {receivingCall && !callAccepted ? (
            <div className="min-w-[350px] max-w-sm bg-[#d8f2f1] border-l-4 border-[#16917c] text-sky-700 p-4 mb-4 relative">
              <h1 className="text-[#27284a] font-bold">{name} đang gọi...</h1>
              <button
                className="absolute top-[7px] right-[7px] px-4 py-2 bg-sky-700 rounded-[5px] text-white"
                onClick={answerCall}
              >
                Trả lời
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RoomContent;
