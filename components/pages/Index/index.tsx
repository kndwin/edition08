import styles from "./styles.module.scss";
import React, { ReactElement } from "react";
import Image from "next/image";
import { Button, TextField } from "components";

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps): ReactElement | null {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.furniture}>
        <img
          src="/page/Index/wall-with-furniture.png"
          alt="Wall with furniture"
        />
        <p className={styles.subtitle}>Photographed by Julien Thomas Hamon</p>
      </div>
      <h1 className={styles.heroTitle}>
        Concious,
        <br />
        Minimalist
        <br />
        Beauty
      </h1>
      <div className={styles.bottle}>
        <img src="/page/Index/nail-bottle-1.png" alt="Nail Bottle" />
        <p className={styles.newRelease}>New Release</p>
      </div>
    </div>
  );
}

function OurIntent({ image, content, title }: any) {
  return (
    <div className={styles.ourIntent}>
      <div className={styles.contentGrid}>
        <div className={styles.image}>
          <img className={styles.image} src={image} alt="Girl model pose" />
        </div>
        <p className={styles.header}>Our Intent</p>
        <p className={styles.header}>Concious, Minimalist Beauty</p>
        <p className={styles.content}>
          {title && <b className={styles.title}>{title}</b>}
          {content}
        </p>
        <Button className={styles.shopButton}>SHOP NOW</Button>
      </div>
    </div>
  );
}

function NewsLetter() {
  return (
		<div className={styles.newsletterWrapper}>
			<div className={styles.newsletter}>
				<p>If you’d like to keep up to date with our products sign up and subscribe to our newsletter:</p>
				<TextField className={styles.email} />
				<Button className={styles.subscribeButton}>SUBSCRIBE</Button>
			</div>
		</div>
	) ;
}

export function ImageGrid() {
  const intent = [
    `Linéaire was born out of the desire to bring minimalism to beauty. The sentiment is guided by a longing to simplify and refine, creating conscious lines of thoughtfully formulated cosmetics, staggered in timely releases, to form a capsule collection of hero products.\n\nOfferings present a range of beauty essentials, in nuanced colours, designed to enhance not overwhelm the wearer.\n\nEach release is considered and adaptive in order to integrate seamlessly into one’s makeup practice and take the complexity out of beauty.`,
    `Edition08 was born out of the desire to bring minimalism to beauty. The sentiment is guided by a longing to simplify and refine, creating conscious lines of thoughtfully formulated cosmetics, staggered in timely releases, to form a capsule collection of hero products.`,
  ];

  return (
    <div className={styles.imageGrid}>
      <Image
        src="/page/Index/room-with-window.png"
        alt="Room with window"
        width={960}
        height={1000}
      />
      <Image
        src="/page/Index/girl-close-up-1.png"
        alt="Girl close up"
        width={960}
        height={1000}
      />
      <Image
        src="/page/Index/girl-eating-apple.png"
        alt="Girl eating apple"
        width={960}
        height={1000}
      />
      <OurIntent image="/page/Index/girl-model-pose.png" content={intent[0]} />
      <OurIntent
        image="/page/Index/girl-back-pose.png"
        content={intent[1]}
        title={`Edition08\n\n`}
      />
      <Image
        src="/page/Index/feet-in-sand.png"
        alt="Feet in sand"
        width={960}
        height={1000}
      />
      <Image
        src="/page/Index/wall-with-stairs.png"
        alt="Feet in sand"
        width={960}
        height={500}
      />
      <NewsLetter />
    </div>
  );
}
