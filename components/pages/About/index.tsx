import styles from "./styles.module.scss";
import Image from "next/image";

export function AboutUs() {
  return (
    <div className={styles.aboutUsWrapper}>
      <p className={styles.description}>
        Edition 08 was born out of the desire to bring minimalism to beauty. The
        sentiment is guided by a longing to simplify and refine, creating
        conscious lines of thoughtfully formulated cosmetics, staggered in
        timely releases, to form a capsule collection of hero products.
        <br />
        <br />
        Offerings present a range of beauty essentials, in nuanced colours,
        designed to enhance not overwhelm the wearer.
        <br />
        <br />
        Each release is considered and adaptive in order to integrate seamlessly
        into one’s makeup practice and take the complexity out of beauty.
      </p>
      <Image
        objectFit="contain"
        objectPosition="top"
        src="/page/Index/girl-back-pose.png"
        width={960}
        height={1000}
      />
    </div>
  );
}
