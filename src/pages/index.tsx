import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FeatureCards from '@site/src/components/FeatureCards';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      {/* Premium floating background elements */}
      <div className={styles.heroFloating}></div>
      <div className={styles.heroFloating}></div>
      <div className={styles.heroFloating}></div>

      {/* Animated wave element */}
      <div className={styles.heroWave}></div>

      <div className={clsx(styles.heroContent, 'text--center')}>
        <Heading as="h1" className={clsx('hero__title', styles.slideInUp)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx('hero__subtitle', styles.fadeIn)}>
          {siteConfig.tagline}
        </p>
        <div className={clsx(styles.buttons, styles.scaleIn)}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Start Reading
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            View Chapters
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Documentation - ${siteConfig.title}`}
      description="Comprehensive guide to Physical AI & Humanoid Robotics">
      <HomepageHeader />
      <main>
        <FeatureCards />
      </main>
    </Layout>
  );
}
