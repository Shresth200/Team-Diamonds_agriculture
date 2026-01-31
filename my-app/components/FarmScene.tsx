"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Float } from "@react-three/drei";
import * as ONE from "three";

function Model(props: any) {
     const { scene } = useGLTF("/farm_scene.glb");
     const modelRef = useRef<ONE.Group>(null);

     useFrame((state) => {
          if (modelRef.current) {
               // Subtle floating movement
               modelRef.current.rotation.y += 0.002;
          }
     });

     return (
          <primitive
               object={scene}
               ref={modelRef}
               {...props}
               scale={[0.1, 0.1, 0.1]} // Adjust scale as needed, usually GLB models are large
          />
     );
}

export default function FarmScene() {
     return (
          <div className="w-full h-full min-h-[400px]">
               <Canvas
                    camera={{ position: [5, 2, 5], fov: 45 }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
               >
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                         <Model position={[0, -1, 0]} />
                    </Float>

                    <Environment preset="city" />
                    <OrbitControls
                         enableZoom={false}
                         enablePan={false}
                         minPolarAngle={Math.PI / 4}
                         maxPolarAngle={Math.PI / 2}
                         autoRotate
                         autoRotateSpeed={0.5}
                    />
               </Canvas>
          </div>
     );
}

useGLTF.preload("/farm_scene.glb");
