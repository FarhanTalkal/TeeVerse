import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import store from "../store";

const getTargetPosition = (intro, width) => {
  const isBreakpoint = width <= 1260;
  const isMobile = width <= 600;

  if (intro) {
    if (isMobile) return [0, 0.2, 2.5];
    if (isBreakpoint) return [0, 0, 2];
    return [-0.4, 0, 2];
  }
  return isMobile ? [0, 0, 2.5] : [0, 0, 2];
};

const CameraRig = ({ children }) => {
  const group = useRef();

  useFrame(({ camera, pointer, size }, delta) => {
    easing.damp3(camera.position, getTargetPosition(store.intro, size.width), 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [pointer.y / 10, -pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
