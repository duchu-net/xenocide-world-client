import React from 'react'
import { RaisedButton } from 'material-ui'
import { generateNewGalaxie } from 'xenocide-world-generator'


class App extends React.Component {
  state = {
    world: null,
    generation_progress: {

    },
  }

  generate() {
    Promise.resolve()
      .then(() => generateNewGalaxie({
        onUpdate: p => {
          this.setState({ generation_progress: {
            name: p.getCurrentActionName(),
            percentage: (p.getProgress() * 100).toFixed(2)
          } })
        }
      }))
      .then(world => {
        console.log('world', world);
        this.setState({ world })
      })
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <RaisedButton
          label={'generate'}
          onClick={() => this.generate()}
        />
        <div>
          {this.state.generation_progress.percentage} :: {this.state.generation_progress.name}
        </div>
        <pre>
          {JSON.stringify(this.state.world, null, 2)}
        </pre>
      </div>
    )
  }
}


export default App
