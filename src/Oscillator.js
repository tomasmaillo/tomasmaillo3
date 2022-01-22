import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import SimplexNoise from "simplex-noise";

const sn = new SimplexNoise();

function Oscillator(props) {
  const ref = useRef();

  const { speed, amplitude } = props;

  useFrame((state) => {
    ref.current.rotation.x =
      amplitude[0] * sn.noise2D(1, state.clock.getElapsedTime() * speed);
    ref.current.rotation.y =
      amplitude[1] * sn.noise2D(2, state.clock.getElapsedTime() * speed);
    ref.current.rotation.z =
      amplitude[2] * sn.noise2D(3, state.clock.getElapsedTime() * speed);
  });

  return <mesh ref={ref} {...props}></mesh>;
}

export default Oscillator;
