import Experience from "../Experience.js";
import * as THREE from "three";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Feet from "./Feet.js";


export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Test mesh
    // const testMesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshStandardMaterial()
    // );
    // this.scene.add(testMesh);

    // this.floor = new Floor();
    // this.environment = new Environment();

//     // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.floor = new Floor();
      this.feet = new Feet();
      this.environment = new Environment();
    });
  }
    

  update() {
    if (this.feet) this.feet.update();
  }
}