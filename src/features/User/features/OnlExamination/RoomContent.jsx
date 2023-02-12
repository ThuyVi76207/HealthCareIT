import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import * as Peer from 'simple-peer';
import io from "socket.io-client";

import "./RoomContentStyles.scss";

let socket = io("http://localhost:7777");

const RoomContent = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const [ipRoom, setIPRoom] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {
        const getUserMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (myVideo.current) {
                    myVideo.current.srcObject = stream
                }

                if (stream) {
                    console.log('Check streamer ', stream);
                    setStream(stream);

                }
            } catch (error) {
                console.log("Faild to get user media", error);
            }
        }

        getUserMedia();
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((streams) => {
        //     console.log("Check stream ", streams);
        //     setStream(streams)
        //     myVideo.current.srcObject = streams
        // })
        socket.on("me", (id) => { //IP nguoi call
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })

    }, [])
    // useEffect(() => {

    // }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const answerCall = () => {
        alert('answer')
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current)
            connectionRef.current.destroy();

    }

    // const handleIPRoom = () => {
    //     setIPRoom(me);
    // }

    console.log("Check callEnded", callEnded);

    console.log("Check receivingCall", receivingCall);
    console.log("Check callAccepted", callAccepted);

    console.log("Check IP room ", me)
    return (
        <div className="bg-black h-full absolute w-full">
            <h2 className="text-white font-bold text-[30px] text-center">Room Online</h2>
            <div className="flex gap-[2%] py-3 w-[80%] mx-auto items-center">
                <h2 className="text-white">{`IP Room: ${me}`}</h2>
                <div>
                    <label className="text-[15px] font-bold text-white mr-2">Tên người dùng:</label>
                    <input
                        id="nameUser"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Nhập tên..."
                        className="px-2 placeholder-shown:border-gray-500 focus:outline-none h-[30px]"
                    ></input>
                </div>

                <CopyToClipboard text={me} >
                    <button onClick={() => setIPRoom(true)} className={`text-white bg-gray-400 p-1 ${ipRoom ? 'bg-green-400' : ''}`}>Copy IP Room</button>
                </CopyToClipboard>

                <div>
                    <label className="text-[15px] font-bold text-white mr-2">Mã phòng:</label>
                    <input
                        id="nameUser"
                        type="text"
                        onChange={(e) => setIdToCall(e.target.value)}
                        value={idToCall}
                        className="px-2 placeholder-shown:border-gray-500 focus:outline-none h-[30px]"
                        placeholder="Nhập mã để vào..."
                    ></input>
                </div>

            </div>
            <div className="">
                <div className="z-30 absolute bottom-[15px] right-[15px] cursor-move ">
                    {
                        stream
                            ?
                            <video playsInline muted ref={myVideo} autoPlay
                                className="z-30 w-[100vw] h-[56.25vw] md:w-[320px] md:h-[180px] border-2 border-sky-200 bg-blue-100 object-cover"
                            />
                            :
                            <div className="z-10 fixed md:absolute bottom-[3vh] right-[5vh] w-[320px] h-[180px] bg-black object-cover border-2 border-sky-200 text-white flex justify-center items-center text-2xl">
                                <h2 className="text-white ">Your camera is off</h2>
                            </div>

                    }
                </div>
                <div className="">
                    {callAccepted && !callEnded
                        ?
                        <video playsInline ref={userVideo} autoPlay
                            className="fixed top-[10vh] md:left-[10vw] md:top-[2vw] w-[100vw] md:w-[80vw] h-[56.25vw] md:h-[45vw] object-cover border-2 border-sky-200"
                        /> :
                        <div className="hidden md:flex fixed left-[10vw] top-[7vw] w-[80vw] h-[40vw] animate-pulse bg-gray-700 text-blue-300 object-cover border-2 border-sky-200 z-10 text-black flex justify-center items-center text-2xl">
                            <h2 className="text-white ">Your camera is off</h2>
                        </div>

                    }
                </div>
                <div className="fixed z-40 flex items-center justify-center w-[100vw] md:w-[33.33333vw] md:left-[33.333333vw] bottom-[20px]">
                    {callAccepted && !callEnded ? (
                        <button className="text-white bg-red-500 rounded-[50%] px-[20px] py-[15px]" onClick={leaveCall}>
                            <i className=" text-[25px] text-center"><ion-icon name="call-outline"></ion-icon></i>
                        </button>
                    ) : (
                        <button className="text-white bg-green-500 rounded-[50%] px-[20px] py-[15px]" onClick={() => callUser(idToCall)}>
                            <i className=" text-[25px] text-center"><ion-icon name="call-outline"></ion-icon></i>
                        </button>
                    )}
                    {idToCall}
                </div>
                <div className="user-caller">
                    {receivingCall && !callAccepted ? (
                        <div className="caller">
                            <h1 >{name} is calling...</h1>
                            <button className="text-white bg-green-400 z-50 absolute" onClick={answerCall}>Tra loi</button>
                        </div>
                    ) : null}
                </div>
            </div>

        </div>
    )
}

export default RoomContent;