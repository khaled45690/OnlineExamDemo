import React, { Component } from 'react';

import CompleteQ from "./optimized-code/completeQ"
import UnderlineQ from "./optimized-code/underlineQ"
import ChooseQ from "./optimized-code/chooseQ"
import QPhoto from "./optimized-code/Qphoto"
import { SharedData } from '../../../SharedData/Shareddata'



class question_types extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server: '/',
            i: 1,
            x: 1,
            user_id: '',
            Categorys: [],
            subQ: ['subQ1', 'subQ2', 'subQ3', 'subQ4', 'subQ5'],
            QName:''

        }

    }

    addingQ = (e) => {
        this.setState({
            i: 1
        });
        if (e.target.value === "0") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";
            this.Form3.style.display = "none";
            this.Form4.style.display = "none";
            this.Form5.style.display = "none";
            this.Form6.style.display = "none";

        } else if (e.target.value === "1") {
            this.Form1.style.display = "block";
            this.Form2.style.display = "none";
            this.Form3.style.display = "none";
            this.Form4.style.display = "none";
            this.Form5.style.display = "none";
            this.Form6.style.display = "none";

        } else if (e.target.value === "2") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "block";
            this.Form3.style.display = "none";
            this.Form4.style.display = "none";
            this.Form5.style.display = "none";
            this.Form6.style.display = "none";
        } else if (e.target.value === "3") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";
            this.Form3.style.display = "block";
            this.Form4.style.display = "none";
            this.Form5.style.display = "none";
            this.Form6.style.display = "none";

        } else if (e.target.value === "4") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";
            this.Form3.style.display = "none";
            this.Form4.style.display = "block";
            this.Form5.style.display = "none";
            this.Form6.style.display = "none";

        } else if (e.target.value === "5") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";
            this.Form3.style.display = "none";
            this.Form4.style.display = "none";
            this.Form5.style.display = "block";
            this.Form6.style.display = "none";

        } else if (e.target.value === "6") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";
            this.Form3.style.display = "none";
            this.Form4.style.display = "none";
            this.Form5.style.display = "none";
            this.Form6.style.display = "block";

        }
    }

    hide = (e) => {
        this.Q.style.display = "none"
    }
    AddandRemove = (e) => {
        e.preventDefault();
        if (e.target.value === "Form1Add") {
            
                this.setState({
                    i: this.state.i + 1
                });
            
        } else if (e.target.value === "Form1Remove") {
            if (this.state.i >= 2) {
                this.setState({
                    i: this.state.i - 1
                });
            }
        } else if (e.target.value === "Form1Addchoice") {
            if (this.state.x < 4) {
                this.setState({
                    x: this.state.x + 1
                });
            }
        } else if (e.target.value === "Form1Removechoice") {
            if (this.state.x >= 2) {
                this.setState({
                    x: this.state.x - 1
                });
            }
        }
    }

    Qname = (e) => {
        this.setState({ QName: e.target.value })
    }

    render() {
        return (
            // 
            <SharedData.Consumer>{(context) => {
                let { ExamQ , filterQ  , filtersubQ} = context;
                return (
                    <div className="question_types" ref={(el) => { this.Q = el }}>
                        <div className="Q1">
                            <fieldset >
                                <label ><h3>{this.props.question_name}- اختر نوع السؤال</h3></label>
                                <select onChange={(e) => { filterQ(e); this.addingQ(e);  }} var1={this.props.MainQ} var2={this.props.Q} className="myList">
                                    <option value="0">none</option>
                                    <option value="1">سؤال اكمل العبارات التاليه</option>
                                    <option value="2">سؤال صح ام خطأ</option>
                                    <option value="3">سؤال اختر الاجابه الصحيحة</option>
                                    <option value="4">اكتب المصطلح العلمي الدال علي العبارة الاتية</option>
                                    <option value="5">صحح ما تحته خط</option>
                                    <option value="6">الاسالة المقالية</option>

                                </select>
                            </fieldset>
                        </div>

                        <form className="question-form" ref={(el) => { this.Form1 = el }}>
                            <h3 class="head text-center"><b>سؤال اكمل العبارات التاليه </b></h3>
                            {[...Array(this.state.i)].map((e, i) => {
                                return (
                                    <div class="">
                                        <div class="form-group">
                                            <div class="">
                                                <h3>{i + 1 + "- اضف سؤالك هنا:"}</h3>
                                                <div class="input-group question-input">
                                                    <input type="text" class="form-control question-input" onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Question" var5="سؤال اكمل العبارات التاليه" var7="QType" placeholder="ادخل السؤال " />
                                                    
                                                </div>

                                            </div>

                                        </div>
                                        {/* this where the component will be to optmize the repeated code and seperate there functions*/}
                                        <CompleteQ number={this.state.i} MainQ={this.props.MainQ} Q={this.props.Q} subQ={"subQ" + (i+1)} />
                                    </div>

                                );

                            })}
                            <form  onChange={(e) => { ExamQ(e) }}  style={{ display: "flex" }}>
                                {/* <div>
                                    <h3> التصحيح هنا يكون </h3>
                                </div>
                                <div style={{ display: "flex", marginRight: "10px" }}>
                                    <h3>تلقائى</h3>
                                    <input  type="radio" className="Qradioinput" name={this.props.MainQ + " " + this.props.Q + " " + '-'} value="auto"  var1={this.props.MainQ} var2={this.props.Q} var3="CorrectionType" var4="skip" var5="سؤال اكمل العبارات التاليه" var7="QType"/>

                                </div>
                                <div style={{ display: "flex", marginRight: "10px" }}>
                                    <h3>يدوى</h3>
                                    <input type="radio" className="Qradioinput" name={this.props.MainQ + " " + this.props.Q + " " + '-'} value="manual" var1={this.props.MainQ} var2={this.props.Q} var3="CorrectionType" var4="skip" var5="سؤال اكمل العبارات التاليه" var7="QType"/>

                                </div> */}

                            </form>
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add"  class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>

                                </div>
                            </div>

                        </form>

                        <form className="question-form" ref={(el) => { this.Form2 = el }}>
                            <h3 class="head text-center"><b>سؤال صح ام خطأ</b></h3>

                            <div class="form-group">
                                {[...Array(this.state.i)].map((e, i) => {
                                    return (<div>
                                        <div class="">
                                            <h3>{i + 1 + "- اضف سؤالك هنا:"}</h3>
                                            <div class="input-group question-input">
                                                <input type="text" class="form-control question-input" onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Question" var5="سؤال صح ام خطأ" var7="QType" placeholder="ادخل السؤال " />
                                                
                                            </div>
                                        </div>
                                        <div class="input-group mr-30" >
                                            <form onChange={(e) => { ExamQ(e) }}  >
                                                <section>
                                                    <input type="radio" name={this.props.MainQ + "-" + this.props.Q + "-" + this.state.subQ[i]} value="true" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Answer" var5="سؤال صح ام خطأ" var7="QType"/>
                                                    <b>صح</b>
                                                </section>
                                                <section>
                                                    <input type="radio" name={this.props.MainQ + "-" + this.props.Q + "-" + this.state.subQ[i]} value="false" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Answer" var5="سؤال صح ام خطأ" var7="QType"/>
                                                    <b>خطأ</b>
                                                </section>
                                            </form>

                                            <div class="">
                                                <fieldset style={{ width: "250px" }}>
                                                    <label ><h4>اختر الدرجة-></h4></label>
                                                    <select onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="degree" var5="سؤال صح ام خطأ" var7="QType" className="myList">
                                                        <option value="0">0</option>
                                                        <option value="0.5">0.5</option>
                                                        <option value="1">1</option>
                                                        <option value="1.5">1.5</option>
                                                        <option value="2">2</option>
                                                        <option value="2.5">2.5</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </fieldset>
                                            </div>
                                        </div>

                                    </div>
                                    );
                                })}

                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add"  class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>

                                </div>
                            </div>

                        </form>


                        <form className="question-form" ref={(el) => { this.Form3 = el }}>

                            <h3 class="head text-center"><b>سؤال اختر الاجابه الصحيحة</b></h3>
                            <div class="form-group">
                                <div class=" mr-b42">
                                    {[...Array(this.state.i)].map((e, i) => {
                                        return (<div>
                                            <ChooseQ i={i} MainQ={this.props.MainQ} Q={this.props.Q} subQ={"subQ" + (i+1)}  />
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add"  class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>

                                </div>
                            </div>
                        </form>

                        <form className="question-form" ref={(el) => { this.Form4 = el }}>

                            <h3 class="head text-center"><b>سؤال اكتب المصطلح العلمي الدال علي العبارة الاتية</b></h3>
                            <div class="form-group">
                                {[...Array(this.state.i)].map((e, i) => {
                                    return (<div>
                                        <div class="">
                                            <h3>{i + 1 + "- اضف سؤالك هنا:"}</h3>
                                            <div class="input-group question-input">
                                                <input type="text" class="form-control question-input" onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Question" var5="سؤال اكتب المصطلح العلمي الدال علي العبارة الاتية" var7="QType" style={{ marginBottom: "10px" }}  placeholder="ادخل السؤال " />
                                                

                                            </div>
                                        </div>

                                        <input style={{ width: "50px;" }} type="text" class="form-control complete-input " onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="Answer" var5="سؤال اكتب المصطلح العلمي الدال علي العبارة الاتية" var7="QType" placeholder="ادخل الاجابة الصحيح" />
                                        <fieldset style={{ width: "250px" }} onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="degree" var5="سؤال اكتب المصطلح العلمي الدال علي العبارة الاتية" var7="QType">
                                            <label ><h4>اختر الدرجة-></h4></label>
                                            <select onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (i+1)} var4="degree" var5="سؤال اكتب المصطلح العلمي الدال علي العبارة الاتية" var7="QType" className="myList">
                                                <option value="0">0</option>
                                                <option value="0.5">0.5</option>
                                                <option value="1">1</option>
                                                <option value="1.5">1.5</option>
                                                <option value="2">2</option>
                                                <option value="2.5">2.5</option>
                                                <option value="3">3</option>

                                            </select>
                                        </fieldset>
                                    </div>
                                    );
                                })}
                                <div class="">
                                    <div class="form-group" style={{ padding: "10px;" }}>
                                        <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add"  class="btn btn-success">اضافة السؤال</button>
                                        <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>
                                    </div>
                                </div></div>
                        </form>

                        <form className="question-form" ref={(el) => { this.Form5 = el }}>

                            <h3 class="head text-center"><b>صحح ما تحته خط</b></h3>
                            <div class="form-group">
                                {[...Array(this.state.i)].map((e, i) => {
                                    return (<div>
                                        {/* this where the component will be to optmize the repeated code and seperate there functions*/}
                                        <UnderlineQ number={i}  MainQ={this.props.MainQ} Q={this.props.Q} subQ={"subQ" + (i+1)}  />
                                    </div>
                                    );
                                })}</div>
                            {/* <form  onChange={(e) => { ExamQ(e) }} style={{ display: "flex" }}  >
                                <div>
                                    <h3> التصحيح هنا يكون </h3>
                                </div>
                                <div style={{ display: "flex", marginRight: "10px" }}>
                                    <h3>تلقائى</h3>
                                    <input type="radio" className="Qradioinput" name={this.props.MainQ + " " + this.props.Q + " " + '--'} value="auto" var1={this.props.MainQ} var2={this.props.Q} var3="CorrectionType" var4="skip" var5="صحح ما تحته خط" var7="QType"/>

                                </div>
                                <div style={{ display: "flex", marginRight: "10px" }}>
                                    <h3>يدوى</h3>
                                    <input type="radio" className="Qradioinput" name={`this.props.MainQ + " " + this.props.Q + " " + '--'`} value="manual" var1={this.props.MainQ} var2={this.props.Q} var3="CorrectionType" var4="skip" var5="صحح ما تحته خط" var7="QType"/>

                                </div>

                            </form> */}
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add"  class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>


                                </div>
                            </div>
                        </form>

                        <form className="question-form" ref={(el) => { this.Form6 = el }}>

                            <h3 class="head text-center"><b>الاسالة المقالية</b></h3>
                            <div class="form-group">
                            <input type="text" class="form-control question-input " onChange={(e) => { this.Qname(e) }} placeholder="ادخل اسم السؤال " />
                                {[...Array(this.state.i)].map((e, i) => {
                                    return (<div>

                                        <QPhoto i={i} MainQ={this.props.MainQ} Q={this.props.Q} subQ={"subQ" + (i+1)}  QName ={this.state.QName}   />
                                    </div>
                                    );
                                })}</div>
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0" }}  value="Form1Add" class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={(e)=>{this.AddandRemove(e);  filtersubQ(e)}} style={{ borderRadius: "0" }} value="Form1Remove"  var1={this.props.MainQ} var2={this.props.Q} var3={this.state.i}  class="btn btn-success">حذف السؤال</button>


                                </div>
                            </div>
                        </form>

                    </div>
                );
            }}</SharedData.Consumer>);
    }
}

export default question_types;