import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'ROS2 Robotics Integration',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default, // Placeholder SVG
    description: (
      <>
        Learn to seamlessly integrate ROS2 for robust robotics control, navigation, and perception systems.
      </>
    ),
  },
  {
    title: 'Advanced Digital Twin Simulation',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default, // Placeholder SVG
    description: (
      <>
        Explore high-fidelity digital twin environments for realistic physics and sensor simulations.
      </>
    ),
  },
  {
    title: 'NVIDIA Isaac Sim for AI Robotics',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default, // Placeholder SVG
    description: (
      <>
        Harness the power of NVIDIA Isaac Sim for advanced perception, SLAM, and sim-to-real transfer.
      </>
    ),
  },
  {
    title: 'Visual Language & Action (VLA)',
    Svg: require('@site/static/img/logo.svg').default, // Using logo.svg as a placeholder SVG
    description: (
      <>
        Implement cutting-edge VLA models for intuitive voice-to-action control and cognitive planning.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--3', styles.featureCard)}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function FeatureCards(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}