// Basic Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Physics World Setup
const world = new CANNON.World();
world.gravity.set(0, 0, 0); // Start with zero gravity

// Particle System
const particleCount = 200;
const colors = [];
const sizes = [];
const particleMaterial = new THREE.PointsMaterial({ vertexColors: true, size: 0.05, transparent: true, opacity: 1.0, depthTest: false });
const positions = new Float32Array(particleCount * 3);
const particles = new THREE.BufferGeometry();
const bodies = []; // To store Cannon.js bodies

// Explosion Force and Damping
const explosionForce = 20;
const dampingFactor = 0.98; // Apply a damping factor to slow down particles over time

// Reduced Gravity Strength
const gravityCenter = new CANNON.Vec3(0, 0, 0); // Central point for gravity attraction
const gravityStrength = 0.01; // Reduced gravity

// Create Particles and Physics Bodies
for (let i = 0; i < particleCount; i++) {
    const px = (Math.random() - 0.5) * 0.1;
    const py = (Math.random() - 0.5) * 0.1;
    const pz = (Math.random() - 0.5) * 0.1;

    // Set initial positions in BufferGeometry
    positions[i * 3] = px;
    positions[i * 3 + 1] = py;
    positions[i * 3 + 2] = pz;

    // Generate random colors for particles
    colors.push(Math.random(), Math.random(), Math.random());

    // Generate random sizes for particles
    sizes.push(Math.random() * 0.05 + 0.02); // Random size between 0.02 and 0.07

    // Create a Cannon.js body
    const shape = new CANNON.Sphere(0.01);
    const body = new CANNON.Body({ mass: 0.01 });
    body.addShape(shape);
    body.position.set(px, py, pz);

    // Apply an initial explosion force
    const velocity = new CANNON.Vec3(
        (Math.random() - 0.5) * explosionForce,
        (Math.random() - 0.5) * explosionForce,
        (Math.random() - 0.5) * explosionForce
    );
    body.velocity.set(velocity.x, velocity.y, velocity.z);

    bodies.push(body);
    world.addBody(body);
}

// Assign positions, colors, and sizes to the particle system
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
particles.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Set camera position
camera.position.z = 5;

// Function to update the scene
function animate() {
    requestAnimationFrame(animate);

    // Step the physics world
    world.step(1 / 60);

    // Update positions from Cannon.js bodies
    const positions = particleSystem.geometry.attributes.position.array;
    const colors = particleSystem.geometry.attributes.color.array;
    particleMaterial.opacity -= 0.0002; // Even slower fade-out effect

    for (let i = 0; i < particleCount; i++) {
        const body = bodies[i];

        // Apply gravitational pull towards the center
        const toCenter = new CANNON.Vec3().copy(gravityCenter).vsub(body.position);
        toCenter.normalize();
        toCenter.scale(gravityStrength, toCenter);
        body.applyForce(toCenter, body.position);

        // Apply damping to slow down particles
        body.velocity.scale(dampingFactor, body.velocity);

        // Update positions
        positions[i * 3] = body.position.x;
        positions[i * 3 + 1] = body.position.y;
        positions[i * 3 + 2] = body.position.z;

        // Slower color fade effect to retain brightness longer
        colors[i * 3] *= 0.997;     // Red channel
        colors[i * 3 + 1] *= 0.997; // Green channel
        colors[i * 3 + 2] *= 0.997; // Blue channel
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();














