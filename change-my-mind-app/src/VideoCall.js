import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useAuth } from './firebase/AuthContext';
import './VideoCall.css';

const socket = io('http://localhost:5000');

const VideoCall = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const [stream, setStream] = useState(null);
  const [peers, setPeers] = useState([]);
  const myVideo = useRef();
  const peersRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;

      socket.emit('join-room', roomId);

      socket.on('user-joined', (userId) => {
        const peer = createPeer(userId, socket.id, stream);
        peersRef.current.push({
          peerID: userId,
          peer,
        });
        setPeers((users) => [...users, peer]);
      });

      socket.on('signal', (data) => {
        const item = peersRef.current.find((p) => p.peerID === data.from);
        if (item) {
          item.peer.signal(data.signal);
        }
      });

      socket.on('user-joined', (userId) => {
        const peer = addPeer(userId, stream);
        peersRef.current.push({
          peerID: userId,
          peer,
        });
        setPeers((users) => [...users, peer]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, user, navigate]);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('signal', { signal, to: userToSignal, from: callerID });
    });

    peer.on('stream', (stream) => {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.playsInline = true;
      videoElement.autoPlay = true;
      videoElement.className = 'user-video';
      document.querySelector('.video-container').appendChild(videoElement);
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('signal', { signal, to: callerID, from: socket.id });
    });

    peer.on('stream', (stream) => {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.playsInline = true;
      videoElement.autoPlay = true;
      videoElement.className = 'user-video';
      document.querySelector('.video-container').appendChild(videoElement);
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="video-call">
      <div className="video-container">
        <video playsInline muted ref={myVideo} autoPlay className="my-video" />
      </div>
    </div>
  );
};

export default VideoCall;