import Experience from "../Experience.js";
import * as THREE from "three";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    // Setup
    this.setSunLight();
    this.setEnvironmentMap();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(-0.2, 2.4, 2.4);
    this.scene.add(this.sunLight);

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("sunLightIntensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "x")
        .name("sunLightX")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "y")
        .name("sunLightY")
        .min(-5)
        .max(5)
        .step(0.001);

      this.debugFolder
        .add(this.sunLight.position, "z")
        .name("sunLightZ")
        .min(-5)
        .max(5)
        .step(0.001);
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    // this.environmentMap.intensity = 2;
    // this.environmentMap.texture = this.resources.items.environmentMapTexture;
    // this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;

    // this.scene.environment = this.environmentMap.texture;

    // HDR(EXR);
    // this.resources.items.environmentMap.mapping = THREE.EquirectangularReflectionMapping
    console.log(this.resources.items)
    
    this.scene.environment = this.resources.items.stylizedTestMap
    this.scene.background = this.resources.items.stylizedTestMap
    this.scene.backgroundIntensity = 1;
    // exrLoader.load("/environmentMaps/nvidiaCanvas-4k.exr", (environmentMap) => {
    // environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    // scene.background = environmentMap;
    // scene.environment = environmentMap;
    // });
    // this.scene.environment.mapping = THREE.EquirectangularReflectionMapping;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
        //   child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterials();

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterials);
    }
  }
}