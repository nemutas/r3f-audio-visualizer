import React, { useRef, VFC } from 'react';
import * as THREE from 'three';
import { OrbitControls, Plane, Stats } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { analyserNode } from '../libs/store';

export const Visualizer: VFC = () => {
	return (
		<Canvas
			camera={{
				position: [0, 3, 15],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}>
			{/* canvas color */}
			<color attach="background" args={['#1e1e1e']} />
			{/* fps */}
			<Stats />
			{/* camera controller */}
			<OrbitControls attach="orbitControls" />
			{/* lights */}
			<ambientLight intensity={1} />
			{/* objects */}
			<MeshVisualizer />
		</Canvas>
	)
}

const MeshVisualizer: VFC = () => {
	const planeRef = useRef<THREE.Mesh>(null)

	const canvas = document.createElement('canvas') as HTMLCanvasElement
	canvas.width = 256
	canvas.height = 512
	const ctx = canvas.getContext('2d')!

	const texture = new THREE.Texture(canvas)
	texture.minFilter = THREE.LinearFilter
	texture.magFilter = THREE.LinearFilter

	useFrame(() => {
		if (analyserNode.data) {
			let timeData = new Uint8Array(analyserNode.data.frequencyBinCount)
			analyserNode.data.getByteFrequencyData(timeData)

			const imageData = ctx.getImageData(0, 1, 256, 511)
			ctx.putImageData(imageData, 0, 0, 0, 0, 256, 512)
			for (let x = 0; x < timeData.length; x++) {
				ctx.fillStyle = `rgb(${timeData[x]}, ${timeData[x]}, ${timeData[x]})`
				ctx.fillRect(x, 510, 2, 2)
			}

			texture.needsUpdate = true
		}
	})

	return (
		<Plane ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} args={[20, 20, 256, 256]}>
			<meshPhongMaterial wireframe color="#0f0" displacementMap={texture} displacementScale={10} />
		</Plane>
	)
}
