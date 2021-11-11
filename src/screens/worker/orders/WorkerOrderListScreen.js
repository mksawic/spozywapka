import React from "react";
import { Layout } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import AppLoader from "../../../components/AppLoader";

const WorkerOrderListScreen = () => {
  const { status } = useSelector((store) => store.worker);
  return status !== "loading" ? <Layout></Layout> : <AppLoader />;
};

export default WorkerOrderListScreen;
