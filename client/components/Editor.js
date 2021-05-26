import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios';

/**
 * COMPONENT
 */
class Editor extends React.Component{
  componentDidMount(){
    this.el.value = this.props.code;
    const editor = CodeMirror.fromTextArea(this.el, {
      lineNumbers: true
    });
    editor.on('change', ()=> {
      this.props.update(editor.doc.getValue());
    });
  }
  componentWillUnmount(){
    //TODO - remove editor
    //this.el.parentNode.removeChild(this.el);
  }
  render(){
    return (
      <textarea ref={ el => this.el = el }/>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    code: state.auth.code
  }
}

const mapDispatch = dispatch => {
  return {
    update: async(code)=> {
      //TODO move to thunk
      const response = await axios.put('/api/code', { code }, {
        headers: {
          authorization: window.localStorage.getItem('token')
        }
      })
      console.log(response.data);
    }
  };
}

export default connect(mapState, mapDispatch)(Editor)
