import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Discord from "./Discord";
import Youtube from "./Youtube";
import Github from "./Github";
import Twitter from "./Twitter";

import Oscillator from "../Oscillator";

function Link(props) {
  const { link, position, ready } = props;

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const ref = useRef();

  useEffect(() => {
    ref.current.position.set(0, 0, Math.random() * 10 + 20);
  }, []);

  useFrame(() => {
    if (ready) {
      ref.current.position.lerp(
        /* there has to be a better way of deconstructing this */
        new THREE.Vector3(position[0], position[1], position[2]),
        0.03
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(link, "_blank")}
      ref={ref}
    >
      <Oscillator speed={0.1} amplitude={[0.05, 0.05, 0.05]} {...props} />
    </mesh>
  );
}

function Links({ ready }) {
  return (
    <>
      <Link
        link={"https://twitter.com/tomascodes"}
        position={[-0.5, 0, 0]}
        ready={ready}
      >
        <Twitter />
      </Link>
      <Link
        link={"https://github.com/Tomasroma64"}
        position={[-0.18, 0, 0]}
        ready={ready}
      >
        <Github />
      </Link>
      <Link
        link={"https://discord.gg/KNHnWErrxu"}
        position={[0.18, 0, 0]}
        ready={ready}
      >
        <Discord />
      </Link>
      <Link
        link={"https://twitter.com/tomascodes"}
        position={[0.5, 0, 0]}
        ready={ready}
      >
        <Youtube />
      </Link>
    </>
  );
}
export default Links;
