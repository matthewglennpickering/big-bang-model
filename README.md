
# Big Bang Simulation

## Overview

This program simulates a Big Bang-like explosion using 3D rendering and physics simulation libraries, Three.js and Cannon.js, respectively. The simulation depicts particles being expelled from a central point, influenced by initial explosion forces, damping effects, and a weak gravitational pull.

## Features

- **3D Particle Simulation**: Uses Three.js to render 200 particles in a three-dimensional space.
- **Physics Simulation**: Cannon.js is utilized to simulate realistic physics, including initial explosion forces, damping, and gravitational pull.
- **Dynamic Animation**: The scene is continuously animated at 60 frames per second, updating particle positions and applying physics-based transformations in real-time.

## Requirements

To run the simulation, you need:
- A modern web browser (Chrome, Firefox, Edge, etc.) that supports WebGL.
- Internet connection to load Three.js and Cannon.js from their respective CDNs.

## Usage

1. **Download and Extract**: Download the HTML and JavaScript files and place them in the same directory.
2. **Open the HTML File**: Open `index.html` in a web browser.
3. **View the Simulation**: The simulation will start automatically, displaying particles moving in 3D space.

## Code Explanation

### HTML (`index.html`)

- **Three.js and Cannon.js Libraries**: Loaded via CDNs to provide 3D rendering and physics capabilities.
- **Script Inclusion**: Includes the `script.js` file, which contains the logic for the simulation.

### JavaScript (`script.js`)

#### Basic Setup

- **Three.js Setup**: 
  - Initializes a 3D scene (`THREE.Scene`), a perspective camera (`THREE.PerspectiveCamera`), and a WebGL renderer (`THREE.WebGLRenderer`).
  - The renderer is configured to fill the entire browser window.

- **Physics World Setup**:
  - A Cannon.js physics world (`CANNON.World`) is created with zero gravity to start. Gravity effects are handled within the animation loop.

#### Particle System

- **Particle Configuration**:
  - 200 particles are generated with random positions, colors, and sizes.
  - A `THREE.PointsMaterial` is used to render the particles with vertex colors and transparency.
  - Particle positions are managed using `THREE.BufferGeometry`.

#### Physics Dynamics

- **Explosion Force and Damping**:
  - An initial `explosionForce` is applied to all particles, giving them randomized velocities.
  - A `dampingFactor` is applied each frame to simulate resistance or drag in space.

- **Gravity Simulation**:
  - A weak gravitational pull (`gravityStrength = 0.01`) is applied toward a central point, creating a slow retraction effect on particles.

#### Animation Loop

- **Frame Updates**:
  - The animation is managed using `requestAnimationFrame`, maintaining a target frame rate of 60fps.
  - Particle positions, colors, and opacity are updated based on physics calculations, including gravity, damping, and initial explosion velocities.

#### Rendering

- **Rendering the Scene**:
  - The `THREE.WebGLRenderer` continuously renders the scene, providing real-time visual feedback.

## Potential Improvements

1. **Interactivity**: 
   - Adding controls to dynamically adjust parameters like `explosionForce`, `gravityStrength`, and `particleCount`.

2. **Enhanced Visuals**:
   - Introduce particle trails, glowing effects, or dynamic size changes to improve visual fidelity.

3. **Physics Enhancements**:
   - Implement collision detection among particles or with boundaries to create more realistic behaviors.

4. **Performance Optimization**:
   - Use `InstancedMesh` for rendering a larger number of particles more efficiently.

## Conclusion

This simulation provides an engaging visual representation of particle dynamics in a zero-gravity environment with basic physics properties. It is a starting point for more complex simulations involving inter-particle forces, collisions, and other advanced physical phenomena.

## License

This project is provided under the MIT License. Feel free to use, modify, and distribute it as you see fit.
# big-bang-model
