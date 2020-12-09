import theme from '../util/theme';

export default {
    formContainer:{
        textAlign:"center",
      },
      pageTitle:{
          margin: "0px auto 0px auto"
      },
      textField:{
          margin: "0px auto 14px auto"
      },
      button:{
    
      },
      currentError:{
          color:"red",
          fotSize:"0.7rem",
          paddingTop:"10px",
          paddingBottom:11
      },
      signupStyle:{
          marginTop:15,
          padding:7,
          backgroundColor:"rgb(71, 160, 229)",
          fontSize:17,
          borderRadius:10,
      },
      signUpButton:{
          fontSize:17,
          color:"#fff",
      },
      questionMark:{
          color:"rgb(8, 64, 107)",
          fontSize:17
      },
      circularProg:{
      },
      visibleHr:{
        width:"100%",
        borderBottom:'1px solid rgba(0,0,0,0.1)',
        marginBottom:20
      },
      paper:{
        padding:20,
        // marginRight:10
        position:"relative"
    },
    profile:{
        "& .image-wrapper":{
            textAlign: "center",
            position:"relative",
            "& button":{
                position:"absolute",
                top:"80%",
                left:"70%"
            },
            paddingTop:2
        },
        "& .profile-image":{
            width:180,
            height:180,
            objectFit:"cover",
            maxWidth:"80%",
            borderRadius:"50%"
        },
        "& .profile-details":{
            textAlign:"center",
            "& span, svg":{
                verticalAlign:"middle"
            },
            "& a":{
                color: theme.palette.primary.main
            },
            paddingBottom:8
        },
            "& hr":{
                border:"none",
                margin:"0 0 10px 0"
            },
            "& svg.button":{
                "&:hover":{
                    cursor:"pointer"
                }
            }
        },
        buttons:{
            textAlign:"center",
            "& a":{
                margin:"20px 10px"
            }
        },
        dynamicSize:{
            fontSize:"18px",
            // overflow:"auto"
        },
        dynamicSize_sm:{
            fontSize:"15px",
            // overflow:"auto"

        },
}