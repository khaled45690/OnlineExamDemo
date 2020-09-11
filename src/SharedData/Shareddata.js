import React, { Component, createContext, useLayoutEffect } from 'react';
import Cookies from 'universal-cookie';
import { createBrowserHistory } from 'history'
export const SharedData = createContext();
export const history = createBrowserHistory({
  forceRefresh: true
});
class SharedDataProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      NumberOfOrderd: "",
      Exam: [],
        server: '/',
      text: "",
      err: "",
      errs: "",
      display: "Confirm",
      disable: false,
      question_names: ['الاول', "الثانى", "الثالث", "الرابع"],
      question_name: ['أ', "ب", "ج", "د"],
    }
    this.SendExam = this.SendExam.bind(this)
  }
  ExamQ = (e) => {
    this.setState({
      err: "",
      errs: ""
    })
    // this handle most of entered data in adding exams

    let value = e.target.value;
    let var1 = e.target.getAttribute('var1');
    let var2 = e.target.getAttribute('var2');
    let var3 = e.target.getAttribute('var3');
    let var4 = e.target.getAttribute('var4');
    let var5 = e.target.getAttribute('var5');
    let var6 = e.target.getAttribute('var6');
    let var7 = e.target.getAttribute('var7');
    if (var4 == 'skip') {
      // this conditiob for determint the correction process so we save the choice by this code
      if (this.state.Exam[var1]) {
        // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
        let Var1 = this.state.Exam[var1];
        if (Var1[var2]) {
          // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
          this.setState({
            Exam: {
              ...this.state.Exam, [var1]: {
                ...this.state.Exam[var1], [var2]: {
                  ...Var1[var2],
                  [var3]: value
                }
              }
            }
          }, () => {
            console.log(this.state.Exam);
          });
        } else {
          // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run
          this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
            let Var1 = this.state.Exam[var1]
            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
              let Var2 = Var1[var2]
              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var3]: value
                    }
                  }
                }
              }, () => {
                console.log(this.state.Exam);
              });
            })
          });
        }
      } else {
        // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
        this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
          this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
            let Var1 = this.state.Exam[var1];
            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
              let Var2 = Var1[var2]
              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var3]: value
                    }
                  }
                }
              }, () => {
                console.log(this.state.Exam);

              });
            })
          });
        });
      }
    } else {
      if (var6) {
        // if it consist of multi answer or degrees in same question this code will run
        if (this.state.Exam[var1]) {
          // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
          let Var1 = this.state.Exam[var1];
          if (Var1[var2]) {
            // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
            let Var2 = Var1[var2];
            if (Var2[var3]) {
              let Var3 = Var2[var3]
              // if the exam varialbe has subQ1 or subQ2 or ...etc and the change is in the same subQi this code will run  
              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var7]: var5,
                      [var3]: { ...Var2[var3], [var4]: { ...Var3[var4], [var6]: value } }
                    }
                  }
                }
              }, () => {
                console.log(this.state.Exam);
              });
            } else {
              // if the exam varialbe has same  MainQi and same Qi and the change is in the different subQi this code will run
              let Var1 = this.state.Exam[var1]
              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var7]: var5,
                      [var3]: []
                    }
                  }
                }
              }, () => {
                let Var1 = this.state.Exam[var1]
                Var2 = Var1[var2]
                this.setState({

                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: []
                        }
                      }
                    }
                  }
                }, () => {
                  let Var1 = this.state.Exam[var1]
                  Var2 = Var1[var2]
                  let Var3 = Var2[var3];
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: { ...Var3[var4], [var6]: value }
                          }
                        }
                      }
                    }
                  });

                });
              });
            }
          } else {
            // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run

            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
              let Var1 = this.state.Exam[var1]
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                let Var1 = this.state.Exam[var1]
                let Var2 = Var1[var2]
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: []
                        }
                      }
                    }
                  }
                }, () => {
                  let Var1 = this.state.Exam[var1]
                  let Var2 = Var1[var2]
                  let Var3 = Var2[var3];
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: { ...Var3[var4], [var6]: value }
                          }
                        }
                      }
                    }
                  });

                });
              })
            });
          }
        } else {
          // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
          this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
              let Var1 = this.state.Exam[var1];
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                let Var1 = this.state.Exam[var1];
                let Var2 = Var1[var2]
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: []
                        }
                      }
                    }
                  }
                }, () => {
                  let Var1 = this.state.Exam[var1];
                  let Var2 = Var1[var2]
                  let Var3 = Var2[var3];
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: { ...Var3[var4], [var6]: value }
                          }
                        }
                      }
                    }
                  });

                });
              })
            });
          });
        }
      } else {
        // if it only contain question , answer , ..etc this cod will run
        if (this.state.Exam[var1]) {
          // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
          let Var1 = this.state.Exam[var1];
          if (Var1[var2]) {
            // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
            let Var2 = Var1[var2];
            if (Var2[var3]) {
              // if the exam varialbe has subQ1 or subQ2 or ...etc and the change is in the same subQi this code will run  
              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var7]: var5,
                      [var3]: { ...Var2[var3], [var4]: value }
                    }
                  }
                }
              }, () => {
                console.log(this.state.Exam);
              });
            } else {
              // if the exam varialbe has same  MainQi and same Qi and the change is in the different subQi this code will run

              this.setState({
                Exam: {
                  ...this.state.Exam, [var1]: {
                    ...this.state.Exam[var1], [var2]: {
                      ...Var1[var2], [var7]: var5,
                      [var3]: []
                    }
                  }
                }
              }, () => {
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: value
                        }
                      }
                    }
                  }
                }, () => {
                  console.log(this.state.Exam);

                });
              });
            }
          } else {
            // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run
            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
              let Var1 = this.state.Exam[var1]
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                let Var2 = Var1[var2]
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: value
                        }
                      }
                    }
                  }
                }, () => {
                  console.log(this.state.Exam);
                });
              })
            });
          }
        } else {
          // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
          this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
            this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
              let Var1 = this.state.Exam[var1];
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                let Var2 = Var1[var2]
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5, [var3]: {
                          ...Var2[var3],
                          [var4]: value
                        }
                      }
                    }
                  }
                }, () => {
                  console.log(this.state.Exam);

                });
              })
            });
          });
        }
      }
    }

  }

  ExamQuestion = (var1, var2, var3, var4, var5, var7, content) => {
    this.setState({
      err: "",
      errs: ""
    })
    let value = content
    console.log(var1 + " " + var2 + " " + var3 + " " + var4);

    // if it only special type of question , answer , ..etc this cod will run
    if (this.state.Exam[var1]) {
      // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
      let Var1 = this.state.Exam[var1];
      if (Var1[var2]) {
        // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
        let Var2 = Var1[var2];
        if (Var2[var3]) {
          // if the exam varialbe has subQ1 or subQ2 or ...etc and the change is in the same subQi this code will run  
          this.setState({
            Exam: {
              ...this.state.Exam, [var1]: {
                ...this.state.Exam[var1], [var2]: {
                  ...Var1[var2], [var7]: var5,
                  [var3]: { ...Var2[var3], [var4]: value }
                }
              }
            }
          }, () => {
            console.log(this.state.Exam);
          });
        } else {
          // if the exam varialbe has same  MainQi and same Qi and the change is in the different subQi this code will run

          this.setState({
            Exam: {
              ...this.state.Exam, [var1]: {
                ...this.state.Exam[var1], [var2]: {
                  ...Var1[var2], [var7]: var5,
                  [var3]: []
                }
              }
            }
          }, () => {
            this.setState({
              Exam: {
                ...this.state.Exam, [var1]: {
                  ...this.state.Exam[var1], [var2]: {
                    ...Var1[var2], [var3]: {
                      ...Var2[var3], [var7]: var5,
                      [var4]: value
                    }
                  }
                }
              }
            }, () => {
              console.log(this.state.Exam);

            });
          });
        }
      } else {
        // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run
        this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
          let Var1 = this.state.Exam[var1]
          this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
            let Var2 = Var1[var2]
            this.setState({
              Exam: {
                ...this.state.Exam, [var1]: {
                  ...this.state.Exam[var1], [var2]: {
                    ...Var1[var2], [var7]: var5, [var3]: {
                      ...Var2[var3],
                      [var4]: value
                    }
                  }
                }
              }
            }, () => {
              console.log(this.state.Exam);
            });
          })
        });
      }
    } else {
      // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
      this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
        this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
          let Var1 = this.state.Exam[var1];
          this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var7]: var5, [var3]: [] } } } }, () => {
            let Var2 = Var1[var2]
            this.setState({
              Exam: {
                ...this.state.Exam, [var1]: {
                  ...this.state.Exam[var1], [var2]: {
                    ...Var1[var2], [var7]: var5, [var3]: {
                      ...Var2[var3],
                      [var4]: value
                    }
                  }
                }
              }
            }, () => {
              console.log(this.state.Exam);

            });
          })
        });
      });
    }
  }


  Examimage = (e) => {
    this.setState({
      err: "",
      errs: ""
    })
    // this function handel the image saving in the same exam varialbe 
    let file = e.target.files;
    let var1 = e.target.getAttribute('var1');
    let var2 = e.target.getAttribute('var2');
    let var3 = e.target.getAttribute('var3');
    let var4 = e.target.getAttribute('var4');
    let var5 = e.target.getAttribute('var5');
    let var6 = e.target.getAttribute('var6');
    let var7 = e.target.getAttribute('var7');

    console.log(var1 + " " + var4 + " " + var2 + " " + var3 + " " + var5 + " " + var6 + " " + var7);

    let reader = new FileReader();
    // this is to see is there files or not
    if (file.length) {
      // this is to read file data
      console.log(e.target.result);
      reader.readAsDataURL(file[0]);
      reader.onload = (e) => {


        // fetch(this.state.server + "ts", {
        //   method: 'POST',
        //   body: e.target.result
        // }).then((result) => { return result.json(); }).then((result) => {
        //   console.log(result);

        // })
        let value = { image: e.target.result }


        // here is to set the image ro exam variable

        if (var6) {
          // if it consist of multi answer or degrees in same question this code will run
          if (this.state.Exam[var1]) {
            // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
            let Var1 = this.state.Exam[var1];
            if (Var1[var2]) {
              // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
              let Var2 = Var1[var2];
              if (Var2[var3]) {
                let Var3 = Var2[var3]
                // if the exam varialbe has subQ1 or subQ2 or ...etc and the change is in the same subQi this code will run  
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5,
                        [var3]: { ...Var2[var3], [var4]: { ...Var3[var4], [var6]: value } }
                      }
                    }
                  }
                }, () => {
                  console.log(this.state.Exam);
                });
              } else {
                // if the exam varialbe has same  MainQi and same Qi and the change is in the different subQi this code will run

                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5,
                        [var3]: []
                      }
                    }
                  }
                }, () => {
                  let Var1 = this.state.Exam[var1]
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: []
                          }
                        }
                      }
                    }
                  }, () => {
                    let Var1 = this.state.Exam[var1]
                    let Var2 = Var1[var2]
                    let Var3 = Var2[var3];
                    this.setState({
                      Exam: {
                        ...this.state.Exam, [var1]: {
                          ...this.state.Exam[var1], [var2]: {
                            ...Var1[var2], [var7]: var5, [var3]: {
                              ...Var2[var3],
                              [var4]: { ...Var3[var4], [var6]: value }
                            }
                          }
                        }
                      }
                    });

                  });
                });
              }
            } else {
              // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run

              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
                let Var1 = this.state.Exam[var1]
                this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                  let Var1 = this.state.Exam[var1]
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: []
                          }
                        }
                      }
                    }
                  }, () => {
                    let Var1 = this.state.Exam[var1]
                    let Var2 = Var1[var2]
                    let Var3 = Var2[var3];
                    this.setState({
                      Exam: {
                        ...this.state.Exam, [var1]: {
                          ...this.state.Exam[var1], [var2]: {
                            ...Var1[var2], [var7]: var5, [var3]: {
                              ...Var2[var3],
                              [var4]: { ...Var3[var4], [var6]: value }
                            }
                          }
                        }
                      }
                    });

                  });
                })
              });
            }
          } else {
            // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
            this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
                let Var1 = this.state.Exam[var1];
                this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                  let Var1 = this.state.Exam[var1];
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: []
                          }
                        }
                      }
                    }
                  }, () => {
                    let Var1 = this.state.Exam[var1];
                    let Var2 = Var1[var2]
                    let Var3 = Var2[var3];
                    this.setState({
                      Exam: {
                        ...this.state.Exam, [var1]: {
                          ...this.state.Exam[var1], [var2]: {
                            ...Var1[var2], [var7]: var5, [var3]: {
                              ...Var2[var3],
                              [var4]: { ...Var3[var4], [var6]: value }
                            }
                          }
                        }
                      }
                    });

                  });
                })
              });
            });
          }
        } else {
          // if it only contain question , answer , ..etc this cod will run
          if (this.state.Exam[var1]) {
            // if the exam varialbe has MainQ1 or MainQ2 or ...etc and the change is in the same MainQi this code will run
            let Var1 = this.state.Exam[var1];
            if (Var1[var2]) {
              // if the exam varialbe has Q1 or Q2 or ...etc and the change is in the same Qi this code will run
              let Var2 = Var1[var2];
              if (Var2[var3]) {
                // if the exam varialbe has subQ1 or subQ2 or ...etc and the change is in the same subQi this code will run  
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5,
                        [var3]: { ...Var2[var3], [var4]: value }
                      }
                    }
                  }
                }, () => {
                  console.log(this.state.Exam);
                });
              } else {
                // if the exam varialbe has same  MainQi and same Qi and the change is in the different subQi this code will run
                let Var1 = this.state.Exam[var1]
                this.setState({
                  Exam: {
                    ...this.state.Exam, [var1]: {
                      ...this.state.Exam[var1], [var2]: {
                        ...Var1[var2], [var7]: var5,
                        [var3]: []
                      }
                    }
                  }
                }, () => {
                  let Var1 = this.state.Exam[var1]
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: value
                          }
                        }
                      }
                    }
                  }, () => {
                    console.log(this.state.Exam);

                  });
                });
              }
            } else {
              // if the exam varialbe has same  MainQi and different Qi that this Qi is not existed this code will run
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
                let Var1 = this.state.Exam[var1]
                this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: value
                          }
                        }
                      }
                    }
                  }, () => {
                    console.log(this.state.Exam);
                  });
                })
              });
            }
          } else {
            // if the exam variable don't have the MainQi and will create the whole branch from MainQi to subQi so this code will run
            this.setState({ Exam: { ...this.state.Exam, [var1]: [] } }, () => {
              this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: [] } } }, () => {
                let Var1 = this.state.Exam[var1];
                this.setState({ Exam: { ...this.state.Exam, [var1]: { ...this.state.Exam[var1], [var2]: { ...Var1[var2], [var3]: [] } } } }, () => {
                  let Var2 = Var1[var2]
                  this.setState({
                    Exam: {
                      ...this.state.Exam, [var1]: {
                        ...this.state.Exam[var1], [var2]: {
                          ...Var1[var2], [var7]: var5, [var3]: {
                            ...Var2[var3],
                            [var4]: value
                          }
                        }
                      }
                    }
                  }, () => {
                    console.log(this.state.Exam);

                  });
                })
              });
            });
          }
        }



      }
    }


  }



  OtherDetails = (e) => {
    this.setState({
      err: "",
      errs: ""
    })
    console.log(e.target.name + " " + e.target.value);

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  ExamName = (e) => {

    this.setState({
      Examname: e.target.value ,
      err: "",
      errs: ""
    })

    console.log(this.state.Exam);
  }


  CheckExam = () => {
    Object.keys(this.state.Exam).map((key, i) => {
      let Var1 = this.state.Exam[key];
      Object.keys(Var1).map((key1, s) => {
        let Var2 = Var1[key1]
        Object.keys(Var2).map((key2, w) => {
          if (key2 === "QType" || key2 === "CorrectionType") {

          } else {
            this.setState({
              x: i,
              r: s,
              q: w
            })
          }
        })
      })
    })
    if (this.state.Exam.MainQ1) {
      if (this.state.Examname && this.state.academic_year && this.state.SubjectName && this.state.Student_Allowment) {
        Object.keys(this.state.Exam).map((key, i) => {
          if (key === "name") {

          } else {
            let Var1 = this.state.Exam[key]
            Object.keys(Var1).map((key1, x) => {
              let Var2 = Var1[key1]

              Object.keys(Var2).map((key3, z) => {
                console.log(Var2[key3]);

                console.log(key3);

                if (key3 === "QType" || key3 === "CorrectionType") {

                } else {

                  let check = {}
                  let Var3 = Var2[key3]
                  Object.keys(Var2[key3]).map((key4, p) => {
                    console.log(key4);
                    console.log(p);
                    check = { ...check, [key4]: key4 }
                    console.log(check);
                    // console.log(k);

                    if (check["Answer"] && check["Question"] && check["degree"]) {

                      this.setState((prestate) => ({
                        errs: { ...prestate.errs, ["err" + z]: "" }
                      }), () => {
                        console.log(this.state.q + " " + z);

                        if (this.state.x === i && this.state.r === x && this.state.q === z) {
                          console.log(i);

                          let result = Object.values(this.state.errs).every(o => o === "");
                          if (result) {
                            this.setState({
                              display: "Submit"
                            })
                          }


                        }
                      })

                    } else {


                      this.setState((prestate) => ({
                        errs: { ...prestate.errs, ["err" + z]: "يوجد فى السؤال " + this.state.question_names[i - 1] + " الجزئية " + this.state.question_name[x] + " رقم " + z + " شئ ناقص مثل الدرجة او السؤال او الاجابة " }
                      }), () => {

                      })
                    }
                  })
                }
              })
            })
          }
        })
      } else {
        this.setState({
          err: "يوجد شئ ناقص مثل اسم الامتحان او اسم المادة او السنة الدراسية له"
        })
      }
    } else {
      this.setState({
        err: "من فضلك ادخل على الاقل سؤال واحد"
      })
    }
  }

  filterQ = (e) => {
    this.setState({
      err: "",
      errs: ""
    })
    let var1 = e.target.getAttribute('var1');
    let var2 = e.target.getAttribute('var2');
    let filter
    if (this.state.Exam[var1]) {
      let Var1 = this.state.Exam[var1];
      Object.keys(Var1).map((key, i) => {
        console.log(var2 + " " + key)
        if (var2 === key) {
          console.log("escaped");
        } else {
          console.log(JSON.stringify(Var1[key]));

          let item = Var1[key]
          filter = { ...filter, [key]: { ...Var1[key] } }
          console.log(filter);

          this.setState({
            Exam: { ...this.state.Exam, [var1]: filter }
          })
        }
      });
    }
  }

  filtersubQ = (e) => {
    this.setState({
      err: "",
      errs: ""
    })
    let filter;
    let var1 = e.target.getAttribute('var1');
    let var2 = e.target.getAttribute('var2');
    let var3 = e.target.getAttribute('var3');
    if (this.state.Exam[var1]) {
      let Var1 = this.state.Exam[var1];
      let Var2 = Var1[var2];
      Object.keys(Var2).map((key, i) => {
        if (i == 0) {
          console.log("escaped");

        } else if (JSON.stringify(i) == var3) {
          console.log("escaped");

        } else {
          filter = { ...filter, [key]: { ...Var2[key] } }
          console.log(filter);
          this.setState({
            Exam: { ...this.state.Exam, [var1]: { ...Var1, [var2]: filter } }
          }, () => {
            console.log(this.state.Exam);

          })
        }
      });
    }
  }

  filtersub = (e) => {
    this.setState({
      err: "",
      errs: ""
    })

    let filter = {};
    let var1 = e.target.getAttribute('var1');
    let var2 = e.target.getAttribute('var2');
    let var3 = e.target.getAttribute('var3');
    let var4 = e.target.getAttribute('var4');
    if (this.state.Exam[var1]) {
      let Var1 = this.state.Exam[var1]
      if (Var1[var2]) {
        let Var2 = Var1[var2]
        if (Var2[var3]) {
          let Var3 = Var2[var3]
          Object.keys(Var3).map((key1, i) => {
            if (key1 == "Answer" || key1 === "degree") {

              console.log(key1);
              let Var4 = Var3[key1]
              Object.keys(Var4).map((key2, x) => {
                console.log(key2);
                if (key2 === var4) {
                  console.log("escape");

                } else {
                  console.log(Var4[key2]);

                  filter[key1] = { ...filter[key1], [key2]: Var4[key2] }
                  this.setState({
                    Exam: { ...this.state.Exam, [var1]: { ...Var1, [var2]: { ...Var2, [var3]: filter } } }
                  }, () => {
                    console.log(this.state.Exam);

                  })

                }
              });
            }
          });
        }
      }
    }
  }

  Cancel = () => {
    this.setState({
      display: "Confirm"
    })
  }

SetAnswer = (Exam)=>{
this.setState({
  Exam : Exam
} , ()=>{
  console.log(this.state.Exam);
  
})
}
  async SendExam() {
    let check =[] ;
this.setState({
  disable : true,
  err : "please wait whle we save the exam for u"
})
   console.log("entered");

      let Var = this.state.Exam
      Object.keys(Var).map((key, i) =>{
         let Var1 = Var[key];
         Object.keys(Var1).map((key1, o) => {

           let Var2 = Var1[key1];
           Object.keys(Var2).map((key2, p) => {
  
             if (key2 === "QType" || key2 === "CorrectionType") {
   
             } else {
               let Var3 = Var2[key2];
               console.log(Var2);
               Object.keys(Var3).map((key3, u) => {
    
                 console.log(Var3);
                 console.log(Var3[key3]);
                 let Var4 = Var3[key3]
                 console.log(Var4);
                 
                 Object.keys(Var4).map((key4 , k)=>{
                  check = {...check , [key4] : false}
                   if (Var4["sub1"]) {
                     
                     let Var5 = Var4[key4]
                       if (Var5["image"]) {    
                         
                         fetch(`${this.state.server + "MakeExamImageName"}`, {
                           method: 'POST',
                           body: Var5["image"]
                         }).then((result) => { return result.json(); }).then((result) => {
                           
                           this.setState((prevstate)=>{
                             let Var1 = prevstate.Exam[key];
                             let Var2 = Var1[key1];
                             let Var3 = Var2[key2];
                             let Var4 = Var3[key3];
                             return({
                             Exam:{...prevstate.Exam , [key]:{...Var1 , [key1]:{...Var2 , [key2] :{...Var3 , [key3]:{...Var4 , [key4]:{...Var4[key4] , image:result}}}}}}
                           
                           })}, ()=>{  
                              check = {...check , [key4] : true}   
                                                 
                           })
     
                         })     
                       }else{
                        check = {...check , [key4] : true} 
                       }
                   }else if(Var4["image"]){
                     console.log("there is an image here");
                     fetch(`${this.state.server + "MakeExamImageName"}`, {
                       method: 'POST',
                       body: Var4["image"]
                     }).then((result) => { return result.json(); }).then((result) => {
                       
                       this.setState((prevstate)=>{
                         let Var1 = prevstate.Exam[key];
                         let Var2 = Var1[key1];
                         let Var3 = Var2[key2];
                         let Var4 = Var3[key3];
                         return({
                         Exam:{...prevstate.Exam , [key]:{...Var1 , [key1]:{...Var2 , [key2] :{...Var3 , [key3]:{...Var4 , [key4]:result}}}}}
                       
                       })}, ()=>{
                          check = {...check , [key4] : true}   
                    
                       })
   
                     }) 
                   }else{
                      check = {...check , [key4] : true}   
                   }
                   
                 })
    
   
               })
             }
           })
   
   
           
         })

   
       })

       setTimeout( ()=>{

        console.log(Object.values(check));
        
        let result = Object.values(check).every(o => o === true);
        console.log(result);
        const cookies = new Cookies();
        let UserId = cookies.get('UserId');
        if(result){

          let sendexamfinaly = {
            SubjectName:this.state.SubjectName,
            academic_year:this.state.academic_year,
            Student_Allowment:this.state.Student_Allowment ,
            TeacherId : UserId,
            Exam : this.state.Exam,
            Examname : this.state.Examname,
            
          }
          fetch(`${this.state.server + "SaveExam"}`, {
            method: 'POST',
            body: JSON.stringify(sendexamfinaly)
          }).then((result) => { return result.json(); }).then((result) => {
            this.setState({
              err : result
            } , ()=>{
              history.push('/');
            })
          })   
        }
        
       }, 2000)
    // GetExamUrL.then(()=>{
    //   console.log(this.state.Exam);
    // })

  }
  render() {
    return (
      <SharedData.Provider value={{
        ...this.state, ExamQ: this.ExamQ, ExamQuestion: this.ExamQuestion, Examimage: this.Examimage, ExamName: this.ExamName, OtherDetails: this.OtherDetails, filterQ: this.filterQ,
        filtersubQ: this.filtersubQ, filtersub: this.filtersub, CheckExam: this.CheckExam, Cancel: this.Cancel, SendExam: this.SendExam , SetAnswer:this.SetAnswer
      }}>
        {this.props.children}
      </SharedData.Provider>
    );




  }
}

export default SharedDataProvider;
