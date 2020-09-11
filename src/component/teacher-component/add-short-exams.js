import React, { Component } from 'react';
import { Link } from "react-router-dom";

import ChooseQ from "./add-exams-component/optimized-code/chooseQ"
class AddShortExams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server: '/',
            i: 1,
            x: 1,
            user_id: '',
            Categorys: [],


        }
    }

    AddandRemove = (e) => {
        e.preventDefault();
        if (e.target.id === "Form1Add") {
            if (this.state.i <= 50) {
                this.setState({
                    i: this.state.i + 1
                });
            }
        } else if (e.target.id === "Form1Remove") {
            if (this.state.i >= 2) {
                this.setState({
                    i: this.state.i - 1
                });
            }
        } else if (e.target.id === "Form1Addchoice") {
            if (this.state.x < 4) {
                this.setState({
                    x: this.state.x + 1
                });
            }
        } else if (e.target.id === "Form1Removechoice") {
            if (this.state.x >= 2) {
                this.setState({
                    x: this.state.x - 1
                });
            }
        }
    }
    addingQ = (e) => {
        this.setState({
            i: 1
        });
        if (e.target.value === "0") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "none";


        } else if (e.target.value === "1") {
            this.Form1.style.display = "block";
            this.Form2.style.display = "none";


        } else if (e.target.value === "2") {
            this.Form1.style.display = "none";
            this.Form2.style.display = "block";

        }
    }
    render() {
        return (
            <div className="adding_Full_question" style={{ width: "450px" }}>
                <h1 class="head " style={{ textAlign: "right" }}><b>السؤال {this.props.question_name}:-</b></h1>
                <div className="question_types" ref={(el) => { this.Q = el }}>
                    <div className="Q1">
                        <fieldset >
                            <label ><h3> اختر نوع السؤال</h3></label>
                            <select onChange={this.addingQ} id="myList" className="myList">
                                <option value="0">none</option>
                                <option value="1">سؤال اختر الاجابه الصحيحة</option>
                                {/* <option value="2">الاسالة المقالية</option> */}

                            </select>
                        </fieldset>

                        <form className="question-form" ref={(el) => { this.Form1 = el }}>

                            <h3 class="head text-center"><b>سؤال اختر الاجابه الصحيحة</b></h3>
                            <div class="form-group">
                                <div class=" mr-b42">
                                    {[...Array(this.state.i)].map((e, i) => {
                                        return (<div>
                                            <ChooseQ i={i} id={this.props.id} question_name={this.props.question_name} />
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0;" }} name="ask2" id="Form1Add" value="اضافة السؤال" class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0;" }} name="ask1" id="Form1Remove" value="حذف السؤال" class="btn btn-success">حذف السؤال</button>

                                </div>
                            </div>
                        </form>




                        <form className="question-form" ref={(el) => { this.Form2 = el }}>

                            <h3 class="head text-center"><b>الاسالة المقالية</b></h3>
                            <div class="form-group">
                                {[...Array(this.state.i)].map((e, i) => {
                                    return (<div>
                                        <div class="">
                                            <h3>{i + 1 + "- اضف سؤالك هنا:"}</h3>
                                            <div class="input-group question-input">
                                                <input style={{ width: "50px;", marginBottom: "10px" }} type="text" class="form-control" name="ask3" placeholder="ادخل اسم السؤال" />
                                                <input type="text" class="form-control question-input" style={{ marginBottom: "10px" }} name="ask3" placeholder="ادخل السؤال " />
                                                <textarea rows="4" class="form-control question-input " style={{ marginBottom: "10px" }} cols="50" placeholder="ادخل الاجابة " />
                                                <input style={{ width: "50px;" }} type="text" class="form-control complete-input " name="ask3" placeholder="ادخل درجة السؤال" />
                                            </div>
                                        </div>
                                    </div>
                                    );
                                })}</div>
                            <div class="">
                                <div class="form-group" style={{ padding: "10px;" }}>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0;" }} name="ask2" id="Form1Add" value="اضافة السؤال" class="btn btn-success">اضافة السؤال</button>
                                    <button type="" onClick={this.AddandRemove} style={{ borderRadius: "0;" }} name="ask1" id="Form1Remove" value="حذف السؤال" class="btn btn-success">حذف السؤال</button>


                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default AddShortExams;