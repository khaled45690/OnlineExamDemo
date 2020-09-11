import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {MainData} from '../SharedData/Maindata';
class login_student extends Component {
    // http://localhost:3001
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
               server: '/',
            returned: '',
            user_id: '',
            Categorys: []
        }
    }

    render() {
        return (
            // 
            <MainData.Consumer>{(context) => {
                let { Signin, Submit, msg, error } = context;
                return (
                    <div className="login_student">
                        <div class="about-area">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="about-container">
                                            <h3>تسجيل دخول الطلاب </h3>
                                            <div class="col-lg-12">
                                                <div class="row">
                                                    <div id="login-overlay" class="modal-dialog">
                                                        <div class="modal-content" style={{ borderRadius: "0" }}>
                                                            <div class="modal-body">
                                                                <h1 style={{ color: "black", textAlign: "center" }}>تسجيل دخول</h1>
                                                                <form id="registerForm" method="POST" >
                                                                    <div class="form-group">

                                                                        <div class="col-xs-12 col-lg-12">
                                                                            <label for="InputEmail">البريد الألكتروني</label>
                                                                            <div class="input-group">
                                                                                <input type="email" class="form-control" onChange={Signin} name="email" placeholder="ادخل البريد الألكتروني" required />
                                                                                <span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>
                                                                            </div>

                                                                            <label for="InputPassword">كلمه المرور</label>
                                                                            <div class="input-group">
                                                                                <input type="password" class="form-control" onChange={Signin} name="password" placeholder="ادخل كلمه المرور" required />
                                                                                <span class="input-group-addon"><span class="glyphicon glyphicon-asterisk"></span></span>
                                                                            </div>



                                                                            {/* <!--------------------------------------separator---------------------------------------------------------------> */}

                                                                        </div>
                                                                    </div>
                                                                    <label ><h4 style={{ color: "red", marginTop: "20px" }}>{error}</h4></label >
                                                                    <label ><h4 style={{ color: "green", marginTop: "20px" }}>{msg}</h4></label >

                                                                    <div class="form-group">
                                                                        <div class="input-group-addon" style={{ transform: "rotate(720deg)" }}>
                                                                            <button type="submit" onClick={Submit} className="btn btn-success pull-right" >ارسال البيانات</button>

                                                                        </div>
                                                                    </div>
                                                                </form>
                                                                <p style={{ color: "black" }}><Link to="signout-student" >اذا كنت لا تمتلك حساب يمكنك انشاء حساب من هنا</Link></p>
                                                            </div>{/*<!---modal-body---> */}
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
            }}</MainData.Consumer>
            
            );
    }
}

export default login_student;