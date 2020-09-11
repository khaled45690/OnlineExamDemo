import React, { Component } from 'react';
import { Link } from "react-router-dom";
class login_student extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
                server: '/',
            returned: '',
            password_repeat: '',
            error :"",
            msg:"",
            user: [],
        }
    }
    Signout = (e) => {
        //this function is used to save data in user variable
        this.setState({
            error:"",
            msg:"",
        })
        if (e.target.name === 'password_repeat') {
            this.setState({
                password_repeat: e.target.value
            });
        } else {
            this.setState({
                user: { ...this.state.user, [e.target.name]: e.target.value }
            })
        }

    }
    Submit = (e) => {
        // this function is to check if there is something missing
        e.preventDefault();
        
        if (typeof this.state.user.name === "undefined" || typeof this.state.user.number === "undefined" || typeof this.state.user.email === "undefined" || typeof this.state.user.password === "undefined" || typeof this.state.user.academic_year === "undefined") {
            this.setState({
                error: "من فضلك تاكد من ادخال البيانات كاملة"
            })
        }else{
            if(this.state.user.password === this.state.password_repeat){
                let validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.user.email);
                // this if statement is to check if the email is correct
                if(validation){
                    // here is the code that will send data to server
                    this.setState({user:{...this.state.user , AccountType: "Student"}} , ()=>{
                        console.log(this.state.user);
                        fetch(this.state.server + "Asignout", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(this.state.user)
                        }).then((result)=>{return result.json(); }).then((result)=>{
                            console.log(result);
                            
                            if(result.state === "succed"){
                                this.setState({msg:result.respond});
                            }else{
                                this.setState({error:result.respond})
                            }
                        })
                    })

               }else{
                this.setState({
                    error: "من فضلك تاكد من ادخال الحساب بالشكل التالى yahoo.com او anything.anything"
                })
               }
               
            }else{
                this.setState({
                    error: "من فضلك تاكد من ادخال الباسورد متشابه حتى يتم اكمال العملية"
                })
            }
        }
    }
    render() {
        return (
            <div className="login_student">
                <div className="about-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className="about-container">
                                    <h3>تسجيل دخول الطلاب </h3>
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div id="login-overlay" className="modal-dialog">
                                                <div className="modal-content bor">

                                                    <div className="modal-body">
                                                        <h1 className="co">انشاء حساب</h1>
                                                        <form id="registerForm" method="POST" >
                                                            <div className="form-group">
                                                                <div className="col-xs-12 col-lg-12">
                                                                    <label ><h4 style={{ color: "black" }}>الأسم بالكامل</h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="text" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} onChange={this.Signout} name="name" placeholder="ادخل اسمك بالكامل" required />

                                                                    </div>
                                                                    <br />
                                                                    <label ><h4 style={{ color: "black" }}>رقم هاتف ولي الامر</h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="text" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} name="number" placeholder="ادخل رقم هاتف ولي الامر " required />

                                                                    </div>
                                                                    <br />
                                                                    <label ><h4 style={{ color: "black" }}>البريد الألكتروني</h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="email" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} name="email" placeholder="ادخل البريد الألكتروني" required />

                                                                    </div>

                                                                    <label ><h4 style={{ color: "black" }}>كلمه المرور</h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="password" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} name="password" placeholder="ادخل كلمه المرور" required />

                                                                    </div>
                                                                    <br />
                                                                    <label ><h4 style={{ color: "black" }}>تأكيد كلمه المرور</h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }} >
                                                                        <input type="password" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} name="password_repeat" placeholder="تأكيد كلمه المرور" required />

                                                                    </div>
                                                                    <fieldset style={{ width: "350px" }} >
                                                                        <label ><h4 style={{ color: "black", marginTop: "20px" }}>اختر السنة الدراسية-></h4></label >
                                                                        <select onChange={(e) => { this.Signout(e) }} name="academic_year" className="myList" style={{ color: "black" }}>
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

                                                                    <label ><h4 style={{ color: "red", marginTop: "20px" }}>{this.state.error}</h4></label >
                                                                    <label ><h4 style={{ color: "green", marginTop: "20px" }}>{this.state.msg}</h4></label >

                                                                    {/* <!--------------------------------------separator--------------------------------------------------------------->  */}
                                                                    <br />

                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="input-group-addon TRA " >
                                                                    <button onClick={this.Submit} type="submit CSS" value="ارسال البيانات" className="btn btn-success pull-right" > ارسال البيانات</button>

                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*                                     
                                    <!--     end form        -->
                                    <!--     end form        --> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default login_student;