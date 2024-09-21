import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useAuth } from './firebase/AuthContext';
import './VideoCall.css';

const socket = io('http://localhost:5000');

const VideoCall = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.emit('join', userId);

    socket.on('user-joined', (id) => {
      setCaller(id);
      setReceivingCall(true);
    });

    socket.on('signal', (data) => {
      if (data.to === socket.id) {
        setCallerSignal(data.signal);
      }
    });
  }, [userId, user, navigate]);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('signal', { signal: data, to: id, from: user.uid });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on('signal', (data) => {
      if (data.to === socket.id) {
        peer.signal(data.signal);
      }
    });

    connectionRef.current = peer;
  };

  const acceptCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('signal', { signal: data, to: caller, from: user.uid });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  return (
    <div className="video-call">
      <div className="video-container">
        <video playsInline muted ref={myVideo} autoPlay className="my-video" />
        {callAccepted && <video playsInline ref={userVideo} autoPlay className="user-video" />}
      </div>
      <div className="controls">
        {receivingCall && !callAccepted && (
          <button onClick={acceptCall}>Accept Call</button>
        )}
        {!receivingCall && (
          <button onClick={() => callUser(userId)}>Call User</button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;