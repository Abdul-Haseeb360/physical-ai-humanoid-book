import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: string;
  link: string;
  tags: string[];
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS2 Robotics Control',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    link: '/docs/module-1-ros2/ros2-overview',
    description: 'Master the backbone of modern robotics with ROS2. Learn about nodes, publishers, and subscribers in a distributed system.',
    tags: ['Core', 'Middleware', 'ROS2'],
  },
  {
    title: 'Digital Twin Simulation',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    link: '/docs/module-2-digital-twin/gazebo-basics',
    description: 'Create high-fidelity virtual environments with NVIDIA Isaac Sim. Test algorithms safely before deploying to real hardware.',
    tags: ['NVIDIA', 'Simulation', 'Physics'],
  },
  {
    title: 'Humanoid Perception',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    link: '/docs/module-3-nvidia-isaac/isaac-sim-intro',
    description: 'Enable robots to see and understand. Implement SLAM, LiDAR processing, and computer vision models for humanoid depth perception.',
    tags: ['AI', 'Computer Vision', 'CV'],
  },
  {
    title: 'Vision-Language-Action (VLA)',
    Svg: require('@site/static/img/logo.svg').default,
    link: '/docs/module-4-vla/voice-to-action',
    description: 'Explore the future of AI with Visual-Language-Action models. Bridge the gap between natural language and robotic motion.',
    tags: ['VLA', 'Robotics AI', 'Cognition'],
  },
];

function Feature({ title, Svg, description, link, tags }: FeatureItem) {
  return (
    <div className={styles.featureCol}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIllustration}>
          <div className={styles.illustrationOverlay}></div>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
          <div className={styles.tagContainer}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tagBadge}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.cardGlow}></div>
      </Link>
    </div>
  );
}

export default function FeatureCards(): React.ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {FeatureList.slice(0, 4).map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}