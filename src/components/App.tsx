import React, { VFC } from 'react';
import { css } from '@emotion/css';
import { Audio } from './Audio';
import { Visualizer } from './Visualizer';

export const App: VFC = () => {
	return (
		<div className={styles.container}>
			<Visualizer />
			<Audio />
		</div>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	`
}
