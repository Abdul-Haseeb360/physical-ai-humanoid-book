
## 04: The Virtual Senses: Sensor Simulation

A robot is blind and deaf without its sensors. A key function of a digital twin is to provide realistic, simulated sensor data so we can develop and test the robot's "brain" (its perception and control algorithms) long before the physical hardware is ready.

Gazebo provides a rich set of plugins that can be attached to a robot model to simulate a wide variety of common sensors. These plugins generate standard ROS 2 messages, making the simulated data indistinguishable from real data from the perspective of your control nodes.

Sensors are added to your robot model within its URDF or SDF file, attached to a specific link. The sensor's position and orientation are defined relative to the link it's attached to.

---

### 1. Camera Simulation

Cameras are the eyes of our humanoid. The Gazebo camera sensor plugin can simulate a camera and publish images to a ROS 2 topic.

-   **ROS 2 Message:** `sensor_msgs/Image` or `sensor_msgs/CompressedImage`
-   **What it Simulates:** A 2D image feed from the camera's perspective. You can configure its resolution, frame rate, and lens properties.
-   **Use Case:** Testing everything from simple object detection to complex visual SLAM (Simultaneous Localization and Mapping) algorithms.

#### Example: Adding a Camera to a URDF

Here’s how you would add a simple camera to a link named `head_link` in your robot's `.xacro` or `.urdf` file.

```xml
<gazebo reference="head_link">
  <sensor name="head_camera_sensor" type="camera">
    <pose>0.1 0 0 0 0 0</pose> <!-- Position relative to head_link -->
    <update_rate>30.0</update_rate>
    <camera name="head_camera">
      <horizontal_fov>1.396263</horizontal_fov>
      <image>
        <width>800</width>
        <height>800</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.02</near>
        <far>300</far>
      </clip>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.007</stddev>
      </noise>
    </camera>
    <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
      <ros>
        <namespace>/demo</namespace>
        <!-- Remap the output topic to /head_camera/image_raw -->
        <remapping>~/image_raw:=/head_camera/image_raw</remapping>
        <remapping>~/camera_info:=/head_camera/camera_info</remapping>
      </ros>
    </plugin>
  </sensor>
</gazebo>
```
**Key Tags:**
- `<sensor type="camera">`: Defines the sensor type.
- `<update_rate>`: How many frames per second to generate.
- `<image>`: Sets the resolution and pixel format.
- `<noise>`: Allows you to add realistic Gaussian noise to the image feed.
- `<plugin filename="libgazebo_ros_camera.so">`: This is the crucial part. It loads the ROS 2 camera plugin, which handles publishing the images. The `<remapping>` tags allow us to set the exact ROS 2 topic names we want to use.

---

### 2. IMU (Inertial Measurement Unit) Simulation

An IMU is like the robot's inner ear, providing information about its orientation and acceleration. This is absolutely essential for balancing a humanoid.

-   **ROS 2 Message:** `sensor_msgs/Imu`
-   **What it Simulates:**
    -   **Orientation:** As a quaternion, telling you which way the sensor is facing.
    -   **Angular Velocity:** How fast the sensor is rotating around the x, y, and z axes.
    -   **Linear Acceleration:** The acceleration the sensor is experiencing, including gravity.
-   **Use Case:** The primary input for balancing and stabilization controllers.

The Gazebo IMU sensor plugin reads the true state of the model from the physics engine and adds configurable noise to simulate the imperfections of a real IMU.

---

### 3. LIDAR / Laser Scanner Simulation

LIDAR provides distance information by scanning the environment with lasers. It's a key sensor for navigation and obstacle avoidance.

-   **ROS 2 Message:** `sensor_msgs/LaserScan` (for 2D LIDAR) or `sensor_msgs/PointCloud2` (for 3D LIDAR).
-   **What it Simulates:** It performs ray-casting in the simulated world. It "shoots" virtual laser beams and reports the distance to the first object each beam hits. You can configure the number of beams, the field of view, range, and accuracy.
-   **Use Case:** Building maps of the environment, detecting obstacles, and localizing the robot within a map.

---

### 4. Contact Sensor Simulation

Contact sensors are used to detect when a part of the robot touches something. For a humanoid, these are vital in the feet to know when a foot is firmly on the ground.

-   **ROS 2 Message:** `gazebo_msgs/ContactsState`
-   **What it Simulates:** When the collision geometry of the sensor comes into contact with another collision geometry, it publishes a message containing information about the contact points, forces, and torques.
-   **Use Case:**
    -   Input for walking controllers (e.g., to know when to switch support from one foot to the other).
    -   Simulating bumpers for simple collision detection.

By composing these simulated sensors, we can give our digital twin a rich understanding of its virtual world, enabling us to develop sophisticated AI behaviors before ever touching a piece of physical hardware.
