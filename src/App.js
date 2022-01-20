import "./App.css";
import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Loader,
  OrbitControls,
  RoundedBox,
  Stats,
  Text,
  Html,
  Circle,
  useProgress,
} from "@react-three/drei";

import Lora from "./Lora";

function Card(props) {
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
    transmission: 1,
    ior: 1.5,
    envMapIntensity: 0,
    color: "#ffffff",
    attenuationTint: "#ffe79e",
    attenuationDistance: 0,
    normalMap: normalMapTexture,
    normalScale: 0.5,
  };
  return (
    <mesh {...props} ref={ref}>
      <group position={[0, 0, 0.051]}>
        <OnCard />
      </group>

      <RoundedBox radius={0.05} args={[2, 3, 0.1]}>
        <meshPhysicalMaterial {...materialProps} />
      </RoundedBox>

      <Link materialProps={materialProps} />
    </mesh>
  );
}

function Link({ materialProps }) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.055;
    ref.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.03;
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.01;
  });

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => window.open("https://tomasmaillo.com", "_blank")}
      ref={ref}
    >
      <Circle args={[0.25, 25]} position={[0, -1.9, 0]}>
        <meshPhysicalMaterial {...materialProps} />
      </Circle>
    </mesh>
  );
}

function OnCard() {
  return (
    <>
      <Text
        color="white"
        fontSize={0.2}
        maxWidth={500}
        lineHeight={0}
        letterSpacing={0.02}
        anchorX="center"
        anchorY="center"
        position={[0, 0, 0]}
      >
        heyyy
      </Text>
    </>
  );
}

function Intro({ ready, setReady }) {
  const { active, progress, errors, item, loaded, total } = useProgress();
  useEffect(() => setTimeout(() => setReady(true), 1000), []);
  useEffect(() => setReady(true), [progress]);

  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    if (ready) {
      state.camera.position.lerp(
        vec.set(state.mouse.x * 3, state.mouse.y * 2 - 0.5, 3),
        0.05
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
        camera={{ position: [0, 0, 20] }}
        gl={{ alpha: false }}
      >
        <group rotation={[0, 0, Math.PI / 4]}>
          <mesh position={[0, 0, -10]} material-color="hotpink">
            <planeGeometry args={[20, 2]} />
          </mesh>
          <mesh position={[0, 0, -10]} material-color="hotpink">
            <planeGeometry args={[2, 20]} />
          </mesh>
        </group>
        <ambientLight />
        <color attach="background" args={["#151518"]} />
        <Suspense fallback={null}>
          <Card />

          <Lora
            scale={15}
            position={[0, -10, -8]}
            rotation={[0, -Math.PI / 2, 0]}
          />
          <Intro ready={ready} setReady={setReady} />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
