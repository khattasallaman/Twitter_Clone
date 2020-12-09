const {admin, db} = require('./admin')
exports.FBauth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        idToken = req.headers.authorization.split(" ")[1];
    }
    else {
        // console.log("No token found")
        return res.status(401).json({error:"Unauthorized"})
    }
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken)=> {
        req.user = decodedToken;
        // console.log(decodedToken)
        // console.log("the comming is the req.user ////////////////")
        // console.log(req.user)
        return db.collection("users").where('userId', '==', req.user.uid).limit(1).get();
    })
    .then((data)=> {
        // console.log("the comming is the data.docs ////////////////")

        // console.log("this is the dattttta dooocs", data.docs)


        req.user.handle = data.docs[0].data().handle;
        // console.log("this is the user handle  ",req.user.handle);
        req.user.imageUrl = data.docs[0].data().imageUrl;
        // console.log("this is the imageeee  ", req.user.imageUrl);
        return next();
    })
    .catch((err)=> {
        console.error("error while verifying the token ", err);
        res.status(401).json(err)
    })
  }