import React from "react";
import { Text } from "@react-three/drei";

import Links from "./links/Links";

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

function OnCard({ cardSize, ready }) {
  const namePos = [-cardSize[0] / 2 + 0.07, cardSize[1] / 2, 0];

  return (
    <>
      <group position={[0, -0.6, 0.2]}>
        <Links ready={ready} />
      </group>

      <group position={namePos}>
        <Name />
        <Job />
      </group>
    </>
  );
}

export default OnCard;
