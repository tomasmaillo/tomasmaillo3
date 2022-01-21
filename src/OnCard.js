import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import { Text, Circle } from "@react-three/drei";

function Link({ materialProps, color, link, position }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const ref = useRef();

  materialProps.color = color;

  return (
    <>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => window.open(link, "_blank")}
        ref={ref}
      >
        <Circle args={[0.2, 25]} position={position}>
          <meshPhysicalMaterial {...materialProps} />
        </Circle>
      </mesh>
    </>
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

function OnCard({ cardSize, materialProps }) {
  const namePos = [-cardSize[0] / 2 + 0.07, cardSize[1] / 2, 0];
  return (
    <>
      <Link
        materialProps={materialProps}
        color={"#ffbbbb"}
        link={"https://tomasmaillo.com/"}
        position={[0.3, -0.7, 0]}
      />
      <Link
        materialProps={materialProps}
        color={"#bbbbff"}
        link={"http://twitter.com/"}
        position={[0.8, -0.7, 0]}
      />
      <Link
        materialProps={materialProps}
        color={"#bbffbb"}
        link={"http://twitter.com/"}
        position={[1.3, -0.7, 0]}
      />

      <group position={namePos}>
        <Name />
        <Job />
      </group>
    </>
  );
}

export default OnCard;
