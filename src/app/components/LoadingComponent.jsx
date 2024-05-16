import React from "react";
import Lottie from "react-lottie";
import LoadingAnimation from "../../assets/Animation.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const LoadingComponent = () => {
  return (
    <>
      <div>
        <Lottie
          options={defaultOptions}
          width={"25%"}
          height={"25%"}
          isStopped={false}
          isPaused={false}
        />
      </div>
    </>
  );
};

export default LoadingComponent;
