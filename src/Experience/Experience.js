import * as THREE from "three";
import * as CANNON from "cannon-es";
import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Debug from "./Utils/Debug.js";


let instance = null;

export default class Experience {
    constructor(canvas) {
      // Singleton
      if (instance) {
        return instance;
      }
      instance = this;
  
      // Global access
      window.experience = this;
  
      // Options
      this.canvas = canvas;

      // Setup
    this.time = new Time();
    this.sizes = new Sizes();
    this.debug = new Debug();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

     // Resize event
     this.sizes.on("resize", () => {
        this.resize();
      });
  
      // Time tick event
      this.time.on("tick", () => {
        this.update();
      });
    }
    resize() {
        this.camera.resize();
        this.renderer.resize();
      }

      update() {
        this.camera.update();
        // uncomment when feet animations are ready
        // this.world.update();
        this.renderer.update();
      }
    
}