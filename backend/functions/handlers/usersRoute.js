const {db, admin} = require('../util/admin')
const {config} = require('../util/config')
const firebase = require("firebase")
const {validateSignUpData, validateLoginData, reduceUseDetails} = require('../util/validators')
firebase.initializeApp(config)


// the sign up route function
exports.signup = (req, res)=> {
    const newUser = {
      email:req.body.email,
      password:req.body.password,
      confirmedPassword:req.body.confirmedPassword,
      handle:req.body.handle,
    }

    const {valid, errors} = validateSignUpData(newUser);
    if(!valid){
        return res.status(401).json(errors)
    }
    const noImg = "no-img.png"
    let token;
    let userId;
    db.doc(`/users/${newUser.handle}`).get()
      .then((doc)=> {
        if(doc.exists){
          res.status(400).json({handle : "This username is used by another user"})
        }
        else {
          return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
      }).then((data)=> {
        userId = data.user.uid;
        return data.user.getIdToken();
      }).then((tokenId)=> {
        token = tokenId;
        const userCredentials = {
          handle : newUser.handle,
          email : newUser.email,
          createdAt: new Date().toISOString(),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
          userId
        };
       return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      }).then(()=> {
        return res.status(201).json({token});
      }).catch((err)=> {
        console.error(err)
        if(err.code === "auth/email-already-in-use"){
          return res.status(400).json({email:"Email is already in use"})
        }
        return res.status(500).json({general:"Something went wrong please try again"})
      })
  }


  
// the login route function

  exports.login = (req, res)=> {
    const user = {
      email :req.body.email,
      password : req.body.password
    }
    const {valid, errors} = validateLoginData(user);
    if(!valid){
        return res.status(401).json(errors)
    }
    
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data)=> {
      return data.user.getIdToken()
    })
    .then((token)=> {
      return res.json({token});
    })
    .catch((err)=> {
      console.error(err);
        return res.status(401).json({general: "Wrong Credentials, Please try again"})
    })
  }


  // the get authenticated own user function

exports.getAuthenticatedUser = (req, res)=> {
  let userData = {}
  db.doc(`/users/${req.user.handle}`).get()
  .then((doc)=> {
    if(doc.exists){
      userData.creadentials = doc.data();
      return db.collection("likes").where('userHandle', '==', req.user.handle).get()
    }
  })
  .then((docs)=> {
    userData.likes = []
    docs.forEach((doc)=> {
      userData.likes.push(doc.data());
    })
    return db.collection("notifications").where("recipient", "==", req.user.handle)
    .orderBy("createdAt", "desc").limit(10).get()
  })
  .then((data)=> {
    // console.log("////////////this is the notoficationsssss/////////");
    // console.log(data)
    userData.notifications = [];
    data.forEach((doc)=> {
      userData.notifications.push({
        ...doc.data(), notificationId: doc.id
      })
    })
    return res.json(userData)
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).json({error: err.code})
  })
}

// get any user details

exports.getUserDetails = (req, res)=> {
  let userData = {};
  const userHandle = req.params.handle
  db.doc(`/users/${userHandle}`).get()
  .then((doc)=> {
    if(doc.exists){
      userData.user = doc.data()
      return db.collection("screens").where("userHandle", "==", userHandle).orderBy("createdAt", "desc").get()
    }
    else {
      return res.status(404).json({errMsg:"user does not exist"})
    }
  })
  .then((data)=> {
    userData.screens = [];
    data.forEach((doc)=> {
      userData.screens.push({
        ...doc.data(), screenId:doc.id
      })
    })
    return res.json(userData);
  })
  .catch((err)=> {
    console.error(err);
    return res.status(500).json(({errMsg:err.code}))
  })
}

// the add userDetails function 

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUseDetails(req.body);
  db.doc(`/users/${req.user.handle}`).update(userDetails)
  .then(()=> {
    res.json({succMsg: "User Details Updated Successfully"});
  })
  .catch((err)=> {
    console.error(err);
    res.status(500).json({errMsg:err})
  })
}



  // the uploade user account image function

exports.uploadImage = (req, res) => {
    const busboy = require("busboy");
    const path = require('path');
    const fs = require('fs');
    const os = require('os');
    // console.log("this is the reqqqqq.hhhheaderssss", req.headers)
    const busBoy = new busboy({ headers: req.headers});
    let imageFileName;
    let imageToBeUploaded = {};
    busBoy.on('file',(fieldname, file, filename, encoding, mimetype)=> {
        // console.log(`fieldname:  ${fieldname}, filename:  ${filename}, mimetype:  ${mimetype}`)
        if(mimetype !== "image/jpeg" && mimetype !== "image/png"  && mimetype !== "image/jpg"){
          return res.status(400).json({errMsg:"Image type is not supported"})
        }
        const imageExtension = filename.split(".")[filename.split(".").length - 1];
        imageFileName = `${Math.round(Math.random()* 10000000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName)
         imageToBeUploaded = { filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath))
    });
    busBoy.on("finish", ()=> {
        admin.storage().bucket().upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata:{
                metadata:{
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(()=> {
          // console.log(" the content typppe", imageToBeUploaded.mimetype)
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/users/${req.user.handle}`).update({imageUrl })
        })
        .then(()=> {
            return res.json({mssage: "Image uploaded successfully"})
        })
        .catch((err)=> {
            console.error(err);
            return res.status(500).json({errMsg:err.code})
        })
      })
      busBoy.end(req.rawBody);
}

// mark notification as read 

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notId)=> {
    const notification = db.doc(`/notifications/${notId}`);
    batch.update(notification, {read: true})
  })
  batch.commit()
  .then(()=> {
    return res.json({succMsg:"Notifications marked read"});
  })
  .catch((err)=> {
    console.error(err);
    return res.status(500).json({errMsg:err.code});
  })
}


