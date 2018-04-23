import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

class Simple extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 750, 0);

    this.state = {
      cubeRotation: new THREE.Euler(),
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      // this.setState({
      //   cubeRotation: new THREE.Euler(
      //     this.state.cubeRotation.x + 0.1,
      //     this.state.cubeRotation.y + 0.1,
      //     0
      //   ),
      // });
    };
  }

  renderStars() {
    // console.log('stars', this.props.world);
    const world = this.props.world || {}
    const systems = world.star_systems || []

    return systems.map((s, i) => {
      const pos = new THREE.Vector3().copy(s.position)
      // console.log('position', pos);
      return (
        <mesh
          rotation={new THREE.Euler()}
          // position={new THREE.Vector3().copy(s.position)}
          position={pos}
          key={`gs_${i}`}
        >
          <boxGeometry
            width={3}
            height={3}
            depth={3}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      )
    })
    // return (
    //   <mesh
    //     rotation={new THREE.Euler()}
    //
    //   >
    //     <boxGeometry
    //       width={1}
    //       height={1}
    //       depth={1}
    //     />
    //     <meshBasicMaterial
    //       color={0x00ff00}
    //     />
    //   </mesh>
    // )
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}

      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={75}
          aspect={width / height}
          near={0.1}
          // near={-1000}
          far={1000}

          position={this.cameraPosition}
          lookAt={new THREE.Vector3()}
        />
        {this.renderStars()}
        {/* <mesh
          rotation={this.state.cubeRotation}
        >
          <boxGeometry
            width={1}
            height={1}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh> */}
      </scene>
    </React3>);
  }
}

export default Simple
