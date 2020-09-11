import React, { Component } from 'react';

import AddFullQuestion from './AddFullQuestion'
import AddShortExams from './add-short-exams'
import ShowingExamjs from './ShowingExam'
import { SharedData } from '../../SharedData/Shareddata'
class adding_exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server: '/',
            i: 1,
            question_names: ['الاول', "الثانى", "الثالث", "الرابع"],
            question_var: ['MainQ1', 'MainQ2', 'MainQ3', 'MainQ4',]
        }
    }

    ShowExam = () => {
        this.HideExam.style.display = 'none'
        this.ShowingExam.style.display = 'block'
    }
    hideexam = () => {
        this.HideExam.style.display = 'block'
        this.ShowingExam.style.display = 'none'
    }

    AddandRemove = (e) => {

        if (e.target.id === "add") {
            if (this.state.i <= 3) {
                this.setState({
                    i: this.state.i + 1
                });
            } else {

            }
        } else if (e.target.id === "remove") {
            if (this.state.i > 1) {
                this.setState({
                    i: this.state.i - 1
                });
            } else {

            }
        }
    }


    button = (CheckExam , display , Cancel , SendExam , disable)=>{
        if(display === "Confirm"){
           return( <button className="ExamChecking" onClick ={CheckExam} >تسجيل الامتحان</button>)
        }else if(display === "Submit"){
            return(
                 <div>  
                     <button className="ExamChecking" onClick ={SendExam} disabled={disable} >تاكيد التسجيل </button>
                 <button className="ExamChecking" onClick ={Cancel}>الغاء</button> 
                 </ div>
                 )
        }
    }

    render() {
        return (
            // 
            <SharedData.Consumer>{(context) => {
                let { ExamName, OtherDetails , err , CheckExam , errs  , display , Cancel , SendExam , disable} = context;
                return (
                    <div className="adding_exams">

                        <section className="color-white" >
                            <div class="container">
                                <div class="row ask" >
                                    <div class="board" style={{ marginTop: "10px", marginBottom: "5px" }}>

                                        <div class="">
                                            <ul class="nav nav-tabs pd-f" id="myTab" >
                                                <div></div>
                                                <li class="active rearrange">
                                                    <a href="#home" data-toggle="tab" title="welcome">
                                                        <span class="round-tabs one">
                                                            <i class="glyphicon glyphicon-home"></i>
                                                        </span>
                                                    </a></li>

                                                <li class="rearrange"><a href="#profile" data-toggle="tab" title="النموذج الطويل">
                                                    <span class="round-tabs two">
                                                        <i class="glyphicon glyphicon-plus"></i>
                                                    </span>
                                                </a>
                                                </li>

                                            </ul></div>

                                        <div class="tab-content">
                                            <div class="tab-pane fade in active" id="home">

                                                <h3 class="head text-center" style={{ marginTop: "50px" }}>Welcome to Bootsnipp<sup>™</sup> <span style={{ color: "#f48260", marginTop: "50px" }}>♥</span></h3>
                                                <p class="narrow text-center" style={{ marginTop: "50px" }}>
                                                    Lorem ipsum dolor sit amet, his ea mollis fabellas principes. Quo mazim facilis tincidunt ut, utinam saperet facilisi an vim.
                          </p>

                                                <p class="text-center">
                                                    <a href="" class="btn btn-success btn-outline-rounded green"> start using bootsnipp <span style={{ marginLeft: "10px" }} class="glyphicon glyphicon-send"></span></a>
                                                </p>
                                            </div>

                                            {/* <!-- Questions that will be added  --> */}
                                            {/* <!-- the full Exam model --> */}

                                            <div class="tab-pane fade " id="profile">
                                                <div ref={(el) => { this.HideExam = el }}>
                                                    <button className="ExamShowingButton" onClick={this.ShowExam}>معاينة</button>
                                                    <h3 class="head text-center"><b>النموذج الطويل</b></h3>
                                                    <label style={{ textAlign: "center", float: "right", marginTop: "5px" }}></label>
                                                    <div style={{ marginBottom: "10px" }} class="input-group question-input" >

                                                        <input type="text" class="form-control question-input" name="SubjectName" placeholder="ادخل اسم المادة " onChange={OtherDetails} />
                                                        <input type="text" class="form-control question-input"  placeholder="ادخل اسم الامتحان: " onChange={ExamName} />
                                                    </div>
                                                    {[...Array(this.state.i)].map((e, i) => {
                                                        return (
                                                            <AddFullQuestion question_name={this.state.question_names[i]} question_var={this.state.question_var[i]} />
                                                        )
                                                    })}

                                                    <div className="addbtndiv">
                                                        <button onClick={this.AddandRemove} style={{ borderRadius: "20", margin: "20px" }} id="add" value="اضافة اسالة" class="btn btn-success ">اضافة سؤال جديد</button>
                                                        <button onClick={this.AddandRemove} style={{ borderRadius: "20", margin: "20px" }} id="remove" value="اضافة اسالة" class="btn btn-success ">حذف سؤال جديد</button>
                                                    </div>


                                                    <fieldset style={{ width: "350px" }} >
                                                        <label ><h4 style={{ color: "black", marginTop: "20px" }}>اختر السنة الدراسية-></h4></label >
                                                        <select onChange={(e) => { OtherDetails(e) }} name="academic_year" className="myList" style={{ color: "black" }}>
                                                            <option value="none">none</option>
                                                            <option value="first year">اولى ابتدائى</option>
                                                            <option value="second year">تانية ابتدائى</option>
                                                            <option value="third year">تالتة ابتدائى</option>
                                                            <option value="fourth year">رابعة ابتدائى</option>
                                                            <option value="fifth year">خامسة ابتدائى</option>
                                                            <option value="sixth year">ستة ابتدائى</option>
                                                            <option value="seventh year">اولى اعدادى</option>
                                                            <option value="eighth year">تانية اعدادى</option>
                                                            <option value="ninth year">تالتة اعدادى</option>
                                                            <option value="tenth year">اولى ثانوى</option>
                                                            <option value="eleventh year">تانية ثانوى</option>
                                                            <option value="twelfth year">تالتة ثانوى</option>
                                                        </select>
                                                    </fieldset>

                                                    <fieldset style={{ width: "350px", display: "flex" }} >
                                                        <label ><h4 style={{ color: "black", marginTop: "20px", float: "right" }}>هذا الامتحان سيظهر </h4></label >
                                                        <select onChange={(e) => { OtherDetails(e) }} className="myList" name="Student_Allowment" style={{ color: "black" }}>
                                                            <option value="none">none</option>
                                                            <option value="only">للطلاب المشتركين فقد</option>
                                                            <option value="all">لكل الطلاب</option>

                                                        </select>
                                                    </fieldset>
                                                </div>


                                                <div ref={(el) => { this.ShowingExam = el }} style={{ display: 'none' }} >
                                                    <button className="ExamShowingButton" onClick={this.hideexam}>معاينة</button>
                                                    <ShowingExamjs />
                                                    <div style={{height:"50px"}}>
                                                        {this.button(CheckExam , display , Cancel , SendExam , disable)}
                                                    
                                                    </div>
                                                    <h3 style={{color:"red"}} >{err}</h3>
                                                    <h3 style={{color:"red"}} >{Object.keys(errs).map((key , i)=>{
                                                    return(<div> {errs[key]} </div>)
                                                    })}</h3>
                                                </div>


                                            </div>

                                            {/* <!-- the short Exam model that will have two types of --> */}
                                            <div class="tab-pane fade " id="messages">
                                                <h3 class="head text-center"><b>النموذج القصير</b></h3>
                                                <label style={{ textAlign: "center", float: "right", marginTop: "5px" }}></label>
                                                <div style={{ marginBottom: "10px" }} class="input-group question-input" >
                                                    <input type="text" class="form-control question-input"  placeholder="ادخل اسم الامتحان: " onChange={ExamName} />
                                                </div>
                                                {[...Array(this.state.i)].map((e, i) => {
                                                    return (
                                                        <AddShortExams question_name={this.state.question_names[i]} question_var={this.state.question_var[i]} />
                                                    )
                                                })}

                                                <div className="addbtndiv">
                                                    <button onClick={this.AddandRemove} style={{ borderRadius: "20", margin: "20px" }} id="add" value="اضافة اسالة" class="btn btn-success ">اضافة سؤال جديد</button>
                                                    <button onClick={this.AddandRemove} style={{ borderRadius: "20", margin: "20px" }} id="remove" value="اضافة اسالة" class="btn btn-success ">حذف سؤال جديد</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="warning stick sticker">
                            please make sure to add exams in bigger screens
                </div>
                    </div>
                );
            }}
            </SharedData.Consumer>
        );
    }
}

export default adding_exams;