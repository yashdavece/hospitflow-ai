import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import type { Bed } from '@/types';

interface BedBoxProps {
  bed: Bed;
  onClick: (bed: Bed) => void;
  isSelected: boolean;
}

function BedBox({ bed, onClick, isSelected }: BedBoxProps) {
  const [hovered, setHovered] = useState(false);

  const colorMap: Record<string, string> = {
    available: '#FFFFFF',
    occupied: '#EF4444',
    cleaning: '#FBBF24',
    icu: '#3B82F6',
  };

  const color = colorMap[bed.status] || '#FFFFFF';

  return (
    <group position={[bed.position_x, 0.3, bed.position_z]}>
      {/* Bed frame */}
      <mesh
        onClick={() => onClick(bed)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.4, 0.3, 0.7]} />
        <meshStandardMaterial
          color={color}
          emissive={isSelected ? '#818CF8' : hovered ? '#E0E7FF' : '#000000'}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.3 : 0}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Bed headboard */}
      <mesh position={[0, 0.4, -0.35]}>
        <boxGeometry args={[1.4, 0.5, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Bed number label */}
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.15}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
      >
        {bed.bed_number}
      </Text>

      {/* Status indicator */}
      {bed.status === 'occupied' && (
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Hover tooltip */}
      {hovered && (
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.12}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {`${bed.bed_number} - ${bed.status.toUpperCase()}`}
          {bed.patient_name && `\n${bed.patient_name}`}
        </Text>
      )}
    </group>
  );
}

interface RoomLabelProps {
  roomNumber: string;
  position: [number, number, number];
}

function RoomLabel({ roomNumber, position }: RoomLabelProps) {
  return (
    <Text
      position={[position[0], 1.5, position[2]]}
      fontSize={0.2}
      color="#6B7280"
      anchorX="center"
      anchorY="middle"
    >
      Room {roomNumber}
    </Text>
  );
}

interface BedMap3DProps {
  beds: Bed[];
  currentFloor: number;
  onBedClick: (bed: Bed) => void;
  selectedBed: Bed | null;
}

export default function BedMap3D({ beds, currentFloor, onBedClick, selectedBed }: BedMap3DProps) {
  const floorBeds = beds.filter((b) => b.floor === currentFloor);

  // Group beds by room for room labels
  const rooms = [...new Set(floorBeds.map((b) => b.room_number))];

  return (
    <div className="w-full h-[600px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 12, 12]} fov={60} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.3} />

        {/* Orbit controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.2}
        />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#F3F4F6" />
        </mesh>

        {/* Grid */}
        <gridHelper args={[30, 30, '#D1D5DB', '#E5E7EB']} position={[0, 0.01, 0]} />

        {/* Beds */}
        {floorBeds.map((bed) => (
          <BedBox
            key={bed.id}
            bed={bed}
            onClick={onBedClick}
            isSelected={selectedBed?.id === bed.id}
          />
        ))}

        {/* Room labels */}
        {rooms.map((roomNumber) => {
          const roomBeds = floorBeds.filter((b) => b.room_number === roomNumber);
          if (roomBeds.length === 0) return null;
          
          // Calculate room center
          const avgX = roomBeds.reduce((sum, b) => sum + b.position_x, 0) / roomBeds.length;
          const avgZ = roomBeds.reduce((sum, b) => sum + b.position_z, 0) / roomBeds.length;
          
          return (
            <RoomLabel
              key={roomNumber}
              roomNumber={roomNumber}
              position={[avgX, 0, avgZ]}
            />
          );
        })}

        {/* Floor number label */}
        <Text
          position={[0, 0, -12]}
          fontSize={0.5}
          color="#4B5563"
          anchorX="center"
          anchorY="middle"
        >
          FLOOR {currentFloor}
        </Text>
      </Canvas>
    </div>
  );
}
