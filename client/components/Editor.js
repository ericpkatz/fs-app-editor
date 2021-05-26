import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios';
import { setAuth } from '../store'; 

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
    try {
      const container = this.el.parentNode;
      const _editor = container.querySelector('.CodeMirror');
      _editor.parentNode.removeChild(_editor);
    }
    catch(ex){
      console.log(ex);
    }
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
      //update Store 
      dispatch(setAuth(response.data));
    }
  };
}

export default connect(mapState, mapDispatch)(Editor)
