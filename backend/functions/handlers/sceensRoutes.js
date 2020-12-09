const {db} = require('../util/admin')

// getting all the screens function
exports.getAllScreens = (req, res)=> {
    db.collection('screens').orderBy('createdAt', 'desc').get().then((data)=> {
      let screens = [];
      data.forEach((doc)=> {
        // console.log(doc.id)
        screens.push({
          ...doc.data(),
          screenId:doc.id,
        });
      });
      return res.json(screens)
    }).catch((err)=> console.error(err));
  }


  // creating one screen 
exports.postOneScreen = (req, res)=> {
  console.log("this is the reqqq   ",req.body)
    if(req.body.body.trim() === ""){
        return res.status(400).json({body: "Body must not be empty"})
    }
    const newScreen = {
      body: req.body.body,
      userHandle:req.user.handle,
      userImage:req.user.imageUrl,
      createdAt:new Date().toISOString(),
      likeCount:0,
      commentCount:0
    }
    db.collection('screens').add(newScreen).then((doc)=> {
      const resScreen = newScreen
      resScreen.screenId = doc.id
     return res.json(resScreen)
    
    }).catch((err)=> {
      res.status(500).json({errMsg:`something went wrong`});
      console.error(err);
    });
  }

  //the function for getting one screen 

  exports.getScreen = (req, res) => {
    let screenData = {}
    db.doc(`/screens/${req.params.screenId}`).get()
    .then((docs)=> {
      if(! docs.exists){
        res.status(404).json({errMsg:"Screen not found"})
      }
      screenData = docs.data();
      screenData.screenId = docs.id;
      return db.collection("comments").orderBy("createdAt", 'desc').where('screenId', '==', req.params.screenId).get()
    })
    .then((docs)=> {
      screenData.comments = [];
      docs.forEach((doc)=> {
        screenData.comments.push(doc);
      })
      return res.json(screenData)
    })
    .catch((err)=> {
      console.error(err);
      return res.status(500).json({errMsg:err})
    })
  }

// the function for deleting one screen 
exports.deleteScreen = (req, res)=> {
  const screenDocument = db.doc(`/screens/${req.params.screenId}`)
  screenDocument.get()
  .then((doc)=> {
    if(! doc.exists){
      return res.status(404).json({errMsg:"screen does not exist"})
    }
    if(doc.data().userHandle !== req.user.handle){
      return res.status(401).json({errMsg:"unauthorized"})
    }
    else {
     return screenDocument.delete()
     .then(()=> {
    return res.json({succMsg:"screen deleted successfully"})
        })
    }
  })
  .catch((err)=> {
    console.error(err);
    return res.status(500).json({errMsg: err.code})
  })
}
  // the function to comment one screen

  exports.commentOneScreen = (req, res)=> {

    // verifting if the comment is empty
    if(req.body.body === "") return res.status(400).json({comment: "Must not be empty"})
    // constructing the comment
    const newComment = {
      body:req.body.body,
      createdAt: new Date().toISOString(),
      screenId: req.params.screenId,
      userHandle:req.user.handle,
      imageUrl:req.user.imageUrl
    } 
    
    // verifing if the screen exists
    db.doc(`/screens/${req.params.screenId}`).get()
    .then((doc)=> {
      if(! doc.exists){
        return res.status(404).json({comment:"Screen does not exist"});
      }
   
    
    // updating the commentCount in the screen
    return doc.ref.update({commentCount : doc.data().commentCount + 1})
    })
    .then(()=> {
      // adding the comment to the screen
      db.collection("comments").add(newComment)
    })
    .then(()=> {
     return  res.json(newComment)
    })
    .catch((err)=> {
      console.error(err);
      return res.status(500).json({errMsg:"something went wrong"})
    })

  }

  // the function to like screen
  exports.likeScreen = (req, res) => {
    // getting the like credentials if exists
    const likeDocument = db.collection('likes').where("userHandle", "==", req.user.handle).where("screenId", "==", req.params.screenId).limit(1);

    // getting the screen document to be liked
    const screenDocument = db.doc(`/screens/${req.params.screenId}`)
    let screenData;
    screenDocument.get()
    .then((doc)=> {
      console.log("the screeeeeeen ====  ",doc.data())
      if(doc.exists){
        screenData = doc.data();
        screenData.screenId = doc.id;
        return likeDocument.get()
      }
      else {
        res.status(404).json({errMsg: "Screen does not exists"})
      }
    })
    .then((data)=> {
      if(data.empty){
        db.collection("likes").add({
          screenId: req.params.screenId,
          userHandle: req.user.handle
        })
        .then(()=> {
          screenData.likeCount++;
          // console.log("document llllikkkkkkkked")
          return screenDocument.update({likeCount: screenData.likeCount})
        })
        .then(()=> {
          db.collection("comments").where("screenId", "==", req.params.screenId).get()
          .then((docs)=> {
            screenData.comments = []
            docs.forEach((doc)=> {
              screenData.comments.push(doc)
            })
            return res.json(screenData)
          })
        })
      }
      else {
        res.status(400).json({errMsg:"Screen has already been like"})
      }
    })
    .catch((err)=> {
      console.error(err);
      res.status(500).json({errMsg: err.code})
    })
    
  }

  // the function to unlike screen
  exports.unlikeScreen = (req, res) => {
 // getting the like credentials if exists
 const likeDocument = db.collection('likes').where("userHandle", "==", req.user.handle).where("screenId", "==", req.params.screenId).limit(1);

 // getting the screen document to be liked
 const screenDocument = db.doc(`/screens/${req.params.screenId}`)

 let screenData;
 screenDocument.get()
 .then((doc)=> {
   if(doc.exists){
     screenData = doc.data();
     screenData.screenId = doc.id;
     return likeDocument.get()
   }
   else {
     res.status(404).json({errMsg: "Screen does not exists"})
   }
 })
 .then((data)=> {
   if(data.empty){
    return res.status(400).json({errMsg:"Screen is not liked yet"})  
   }
   else {
      return db.doc(`/likes/${data.docs[0].id}`).delete()
      .then(()=> {
   screenData.likeCount --;
   return screenDocument.update({likeCount :screenData.likeCount})
    })
  .then(()=> {
    db.collection("comments").where("screenId", "==", req.params.screenId).get()
    .then((docs)=> {
      screenData.comments = [];
      docs.forEach((doc)=> {
        screenData.comments.push(doc);
      })

      res.json(screenData)})
    })
}
 })
 .catch((err)=> {
   console.error(err);
   res.status(500).json({errMsg: err.code})
 })

  }
