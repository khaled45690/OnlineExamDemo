import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import Button from '@material-ui/core/Button';
import Latex from 'react-latex';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
// or const { useQuill } = require('react-quilljs');
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill'
import 'quill/dist/quill.snow.css'; // Add css for snow theme
var toolbarOptions = [
  ['underline', 'bold', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'ltr' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'align': [] }], ['formula'],

  ['clean']                                         // remove formatting button
];
var headless = [{ 'class': "hello" }];
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

class Editor extends Component {

  constructor(props) {
    super(props)

    this.myRef = React.createRef();
    this.state = {

      text: ' ',
      value: '',
      latex: '\\frac{1}{\\sqrt{2}}\\cdot 2',
      contents: [],
      x: 0,
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)

  }

  componentDidMount() {

    console.log(this.state.someProperty);
    this.setState({ someProperty: { ...this.state['someProperty'], ['flag']: [] } }, () => {
      this.setState({ ['someProperty']: { ...this.state['someProperty'], ['flag']: { ...this.state['someProperty["flag"]'], me1: "hello word" } } });
    });



  }

  // Get the size of an object


  handleChange(content, delta, source, editor) {
    this.setState({ text: content, editor: editor.getContents() })
    console.log(editor.getContents().ops);
    let X = 0;



    for (const key in editor.getContents().ops) {
      if (editor.getContents().ops[key]) {
        if (editor.getContents().ops[key].insert.formula) {
          const element = editor.getContents().ops[key].insert.formula
          console.log(key);

        } else {
          const element = editor.getContents().ops[key].insert;

        }


      }
    }
  }


  ididit = (e)=>{
    console.log(e.target.getAttribute('var1'));
    console.log(e.target);
    
  }

  handy =(e)=>{
    console.log(e.target.value);
    
  }

  click = () => {
    let h;
    this.setState({ ['someProperty']: { ...this.state['someProperty'], ['flag']: { ...this.state['someProperty["flag"]'], me1: "hello worlds" } } });

    if (this.state.editor) {
      for (const i in this.state.editor.ops) {
        console.log(i);

        if (this.state.editor.ops[i].insert.formula) {
          let xz = "" + this.state.editor.ops[i].insert.formula;

          this.info1.innerHTML(<InlineMath math={xz} />)
        } else {
          h += this.state.editor.ops[i].insert
        }


      }
      return (<div>{[...Array(this.state.editor.ops)].map((e, i) => {
        console.log(this.state.editor.ops);
        if (this.state.editor.ops[i].insert.formula) {


          let xz = "" + this.state.editor.ops[i].insert.formula;
          return (<InlineMath math={xz} />)
        } else {
          return (this.state.editor.ops[i].insert)
        }

      })} </div>)
    } else {
      return (<div></div>)
    }

    console.log(this.state.someProperty.flag);
  }
  render() {
    return (
      <div className="equa">
        <ReactQuill value={this.state.text}
          onChange={this.handleChange}
          modules={{ toolbar: toolbarOptions }} />

        <br /> <br />
        <input value="c = \pm\sqrt{a^2 + b^2}" />
        <br /> <br />
        <input value="\frac{5^6}{6+7}" />

        <button className="mui-btn mui-btn--raised" onClick={this.click}>click me</button>

        <h3 dangerouslySetInnerHTML={{ __html: this.state.text }} ref={(el) => { this.info1 = el }}></h3>
        <br /><br /><br /><br />
        <h3 >{this.state.text}</h3>

        <form onChange={this.handy} style={{display:"flex"}}>
      
          <div>
          <b>تلقائى</b>
          <input type="radio" name={'me'} value="auto" />
          
          </div>
          <div>
          <b>يدوى</b>
          <input type="radio" name={"me"} value="manual" />
          
          </div>
          <div>
          <h3> التصحيح هنا يكون </h3>
          </div>
        </form>


        <div class="redblue-toggle" role="button" aria-pressed="false">
  Toggle <span class="redblue-toggle__color">Blue</span>
</div>

<button class="mdc-button">  <span class="mdc-button__ripple"></span> Learn More</button>

<Button variant="contained" color="primary" var1="i did it" onClick={this.ididit}>
      <div var1="i did it"> Hello World </div>
    </Button>


    <button var1="i did it" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" type="button"><span class="MuiButton-label">Hello World</span><span class="MuiTouchRipple-root"></span></button>

      </div>
    );
  }
}



export default Editor;

