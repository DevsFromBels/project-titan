import Loader from "@/shared/components/ui/loader/loader";
import React from "react";

const CenterLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default CenterLoader;
