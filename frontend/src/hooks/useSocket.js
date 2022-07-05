import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_HEALTH_API);

function useSocket() {
  const [data, setData] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    event && socket.on(event, (data) => setData(data));
  }, [event]);

  const subscribe = (id) => setEvent(id.toLowerCase());

  return [data, subscribe];
}

export default useSocket;
