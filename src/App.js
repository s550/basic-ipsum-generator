import React, { Component } from 'react';
// delete logo import is okay
import Writer from './components/output';
import './App.css';
import axios from 'axios';
import Selector from './components/controls/select';
import Text from './components/controls/text';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      paras:4,
      html: true,
      text: ""
    }
{/*So set your blank state to what you want your stock values to be in this case the api values*/}
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
    axios.get('http://hipsterjesus.com/api/?paras' + this.state.paras + '&html=' + this.state.html)
      .then((response) => {
        this.setState({text: response.data.text}, function(){
          console.log(this.state);
        });
      })
      .catch((err) =>{
        console.log(err);
      });


  }

  showHtml(ans){
    this.setState({html: ans}, this.getSampleText);
  }
  paraSet(number){
    this.setState({paras: number}, this.getSampleText);
  }

  render() {
    return (
      <div className="App container">
      <h1 className="text-center">Reactjs Ipsum Generator</h1>
      <hr />
      <form className="form-inline">
      <div className="form-group">
      <label>Include Html:</label>
      <Selector value={this.state.html} onChange={this.showHtml.bind(this)} />
      </div>
      <div className="form-group">
      <label>Number of Paragraphs:</label>
      <Text value={this.state.paras} onChange={this.paraSet.bind(this)} />
      </div>
      </form>
      <br />
         {/*clean out the app div
        it seems appjs is the main app component you layer it on indexjs to write to the dom*/}
        <Writer value={this.state.text} />
      </div>
    );
  }
}

export default App;
// app is the bullets index is the gun
