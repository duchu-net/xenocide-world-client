// //##############################################################################
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import React3 from 'react-three-renderer';

import './Scene.scss'

import * as THREE from 'three';
import TWEEN from 'tween';
import Stats from 'stats-js';
import OrbitControls from './OrbitControls';
import MouseInput from './models/inputs/MouseInput'

export const DEFAULT_SCENE_OPTIONS = {
  render_stats: { render: true, visible: true, color: null, disabled: false },
}
export const DEFAULT_ORBIT_CONTROLS_OPTIONS = {
  zoomSpeed: 1,
  enablePan: true,
  panSpeed: 0.6,
  enableRotate: true,
  enableDamping: true,
  dampingFactor: 0.5,
  rotateSpeed: 0.3,
  minPolarAngle: 0,
  maxPolarAngle: 89,
  minDistance: 0,
  maxDistance: 150,
  keyPanSpeed: 40,
}
export const DEFAULT_CAMERA_OPTIONS = {
  target: { x: 0, y: 0, z: 0 },
  position: { x: 0, y: 10, z: 10 },
}


class Scene extends Component {
  static propTypes = { }
  static defaultProps = {
    options: {
      scene: DEFAULT_SCENE_OPTIONS,
      camera: DEFAULT_CAMERA_OPTIONS,
      orbit_controls: DEFAULT_ORBIT_CONTROLS_OPTIONS
    },
    dispatch: () => {},
  }
  static childContextTypes = {
    // clickableMeshes: PropTypes.array,
    getContainerReference: PropTypes.func,
    onMeshClick: PropTypes.func,
    addClickable: PropTypes.func,
    removeClickable: PropTypes.func,
  }
  getChildContext() {
    return {
      // clickableMeshes: this._clickableMeshes,
      getContainerReference: this.getContainerReference.bind(this),
      onMeshClick: this.onMeshClick.bind(this),
      addClickable: this.addClickable.bind(this),
      removeClickable: this.removeClickable.bind(this),
    }
  }
  state = {

  }

  MAIN_CAMERA_NAME = 'main_camera'
  ROTATE_SPEED = 0.1
  ZOOM_SPEED = 1.0
  PAN_SPEED = 0.6
  ROTATION_LOCKED = false

  MIN_DISTANCE = 0
  MAX_DISTANCE = 1000

  fps = 60
  alpha = true
  clock = null
  _clickableMeshes = []
  _container_ref = null


  getContainerReference() {
    return this._container_ref
  }

  constructor(props, context) {
    super(props, context)
    const { camera } = this.props.options
    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z)
    this.cameraLookAt = new THREE.Vector3(camera.target.x, camera.target.y, camera.target.z)
    this.clock = new THREE.Clock()
  }

  componentDidMount() {
    console.log('componentDidMount', this);
    const camera = this._camera_ref
    const container = this._container_ref

    // INIT CAMERA CONTROLS
    const cameraProps = this.getCameraProps()
    const controls = this.cameraControls = new OrbitControls(camera, container)
    delete cameraProps.target
    Object.assign(controls, cameraProps)

    // INIT MOUSE INPUT
    const { mouseInput } = this.refs
    if (!mouseInput.isReady()) {
      const scene = this._scene_ref

      mouseInput.ready(scene, container, camera)
      mouseInput.restrictIntersections(this._clickableMeshes)
      mouseInput.setActive(false)
    }

    // INIT STATS
    this.createStats()
  }
  componentWillReceiveProps(nextProps) {
    // TODO write watch props value helper function mapPropsToHandlers
    // SELECTED OBJECT ---------------------------------------------------------
    const { selected_object } = nextProps.scene
    if (this.isSelectedObjectChanged(selected_object)) {
      this.changeMainCamera(selected_object.id ? `camera_${selected_object.type}_${selected_object.id}` : null)
    }
    // STATS -------------------------------------------------------------------
    const { render_stats } = nextProps.scene.options.scene
    if (nextProps.scene.options.scene.render_stats.render !== this.props.scene.options.scene.render_stats.render) {
      if (nextProps.scene.options.scene.render_stats.render) this.createStats()
      else this.destroyStats()
    }
  }
  componentDidUpdate(prevProps, prevState) {
    this._scene_ref.updateMatrixWorld()
    this.updateCameraControls()
  }
  componentWillUnmount() {
    if (this.cameraControls) this.cameraControls.dispose()
    delete this.cameraControls
  }
  // END LIFECYCLE =============================================================

  isSelectedObjectChanged(selectObject) {
    return selectObject.id != this.props.scene.selected_object.id
  }

  changeMainCamera(mainCameraName) {
    if (mainCameraName == null) mainCameraName = this.MAIN_CAMERA_NAME
    console.log('changeMainCamera', mainCameraName);
    const scene = this._scene_ref
    const objectCamera = scene.getObjectByName(mainCameraName)
    // const { mouseInput } = this.refs

    this.cameraControls.changeCameraTo(objectCamera)
    this.refs.mouseInput.changeCameraTo(objectCamera)
    this.setState({ mainCameraName })
  }


  getCameraProps() {
    const { scene, camera, orbit_controls } = this.props.options
    return {
      ...orbit_controls,
      minPolarAngle: THREE.Math.degToRad(orbit_controls.minPolarAngle),
      maxPolarAngle: THREE.Math.degToRad(orbit_controls.maxPolarAngle),
      // target: this.cameraLookAt, //this.props.target,
      target: this.cameraLookAt,
    }
  }

  onMeshClick(data) {
    console.warn('TO OVERWRITE');
    // this.props.selectObject(data)
  }

  dispatchAction(action) {
    console.log(action);
    this.props.dispatch(action)
  }

  addClickable(mesh) {
    this._clickableMeshes.push(mesh)
  }
  removeClickable(mesh) {
    this._clickableMeshes.splice(this._clickableMeshes.indexOf(mesh), 1)
  }

  updateCameraControls() {
    const selectedMesh = this._selectedMesh
    if (selectedMesh) {
      // const camera = this._camera_ref
      // const cameraPivot = this._camera_pivot_ref
      //
      // // const selectedMeshPosition = selectedMesh.localToWorld()
      // selectedMesh.parent.updateMatrixWorld()
      //
      // var vector = new THREE.Vector3();
      // vector.setFromMatrixPosition(selectedMesh.matrixWorld)
      // // console.log('s', vector.clone());
      //
      // // console.log(vector);
      // cameraPivot.position.x = vector.x
      // cameraPivot.position.y = vector.y
      // cameraPivot.position.z = vector.z
      // // cameraPivot.userData._needsProjectionMatrixUpdate = true


      // var vector = new THREE.Vector3()
      // vector.setFromMatrixPosition(selectedMesh.matrixWorld)

      // const relativeCameraOffset = camera.position.clone() //new THREE.Vector3(5, 5, 5)
    	// const cameraOffset = relativeCameraOffset.applyMatrix4(selectedMesh.matrixWorld);
      //
      // // camera.applyMatrix(selectedMesh.matrixWorld)
      // camera.position.x = cameraOffset.x
      // camera.position.y = cameraOffset.y
      // camera.position.z = cameraOffset.z

      // camera.lookAt(selectedMesh.position)
      // camera.lookAt(new THREE.Vector3(0, 0, 0))
    }
    if (this.cameraControls) this.cameraControls.update()
  }
  getAnimationInterval() {
    return 1000 / this.fps
  }

  clearColor = 0x000000
  clearAlpha = 0.7

  _then = Date.now()
  onAnimate() { }
  _onAnimate() {
    const interval = this.getAnimationInterval()
    const now = Date.now()
    const delta = now - this._then
    // pretend cubeRotation is immutable.
    // this helps with updates and pure rendering.
    // React will be sure that the rotation has now updated.
    if (delta > interval) {
      const scene = this._scene_ref
      // scene.updateMatrixWorld()
      // this.updateCameraControls()
      this._then = now - (delta % interval)
      this.time = this.clock.getElapsedTime()
      this.delta = this.clock.getDelta()
      this.updateStats()
      this.onAnimate()
    }
  }

  createStats() {
    let stats = null
    if (this.stats) stats = this.stats
    else stats = new Stats()

    stats.setMode(0)
    const statsStyle = {
      position: 'absolute',
      left: '0px',
      bottom: '0px',
    }
    Object.assign(stats.domElement.style, statsStyle)

    document.body.appendChild(stats.domElement)
    this.stats = stats
  }
  updateStats() {
    if (this.stats) this.stats.update()
  }
  destroyStats() {
    document.body.removeChild(this.stats.domElement)
    // delete this.stats
  }


  renderScene() {
    // console.log(this.props.children);
    // return <SphereModel cubeRotation={this.state.cubeRotation} />
    return this.props.children
  }
  renderCamera() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    // const matrixWorld = this._selectedMesh ? this._selectedMesh.matrixWorld : undefined
    // matrix={matrixWorld}
    return (
      <object3D name={'camera_pivot'} ref={ref => { this._camera_pivot_ref = ref }}>
        <perspectiveCamera
          ref={ref => { this._camera_ref = ref }}
          name={this.MAIN_CAMERA_NAME}
          fov={75}
          aspect={width / height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
          lookAt={this.cameraLookAt}
        />
      </object3D>
    )
  }


  render() {
    const { mainCameraName } = this.state
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
      <div
        className={'scene_component'}
        ref={ref => { this._container_ref = ref }}
      >
        {/* <div style={{ position: 'absolute', background: 'red' }}>
          aioh;doa asu lsuad lushd ausdh lfasdlfu alsd
        </div> */}
        <React3
          mainCamera={mainCameraName} // this points to the perspectiveCamera which has the name set to "camera" below
          width={width}
          height={height}
          clearColor={this.clearColor}
          alpha={true}
          clearAlpha={this.clearAlpha}
          onAnimate={this._onAnimate.bind(this)}
          antialias
        >
          <module
            ref="mouseInput"
            descriptor={MouseInput}
          />
          <scene ref={ref => { this._scene_ref = ref }}>
            <ambientLight intensity={.6} />
            {this.renderCamera()}
            {this.renderScene()}
            {/* <axisHelper size={10} /> */}
          </scene>
        </React3>
      </div>
    )
  }
}


export default Scene
