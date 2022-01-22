import "./App.css";
import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Loader, RoundedBox, useProgress } from "@react-three/drei";

import Lora from "./Lora";

import OnCard from "./OnCard";

function Card({ ready }) {
  const cardSize = [2 * 1.56, 2, 0.1];

  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.035;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.07;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.01;
  });

  const textureLoader = new THREE.TextureLoader();
  const normalMapTexture = textureLoader.load("/normal.jpg");
  normalMapTexture.wrapS = THREE.RepeatWrapping;
  normalMapTexture.wrapT = THREE.RepeatWrapping;
  normalMapTexture.repeat.set(1, 1);

  const materialProps = {
    thickness: 5,
    roughness: 0,
    clearcoat: 3,
    clearcoatRoughness: 0,
    transmission: 0.9,
    ior: 1.5,
    envMapIntensity: 0,
    color: "#eeeeee",
    attenuationTint: "#ffffff",
    attenuationDistance: 0,
    normalMap: normalMapTexture,
    normalScale: 0.5,
  };
  return (
    <mesh ref={ref}>
      <group position={[0, 0, 0.051]}>
        <OnCard
          cardSize={cardSize}
          materialProps={materialProps}
          ready={ready}
        />
      </group>

      <RoundedBox radius={0.05} args={cardSize}>
        <meshPhysicalMaterial {...materialProps} />
      </RoundedBox>
    </mesh>
  );
}

function Intro({ ready, setReady }) {
  const { size } = useThree();
  const [zDist, setZDist] = useState(3);

  useEffect(() => {
    if (size.width < 500) {
      setZDist(5);
    } else {
      setZDist(3);
    }
  }, [size.width]);

  const { active, progress, errors, item, loaded, total } = useProgress();
  useEffect(() => {
    if (progress == 100) setReady(true);
  }, [progress]);

  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    if (ready) {
      state.camera.position.lerp(
        vec.set(state.mouse.x * 2, state.mouse.y - 0.5, zDist),
        0.015
      );
      state.camera.lookAt(0, -0.25, 0);
    }
  });
}

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [Math.random() * 10 - 5, 10, 20] }}
        gl={{ alpha: false }}
        ready={ready}
      >
        <group rotation={[0, 0, Math.PI / 4]}>
          <mesh position={[0, 0, -9]} material-color="hotpink">
            <planeGeometry args={[100, 2]} />
          </mesh>
          <mesh position={[0, 5, -9]} material-color="hotpink">
            <planeGeometry args={[100, 2]} />
          </mesh>
        </group>
        <color attach="background" args={["#151518"]} />
        <fog attach="fog" args={["rgb(250,0,0)", 8, 20]} />
        <Suspense fallback={null}>
          <Card ready={ready} />
          <Lora ready={ready} scale={15} rotation={[0, -Math.PI / 2, 0]} />
          <Intro ready={ready} setReady={setReady} />
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={(p) => `${p.toFixed(2)}%`} />
    </>
  );
}

export default App;
