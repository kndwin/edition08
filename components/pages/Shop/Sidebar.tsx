import React, { ReactElement } from "react"
import styles from "./styles.module.scss"

export interface SidebarProps {
	
}

export function Sidebar(props: SidebarProps): ReactElement | null {
	const categories = ["Bags","Jewelery","Skincare" ]
	const nails = ["Tops", "Bottoms"]
	const sort = ["Popular", "Price: Low to High", "Price: High to Low"]

	return (
		<div className={styles.sidebarWrapper}>
			<div className={styles.options}>
				<p className={styles.title}>Category</p>
				{categories.map(category => (
					<p className={styles.item}>{category}</p>
				))}
			</div>
			<div className={styles.options}>
				<p className={styles.title}>Nail Polish</p>
				{nails.map(nail => (
					<p className={styles.item}>{nail}</p>
				))}
			</div>
			<div className={styles.options}>
				<p className={styles.title}>Sort</p>
				{sort.map(sortOption => (
					<p className={styles.item}>{sortOption}</p>
				))}
			</div>
		</div>
	)
}
