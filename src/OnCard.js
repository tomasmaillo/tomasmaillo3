import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { Text, Circle } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Link({ materialProps, color, link, position, ready }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  materialProps.color = color;

  const ref = useRef();

  useEffect(() => {
    ref.current.position.set(0, 0, Math.random() * 10 + 20);
  }, []);

  useFrame(() => {
    if (ready) {
      ref.current.position.lerp(
        /* there has to be a better way of deconstructing this */
        new THREE.Vector3(position[0], position[1], position[2]),
        0.05
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
      <Circle args={[0.2, 25]}>
        <meshPhysicalMaterial {...materialProps} />
      </Circle>
    </mesh>
  );
}

function Name() {
  return (
    <>
      {/* Two Text elements as line height cant be negative*/}
      <Text
        color="white"
        fontSize={0.4}
        letterSpacing={0.02}
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        TOMAS
      </Text>
      <Text
        position={[0, -0.37, 0]}
        color="white"
        fontSize={0.4}
        letterSpacing={0.02}
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        MAILLO
      </Text>
    </>
  );
}

function Job() {
  return (
    <Text
      position={[0, -0.8, 0]}
      color="white"
      fontSize={0.1}
      letterSpacing={0.02}
      anchorX="left"
      anchorY="top"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
    >
      Computer Science student
    </Text>
  );
}

function OnCard({ cardSize, materialProps, ready }) {
  const namePos = [-cardSize[0] / 2 + 0.07, cardSize[1] / 2, 0];
  return (
    <>
      <Link
        materialProps={materialProps}
        color={"#ffbbbb"}
        link={"https://tomasmaillo.com/"}
        position={[0.3, -0.7, 0]}
        ready={ready}
      />
      <Link
        materialProps={materialProps}
        color={"#bbbbff"}
        link={"http://twitter.com/"}
        position={[0.8, -0.7, 0]}
        ready={ready}
      />
      <Link
        materialProps={materialProps}
        color={"#bbffbb"}
        link={"http://twitter.com/"}
        position={[1.3, -0.7, 0]}
        ready={ready}
      />

      <group position={namePos}>
        <Name />
        <Job />
      </group>
    </>
  );
}

export default OnCard;
