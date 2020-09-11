import React, { Component } from 'react';
import { SharedData } from '../../../../SharedData/Shareddata'
class adding_exams extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            x: 0,
            image: []
        }
    }
    handy = (e) => {
        if (e.target.value === '0') {
            this.QText.style.display = "block"
            this.Qimage.style.display = "none"
        } else {
            this.QText.style.display = "none"
            this.Qimage.style.display = "block"
        }

    }

    handy1 = (e) => {
        if (e.target.value === '0') {
            this.AText.style.display = "block"
            this.Aimage.style.display = "none"
        } else {
            this.AText.style.display = "none"
            this.Aimage.style.display = "block"
        }

    }

    upload = (e) => {
        let file = e.target.files;

        this.setState({
            image: []
        });
        console.log(e.target.result);

        if (file.length) {
            for (let i = 0; i < file.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(file[i]);
                reader.onload = (e) => {
                    let data = { file: e.target.result }
                    this.state.image.push(e.target.result)
                    console.log(this.state.image);
                    this.setState({ x: i + 1 })

                }
            }
            // reader.readAsDataURL(file[0]);
            // reader.onload = (e)=>{
            //     let data ={file : e.target.result}
            //     this.state.image.push(e.target.result)

            // }
        }

    }

    render() {
        return (
            <SharedData.Consumer>{(context) => {
                let { ExamQ  , Examimage} = context;
                return (
                    <div className="adding_exams" style={{ marginRight: "10px" }}>
                        <div class="">
                        {/* <fieldset style={{ width: "450px" }} >
                                <label ><h3>{this.props.i + 1 + "- اختر طريقة اضافة السؤال->"}</h3></label>
                                <select onChange={(e) => { this.handy(e) }} className="myList1">
                                    <option value="0">نص</option>
                                    <option value="1">صورة</option>

                                </select>
                            </fieldset> */}
                            <div class="input-group question-input " style={{ marginBottom: "10px" }} ref={(el) => { this.QText = el }}>
                                <input type="text" class="form-control question-input " onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Question" var5="سؤال اختر الاجابه الصحيحة" var7="QType" placeholder="ادخل السؤال " />

                            </div>
                            <div class="input-group question-input " style={{ marginBottom: "10px", display: "none" }} ref={(el) => { this.Qimage = el }}>
                                <div style={{ display: "flex" }}>
                                    <h4 style={{ width: "400px" , marginTop:"20px"}} class=""  >اضف صورة للسؤال بدل السؤال النصى:-></h4>
                                    <div class="box">
                                        <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }}  var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Question" var5="سؤال اختر الاجابه الصحيحة" type="file" var7="QType" id={"Question" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                        <label for={"Question" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* <fieldset style={{ width: "250px" }} >
                                <label ><h4>اختر طريقة اضافة الاجابة-></h4></label>
                                <select onChange={(e) => { this.handy1(e) }} className="myList1">
                                    <option value="0">نص</option>
                                    <option value="1">صورة</option>

                                </select>
                        </fieldset> */}
                        
                        <form onChange={(e) => { ExamQ(e) }} ref={(el) => { this.AText = el }}>
                            <div className="choiceflex">

                                <div className="choicediv">
                                    <input className="choiceradio" type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="1" />
                                    <input type="text" class="form-control choice-input " var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub1" var7="QType" placeholder="ادخل الاختيارات" />

                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="2" />
                                    <input type="text" class="form-control choice-input " var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub2" var7="QType" placeholder="ادخل الاختيارات" />

                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="3" />
                                    <input type="text" class="form-control choice-input " var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub3" var7="QType" placeholder="ادخل الاختيارات" />

                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="4" />
                                    <input type="text" class="form-control choice-input " var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub4" var7="QType" placeholder="ادخل الاختيارات" />

                                </div>

                            </div>
                        </form> 

                        <form  ref={(el) => { this.Aimage = el }}  style={{ marginBottom: "10px", display: "none" }}>
                            <div className="choiceflex">

                                <div className="choicediv">
                                    <input className="choiceradio" onChange={(e) => { ExamQ(e) }} type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="1" />
                                    <div class="box">
                                        <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }}  var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub1" type="file" var7="QType" id={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 1"} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                        <label for={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ+ " 1"}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                    </div>
                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" onChange={(e) => { ExamQ(e) }} type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="2" />
                                    <div class="box">
                                        <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }}  var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub2" type="file" var7="QType" id={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 2"} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                        <label for={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ+ " 2"}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                    </div>
                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" onChange={(e) => { ExamQ(e) }} type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="3" />
                                    <div class="box">
                                        <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }}  var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub3" type="file" var7="QType" id={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 3"} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                        <label for={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 3"}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                    </div>
                                </div>
                                <div className="choicediv">
                                    <input className="choiceradio" onChange={(e) => { ExamQ(e) }} type="radio" var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="Answer" var5="سؤال اختر الاجابه الصحيحة" var7="QType" name={this.props.MainQ + " " + this.props.Q + " " + this.state.subQ} value="4" />
                                    <div class="box">
                                        <input onChange={(e) => { Examimage(e) }} style={{ display: "none" }}  var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="choice" var5="سؤال اختر الاجابه الصحيحة" var6="sub4" type="file" var7="QType" id={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 4"} class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple />
                                        <label for={"choice" + " " + this.props.MainQ + " " + this.props.Q + " " + this.props.subQ + " 4"}><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg></figure> <span>Choose a file&hellip;</span></label>

                                    </div>
                                </div>

                            </div>
                        </form>
                        


                        <fieldset style={{ width: "250px" }} >
                            <label ><h4>اختر الدرجة-></h4></label>
                            <select onChange={(e) => { ExamQ(e) }} var1={this.props.MainQ} var2={this.props.Q} var3={"subQ" + (this.props.i+1)} var4="degree" var5="سؤال اختر الاجابه الصحيحة" var7="QType" className="myList">
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
            }}</SharedData.Consumer>
        );
    }
}

export default adding_exams;