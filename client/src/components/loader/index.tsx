import React from 'react';
import styles from './styles.module.scss';

export const Loader: React.FC = () => {
	return (
		<div className={styles.loadOverlay}>
			<div className={styles.loader}>
				<div className={styles.dots}>
					{[...new Array(9)].map((_, index) => (
						<span key={index} className={styles.dot}></span>
					))}
				</div>
			</div>
		</div>
	);
};
