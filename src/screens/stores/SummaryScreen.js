import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@ui-kitten/components";

const SummaryScreen = () => {
  const { products, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return <Layout></Layout>;
};

export default SummaryScreen;
