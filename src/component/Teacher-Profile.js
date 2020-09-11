import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Exams from "./Teacher-Profile-Component/Exams"
import Cookies from 'universal-cookie';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

const useStyles = makeStyles({
    root: {
        background: props =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: props =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 35,
        padding: '0 30px',
        margin: 8,
    },
});

function MyButton(props) {
    const { color, ...other } = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />;
}



MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
};


class Teacher_Profile extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            server: '/',
            returned: '',
            user_id: '',
            Categorys: [],
            value: "add-info",
            academicyear: {
                "first year": "اولى ابتدائى", "second year": "تانية ابتدائى", "third year": "تالتة ابتدائى", "fourth year": "رابعة ابتدائى",
                "fifth year": "خامسة ابتدائى", "sixth year": "ستة ابتدائى", "seventh year": "اولى اعدادى", "eighth year": "تانية اعدادى",
                "ninth year": "تالتة اعدادى", "tenth year": "اولى ثانوى", "eleventh year": "تانية ثانوى", "twelfth year": "تالتة ثانوى"
            },
            requestyear: "",
            pending: [],
            added: [],
            refused: [],
            StudentPercentage: {},
            StudentExams: [],
            TrueCheck: true,
            UpdatedUser:{}
        }
    }


componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
}
resize() {
    const matches = window.matchMedia("(min-width:651px)").matches;
    console.log(matches);
    if(window.location.href === "http://localhost:3000/Teacher-Profile" || window.location.href === "http://localhost:3000/Student-Profile"){
    if(matches){
        this.MainMenu.style.display = "block"
        this.MainMenuStyle.style.display = "block"
    }
    }

}

    addOrRemove = (e) => {
        const matches = window.matchMedia("(min-width:350px) and (max-width: 650px)").matches;
        console.log(matches);
        if(matches){
            this.MainMenu.style.display = "none"
            this.MainMenuStyle.style.display = "none"
        }
        

        let var1 = e
        this.setState({
            value: var1
        })


    }
    change = (e) => {

    }

    getStudentExam = (id) => {
        this.setState({
            TrueCheck: false
        })
        const cookies = new Cookies();
        let TeacherId = cookies.get('UserId');
        let StudentId = id;
        fetch(this.state.server + "getStudentExams", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                TeacherId, StudentId
            })
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                this.setState({
                    StudentExams: result
                })
            })
    }

    TheStudents = (e) => {
        if (this.state.TrueCheck) {
            return (
                <div>
                    <div style={{ display: "flex" }}>
                        <h4 style={{ width: "200px", textAlign: "center" }}><strong>اسم الطالب</strong></h4>
                        <h4 style={{ width: "200px", textAlign: "center" }}><strong>النسبة المئوية</strong></h4>
                    </div>
                    {
                        Object.keys(this.state.StudentPercentage).map((key, i) => {
                            let value = this.state.StudentPercentage[key]
                            return (
                                <div style={{ display: "flex", cursor: "pointer" }} onClick={() => { this.getStudentExam(key) }}>
                                    <h4 style={{ width: "200px", textAlign: "center" }} onClick={() => { this.getStudentExam(key) }} ><strong>{value.studentname}</strong></h4>
                                    <h4 style={{ width: "200px", textAlign: "center" }} onClick={() => { this.getStudentExam(key) }} ><strong>{value.studentdegree + "%"}</strong></h4>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {

            return (
                <div>
                    <div style={{ display: "flex" }}>
                        <h4 style={{ width: "300px", textAlign: "center" }}><strong>اسم الامتحان</strong></h4>
                        <h4 style={{ width: "200px", textAlign: "center" }}><strong>النسبة المئوية</strong></h4>
                    </div>
                    {
                        this.state.StudentExams.map((value) => {
                            console.log(value);

                            return (
                                <div style={{ display: "flex", cursor: "pointer" }}>
                                    <h4 style={{ width: "300px", textAlign: "right" }}><strong>{value.Examname}</strong></h4>
                                    <h4 style={{ width: "200px", textAlign: "center" }}><strong>{value.DegreePercentage + "%"}</strong></h4>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

    }

    UpdateUser = ( e , name) => {
        this.setState({
            UpdatedUser: { ...this.state.UpdatedUser, [name]: e.target.value },

        })
    }


    UpdateUserlLevel = (value , name , e) => {

        console.log(name + " " + value + " " + e.target.checked);
        
        if (e.target.checked) {
            if (this.state.UpdatedUser[value]) {
                this.setState({ user: { ...this.state.UpdatedUser, [value]: { ...this.state.UpdatedUser[value], [name]: name } } }, () => {
                })
            } else {
                this.setState({
                    UpdatedUser: { ...this.state.UpdatedUser, [value]: [] }
                }, () => {
                    this.setState({
                        UpdatedUser: { ...this.state.UpdatedUser, [value]: { ...this.state.UpdatedUser[value], [name]: name } }
                    }, () => {
                    })
                });
            }
        } else {
            let items = this.state.UpdatedUser.Teachinglevels;
            let filter = []
            Object.keys(items).map((key, i) => {
                if (key === name) {

                } else {
                    let item = items[key]
                    filter = { ...filter, [item]: key }
                    this.setState({
                        UpdatedUser: { ...this.state.user, Teachinglevels: filter }
                    })
                }

            })
        }

    }


    UpdateData = () => {
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let data = { "UserId": UserId, "UpdatedUser": this.state.UpdatedUser }
        let UpdatedUser = this.state.UpdatedUser


        fetch(this.state.server + "UpdateUserInfo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                console.log(result);
                this.setState({
                    UserInfo: { ...this.state.UserInfo, UpdatedUser }
                }, () => {
                    console.log(this.state.UserInfo);

                })

            })
    }

    Htmlfunction = () => {


        if (this.state.value === "add-info") {
            return (
                <div className="info-container overflowcss" ref={(el) => { this.info1 = el }} >
                    <div className="info">
                            <div className="info-modification">
                                <h4 className="info-head"> تعديل البيانات</h4>
                                <div style ={{width:"100%" , height:"100px"}}>
                                <TextField className={"tagraba"} onChange={(e)=>{this.UpdateUser(e , "name")}}  type="text" label="الاسم" />
                                <TextField className={"tagraba"} onChange={(e)=>{this.UpdateUser(e , "number")}}  type="text" label="الرقم" />
                                <TextField className={"tagraba"} onChange={(e)=>{this.UpdateUser(e , "SubjectName")}}  type="text" label="اسم المادة" />
                                </div>
                                <br/>
                                <div style={{float:"right"}}>
                                <div style={{width:"100%" , height:"20px"}}>
                                <p className="edite"> المراحل التعليمية:</p>
                                </div>
                                
                                <Checkbox  onChange={(e)=>{this.UpdateUserlLevel("Teachinglevels" , "elementary" , e)}} name="elementary" color="primary"/><label style={{ color: "grey" }}> المرحلة الابتدائية</label>
                                 <Checkbox  onChange={(e)=>{this.UpdateUserlLevel("Teachinglevels" , "middle" , e)}} name="middle" color="primary"/><label style={{ color: "grey" }}>المرحلة الاعدادية</label>
                                 <Checkbox  onChange={(e)=>{this.UpdateUserlLevel("Teachinglevels" , "high" , e)}} name="high" color="primary"/><label style={{ color: "grey" }}>المرحلة الثانوية</label>
                                </div>

                                 <input style={{ display: "none" }} ref={(el) => { this.Upload = el }} type="file" name="file-2[]" id="file-2" class="inputfile inputfile-2" onChange={(e) => this.upload(e)} data-multiple-caption="{count} files selected" multiple="" />
                                 
                                <Button style={{float:"right" , marginTop:"30px"}} className="LOGBTN" onClick={()=>{this.Upload.click()}} startIcon={<CloudUploadIcon className="Icon"/>}> عدل صورة شخصية</Button>
                                <div className="info-button-div">
                                    <Button className="info-button">تحديث البيانات</Button>
                                </div>
                            


{/*                               
                                <div className="info-body">
                                  <TextField  label="الاسم" />
                                    <p className="info-border">الاسم  </p>
                                    <input className="info-border inpo" name="name" onChange={this.UpdateUser} value={this.state.name} />
                                </div>
                                <div className="info-body">
                                    <p className="info-border">الرقم</p>
                                    <input className="info-border inpo" name="number" onChange={this.UpdateUser} value={this.state.number} />
                                </div>
                                <div className="info-body">
                                    <p className="info-border">اسم المادة</p>
                                    <input className="info-border inpo" name="SubjectName" onChange={this.UpdateUser} value={this.state.SubjectName} />
                                </div>

                                <div className="info-body">
                                    <p className="info-border">المرحلة الدراسية</p>
                                    <div >
                                        <input type="checkbox" value="Teachinglevels" name="elementary" onChange={this.UpdateUserlLevel} /><label style={{ color: "grey" }}> المرحلة الابتدائية</label><br />
                                        <input type="checkbox" value="Teachinglevels" name="middle" onChange={this.UpdateUserlLevel} /> <label style={{ color: "grey" }}>المرحلة الاعدادية</label><br />
                                        <input type="checkbox" value="Teachinglevels" name="high" onChange={this.UpdateUserlLevel} /><label style={{ color: "grey" }}>المرحلة الثانوية</label><br />
                                    </div>
                                </div>

                                <div className="info-body">
                                    <p className="info-border">اضف صورة</p>
                                    <input style={{ display: "none" }} type="file" name="file-2[]" id="file-2" class="inputfile inputfile-2" onChange={(e) => this.upload(e)} data-multiple-caption="{count} files selected" multiple="" />
                                    <label className="info-uploader" for="file-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>Choose a file</span></label>
                                </div> */}

{/* 
                                <button className="info-button" onClick={this.UpdateData} >تحديث البيانات</button> */}
                            </div>
                    </div>
                </div>
            )
        } else if (this.state.value === "view-request") {
            return (
                <div className="info-container  overflowcss " ref={(el) => { this.finding_Teacher = el }} >
                    <div className="info teacher-seacrh-container">
                        <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                        <div>

                            <h4 className="info-head text-center"> طلبات الاشتراك </h4>
                            <div className="teacher_category">
                                <h4 className="info-head info-uploader" value="pending" onClick={this.requests_type}> المعلق </h4>
                                <h4 className="info-head info-uploader" value="added" onClick={this.requests_type}>المضاف</h4>
                                <h4 className="info-head info-uploader" value="refused" onClick={this.requests_type} >المرفوق</h4>

                            </div>

                            {this.requests()}

                        </div>
                    </div>
                </div>)
        } else if (this.state.value === "Student-percentage") {
            return (
                <div className="info-container  overflowcss " ref={(el) => { this.finding_Teacher = el }} >
                    <div className="info teacher-seacrh-container">
                        <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                        <div>

                            <h4 className="info-head text-center" > مستوى الطلاب  </h4>
                            <div style={{ display: "flex" }}>
                                <h3><strong> المرحلة الدراسية</strong></h3>
                                <fieldset style={{ width: "250px" }} >
                                    <select onChange={(e) => { this.request_year(e) }} name="academic_year" className="myList" style={{ color: "black" }}>
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
                            </div>

                            <h4 className="text-center" ><strong> {this.state.academicyear[this.state.requestyear]} </strong> </h4>

                            {this.TheStudents().bind(this)}
                        </div>
                    </div>
                </div>)
        } else if (this.state.value === "Exam that need to be corrected") {
            return (<Exams addOrRemove={this.addOrRemove} />)
        }
    }

    requests = () => {
        if (this.state.request_type === "pending") {



            return (
                <div>
                    {this.state.pending.map((data) => {

                        console.log(data);
                        return (<div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>

                            <img class="teacher-search-photo" src={"./img/qrl3.jpg"} alt="" />
                            <div style={{ textAlign: "right", marginTop: "40px" }}>
                                <p>الاسم:{data.name}</p>
                                <p>السنة الدراسية:{data.academic_year}</p>
                                <p>الرقم:{data.number}</p>
                            </div>
                            <div style={{ display: "flex", float: "left" }} className="search-teacher-btn">
                                <button className="info-button " var1="AddStudent" var2="pending" var3="requests" onClick={this.HandelStudentPendedRequest} value={data._id}>تاكيد</button>
                                <button className="info-button " var1="DeclineStudent" var2="pending" var3="requests" onClick={this.HandelStudentPendedRequest} value={data._id}>حذف</button>
                            </div>
                        </div>)
                    })}
                </div>
            )



        } else if (this.state.request_type === "added") {

            return (
                <div>
                    {this.state.added.map((data) => {
                        return (
                            <div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>
                                <img class="teacher-search-photo" src={"./img/qrl3.jpg"} alt="" />
                                <div style={{ textAlign: "right", marginTop: "40px" }}>
                                    <p>الاسم:{data.name}</p>
                                    <p>السنة الدراسية:{data.academic_year}</p>
                                    <p>الرقم:{data.number}</p>
                                </div>
                                <div style={{ display: "flex", float: "left" }}>
                                    <button className="info-button search-teacher-btn" var1="DeclineStudent" var2="added" var3="accepted" onClick={this.HandelStudentPendedRequest} value={data._id} >حذف</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            )


        } else if (this.state.request_type === "refused") {
            return (<div>

                {this.state.refused.map((data) => {
                    return (<div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>
                        <img class="teacher-search-photo" src={"./img/qrl3.jpg"} alt="" />
                        <div style={{ textAlign: "right", marginTop: "40px" }}>
                            <p>الاسم:{data.name}</p>
                            <p>السنة الدراسية:{data.academic_year}</p>
                            <p>الرقم:{data.number}</p>
                        </div>
                        <div style={{ display: "flex", float: "left" }}>
                            <button className="info-button search-teacher-btn" var1="AddStudent" var2="refused" var3="refused" onClick={this.HandelStudentPendedRequest} value={data._id}  >اضافة</button>
                        </div>


                    </div>)
                })}
            </div>
            )
        }

    }

    HandelStudentPendedRequest = (e) => {
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let reqURL = e.target.getAttribute("var1");
        let StudentId = e.target.getAttribute("value");
        let varname = e.target.getAttribute("var2");
        let Fromvar = e.target.getAttribute("var3");

        console.log(reqURL + " " + StudentId);

        fetch(this.state.server + reqURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "StudentId": StudentId, "UserId": UserId, "Fromvar": Fromvar })
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                console.log(result);
                if (result === "done") {
                    let x = this.state[varname];
                    let z = x.filter((value) => {
                        return value._id !== StudentId
                    })
                    console.log(z);

                    this.setState({
                        [varname]: z
                    })

                }

            })



    }
    requests_type = (e) => {
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let var1 = e.target.getAttribute('value');
        fetch(this.state.server + var1 + "Requests", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserId)
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                console.log(result);
                if (var1 === "pending") {
                    this.setState({
                        pending: result
                    })
                } else if (var1 === "added") {
                    this.setState({
                        added: result
                    })
                } else if (var1 === "refused") {
                    this.setState({
                        refused: result
                    })
                }
            })
        this.setState({
            request_type: var1
        })
    }

    request_year = (e) => {
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let var1 = e.target.value;
        console.log(var1);

        this.setState({
            requestyear: var1
        })

        let body = {
            TeacherId: UserId,
            academic_year: var1
        }
        fetch(this.state.server + "StudentPercentage", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                console.log(result);
                let degree = {}
                Promise.all(
                    result.map((value) => {
                        new Promise((resolve) => {
                            let ValueNeeded = value["StudentId"]
                            console.log(ValueNeeded);
                            console.log(degree[ValueNeeded]);
                            let data = degree[ValueNeeded];





                            if (degree[ValueNeeded]) {
                                console.log(data["studentdegree"]);
                                degree = { ...degree, [ValueNeeded]: { studentdegree: ((parseFloat(data["studentdegree"]) + parseFloat(value["DegreePercentage"])) / 2).toFixed(2), studentname: value["StudentName"] } }
                                console.log("------------->");
                                console.log(data["studentdegree"]);
                                resolve("done")

                            } else {
                                degree = { ...degree, [value["StudentId"]]: { studentdegree: parseFloat(value["DegreePercentage"]), studentname: value["StudentName"] } }
                                console.log(parseFloat(degree["studentdegree"]));
                                console.log(degree);
                                resolve("done")
                            }
                        })


                    })
                ).then((data) => {
                    console.log(data);

                    this.setState((PrevState) => ({
                        StudentPercentage: degree

                    }), () => {
                        console.log(this.state.StudentPercentage);

                    })
                })




            })
        this.setState({
            request_type: var1
        })



    }


    OpenMenu = () => {
        this.MainMenu.style.display = "block"
        this.MainMenuStyle.style.display = "block"
    }



    render() {
        return (
            <div className="Teacher_Profile">
                <CssBaseline />
                <AppBar position="fixed" color="primary" className={"appBar"}>
                    <Tabs
                        variant="fullWidth"
                        aria-label="nav tabs example"
                    >
                        <Button onClick={this.OpenMenu} className={"MenuIconButton"} value="0">
                            <MenuIcon></MenuIcon>
                        </Button>

                    </Tabs>
                </AppBar>
                <div class="Main overflowcss">
                    <div className="MainMenuStyle" >

                        <div className="Main-right" ref={(el) => { this.MainMenu = el }}>
                            {/* <div class="containers">
                                <img class="profile-image hovers shadow rounded" src="./img/qrl3.jpg" alt="" />

                            </div> */}
                            <div class="lines"></div>
                            <Button className={"containerss hovers"} onClick={() => { this.addOrRemove("add-info") }} value="add-info">
                                <p class="student-info-link shadow rounded">تعديل البيانات</p>
                            </Button>
                            <Button className={"containerss hovers"} onClick={() => { this.addOrRemove("Student-percentage") }}>
                                <p class="student-info-link  shadow rounded"  >مستوى الطلاب</p>
                            </Button>

                            <Button className={"containerss hovers"} onClick={() => { this.addOrRemove("Exam that need to be corrected") }}>
                                <p class="student-info-link  shadow rounded">الامتحانات الوارد تصحيحها</p>
                            </Button>

                            <Button className={"containerss hovers"} onClick={() => { this.addOrRemove("view-request") }}>
                                <p class="student-info-link shadow rounded" >طلبات الاشتراك</p>
                            </Button>

                            <Link to="/adding-exams">
                                <Button className={"containerss hovers"}>
                                    <p class="student-info-link  shadow rounded">اضافة امتحان</p>
                                </Button>
                            </Link>

                        </div>
                        <div className = "MainMenuStyleDiv"  ref={(el) => { this.MainMenuStyle = el }}></div>
                    </div>

                    {this.Htmlfunction(this)}
                </div>
            </div>
        );
    }
}

export default Teacher_Profile;