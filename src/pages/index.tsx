import { IndexLayout } from "@/layouts/IndexLayout";
import React from "react";
import PageWithIndexLayoutType from "@/types/page";

const Home: React.FC = () => {

  return (
    <div className="home flex flex-col gap-10 items-center justify-center">
      <p>Home screen</p>
    </div>
  );
}

(Home as PageWithIndexLayoutType).layout = IndexLayout;

export default Home;
