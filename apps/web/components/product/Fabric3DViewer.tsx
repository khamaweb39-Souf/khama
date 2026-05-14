'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
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
  Rotate3D, Info, Palette, 
  Layers, Smartphone, RefreshCw 
} from 'lucide-react';

// ─── Fabric Component ────────────────────────────────────────────────────────

const FabricMesh = ({ color, weaveType }: { color: string, weaveType: string }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Subtle animation to simulate gentle air movement
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time / 4) * 0.1;
      meshRef.current.position.y = Math.sin(time / 2) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Using a rounded box with distortion to simulate folded fabric */}
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3} 
          radius={1}
          roughness={0.4}
          metalness={0.05}
          bumpScale={0.02}
          // Weave texture simulation could go here
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
    <div className={`fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-10 transition-all duration-700 ${isFull ? 'p-0' : ''}`} dir="rtl">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/98 backdrop-blur-2xl animate-in fade-in duration-1000" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-6xl bg-[#0D0C0A] overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out border border-white/5 ${isFull ? 'h-full max-w-none rounded-0' : 'h-[85vh] rounded-[3.5rem]'}`}>
        
        {/* ─── 3D Viewport ─── */}
        <div className="absolute inset-0 z-0">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
            
            <Suspense fallback={<Html center><div className="flex flex-col items-center gap-4"><RefreshCw className="w-10 h-10 text-gold animate-spin" /><p className="text-gold font-black uppercase tracking-widest text-[10px]">Loading 3D Engine</p></div></Html>}>
              
              <PresentationControls 
                global 
                config={{ mass: 2, tension: 500 }} 
                snap={{ mass: 4, tension: 1500 }} 
                rotation={[0, 0.3, 0]} 
                polar={[-Math.PI / 3, Math.PI / 3]} 
                azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
              >
                <FabricMesh color={color} weaveType={weave} />
              </PresentationControls>

              <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              <Environment preset="studio" />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            </Suspense>
          </Canvas>
        </div>

        {/* ─── UI Overlays ─── */}
        
        {/* Top Controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10 pointer-events-none">
           <div className="pointer-events-auto space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight">{fabricName}</h2>
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-[9px] font-black text-gold uppercase tracking-widest">Interactive 3D</span>
                 <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest">Real-time PBR</span>
              </div>
           </div>
           <div className="flex gap-4 pointer-events-auto">
              <button 
                onClick={() => setIsFull(!isFull)}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-[1.5rem] border border-white/10 transition-all text-white/40 hover:text-white"
              >
                {isFull ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button 
                onClick={onClose}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-[1.5rem] border border-white/10 transition-all text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Floating Tool Panel */}
        <div className="absolute bottom-10 right-10 z-10 space-y-6 max-w-sm w-full animate-in slide-in-from-right-10 duration-1000">
           
           {/* Color Picker */}
           <div className="bg-[#1A1917]/80 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gold" /> اختر اللون
                 </h3>
                 <span className="text-[10px] font-bold text-white/20 uppercase">Real-time update</span>
              </div>
              <div className="flex flex-wrap gap-3">
                 {['#C9A84C', '#002366', '#4B0082', '#2F4F4F', '#8B0000', '#FFFFFF'].map((c) => (
                   <button 
                     key={c}
                     onClick={() => setColor(c)}
                     className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${color === c ? 'border-gold shadow-lg shadow-gold/20 scale-110' : 'border-transparent'}`}
                     style={{ backgroundColor: c }}
                   />
                 ))}
              </div>
           </div>

           {/* Weave Switcher */}
           <div className="bg-[#1A1917]/80 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-400" /> نوع النسج
                 </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                 {[
                   { id: 'Plain', label: 'سادة (Plain)' },
                   { id: 'Twill', label: 'سرجيل (Twill)' },
                   { id: 'Satin', label: 'ساتان (Satin)' },
                   { id: 'Jacquard', label: 'جاكارد (Jacq)' },
                 ].map((w) => (
                   <button 
                     key={w.id}
                     onClick={() => setWeave(w.id)}
                     className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${weave === w.id ? 'bg-gold text-charcoal shadow-lg' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
                   >
                      {w.label}
                   </button>
                 ))}
              </div>
           </div>

           {/* AR Action */}
           <button className="w-full py-5 bg-gold text-charcoal font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-gold/20 flex items-center justify-center gap-4 hover:scale-[1.02] transition-all group overflow-hidden relative">
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              شاهد في مكانك (AR) <Smartphone className="w-5 h-5" />
           </button>

        </div>

        {/* Interaction Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-3 animate-bounce">
           <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-gold rounded-full" />
           </div>
           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Drag to rotate • Scroll to zoom</p>
        </div>

        {/* Security / Info Badge */}
        <div className="absolute bottom-10 left-10 z-10">
           <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 text-white/40">
              <Rotate3D className="w-6 h-6" />
              <div className="space-y-0.5">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/60">3D Simulation Mode</p>
                 <p className="text-[9px] font-bold">المعاينة تقريبية للملمس والانسدال.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
