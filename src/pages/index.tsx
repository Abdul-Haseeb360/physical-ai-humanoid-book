import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FeatureCards from '@site/src/components/FeatureCards';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={styles.heroBanner}>
            <div className="container">
                <div className={styles.heroContent}>
                    <Heading as="h1" className={styles.heroTitle}>
                        {siteConfig.title}
                    </Heading>
                    <p className={styles.heroSubtitle}>
                        {siteConfig.tagline}
                    </p>
                    <div className={styles.buttons}>
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
            </div>
        </header>
    );
}

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
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
