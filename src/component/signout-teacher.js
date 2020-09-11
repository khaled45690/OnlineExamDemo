import React, { Component } from 'react';
import { Link } from "react-router-dom";
class login_teacher extends Component {
//http://localhost:3001/'
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
                server: '/',
            returned: '',
            user_id: '',
            Categorys: [],
            user: [],
        }
    }
    Signout = (e) => {
        //this function is used to save data in user variable
        this.setState({
            error: "",
            msg: "",
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
        console.log(this.state.user);

        if (typeof this.state.user.name === "undefined" || typeof this.state.user.number === "undefined" || typeof this.state.user.email === "undefined" || typeof this.state.user.password === "undefined" || typeof this.state.user.Teachinglevels === "undefined") {
            this.setState({
                error: "من فضلك تاكد من ادخال البيانات كاملة"
            })
        } else {
            if (this.state.user.password === this.state.password_repeat) {
                let validation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.user.email);
                // this if statement is to check if the email is correct
                if (validation) {
                    // here is the code that will send data to server
                    this.setState({ user: { ...this.state.user, AccountType: "Teacher" } }, () => {
                        fetch(this.state.server + "Asignout", {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(this.state.user)
                        }).then((result) => { return result.json(); }).then((result) => {
                            console.log(result);

                            if (result.state === "succed") {
                                this.setState({ msg: result.respond });
                            } else {
                                this.setState({ error: result.respond })
                            }
                        })
                    })

                } else {
                    this.setState({
                        error: "من فضلك تاكد من ادخال الحساب بالشكل التالى yahoo.com او anything.anything"
                    })
                }

            } else {
                this.setState({
                    error: "من فضلك تاكد من ادخال الباسورد متشابه حتى يتم اكمال العملية"
                })
            }
        }
    }

    Signup = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (e.target.checked) {
            if (this.state.user[value]) {
                this.setState({ user: { ...this.state.user, [value]: { ...this.state.user[value], [name]: name } } }, () => {
                })
            } else {
                this.setState({
                    user: { ...this.state.user, [value]: [] }
                }, () => {
                    this.setState({
                        user: { ...this.state.user, [value]: { ...this.state.user[value], [name]: name } }
                    }, () => {
                    })
                });
            }
        } else {
            let items = this.state.user.Teachinglevels;
            let filter = []
            Object.keys(items).map((key, i) => {
                if (key === name) {

                } else {
                    let item = items[key]
                    filter = { ...filter, [item]: key }
                    this.setState({
                        user: { ...this.state.user, Teachinglevels: filter }
                    })
                }

            })
        }

    }
    render() {
        return (
            <div className="login_teacher">
                <div className="about-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-12">
                                <div className="about-container">
                                    <h3>تسجيل دخول المدرسين</h3>



                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div id="login-overlay" className="modal-dialog">
                                                <div className="modal-content bor">

                                                    <div className="modal-body">
                                                        <h1 className="co" >انشاء حساب</h1>
                                                        <form id="registerForm" method="POST" >
                                                            <div className="form-group">
                                                                <div className="col-xs-12 col-lg-12">
                                                                    <label style={{ color: "black" }}>الأسم بالكامل</label>
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="text" className="form-control" name="name" onChange={this.Signout} placeholder="ادخل اسمك الكامل" required />

                                                                    </div>
                                                                    <br />
                                                                    <label style={{ color: "black" }}>البريد الألكتروني</label>
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="email" className="form-control" name="email" onChange={this.Signout} placeholder="ادخل البريد الألكتروني" required />

                                                                    </div>
                                                                    <label ><h4 style={{ color: "black" }}>رقم هاتف </h4></label >
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="text" className="form-control" style={{ width: "100%", color: "black" }} onChange={this.Signout} name="number" placeholder="ادخل رقم هاتف ولي الامر " required />

                                                                    </div>
                                                                    <br />
                                                                    <label style={{ color: "black" }}>كلمه المرور</label>
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="password" className="form-control" name="password" onChange={this.Signout} placeholder="ادخل كلمه المرور" required />

                                                                    </div>
                                                                    <br />
                                                                    
                                                                    <label style={{ color: "black" }} >تأكيد كلمه المرور</label>
                                                                    <div className="input-group" style={{ width: "100%" }}>
                                                                        <input type="password" className="form-control" name="password_repeat" onChange={this.Signout} placeholder="تأكيد كلمه المرور" required />

                                                                    </div>
                                                                    <br />
                                                                    <label style={{ color: "black" }} >اختر مراحل التدريس</label>
                                                                    <div >
                                                                        <input type="checkbox" value="Teachinglevels" name="elementary" onChange={this.Signup} /><label style={{ color: "grey" }}> المرحلة الابتدائية</label><br />
                                                                        <input type="checkbox" value="Teachinglevels" name="middle" onChange={this.Signup} /> <label style={{ color: "grey" }}>المرحلة الاعدادية</label><br />
                                                                        <input type="checkbox" value="Teachinglevels" name="high" onChange={this.Signup} /><label style={{ color: "grey" }}>المرحلة الثانوية</label><br />
                                                                    </div>

                                                                    <hr />
                                                                </div>
                                                                <label ><h4 style={{ color: "red", marginTop: "20px" }}>{this.state.error}</h4></label >
                                                                <label ><h4 style={{ color: "green", marginTop: "20px" }}>{this.state.msg}</h4></label >
                                                            </div>


                                                            <div className="form-group">
                                                                <div className="input-group-addon TRA" >
                                                                    <button type="submit CSS" onClick={this.Submit} value="ارسال البيانات" className="btn btn-success pull-right" >ارسال البيانات</button>

                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login_teacher;