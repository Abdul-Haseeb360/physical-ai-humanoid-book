
## 02: The Building Blocks: Nodes, Topics, & Services

Now that we understand the high-level purpose of ROS 2, let's dissect its three fundamental communication concepts: **Nodes**, **Topics**, and **Services**. These are the core building blocks you will use constantly when developing your humanoid's software.

---

### Nodes: The Computational Units

A **Node** is the primary executable in a ROS 2 system. It's a process that performs a specific task. You can think of a node as a single, specialized worker in your robot's software factory.

- **Purpose:** To encapsulate a single function, like controlling a wheel motor, reading a laser scanner, or planning a path.
- **Modularity:** By keeping nodes small and focused, your overall system becomes much easier to understand, debug, and maintain. If the robot's navigation is failing, you can investigate the `path_planner` node in isolation.
- **Example:** In our humanoid, we might have nodes like:
    - `camera_driver`: Publishes raw image data from the head camera.
    - `object_detector`: Subscribes to images and publishes the locations of detected objects.
    - `right_arm_controller`: Subscribes to desired joint angles and controls the arm motors.
    - `path_planner`: A service that provides a path to a goal location.

A single ROS 2 system is typically composed of many nodes, each running independently and communicating over the ROS 2 network.

---

### Topics: The Data Streams (Publish/Subscribe)

**Topics** are the primary mechanism for continuous, one-way data flow. They operate on a **publish-subscribe** model, just like a YouTube channel. One node "publishes" messages to a topic, and any number of other nodes can "subscribe" to that topic to receive those messages.

- **Purpose:** Ideal for streaming data like sensor readings, robot state, or continuous commands.
- **Decoupling:** The publishing node doesn't know or care which nodes are subscribing. Likewise, subscribers don't know who is publishing. This decoupling is a powerful feature for building scalable systems.
- **Message Types:** Every topic has a specific message type (e.g., `String`, `Int32`, `sensor_msgs/Image`). ROS 2 provides a rich library of standard message types, and you can define your own.
- **Analogy:** A weather station (publishing node) continuously broadcasts the temperature on a specific radio frequency (the topic). Anyone with a radio (subscribing nodes) can tune in to hear it.

**Example Scenario:**

1.  The `/head_camera/image_raw` topic: The `camera_driver` node publishes `sensor_msgs/Image` data from the robot's camera at 30 frames per second.
2.  The `object_detector` node and a `video_recorder` node both subscribe to this topic.
3.  The `object_detector` uses the images to find objects and publishes its findings on a new topic, `/detected_objects`.
4.  The `video_recorder` simply saves the images to a file.

![Topic Communication](https://raw.githubusercontent.com/ros2/ros2_documentation/humble/source/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/images/topics.gif)

---

### Services: The Request/Response Tools

While topics are for continuous streams, **Services** are for request-response interactions. They work in a two-way, client-server model. A "client" node sends a single request to a "server" node and waits for a single response.

- **Purpose:** Used for remote procedure calls (RPCs), where one node needs to ask another node to perform a specific task or calculation that has a clear beginning and end.
- **Blocking Nature:** When a client calls a service, it typically waits (blocks) until the server provides a response.
- **Analogy:** Ordering a coffee. You (the client) go to the barista (the server) and make a specific request ("One latte, please"). You wait until the barista completes the task and gives you your coffee (the response). You don't get a continuous stream of coffee.

**Example Scenario:**

1.  A `navigation_manager` node needs to know how to get from point A to point B.
2.  It calls a service named `/plan_path` provided by the `path_planner` node. The request contains the start and end positions.
3.  The `path_planner` node receives the request, performs a complex calculation to find the optimal path, and sends the path back as the response.
4.  The `navigation_manager` receives the path and can now start commanding the robot's wheels.

### What About Actions?

There's a fourth communication type called **Actions**, which are designed for long-running, feedback-producing tasks. They are essentially a more robust version of services. Think of commanding a humanoid to walk to a location. This task takes time, can be preempted (cancelled), and you want to receive continuous feedback (e.g., "I am 50% of the way there"). We will explore Actions in a later module when we begin implementing more complex behaviors.

By mastering the interplay of nodes, topics, and services, you can create sophisticated and robust software architectures for any robot.
