import React, { useEffect, useRef, VFC } from 'react';
import { css } from '@emotion/css';
import { analyserNode } from '../libs/store';

export const Audio: VFC = () => {
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		audioRef.current!.volume = 0.05
	}, [])

	const handlePlay = () => {
		if (!analyserNode.data) {
			const audioContext = new AudioContext()
			const src = audioContext.createMediaElementSource(audioRef.current!)
			const analyser = audioContext.createAnalyser()
			src.connect(analyser)
			analyser.connect(audioContext.destination)
			analyser.fftSize = 512
			analyserNode.data = analyser
			// console.log('set analyser')
		}
	}

	return (
		<audio
			ref={audioRef}
			className={styles.player}
			controls
			loop
			// src="./assets/Ghost - Potato Chips.mp3"
			src="./assets/たぬきちの冒険.mp3"
			onPlay={handlePlay}
		/>
	)
}

const styles = {
	player: css`
		position: absolute;
		bottom: 20px;
	`
}
