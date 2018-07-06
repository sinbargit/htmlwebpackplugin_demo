import React,{Component} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }


  render() {
    return (
      <div>
        <input value={this.state.value} onChange={({target: {value}}) => this.setState({value})} />
        <CopyToClipboard text={this.state.value} onCopy={() => alert('复制成功')}>
          <button>Copy</button>
        </CopyToClipboard>
      </div>
    );
  }
}
 
const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

export default App;