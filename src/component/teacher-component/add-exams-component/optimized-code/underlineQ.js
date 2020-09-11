import React, { Component } from 'react';

import ReactQuill from 'react-quill';
import 'katex/dist/katex.min.css';
import 'quill/dist/quill.snow.css';
import { SharedData } from '../../../../SharedData/Shareddata'
var toolbarOptions = [
    ['underline', 'bold', 'strike'],        // toggled buttons
    ['clean']                                         // remove formatting button
];
class adding_exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            text: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(content, _delta, _source, editor) {
        console.log(editor);
        // console.log(editor.getContents);

        this.setState({
            text: content
        });

    }
    handy(Var1, Var2, Var3, content) {
        console.log(Var1);
        console.log(Var2);
        console.log(Var3);
        console.log(content);

    }
    render() {
        let Var1 = this.props.MainQ;
        let Var2 = this.props.Q;
        let Var3 = this.props.subQ;
        let Var4 = 'Question'
        let Var5 = "صحح ما تحته خط";
        let Var7="QType"
        return (
            <SharedData.Consumer>{(context) => {
                let { ExamQ , ExamQuestion , text} = context;

                return (
                    <div className="adding_exams">
                        <h3>{this.props.number + 1 + "- اضف سؤالك هنا:"}</h3>
                        <div class="input-group question-input" >
                            <form >
                                <ReactQuill onChange={ExamQuestion.bind(this, Var1, Var2, Var3 , Var4 , Var5 , Var7)} id = {Var1 + Var2 + Var3}  modules={{ toolbar: toolbarOptions }} placeholder="ادخل السؤال" >

                                </ReactQuill></form>


                            <fieldset style={{ width: "250px" }} >
                                <label ><h4>اختر الدرجة-></h4></label>
                                <select onChange={(e) => { ExamQ(e) }} className="myList" var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="degree" var5="صحح ما تحته خط" var7="QType" >
                                    <option value="0">0</option>
                                    <option value="0.5">0.5</option>
                                    <option value="1">1</option>
                                    <option value="1.5">1.5</option>
                                    <option value="2">2</option>
                                    <option value="2.5">2.5</option>
                                    <option value="3">3</option>

                                </select>
                            </fieldset>

                            <input style={{ width: "50px;" }} type="text" class="form-control complete-input " onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={this.props.subQ} var4="Answer" var5="صحح ما تحته خط" var7="QType" placeholder="ادخل الاجابة الصحيح" />
                        </div>
                    </div>
                );
            }}</SharedData.Consumer>
        );
    }
}

export default adding_exams;