// BUILD_TEST_1790117270
'use client'

import React, { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// local reduced motion hook to avoid import issues
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    mq.addEventListener('change', e => setReduced(e.matches))
  }, [])
  return reduced
}

// ── helper: create gradient mesh geometry ──────────────────────────────
const createGradientMesh = () => {
  const count = 900
  const positions = new Float32Array(count * 3)
  const normals = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  const palette = [0xEA580C, 0xD97706, 0xFB923C, 0xFDBA74]

  for (let i = 0; i < count; i++) {
    // spherical distribution with radial displacement
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 6 + Math.random() * 6

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // normal (approximate, for lighting)
    const len = Math.sqrt(x * x + y * y + z * z)
    normals[i * 3] = len > 0 ? x / len : 0
    normals[i * 3 + 1] = len > 0 ? y / len : 0
    normals[i * 3 + 2] = len > 0 ? z / len : 0

    // color from palette based on stable seed
    const seed = i * 0.618033988749895 // golden ratio
    const pIdx = Math.floor((seed % palette.length + palette.length) % palette.length)
    const c = palette[pIdx]
    colors[i * 3] = ((c & 0xFF0000) >> 16) / 255
    colors[i * 3 + 1] = ((c & 0x00FF00) >> 8) / 255
    colors[i * 3 + 2] = (c & 0x0000FF) / 255
  }

  return { positions, normals, colors }
}

// ── HeroScene ────────────────────────────────────────────────────────
export function HeroScene() {
  const { camera, gl, size } = useThree()
  const time = useRef(0)
  const isMobile = typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)
  const reducedMotion = useReducedMotion()

  // ── build the gradient geometry once ───────────────────────────────
  const { positions, normals, colors } = useMemo(createGradientMesh, [])
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()

  // ── shader materials ───────────────────────────────────────────────
  const vertexShader = /* glsl */`
    uniform time;
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec3 color;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vColor;
    
    void main() {
      vec3 displaced = position + normal * sin(time + position.y * 3.0 + position.x * 2.0) * 0.12;
      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;
      vColor = color;
    }
  `

  const fragmentShader = /* glsl */`
    uniform time;
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vColor;
    
    void main() {
      float r = length(vWorldPos) * 0.7;
      float g = smoothstep(0.5, 1.0, r);
      
      vec3 col1 = vec3(0xEA580C);
      vec3 col2 = vec3(0xD97706);
      vec3 col3 = vec3(0xFB923C);
      
      float t = time * 0.08;
      vec3 color = mix(col1, col2, sin(t * 0.7 + 1.5) * 0.5 + 0.5);
      color = mix(color, col3, sin(t * 0.5 + 0.5) * 0.5 + 0.5);
      
      float nl = dot(normalize(vNormal), normalize(vWorldPos));
      float ambient = 0.4;
      vec3 light = vec3(0.5, 0.7, 1.0);
      vec3 diffuse = max(dot(normalize(vNormal), normalize(light - vWorldPos)), 0.0) * 0.8;
      
      vec3 colorOut = ambient + diffuse + color * g;
      gl_FragColor = vec4(colorOut + sin(time * 0.2) * 0.02, 0.02);
    }
  `

  // ── Three.js setup ────────────────────────────────────────────────
  const meshRef = useRef<THREE.Mesh | null>(null)

  useFrame((state: any) => {
    time.current = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time.current * 0.01
      meshRef.current.rotation.x = Math.sin(time.current * 0.005) * 0.01
      const mat = meshRef.current.material as THREE.ShaderMaterial
      if (mat.uniforms.time) mat.uniforms.time.value = time.current
    }
  })

  // ── visibility ─────────────────────────────────────────────────────
  if (reducedMotion) return null
  if (isMobile) return null

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      geometry={geometry}
    >
      <shaderMaterial
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
        vertexColors
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}