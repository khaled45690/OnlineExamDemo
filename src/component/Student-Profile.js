import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
class Student_Profile extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
             server: '/',
            returned: '',
            value: "k.saad1281@gmail.com",
            Categorys: [],
            image: "./img/qrl3.jpg",
            element: "",
            UserInfo: {},
            UserAvailableExam: [],
            academicyear: {
                "first year": "اولى ابتدائى", "second year": "تانية ابتدائى", "third year": "تالتة ابتدائى", "fourth year": "رابعة ابتدائى",
                "fifth year": "خامسة ابتدائى", "sixth year": "ستة ابتدائى", "seventh year": "اولى اعدادى", "eighth year": "تانية اعدادى",
                "ninth year": "تالتة اعدادى", "tenth year": "اولى ثانوى", "eleventh year": "تانية ثانوى", "twelfth year": "تالتة ثانوى"
            },
            name: "",
            number: "",
            SearchedTeacher: {},
            data: [],
            StudentPercentage: {},
            check: true,
        }

    }
    componentDidMount() {
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        let Academic_year = cookies.get('Academic_year')

        fetch(this.state.server + "GetUserInfo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserId)
        }).then((result) => { return result.json(); }).then((result) => {
           
            


            this.setState({
                UserInfo: result.body,
                msg: result.msg
            }, () => {
                console.log(this.state.UserInfo);

            })
        })


        fetch(this.state.server + "GetUserAvailableExam", {
            
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({UserId , Academic_year})
        }).then((result) => { return result.json(); }).then((result) => {

            fetch(this.state.server + "getStudentResult", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(UserId)
            }).then((results) => { return results.json(); }).then((results) => {
                console.log(results);
                console.log(result);
                let data = []
                Promise.all(result.map((value)=>{
                    return(new Promise((resolve)=>{
                        resolve(value.map((value1)=>{
                            console.log(value1);
                            
                            return(new Promise((resolve)=>{
                                data.push(value1)
                                resolve("done")
                            }))
                        }))
                    }))
                })).then((datas)=>{
                    console.log(data);
                    console.log(datas);
                    let finaldata = data.filter((value)=>{
                       console.log(results.every(((element) => element.ExamId !== value._id)));
                       
                        
                        return (results.every(((element) => element.ExamId !== value._id)))
                        
                    })

                    console.log(finaldata);
                    this.setState({
                        data : finaldata
                    })
                    
                    
                })
            })


        })


        fetch(this.state.server + "StudentPercentage", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ StudentId: UserId })
        }).then((result) => { return result.json(); }).then((result) => {
            console.log(result);
            console.log("sssssssssssssdawdawee=================>");
            let degree = {}
            Promise.all(
                result.map((value) => {
                    return (new Promise((resolve) => {
                        let ValueNeeded = value["TeacherId"];
                        let data = degree[ValueNeeded]
                        if (degree[value["TeacherId"]]) {
                            degree = { ...degree, [value["TeacherId"]]: { studentdegree: ((parseFloat(data["studentdegree"]) + parseFloat(value["DegreePercentage"])) / 2).toFixed(2), subjectname: value["SubjectName"] } }
                            resolve("done")
                        } else {
                            degree = { ...degree, [value["TeacherId"]]: { studentdegree: parseFloat(value["DegreePercentage"]), subjectname: value["SubjectName"] } }
                            resolve("done")
                        }
                    }))
                })
            ).then((data) => {
                console.log(degree);
                this.setState({
                    StudentPercentage: degree
                })

            })

        })



    }

    upload = (e) => {
        let file = e.target.files;
        let reader = new FileReader();
        console.log(file.length);

        if (file.length) {
            reader.readAsDataURL(file[0]);
            reader.onload = (e) => {
                let data = { file: e.target.result }
                this.setState({
                    image: e.target.result
                });
                this.info1.style.display = "none"

            }
        }

    }
    change = (e) => {
        this.setState({
            value: e.target.value
        });
    }
    addOrRemove = (e) => {
        this.setState({
            element: e.target.id
        }, () => {
            console.log(this.state.element);

        })

    }

    UpdateUser = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

            UpdatedUser: { ...this.state.UpdatedUser, [e.target.name]: e.target.value },

        })
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


    SearchForTeacher = (e) => {
        let value = e.target.getAttribute('value');
        fetch(this.state.server + "SearchForTeacher", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        })
            .then((result) => { return result.json(); })
            .then((result) => {

                console.log(result);
                this.setState({
                    SearchedTeacher: result.body
                })

            })
    }


    RegisterToTeacher = (e) => {
        e.target.disabled = true;
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        console.log(e.target.id);
        let data = {
            StudentId: UserId,
            TeacherId: e.target.id
        }
        fetch(this.state.server + "RegisterationForTeacher", {
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

            })



    }
    HandelData = () => {
        console.log("=============>>>>");

        this.state.UserAvailableExam.map((MainValue) => {
            let hello = (MainValue) => {
                console.log(MainValue);
                let z = []
                let x = MainValue.map((value) => {
                    console.log(value);
                    z.push(value)
                    this.state.data.push(value)
                    console.log(this.state.data);

                })

                return (x)
            }
            this.setState({
                check: false
            })

            hello(MainValue);
        })
    }


    TakeMeToExam = (e) => {
        console.log(e.target.getAttribute("value"));

        const cookies = new Cookies();
        cookies.set('ExamId', JSON.stringify(e.target.getAttribute("value")));
        let ExamId = cookies.get('ExamId');
        console.log(ExamId);

    }
    HtmlElements = () => {
        if (this.state.element === "add-info") {
            return (
                <div className="info-container overflowcss " ref={(el) => { this.info1 = el }} >
                    <div className="info">
                        <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                        <div>
                            <h4 className="info-head text-center"> تعديل البيانات:</h4>
                            <div className="info-body">
                                <p className="info-border">الاسم  </p>
                                <input className="info-border inpo" name="name" onChange={this.UpdateUser} value={this.state.name} />
                            </div>
                            <div className="info-body">
                                <p className="info-border">الرقم</p>
                                <input className="info-border inpo" name="number" onChange={this.UpdateUser} value={this.state.number} />
                            </div>

                            <div className="info-body">
                                <p className="info-border">اضف صورة</p>
                                <input style={{ display: "none" }} type="file" name="file-2[]" id="file-2" class="inputfile inputfile-2" onChange={(e) => this.upload(e)} data-multiple-caption="{count} files selected" multiple="" />
                                <label className="info-uploader" for="file-2"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> <span>Choose a file</span></label>
                            </div>


                            <button className="info-button" onClick={this.UpdateData}>تحديث البيانات</button>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.element === "add-info2") {
            return (<div className="info-container overflowcss " ref={(el) => { this.info2 = el }} >
                <div className="info">
                    <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                    <div>
                        <h4 className="info-head text-center"> البيانات الاساسية:</h4>
                        <div className="info-body">
                            <p className="info-border">الاسم  </p>
                            <input className="info-border inpo" value={this.state.UserInfo.name} />
                        </div>
                        <div className="info-body">
                            <p className="info-border">الرقم</p>
                            <input className="info-border inpo" value={this.state.UserInfo.number} />
                        </div>
                        <div className="info-body">
                            <p className="info-border">الايميل</p>
                            <input className="info-border inpo" value={this.state.UserInfo.email} />
                        </div>
                        <div className="info-body">
                            <p className="info-border">الصف الدراسى</p>
                            <input className="info-border inpo" value={this.state.academicyear[this.state.UserInfo.academic_year]} />
                        </div>

                    </div>

                    <div>
                        <h4 className="info-head text-center">مستوى الطالب</h4>
                        {/* <h5 className="info-head text-center">{" المستوى العام للطالب هو   :    90% "}</h5>
                        <h5 className="text-center">{"اضغط على المادة المراد معرفة الامتحانات  التى اداها الطالب و درجة كل الامتحان"}</h5> */}
                        {
                            Object.keys(this.state.StudentPercentage).map((key, i) => {
                                let data = this.state.StudentPercentage[key]
                                return (
                                    <div className="info-body">
                                        <p className="info-border">{data["subjectname"]}</p>
                                        <p className="info-border">{data["studentdegree"] + "%"}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>)
        } else if (this.state.element === "add-search") {
            return (<div className="info-container  overflowcss " ref={(el) => { this.finding_Teacher = el }} >
                <div className="info teacher-seacrh-container">
                    <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                    <div>

                        <h4 className="info-head text-center"> البحث عن مدرس </h4>
                        <div className="teacher_category">
                            <h4 className="info-head info-uploader" value="elementary" onClick={this.SearchForTeacher}> ابتدائى </h4>
                            <h4 className="info-head info-uploader" value="middle" onClick={this.SearchForTeacher} >اعدادى</h4>
                            <h4 className="info-head info-uploader" value="high" onClick={this.SearchForTeacher} >ثانوى</h4>

                        </div>

                        {
                            Object.keys(this.state.SearchedTeacher).map((key, i) => {
                                let data = this.state.SearchedTeacher[i]
                                const cookies = new Cookies();
                                let UserId = cookies.get('UserId');
                                console.log(data.requests + " " + UserId);
                                let check ;
                                if(data.accepted && data.refused){
                                    let x = data.requests.concat(data.accepted).concat(data.refused);

                                     check = x.every(o => o !== UserId)
                                     if (check) {
                                        return (
                                            <div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>
                                                <img class="teacher-search-photo" src={this.state.image} alt="" />
                                                <div style={{ textAlign: "right", width: "200px" }}>
                                                    <p>الاسم:{data.name}</p>
                                                    <p>الرقم:{data.number}</p>
                                                    <p>اسم المادة:{data.SubjectName}</p>
                                                </div>
                                                <button style={{ float: "left" }} id={data._id} onClick={this.RegisterToTeacher} className="info-button search-teacher-btn">اشترك الان</button>
    
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>
                                                <img class="teacher-search-photo" src={this.state.image} alt="" />
                                                <div style={{ textAlign: "right", width: "200px" }}>
                                                    <p>الاسم:{data.name}</p>
                                                    <p>الرقم:{data.number}</p>
                                                    <p>اسم المادة:{data.SubjectName}</p>
                                                </div>
                                                <button style={{ float: "left" }} id={data._id} className="info-button search-teacher-btn"> لقد اشتركت </button>
    
                                            </div>
                                        )
                                    }
                                }else{
                                    return (
                                        <div style={{ display: 'flex', marginTop: "20px", width: "100%" }}>
                                            <img class="teacher-search-photo" src={this.state.image} alt="" />
                                            <div style={{ textAlign: "right", width: "200px" }}>
                                                <p>الاسم:{data.name}</p>
                                                <p>الرقم:{data.number}</p>
                                                <p>اسم المادة:{data.SubjectName}</p>
                                            </div>
                                            <button style={{ float: "left" }} id={data._id} onClick={this.RegisterToTeacher} className="info-button search-teacher-btn">اشترك الان</button>

                                        </div>
                                    )
                                }
                        

                               


                            })

                        }

                    </div>
                </div>
            </div>
            )
        } else if (this.state.element === "avalable-Exams") {
            if (this.state.check) {
                this.HandelData();
            }

            return (
                <div className="info-container overflowcss " ref={(el) => { this.info1 = el }}  >
                    <div className="info" >
                        <div className="removes" onClick={this.addOrRemove} id="removes">X</div>
                        <div >
                            <h4 className="info-head text-center"> الاختبارات المتاحة</h4>
                            <div className="info-body">
                                <h2 className="avalabel_Exam"> <strong> اسم الاختبار </strong>  </h2>
                                <h2 className="avalabel_Exam"><strong>اسم المادة  </strong></h2>
                                <h2 className="avalabel_Exam"><strong>اسم المدرس </strong> </h2>

                            </div>
                            {
                                this.state.data.map((value) => {
                                    return (
                                        <Link to="/AnsweringTheExam" onClick={this.TakeMeToExam} value={value._id}>
                                            <div className="info-body" style={{ marginTop: "0px", paddingTop: "0", paddingBottom: "0" }} value={value._id}>
                                                <h4 className="avalabel_Exam" value={value._id} >{value.Examname}  </h4>
                                                <h4 className="avalabel_Exam" value={value._id} >{value.SubjectName}</h4>
                                                <h4 className="avalabel_Exam" value={value._id} >{value.TeacherName}</h4>
                                            </div>
                                        </Link>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
    render() {
        return (
            <div className="Student_Profile">
                <div className="Main overflowcss">
                    <div className="Main-right">
                        <div class="containers">
                            <img class="profile-image shadow bg-white rounded" src={this.state.image} alt="" />

                        </div>
                        <div class="lines"></div>
                        <div class="containerss hovers" onClick={this.addOrRemove} id="add-info2">
                            <p class="student-info-link shadow rounded" onClick={this.addOrRemove} style={{ marginRight: "20px" }} id="add-info2">البيانات الاساسية للطالب</p>
                        </div>
                        <div class="containerss hovers" id="avalable-Exams" onClick={this.addOrRemove} >
                            <p class="student-info-link  shadow  rounded" id="avalable-Exams" onClick={this.addOrRemove}>الاختبارات المتاحة</p>
                        </div>
                        <div class="containerss hovers" onClick={this.addOrRemove} id="add-info">
                            <p class="student-info-link shadow rounded" onClick={this.addOrRemove} id="add-info">تعديل البيانات</p>
                        </div>
                        <div class="containerss hovers" onClick={this.addOrRemove} id="add-search">
                            <p class="student-info-link shadow rounded" onClick={this.addOrRemove} id="add-search">الاشتراك مع مدرس</p>
                        </div>

                    </div>


                    {this.HtmlElements()}


                </div>
            </div>
        );
    }
}

export default Student_Profile;