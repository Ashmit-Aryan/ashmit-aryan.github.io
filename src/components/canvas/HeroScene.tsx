'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface GraphNode {
  id: string
  type: 'project' | 'skill'
  label: string
  category: string
  proficiency?: number
  featured?: boolean
  position: THREE.Vector3
  connections: string[]
  color: number
  size: number
}

interface Packet {
  id: number
  progress: number
  speed: number
  color: number
  sourceId: string
  targetId: string
}

const CATEGORY_COLORS: Record<string, number> = {
  languages: 0xea580c,
  frameworks: 0xd97706,
  devops: 0xf97316,
  tools: 0xfb923c,
  concepts: 0xfdba74,
  systems: 0xea580c,
  hackathons: 0xd97706,
  backend: 0xf97316,
  opensource: 0xfb923c,
  fullstack: 0xfdba74,
}

const PROJECTS_DATA = [
  {
    id: 'deployguard',
    label: 'DeployGuard',
    category: 'systems',
    featured: true,
    skills: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'DevOps'],
  },
  {
    id: 'chatapp',
    label: 'Chat App',
    category: 'fullstack',
    featured: true,
    skills: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'JWT'],
  },
  {
    id: 'hms',
    label: 'Hospital Mgmt',
    category: 'fullstack',
    featured: true,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
  },
  {
    id: 'sms',
    label: 'Student Mgmt',
    category: 'backend',
    featured: true,
    skills: ['Java', 'Servlets', 'JSP', 'JDBC', 'MySQL'],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    category: 'fullstack',
    featured: true,
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Recharts'],
  },
  {
    id: 'nasa',
    label: 'NASA APOD',
    category: 'opensource',
    featured: false,
    skills: ['Android', 'Java', 'REST API', 'Mobile'],
  },
]

const SKILLS_DATA = [
  { name: 'Python', category: 'languages', level: 88 },
  { name: 'TypeScript', category: 'languages', level: 85 },
  { name: 'C', category: 'languages', level: 90 },
  { name: 'Java', category: 'languages', level: 90 },

  { name: 'FastAPI', category: 'frameworks', level: 90 },
  { name: 'React', category: 'frameworks', level: 85 },
  { name: 'Node.js', category: 'frameworks', level: 85 },

  { name: 'Docker', category: 'devops', level: 88 },
  { name: 'Kubernetes', category: 'devops', level: 75 },
  { name: 'GitHub Actions', category: 'devops', level: 90 },
  { name: 'Linux', category: 'devops', level: 85 },

  { name: 'Git', category: 'tools', level: 95 },
  { name: 'VS Code', category: 'tools', level: 95 },

  { name: 'System Programming', category: 'concepts', level: 88 },
  { name: 'API Design', category: 'concepts', level: 90 },
  { name: 'DSA', category: 'concepts', level: 92 },
]

function createNodes(): GraphNode[] {
  const nodes: GraphNode[] = []
  const radius = 18
  const centerY = 0

  PROJECTS_DATA.forEach((project, index) => {
    const angle =
      (index / PROJECTS_DATA.length) * Math.PI * 2 - Math.PI / 2

    const radiusOffset = radius + (project.featured ? 0 : 4)

    nodes.push({
      id: project.id,
      type: 'project',
      label: project.label,
      category: project.category,
      featured: project.featured,
      position: new THREE.Vector3(
        radiusOffset * Math.cos(angle),
        centerY + (Math.random() - 0.5) * 4,
        radiusOffset * Math.sin(angle),
      ),
      connections: [],
      color: CATEGORY_COLORS[project.category] ?? 0xea580c,
      size: project.featured ? 0.9 : 0.6,
    })


  })

  const skillsByCategory: Record<string, typeof SKILLS_DATA> = {}

  SKILLS_DATA.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = []
    }


    skillsByCategory[skill.category].push(skill)


  })

  const categories = [
    'languages',
    'frameworks',
    'devops',
    'tools',
    'concepts',
  ]

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    const topSkills = [...skills]
      .sort((a, b) => b.level - a.level)
      .slice(0, 3)

    const categoryIndex = categories.indexOf(category)

    if (categoryIndex === -1) {
      return
    }

    const categoryAngle =
      categoryIndex * ((Math.PI * 2) / categories.length)

    const categoryRadius = radius * 0.55

    topSkills.forEach((skill, index) => {
      const angle = categoryAngle + (index - 1) * 0.4
      const skillRadius = categoryRadius + Math.random() * 2

      nodes.push({
        id: `skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`,
        type: 'skill',
        label: skill.name,
        category,
        proficiency: skill.level,
        position: new THREE.Vector3(
          skillRadius * Math.cos(angle),
          centerY + (Math.random() - 0.5) * 3,
          skillRadius * Math.sin(angle),
        ),
        connections: [],
        color: CATEGORY_COLORS[category] ?? 0xea580c,
        size: 0.35 + (skill.level / 100) * 0.25,
      })
    })


  })

  const projectNodes = nodes.filter((node) => node.type === 'project')
  const skillNodes = nodes.filter((node) => node.type === 'skill')

  projectNodes.forEach((project) => {
    const projectData = PROJECTS_DATA.find(
      (item) => item.id === project.id,
    )

    projectData?.skills.forEach((skillName) => {
      const skillNode = skillNodes.find(
        (skill) =>
          skill.label.toLowerCase() === skillName.toLowerCase(),
      )

      if (!skillNode) {
        return
      }

      project.connections.push(skillNode.id)
      skillNode.connections.push(project.id)
    })

  })

  return nodes
}

const NODES = createNodes()
const NODE_MAP = new Map(NODES.map((node) => [node.id, node]))

function createLabelTexture(text: string) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  canvas.width = 256
  canvas.height = 64

  context.fillStyle = 'rgba(10, 14, 20, 0.92)'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.strokeStyle = '#EA580C'
  context.lineWidth = 2
  context.strokeRect(
    2,
    2,
    canvas.width - 4,
    canvas.height - 4,
  )

  context.font = 'bold 20px "Space Grotesk", sans-serif'
  context.fillStyle = '#f0f4f8'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  context.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  return texture
}

interface NetworkNodesProps {
  time: React.MutableRefObject<number>
  hoveredNode: GraphNode | null
  reducedMotion: boolean
  nodesRef: React.MutableRefObject<Map<string, THREE.Mesh>>
}

function NetworkNodes({
  time,
  hoveredNode,
  reducedMotion,
  nodesRef,
}: NetworkNodesProps) {
  const groupRef = useRef<THREE.Group>(null)

  const labels = useMemo(() => {
    if (reducedMotion) {
      return []
    }


    return NODES.map((node) => {
      const texture = createLabelTexture(node.label)

      if (!texture) {
        return null
      }

      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
      })

      const sprite = new THREE.Sprite(material)

      sprite.scale.set(5, 1.25, 1)
      sprite.userData = {
        nodeId: node.id,
      }

      return sprite
    }).filter(Boolean) as THREE.Sprite[]


  }, [reducedMotion])

  useEffect(() => {
    return () => {
      labels.forEach((label) => {
        label.material.map?.dispose()
        label.material.dispose()
      })
    }
  }, [labels])

  useEffect(() => {
    const map = nodesRef.current


    return () => {
      map.clear()
    }


  }, [nodesRef])

  useFrame((state) => {
    const group = groupRef.current


    if (!group) {
      return
    }

    const t = time.current

    group.rotation.y = reducedMotion ? 0 : t * 0.008
    group.rotation.x = reducedMotion
      ? 0
      : Math.sin(t * 0.05) * 0.03

    group.children.forEach((child) => {
      const mesh = child as THREE.Mesh

      if (!(mesh.userData?.node instanceof Object)) {
        return
      }

      const node = mesh.userData.node as GraphNode
      const originalPosition =
        mesh.userData.originalPosition as THREE.Vector3

      if (!reducedMotion) {
        mesh.position.x =
          originalPosition.x +
          Math.sin(t * 0.3 + node.id.length) * 0.15

        mesh.position.y =
          originalPosition.y +
          Math.cos(t * 0.25 + node.id.length) * 0.15

        mesh.position.z =
          originalPosition.z +
          Math.sin(t * 0.2 + node.id.length) * 0.15

        const pulseScale =
          1 +
          Math.sin(t * 1.2 + node.id.length) *
          0.05 *
          (node.proficiency ? node.proficiency / 100 : 1)

        const currentScale =
          mesh.userData.currentScale ?? 1

        mesh.userData.currentScale = THREE.MathUtils.lerp(
          currentScale,
          pulseScale,
          0.05,
        )

        mesh.scale.setScalar(mesh.userData.currentScale)
      }

      const label = labels.find(
        (item) => item.userData.nodeId === node.id,
      )

      if (label) {
        const worldPosition = new THREE.Vector3()

        mesh.getWorldPosition(worldPosition)
        label.position.copy(worldPosition)
        label.position.y += node.size + 0.8

        const isHovered = hoveredNode?.id === node.id

        label.material.opacity = isHovered ? 1 : 0

        label.scale.setScalar(isHovered ? 1.1 : 1)
      }
    })


  })

  return (<group ref={groupRef}>
    {NODES.map((node) => (
      <mesh
        key={node.id}
        ref={(mesh) => {
          if (mesh) {
            mesh.userData = {
              node,
              originalPosition: node.position.clone(),
              currentScale: 1,
            }

            nodesRef.current.set(node.id, mesh)
          } else {
            nodesRef.current.delete(node.id)
          }
        }}
        position={node.position}
      >
        <sphereGeometry
          args={[node.size, 16, 16]}
        />

        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={node.type === 'project' ? 0.95 : 0.85}
        />
      </mesh>
    ))}

    {!reducedMotion &&
      labels.map((label) => (
        <primitive
          key={label.userData.nodeId}
          object={label}
        />
      ))}
  </group>


  )
}

function NetworkEdges() {
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  const positions = useMemo(() => {
    const data: number[] = []


    NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        if (node.id >= targetId) {
          return
        }

        const target = NODE_MAP.get(targetId)

        if (!target) {
          return
        }

        data.push(
          node.position.x,
          node.position.y,
          node.position.z,
          target.position.x,
          target.position.y,
          target.position.z,
        )
      })
    })

    return new Float32Array(data)


  }, [])

  useFrame(() => {
    const geometry = geometryRef.current


    if (!geometry) {
      return
    }

    const positionAttribute =
      geometry.getAttribute('position')

    if (!positionAttribute) {
      return
    }

    let offset = 0

    NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        if (node.id >= targetId) {
          return
        }

        const target = NODE_MAP.get(targetId)

        if (!target) {
          return
        }

        positionAttribute.setXYZ(
          offset,
          node.position.x,
          node.position.y,
          node.position.z,
        )

        positionAttribute.setXYZ(
          offset + 1,
          target.position.x,
          target.position.y,
          target.position.z,
        )

        offset += 2
      })
    })

    positionAttribute.needsUpdate = true


  })

  return (<lineSegments> <bufferGeometry ref={geometryRef}>
    <bufferAttribute
      attach="attributes-position"
      args={[positions, 3]}
    /> </bufferGeometry>


    <lineBasicMaterial
      color={0xea580c}
      transparent
      opacity={0.18}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </lineSegments>


  )
}

function PacketFlow({
  time,
  reducedMotion,
}: {
  time: React.MutableRefObject<number>
  reducedMotion: boolean
}) {
  const packetsRef = useRef<Packet[]>([])
  const pointsRef = useRef<THREE.Points>(null)
  const positionsRef = useRef<Float32Array>(
    new Float32Array(60 * 3),
  )

  useFrame((_, delta) => {
    const points = pointsRef.current

    if (!points || reducedMotion) {
      return
    }

    const positions = positionsRef.current
    const t = time.current

    if (
      packetsRef.current.length < 60 &&
      Math.random() < 0.08
    ) {
      const projectNodes = NODES.filter(
        (node) => node.type === 'project',
      )

      if (projectNodes.length > 0) {
        const source =
          projectNodes[
          Math.floor(
            Math.random() * projectNodes.length,
          )
          ]

        const connectedSkills = source.connections
          .map((id) => NODE_MAP.get(id))
          .filter(Boolean) as GraphNode[]

        if (connectedSkills.length > 0) {
          const target =
            connectedSkills[
            Math.floor(
              Math.random() * connectedSkills.length,
            )
            ]

          packetsRef.current.push({
            id: Date.now() + Math.random(),
            progress: 0,
            speed: 0.5 + Math.random() * 0.5,
            color: source.color,
            sourceId: source.id,
            targetId: target.id,
          })
        }
      }
    }

    packetsRef.current.forEach((packet, index) => {
      const source = NODE_MAP.get(packet.sourceId)
      const target = NODE_MAP.get(packet.targetId)

      if (!source || !target) {
        packet.progress = 1.1
        return
      }

      packet.progress += packet.speed * delta

      if (packet.progress >= 1) {
        packet.progress = 1.1
        return
      }

      const sourceX =
        source.position.x +
        Math.sin(t * 0.3 + source.id.length) * 0.15

      const sourceY =
        source.position.y +
        Math.cos(t * 0.25 + source.id.length) * 0.15

      const sourceZ =
        source.position.z +
        Math.sin(t * 0.2 + source.id.length) * 0.15

      const targetX =
        target.position.x +
        Math.sin(t * 0.3 + target.id.length) * 0.15

      const targetY =
        target.position.y +
        Math.cos(t * 0.25 + target.id.length) * 0.15

      const targetZ =
        target.position.z +
        Math.sin(t * 0.2 + target.id.length) * 0.15

      const p = packet.progress

      const index3 = index * 3

      positions[index3] =
        sourceX + (targetX - sourceX) * p

      positions[index3 + 1] =
        sourceY +
        (targetY - sourceY) * p +
        Math.sin(p * Math.PI) * 0.5

      positions[index3 + 2] =
        sourceZ + (targetZ - sourceZ) * p
    })

    packetsRef.current = packetsRef.current.filter(
      (packet) => packet.progress <= 1,
    )

    points.geometry.attributes.position.needsUpdate = true


  })

  return (<points ref={pointsRef}> <bufferGeometry>
    <bufferAttribute
      attach="attributes-position"
      args={[positionsRef.current, 3]}
    /> </bufferGeometry>


    <pointsMaterial
      color={0xff8a3d}
      size={0.18}
      transparent
      opacity={0.85}
      sizeAttenuation
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </points>


  )
}

function BackgroundMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) {
      return
    }


    const elapsed = state.clock.getElapsedTime()

    meshRef.current.rotation.y = elapsed * 0.002
    meshRef.current.rotation.x =
      Math.sin(elapsed * 0.01) * 0.01


  })

  return (
  <mesh ref={meshRef}>
    <sphereGeometry args={[60, 32, 32]} />
    <meshBasicMaterial
      color={0x0a0e14}
      transparent
      opacity={0.05}
      side={THREE.BackSide}
      wireframe
    />
  </mesh>


  )
}

export function HeroScene() {
  const { camera, gl } = useThree()

  const time = useRef(0)
  const mouse = useRef(new THREE.Vector2())
  const raycaster = useRef(new THREE.Raycaster())

  const nodesRef = useRef<Map<string, THREE.Mesh>>(
    new Map(),
  )

  const [hoveredNode, setHoveredNode] =
    useState<GraphNode | null>(null)

  const [reducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }


    return window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches


  })

  useEffect(() => {
    gl.setPixelRatio(
      Math.min(window.devicePixelRatio, 2),
    )
  }, [gl])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )
    }


    window.addEventListener(
      'mousemove',
      handleMouseMove,
    )

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      )
    }


  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const parallax = window.scrollY * 0.0003


      camera.position.y = parallax * 8
      camera.lookAt(0, parallax * 8, 0)
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      )
    }


  }, [camera])

  useFrame((_, delta) => {
    time.current += delta
  })

  useFrame(() => {
    if (reducedMotion) {
      return
    }


    const meshes = Array.from(
      nodesRef.current.values(),
    )

    if (meshes.length === 0) {
      return
    }

    raycaster.current.setFromCamera(
      mouse.current,
      camera,
    )

    const intersections =
      raycaster.current.intersectObjects(meshes)

    if (intersections.length > 0) {
      const node =
        intersections[0].object.userData
          ?.node as GraphNode | undefined

      if (node && node.id !== hoveredNode?.id) {
        setHoveredNode(node)
      }
    } else if (hoveredNode) {
      setHoveredNode(null)
    }


  })

  return (
    <> <BackgroundMesh />


      <NetworkEdges />

      <NetworkNodes
        time={time}
        hoveredNode={hoveredNode}
        reducedMotion={reducedMotion}
        nodesRef={nodesRef}
      />

      {!reducedMotion && (
        <PacketFlow
          time={time}
          reducedMotion={reducedMotion}
        />
      )}
    </>

  )
}
