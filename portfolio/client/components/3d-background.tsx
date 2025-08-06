import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  isDark: boolean
}

export function ThreeBackground({ isDark }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<THREE.Points>()
  const meshRef = useRef<THREE.Mesh>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!mountRef.current || isInitialized) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create enhanced neural network particles
    const particleCount = 1500
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Create clusters for more organic look
      const cluster = Math.floor(i / 100)
      const clusterX = (cluster % 5 - 2) * 8
      const clusterY = (Math.floor(cluster / 5) - 1) * 8
      
      positions[i * 3] = clusterX + (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      // Vary particle sizes
      sizes[i] = Math.random() * 3 + 1

      // Color based on theme and position
      const color = new THREE.Color()
      const distance = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2)
      
      if (distance < 3) {
        // Core particles - bright green
        color.setHSL(0.3, 0.9, isDark ? 0.7 : 0.5)
      } else if (Math.random() > 0.6) {
        // Sky blue accents
        color.setHSL(0.55, 0.8, isDark ? 0.8 : 0.6)
      } else {
        // Green variations
        color.setHSL(0.3, 0.7, isDark ? 0.5 : 0.4)
      }
      
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Enhanced particle material with custom shader
    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.9 : 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(geometry, material)
    particlesRef.current = particles
    scene.add(particles)

    // Create dynamic connecting lines
    const createConnections = () => {
      const lineGeometry = new THREE.BufferGeometry()
      const lineMaterial = new THREE.LineBasicMaterial({
        color: isDark ? 0x22c55e : 0x0ea5e9,
        transparent: true,
        opacity: 0.15
      })

      const linePositions: number[] = []
      const maxConnections = 300
      let connectionCount = 0

      for (let i = 0; i < particleCount && connectionCount < maxConnections; i += 3) {
        for (let j = i + 3; j < particleCount && connectionCount < maxConnections; j += 7) {
          const dx = positions[i * 3] - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 4) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            )
            connectionCount++
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
      scene.add(lines)
      return lines
    }

    const lines = createConnections()

    // Add floating geometric shapes
    const createFloatingShapes = () => {
      const shapes: THREE.Mesh[] = []
      
      // Icosahedron
      const icoGeometry = new THREE.IcosahedronGeometry(0.8, 0)
      const icoMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x22c55e : 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })
      const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial)
      icosahedron.position.set(-8, 4, -3)
      scene.add(icosahedron)
      shapes.push(icosahedron)

      // Torus
      const torusGeometry = new THREE.TorusGeometry(1, 0.3, 8, 16)
      const torusMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x0ea5e9 : 0x22c55e,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      })
      const torus = new THREE.Mesh(torusGeometry, torusMaterial)
      torus.position.set(8, -3, -5)
      scene.add(torus)
      shapes.push(torus)

      // Octahedron
      const octaGeometry = new THREE.OctahedronGeometry(1.2, 0)
      const octaMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? 0x22c55e : 0x0ea5e9,
        wireframe: true,
        transparent: true,
        opacity: 0.25
      })
      const octahedron = new THREE.Mesh(octaGeometry, octaMaterial)
      octahedron.position.set(0, 6, -8)
      scene.add(octahedron)
      shapes.push(octahedron)

      return shapes
    }

    const floatingShapes = createFloatingShapes()

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      if (particlesRef.current) {
        // Gentle rotation with mouse influence
        particlesRef.current.rotation.x = elapsedTime * 0.0005 + mouseRef.current.y * 0.05
        particlesRef.current.rotation.y = elapsedTime * 0.001 + mouseRef.current.x * 0.05
        
        // Subtle breathing effect
        const breathe = Math.sin(elapsedTime * 0.5) * 0.02
        particlesRef.current.scale.setScalar(1 + breathe)
      }

      // Animate connecting lines
      lines.rotation.x = elapsedTime * 0.0003
      lines.rotation.y = elapsedTime * 0.0007

      // Animate floating shapes
      floatingShapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * (0.003 + index * 0.001)
        shape.rotation.y = elapsedTime * (0.002 + index * 0.0015)
        shape.rotation.z = elapsedTime * (0.001 + index * 0.0008)
        
        // Floating motion
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.01
        shape.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.005
      })

      // Camera subtle movement based on mouse
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    setIsInitialized(true)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      floatingShapes.forEach(shape => {
        shape.geometry.dispose()
        if (Array.isArray(shape.material)) {
          shape.material.forEach(mat => mat.dispose())
        } else {
          shape.material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [isDark, isInitialized])

  // Update colors when theme changes
  useEffect(() => {
    if (!isInitialized || !particlesRef.current) return

    const geometry = particlesRef.current.geometry as THREE.BufferGeometry
    const colors = geometry.getAttribute('color') as THREE.BufferAttribute
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute
    
    for (let i = 0; i < colors.count; i++) {
      const color = new THREE.Color()
      const x = positions.getX(i)
      const y = positions.getY(i)
      const distance = Math.sqrt(x * x + y * y)
      
      if (distance < 3) {
        color.setHSL(0.3, 0.9, isDark ? 0.7 : 0.5)
      } else if (Math.random() > 0.6) {
        color.setHSL(0.55, 0.8, isDark ? 0.8 : 0.6)
      } else {
        color.setHSL(0.3, 0.7, isDark ? 0.5 : 0.4)
      }
      
      colors.setXYZ(i, color.r, color.g, color.b)
    }
    
    colors.needsUpdate = true
    
    const material = particlesRef.current.material as THREE.PointsMaterial
    material.opacity = isDark ? 0.9 : 0.7
  }, [isDark, isInitialized])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  )
}
