// ========================================
// INTERACTIVE NEBULA SHADER BACKGROUND
// ========================================

/**
 * Creates a full-screen ray-marched nebula shader background
 * Adapted from React/Three.js component to vanilla JS
 */
class InteractiveNebulaShader {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Options
        this.hasActiveReminders = options.hasActiveReminders || false;
        this.hasUpcomingReminders = options.hasUpcomingReminders || false;
        this.disableCenterDimming = options.disableCenterDimming || false;

        this.init();
    }

    init() {
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        // Scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.clock = new THREE.Clock();

        // Vertex shader: pass UVs
        const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

        // Ray-marched nebula fragment shader
        const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform bool hasActiveReminders;
      uniform bool hasUpcomingReminders;
      uniform bool disableCenterDimming;
      varying vec2 vUv;

      #define t iTime
      mat2 m(float a){ 
        float c=cos(a), s=sin(a); 
        return mat2(c,-s,s,c); 
      }
      
      float map(vec3 p){
        p.xz *= m(t*0.4);
        p.xy *= m(t*0.3);
        vec3 q = p*2. + t;
        return length(p + vec3(sin(t*0.7))) * log(length(p)+1.0)
             + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
      }

      void mainImage(out vec4 O, in vec2 fragCoord) {
        vec2 uv = fragCoord / min(iResolution.x, iResolution.y) - vec2(.9, .5);
        uv.x += .4;
        vec3 col = vec3(0.0);
        float d = 2.5;

        // Ray-march
        for (int i = 0; i <= 5; i++) {
          vec3 p = vec3(0,0,5.) + normalize(vec3(uv, -1.)) * d;
          float rz = map(p);
          float f  = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);

          // BNN Brand Colors: Golden Yellow (#FDB913), Deep Purple, Amber/Orange
          // Enhanced yellow/golden tones for better visibility
          vec3 golden = vec3(0.99, 0.72, 0.07);  // #FDB913 - BNN Golden Yellow
          vec3 amber = vec3(1.0, 0.6, 0.15);     // Warm amber/orange
          vec3 purple = vec3(0.35, 0.12, 0.5);   // Deep purple base
          vec3 magenta = vec3(0.7, 0.2, 0.8);    // Vibrant magenta
          
          vec3 base = hasActiveReminders
            ? golden + vec3(5.0,3.0,1.0)*f                    // Golden Yellow dominant
            : hasUpcomingReminders
            ? purple + magenta*f                              // Purple/Magenta dominant
            : purple + (golden * 2.5 + amber * 1.5) * f       // Purple base with strong golden/amber highlights
              + magenta * f * 0.4;                            // Add magenta accents

          col = col * base + smoothstep(2.5, 0.0, rz) * 0.7 * base;
          d += min(rz, 1.0);
        }

        // Center dimming
        float dist   = distance(fragCoord, iResolution*0.5);
        float radius = min(iResolution.x, iResolution.y) * 0.5;
        float dim    = disableCenterDimming
                     ? 1.0
                     : smoothstep(radius*0.3, radius*0.5, dist);

        O = vec4(col, 1.0);
        if (!disableCenterDimming) {
          O.rgb = mix(O.rgb * 0.3, O.rgb, dim);
        }
      }

      void main() {
        mainImage(gl_FragColor, vUv * iResolution);
      }
    `;

        // Uniforms
        this.uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector2() },
            iMouse: { value: new THREE.Vector2() },
            hasActiveReminders: { value: this.hasActiveReminders },
            hasUpcomingReminders: { value: this.hasUpcomingReminders },
            disableCenterDimming: { value: this.disableCenterDimming },
        };

        // Create material and mesh
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: this.uniforms
        });

        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            this.material
        );
        this.scene.add(this.mesh);

        // Event listeners
        this.onResize = this.onResize.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        window.addEventListener('resize', this.onResize);
        window.addEventListener('mousemove', this.onMouseMove);

        // Initial resize
        this.onResize();

        // Start animation loop
        this.animate();

        console.log('%c🌌 Nebula Shader Initialized', 'color: #667eea; font-size: 14px; font-weight: bold;');
    }

    onResize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.renderer.setSize(w, h);
        this.uniforms.iResolution.value.set(w, h);
    }

    onMouseMove(e) {
        this.uniforms.iMouse.value.set(
            e.clientX,
            window.innerHeight - e.clientY
        );
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.uniforms.iTime.value = this.clock.getElapsedTime();
        this.renderer.render(this.scene, this.camera);
    }

    // Update shader properties
    updateProperties(options) {
        if (options.hasActiveReminders !== undefined) {
            this.uniforms.hasActiveReminders.value = options.hasActiveReminders;
        }
        if (options.hasUpcomingReminders !== undefined) {
            this.uniforms.hasUpcomingReminders.value = options.hasUpcomingReminders;
        }
        if (options.disableCenterDimming !== undefined) {
            this.uniforms.disableCenterDimming.value = options.disableCenterDimming;
        }
    }

    // Cleanup
    dispose() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mousemove', this.onMouseMove);

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.container && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }

        this.material.dispose();
        this.mesh.geometry.dispose();
        this.renderer.dispose();
    }
}

// Initialize nebula shader when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        // Create nebula shader for hero background
        window.nebulaShader = new InteractiveNebulaShader('nebulaBackground', {
            hasActiveReminders: false,
            hasUpcomingReminders: false,
            disableCenterDimming: true // Set to true for BNN to keep full brightness
        });
    } else {
        console.error('Three.js not loaded. Nebula shader requires Three.js.');
    }
});
