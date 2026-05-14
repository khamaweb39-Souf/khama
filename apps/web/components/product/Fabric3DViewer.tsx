'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  MeshDistortMaterial, 
  Html,
  Float,
  PresentationControls
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  X, Maximize2, Minimize2, 
  Rotate3D, Palette, 
  Layers, Smartphone, RefreshCw 
} from 'lucide-react';

// ─── Fabric Component ────────────────────────────────────────────────────────

const FabricMesh = ({ color, weaveType }: { color: string, weaveType: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time / 4) * 0.1;
      meshRef.current.position.y = Math.sin(time / 2) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.4, 160, 40]} />
        <MeshDistortMaterial 
          color={color} 
          speed={3} 
          distort={0.3} 
          radius={1}
          roughness={weaveType === 'Satin' ? 0.05 : weaveType === 'Twill' ? 0.3 : 0.7}
          metalness={weaveType === 'Satin' ? 0.4 : 0.05}
          bumpScale={weaveType === 'Jacquard' ? 0.08 : 0.01}
        />
      </mesh>
    </Float>
  );
};

// ─── Main Viewer Component ───────────────────────────────────────────────────

export default function Fabric3DViewer({ 
  isOpen, 
  onClose, 
  initialColor = '#C9A84C', 
  fabricName = 'قطن ساتان بريميوم' 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialColor?: string;
  fabricName?: string;
}) {
  const [color, setColor] = useState(initialColor);
  const [weave, setWeave] = useState('Satin');
  const [isFull, setIsFull] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full transition-all duration-700 ease-out flex flex-col ${isFull ? 'h-full' : 'h-[90vh] max-w-7xl mx-4 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden bg-[#0A0A0A]'}`}>
        
        {/* ─── Header ─── */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-50 pointer-events-none">
           <div className="pointer-events-auto">
              <h2 className="text-3xl font-black text-white tracking-tighter leading-none mb-2">{fabricName}</h2>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Simulation Interactive 3.0</span>
              </div>
           </div>
           <div className="flex gap-3 pointer-events-auto">
              <button 
                onClick={() => setIsFull(!isFull)}
                className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all"
              >
                {isFull ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button 
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-burgundy/20 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
           </div>
        </div>

        {/* ─── 3D Viewport ─── */}
        <div className="flex-1 relative">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
            
            <Suspense fallback={<Html center><div className="flex flex-col items-center gap-4"><RefreshCw className="w-10 h-10 text-gold animate-spin" /><p className="text-gold font-black uppercase tracking-widest text-[10px]">Rendering Material...</p></div></Html>}>
              
              <PresentationControls 
                global 
                config={{ mass: 2, tension: 500 }} 
                snap={{ mass: 4, tension: 1500 }} 
                rotation={[0, 0, 0]} 
                polar={[-Math.PI / 4, Math.PI / 4]} 
                azimuth={[-Math.PI / 2, Math.PI / 2]}
              >
                <FabricMesh color={color} weaveType={weave} />
              </PresentationControls>

              <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
              <Environment preset="studio" />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            </Suspense>
          </Canvas>
        </div>

        {/* ─── Sidebar Controls (Glassmorphism) ─── */}
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-center justify-between gap-6 z-50">
           
           {/* Color Selector */}
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 border-l border-white/10">
                 <Palette className="w-4 h-4 text-gold" />
                 <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Colors</span>
              </div>
              <div className="flex gap-2 p-1">
                 {['#C9A84C', '#0A0A0A', '#4A0E0E', '#0E2A47', '#1D4D3A', '#FFFFFF'].map((c) => (
                   <button 
                     key={c}
                     onClick={() => setColor(c)}
                     className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-125 ${color === c ? 'border-gold shadow-[0_0_15px_rgba(201,168,76,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                     style={{ backgroundColor: c }}
                   />
                 ))}
              </div>
           </div>

           {/* Weave Selector */}
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] flex items-center">
              {[
                { id: 'Plain', label: 'Plain' },
                { id: 'Twill', label: 'Twill' },
                { id: 'Satin', label: 'Satin' },
                { id: 'Jacquard', label: 'Jacq' },
              ].map((w) => (
                <button 
                  key={w.id}
                  onClick={() => setWeave(w.id)}
                  className={`px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${weave === w.id ? 'bg-gold text-charcoal shadow-lg' : 'text-white/40 hover:text-white'}`}
                >
                   {w.label}
                </button>
              ))}
           </div>

           {/* AR Action */}
           <button className="px-8 py-5 bg-gold text-charcoal font-black text-[11px] uppercase tracking-[0.2em] rounded-full shadow-[0_15px_30px_rgba(201,168,76,0.2)] flex items-center gap-4 hover:bg-white transition-all transform hover:-translate-y-1">
              Live in AR <Smartphone className="w-5 h-5" />
           </button>
        </div>

        {/* Interaction Hint */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6 text-white/20">
           <div className="flex flex-col items-center gap-2">
              <Rotate3D className="w-6 h-6 animate-pulse" />
              <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
           </div>
           <p className="vertical-text text-[8px] font-black uppercase tracking-[0.6em] whitespace-nowrap">Explore Material Physics</p>
        </div>

      </div>
      
      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
