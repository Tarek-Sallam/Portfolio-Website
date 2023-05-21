const vertexShader = /* glsl */ `
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_viewport;

    void main () {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        gl_Position = projectedPosition;

        vPosition = position;
        vNormal = normal;
        vUv = uv;
    }


`;
export default vertexShader;
