
## 03: Describing the Body: URDF for Humanoids

Before we can control our humanoid, ROS 2 needs to understand its physical structure. How many arms does it have? Where are its joints? What do its limbs look like? The standard for describing this is the **Unified Robot Description Format (URDF)**.

### What is URDF?

URDF is an XML-based file format used to model the kinematics and dynamics of a robot. It describes the robot as a tree of **links** connected by **joints**.

- **Links:** These are the rigid parts of the robot (e.g., the upper arm, the forearm, the torso).
- **Joints:** These define the motion between links. They specify how one link moves relative to another (e.g., a revolute joint for an elbow, a continuous joint for a wheel).

A complete URDF file for a humanoid robot defines its entire physical geometry, including its visual appearance, collision properties, and joint constraints. This model is essential for a wide range of robotics tasks:

- **Visualization:** Tools like RViz2 use the URDF to display a 3D model of the robot and its real-time state.
- **Simulation:** Physics engines like Gazebo use the URDF to create a physically accurate simulation of the robot.
- **Kinematics & Dynamics:** ROS 2 libraries use the URDF to calculate things like the position of the hand given the angles of the arm joints (forward kinematics) or the required joint angles to reach a specific point (inverse kinematics).

### The Core Components of URDF

Let's look at the two most important tags in URDF: `<link>` and `<joint>`.

#### The `<link>` Tag

A link represents a rigid body part. Its key sub-elements are:

-   `<visual>`: Defines the visual appearance of the link. This is what you see in RViz. It usually points to a 3D mesh file (e.g., `.stl` or `.dae`).
-   `<collision>`: Defines the collision geometry of the link. This is what the physics engine uses to calculate collisions. It can be a simpler shape (like a cylinder or box) to speed up computation.
-   `<inertial>`: Defines the dynamic properties of the link, such as its mass and inertia matrix. This is crucial for accurate physics simulation.

```xml
<link name="upper_arm">
  <visual>
    <geometry>
      <cylinder length="0.6" radius="0.1"/>
    </geometry>
    <origin rpy="0 0 0" xyz="0 0 0"/>
    <material name="blue"/>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.6" radius="0.1"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="1.0"/>
    <inertia ixx="0.03" iyy="0.03" izz="0.01" ixy="0" ixz="0" iyz="0"/>
  </inertial>
</link>
```

#### The `<joint>` Tag

A joint connects two links and defines the relationship between them.

- **`<parent link="..." />`**: The existing link in the tree that this new joint is attached to.
- **`<child link="..." />`**: The new link that is being added to the tree by this joint.
- **`<origin xyz="..." rpy="..." />`**: The transform (position and orientation) of the child link relative to the parent link. This defines where the joint is located.
- **`<axis xyz="..." />`**: The axis of rotation (for revolute joints) or translation (for prismatic joints).
- **`<limit lower="..." upper="..." effort="..." velocity="..." />`**: Defines the joint limits. For an elbow, you would specify the minimum and maximum rotation angles.

The `type` attribute of the joint is critical:

-   `revolute`: A hinge joint that rotates around a single axis (e.g., an elbow).
-   `continuous`: A revolute joint without limits (e.g., a wheel).
-   `prismatic`: A sliding joint that moves along an axis (e.g., a piston).
-   `fixed`: A rigid connection between two links that does not allow any movement.

### Example: A Simple Two-Link Arm

Here is a simplified URDF for a basic arm with a shoulder and an elbow. Notice how the `shoulder_joint` connects the `base_link` to the `upper_arm`, and the `elbow_joint` connects the `upper_arm` to the `forearm`.

```xml
<robot name="simple_arm">

  <!-- Base Link (e.g., the robot's torso) -->
  <link name="base_link">
    <visual>
      <geometry><box size="0.1 0.5 0.5"/></geometry>
    </visual>
  </link>

  <!-- ============== ARM ============== -->

  <!-- Link 1: Upper Arm -->
  <link name="upper_arm">
    <visual>
      <geometry><cylinder length="0.5" radius="0.05"/></geometry>
      <origin xyz="0 0 0.25" rpy="0 0 0"/>
    </visual>
  </link>

  <!-- Joint 1: Shoulder -->
  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="upper_arm"/>
    <origin xyz="0 0.3 0.2" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1.0"/>
  </joint>

  <!-- Link 2: Forearm -->
  <link name="forearm">
    <visual>
      <geometry><cylinder length="0.4" radius="0.04"/></geometry>
      <origin xyz="0 0 0.2" rpy="0 0 0"/>
    </visual>
  </link>

  <!-- Joint 2: Elbow -->
  <joint name="elbow_joint" type="revolute">
    <parent link="upper_arm"/>
    <child link="forearm"/>
    <origin xyz="0 0 0.5" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="0" upper="2.0" effort="100" velocity="1.0"/>
  </joint>

</robot>
```
This forms a kinematic chain from `base_link` -> `upper_arm` -> `forearm`. The ROS 2 system can now use this model to understand how moving the `shoulder_joint` and `elbow_joint` will affect the position of the `forearm`.

### Beyond URDF: Xacro and SDF

For complex robots like a humanoid, writing a single URDF file by hand is tedious and error-prone. We use a tool called **Xacro (XML Macros)** to make this process manageable. Xacro allows you to create constants, use mathematical expressions, and define reusable macros, which simplifies the URDF generation. We will heavily rely on Xacro when building the full model of our humanoid.
