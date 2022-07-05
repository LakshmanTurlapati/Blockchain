import React, { useState } from "react";
import { SET_LOADING } from "../actions/Health";
import { useHealth } from "../context/health";

function useLoader() {
  const [loading, setLoading] = useState(null);
  const setLoader = (bool) => setLoading(bool);
  return [loading, setLoader];
}

export default useLoader;
