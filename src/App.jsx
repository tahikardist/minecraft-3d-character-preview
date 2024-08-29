import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

extend({ OrbitControls });

let grassPosition = Array(50)
  .fill(0)
  .map(() => [Math.random() * 40 - 20, 0, Math.random() * 40 - 20]);
let treesPosition = Array(10)
  .fill(0)
  .map(() => [Math.random() * 30 - 15, 0, Math.random() * 30 - 15]);

const items = {
  helmet: { label: "Шлем", color: "#A0A0A0", position: [0, 1.4, 0], size: [1.05, 1.05, 1.05] },
  chestplate: { label: "Нагрудник", color: "#A0A0A0", position: [0, 0.2, 0.15], size: [1.05, 1.55, 0.55] },
  leggings: { label: "Поножи", color: "#A0A0A0", position: [0, -1, 0.05], size: [1.05, 1, 0.55] },
  boots: { label: "Сапоги", color: "#A0A0A0", position: [0, -1.8, 0.05], size: [1.05, 0.5, 0.55] },
  sword: { label: "Меч", color: "#808080", position: [0.8, 0, 0.5], size: [0.2, 2, 0.1] },
};

function SteveCharacter({ equippedItems }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.8, 0]}>
      {/* Тело */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#4C97EA" />
      </mesh>
      {/* Голова */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FFC89D" />
      </mesh>
      {/* Руки */}
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#4C97EA" />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#4C97EA" />
      </mesh>
      {/* Ноги */}
      <mesh position={[-0.2, -1.2, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#1D4999" />
      </mesh>
      <mesh position={[0.2, -1.2, 0]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#1D4999" />
      </mesh>
      {/* Волосы */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.02, 0.1, 1.02]} />
        <meshStandardMaterial color="#4F3824" />
      </mesh>
      {/* Глаза */}
      <mesh position={[0.2, 1.15, 0.51]}>
        <boxGeometry args={[0.2, 0.2, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.2, 1.15, 0.51]}>
        <boxGeometry args={[0.2, 0.2, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.2, 1.15, 0.52]}>
        <boxGeometry args={[0.1, 0.1, 0.01]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>
      <mesh position={[-0.2, 1.15, 0.52]}>
        <boxGeometry args={[0.1, 0.1, 0.01]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>
      {/* Рот */}
      <mesh position={[0, 0.8, 0.51]}>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>
      {/* Надетое снаряжение */}
      {Object.entries(equippedItems).map(([itemName, isEquipped]) => {
        if (isEquipped && items[itemName]) {
          const { color, position, size } = items[itemName];
          return (
            <mesh key={itemName} position={position}>
              <boxGeometry args={size} />
              <meshStandardMaterial color={color} />
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

function MinecraftTerrain() {
  return (
    <group>
      {/* Земля */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5C832F" />
      </mesh>
      {/* Блоки с землей */}
      {[...Array(50)].map((_, i) => (
        <mesh key={i} position={grassPosition[i]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#8B4513" />
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.01, 0.1, 1.01]} />
            <meshStandardMaterial color="#7CFC00" />
          </mesh>
        </mesh>
      ))}
      {/* Деревья */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={treesPosition[i]}>
          <mesh position={[0, 2, 0]}>
            <boxGeometry args={[1, 4, 1]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          <mesh position={[0, 4.5, 0]}>
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene({ equippedItems }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 1.8, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SteveCharacter equippedItems={equippedItems} />
      <MinecraftTerrain />
      <OrbitControls target={[0, 1.8, 0]} maxPolarAngle={Math.PI / 2} />
    </>
  );
}

export default function App() {
  const [equippedItems, setEquippedItems] = useState({
    helmet: false,
    chestplate: false,
    leggings: false,
    boots: false,
    sword: false,
  });

  const handleItemToggle = (item) => {
    setEquippedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="w-full p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3 h-[400px]">
        <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
          <Scene equippedItems={equippedItems} />
        </Canvas>
      </div>
      <Card className="w-full md:w-1/3">
        <CardContent className="p-4">
          <h2 className="text-2xl font-bold mb-4">Снаряжение</h2>
          <div className="space-y-2">
            {Object.keys(items).map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox id={item} checked={equippedItems[item]} onCheckedChange={() => handleItemToggle(item)} />
                <Label htmlFor={item} className="capitalize">
                  {items[item].label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
