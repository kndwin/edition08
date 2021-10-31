import Link from "next/link";

import styles from "./styles.module.scss"

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.leftOfFooter}>
				<div className={styles.links}>
					<Link href="/customer-care">
						<a className={styles.links}>Customer care</a>
					</Link>
					<Link href="/contact">
						<a className={styles.links}>Contact</a>
					</Link>
					<Link href="/terms-and-conditions">
						<a className={styles.links}>Terms and Conditions</a>
					</Link>
				</div>
			</div>
			<div className={styles.rightOfFooter}>
				<p>Edition 08</p>
			</div>
		</footer>
	)
}
