import React from 'react'
import { RaisedButton } from 'material-ui'
import { Galaxy, Grid, Star, Random, Spiral } from 'xenocide-world-generator'
import Chart from './Chart'
import { Scene } from '../../modules/scene'
import GalaxyScene from '../GalaxyScene'
import './App.scss'


class App extends React.Component {
  state = {
    world: null,
    generation_progress: {

    },
  }

  generate() {
    // console.log(Star, Random);
    // console.log(xeno);
    Promise.resolve()
      // .then(() => Galaxy.Generate(new Grid(), new Random('12')))
      .then(() => Galaxy.Generate(new Spiral(), new Random(845689)))


    //   .then(() => generateNewGalaxie({
    //     onUpdate: p => {
    //       this.setState({ generation_progress: {
    //         name: p.getCurrentActionName(),
    //         percentage: (p.getProgress() * 100).toFixed(2)
    //       } })
    //     }
    //   }))
      .then(world => {
        console.log('world', world);
        this.setState({ world })
      })
  }

  render() {
    const { children } = this.props
    return (
      <div className={'app_component'}>
        <div className={'canvas'}>
          <GalaxyScene
            world={this.state.world}
          />
          {/* <Scene>
            <mesh
              // rotation={this.state.cubeRotation}
            >
              <boxGeometry width={3} height={3} depth={3} />
              <meshLambertMaterial color={0xF3FFE2} />
            </mesh>
          </Scene> */}
        </div>
        {/* <div>
          <Chart />
        </div> */}
        <div className={'overlay'}>
          <RaisedButton
            label={'generate'}
            onClick={() => this.generate()}
          />
          <div>
            {this.state.generation_progress.percentage} :: {this.state.generation_progress.name}
          </div>
          {/* <pre>
            {JSON.stringify(this.state.world, null, 2)}
          </pre> */}
        </div>
      </div>
    )
  }
}


export default App
