import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Loader,
  RoundedBox,
  useProgress,
  OrbitControls,
  Stats,
  Text,
  Plane,
} from "@react-three/drei";

import OnCard from "./OnCard";
import Oscillator from "./Oscillator";

function VideoText(props) {
  const { ready } = props;
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/drei.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void (ready && video.play()), [video, ready]);

  return (
    <Plane args={[15, 10]} {...props}>
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Plane>
  );
}

function Card({ ready }) {
  const cardSize = [2 * 1.56, 2, 0.1];

  const textureLoader = new THREE.TextureLoader();
  const normalMapTexture = textureLoader.load("/normal.jpg");
  normalMapTexture.wrapS = THREE.RepeatWrapping;
  normalMapTexture.wrapT = THREE.RepeatWrapping;
  normalMapTexture.repeat.set(1, 1);

  const materialProps = {
    thickness: 10,
    roughness: 0,
    clearcoat: 3,
    clearcoatRoughness: 0,
    transmission: 0.8,
    ior: 1.5,
    envMapIntensity: 0,
    color: "#eeeeee",
    attenuationTint: "#ffffff",
    attenuationDistance: 0,
    normalMap: normalMapTexture,
    normalScale: 0.2,
  };
  return (
    <mesh>
      <group position={[0, 0, 0.051]}>
        <OnCard cardSize={cardSize} ready={ready} />
      </group>

      <RoundedBox radius={0.05} args={cardSize}>
        <meshPhysicalMaterial {...materialProps} />
      </RoundedBox>
    </mesh>
  );
}

function Intro({ ready, setReady }) {
  const { active, progress, errors, item, loaded, total } = useProgress();
  useEffect(() => {
    if (progress == 100) setReady(true);
  }, [progress]);

  const { size } = useThree();
  const [zDist, setZDist] = useState(3);

  useEffect(() => {
    if (size.width < 500) {
      setZDist(5);
    } else {
      setZDist(3);
    }
  }, [size.width]);

  const [lerpSpeed, setLerpSpeed] = useState(0.025);

  const [vec] = useState(() => new THREE.Vector3());
  useFrame((state) => {
    if (ready) {
      if (state.camera.position.z < zDist - 1) {
        setLerpSpeed(0.035);
      } else {
        setLerpSpeed(0.025);
      }

      state.camera.position.lerp(
        vec.set(state.mouse.x * 0.25, state.mouse.y * 0.25 - 0.4, zDist),
        lerpSpeed
      );
      state.camera.lookAt(0, -0.25, 0);
    }
  });
  return <OrbitControls enableDamping panSpeed={0.01} enableZoom={false} />;
}

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [Math.random() * 5 - 0.25, 10, 20] }}
        ready={ready}
      >
        <fog attach="fog" args={["rgb(250,0,0)", 8, 20]} />
        <Suspense fallback={null}>
          <VideoText ready={ready} position={[0, 0, -3]} />
          <Oscillator speed={0.2} amplitude={[0.05, 0.04, 0.02]}>
            <Card ready={ready} />
          </Oscillator>
          <Intro ready={ready} setReady={setReady} />
          <Stats showPanel={0} className="stats" />
        </Suspense>
      </Canvas>
      <Loader dataInterpolation={(p) => `${p.toFixed(2)}%`} />
    </>
  );
}

export default App;
