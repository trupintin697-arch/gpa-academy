"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Center, Sparkles } from "@react-three/drei";
function FloatingLogo() {
    const groupRef = useRef(null);
    const ringRef = useRef(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.22;
            groupRef.current.rotation.x = Math.cos(t * 0.35) * 0.06;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.25;
            ringRef.current.rotation.x = 1.15 + Math.sin(t * 0.4) * 0.08;
        }
    });
    return (<Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} scale={0.82}>
        {/* Smooth Glowing Orbital Ring */}
        <mesh ref={ringRef} position={[0, 0, -0.15]}>
          <torusGeometry args={[2.2, 0.045, 12, 64]}/>
          <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.65} roughness={0.2} metalness={0.85}/>
        </mesh>

        {/* 3D GPA Text using the same navy + red brand gradient as the rest of the app */}
        <Center>
          <group>
            {/* Letter "G" in Metallic Navy (brand gradient start) */}
            <Text3D position={[0, 0, 0]} font="/fonts/helvetiker_bold.typeface.json" size={1.4} height={0.4} curveSegments={6} bevelEnabled bevelThickness={0.05} bevelSize={0.025} bevelOffset={0} bevelSegments={3}>
              G
              <meshStandardMaterial color="#00154D" metalness={0.8} roughness={0.15} emissive="#00154D" emissiveIntensity={0.4}/>
            </Text3D>

            {/* Letter "P" in Metallic Crimson Red (brand gradient end) */}
            <Text3D position={[1.52, 0, 0]} font="/fonts/helvetiker_bold.typeface.json" size={1.4} height={0.4} curveSegments={6} bevelEnabled bevelThickness={0.05} bevelSize={0.025} bevelOffset={0} bevelSegments={3}>
              P
              <meshStandardMaterial color="#DC2626" metalness={0.75} roughness={0.18} emissive="#7F1D1D" emissiveIntensity={0.25}/>
            </Text3D>

            {/* Letter "A" in Metallic Crimson Red (brand gradient end) */}
            <Text3D position={[2.82, 0, 0]} font="/fonts/helvetiker_bold.typeface.json" size={1.4} height={0.4} curveSegments={6} bevelEnabled bevelThickness={0.05} bevelSize={0.025} bevelOffset={0} bevelSegments={3}>
              A
              <meshStandardMaterial color="#DC2626" metalness={0.75} roughness={0.18} emissive="#7F1D1D" emissiveIntensity={0.25}/>
            </Text3D>
          </group>
        </Center>
      </group>
    </Float>);
}
export default function HeroScene() {
    return (<div className="h-[380px] sm:h-[460px] md:h-[560px] w-full relative z-0 pointer-events-auto flex items-center justify-center overflow-visible">
      <Canvas camera={{ position: [0, 0, 9.4], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={1.8}/>
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff"/>
        <pointLight position={[-10, -5, -5]} intensity={2.5} color="#1a2f6b"/>
        <directionalLight position={[0, 10, 5]} intensity={2} color="#ffffff"/>

        <Suspense fallback={null}>
          <FloatingLogo />
        </Suspense>

        <Sparkles count={40} scale={8} size={3} speed={0.4} opacity={0.7} color="#DC2626"/>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} maxPolarAngle={Math.PI / 2 + 0.15} minPolarAngle={Math.PI / 2 - 0.15}/>
      </Canvas>
    </div>);
}
