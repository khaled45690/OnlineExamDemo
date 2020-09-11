import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MainData } from '../SharedData/Maindata';
class login_student extends Component {

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
                        <div className="about-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <div className="about-container">
                                            <h3>تسجيل دخول المدرسين </h3>
                                            <div className="col-lg-12">
                                                <div className="row">
                                                    <div id="login-overlay" className="modal-dialog">
                                                        <div className="modal-content" style={{ borderRadius: "0" }}>
                                                            <div className="modal-body">
                                                                <h1 style={{ color: "black", textAlign: "center" }}>تسجيل دخول</h1>
                                                                <form id="registerForm" method="POST" >
                                                                    <div className="form-group">

                                                                        <div className="col-xs-12 col-lg-12">
                                                                            <label for="InputEmail">البريد الألكتروني</label>
                                                                            <div className="input-group">
                                                                                <input type="email" className="form-control" onChange={Signin} name="email" placeholder="ادخل البريد الألكتروني" required />
                                                                                <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                                                            </div>

                                                                            <label for="InputPassword">كلمه المرور</label>
                                                                            <div className="input-group">
                                                                                <input type="password" className="form-control" onChange={Signin} name="password" placeholder="ادخل كلمه المرور" required />
                                                                                <span className="input-group-addon"><span className="glyphicon glyphicon-asterisk"></span></span>
                                                                            </div>



                                                                            {/* <!--------------------------------------separator---------------------------------------------------------------> */}

                                                                        </div>
                                                                    </div>
                                                                    <label ><h4 style={{ color: "red", marginTop: "20px" }}>{error}</h4></label >
                                                                    <label ><h4 style={{ color: "green", marginTop: "20px" }}>{msg}</h4></label >

                                                                    <div className="form-group">
                                                                        <div className="input-group-addon" style={{ transform: "rotate(720deg)" }}>
                                                                        <button type="submit" onClick={Submit} className="btn btn-success pull-right" >ارسال البيانات</button>

                                                                        </div>
                                                                    </div>
                                                                </form>
                                                                <p  ><Link to="signout-teacher" style={{ color: "black" }}>اذا كنت لا تمتلك حساب يمكنك انشاء حساب من هنا</Link></p>
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