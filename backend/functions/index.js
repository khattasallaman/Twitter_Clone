const functions = require('firebase-functions');
const {db} = require('./util/admin')
const {getAllScreens, postOneScreen, getScreen, commentOneScreen, unlikeScreen, likeScreen, deleteScreen} = require('./handlers/sceensRoutes')
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead} = require('./handlers/usersRoute');
// const { db } = require('./util/admin');
const { FBauth} = require('./util/fbAuth')
// express
const app = require('express')();
 
const cors = require("cors")
app.use(cors())
// screens routes :---
// getting all screens
app.get('/screens', getAllScreens)
// getting one screen
app.get("/screens/:screenId", getScreen)
// creating one screen
app.post('/screen', FBauth, postOneScreen)
// deleting one screen
app.delete("/screens/:screenId", FBauth, deleteScreen);
// creating one connemt
app.post('/screens/:screenId/comment', FBauth, commentOneScreen);
// liking one screen
app.get('/screens/:screenId/like', FBauth, likeScreen)
// unliking one screen
app.get('/screens/:screenId/unlike', FBauth, unlikeScreen)


// users route:--
// signup and logging in routes
app.post('/signup', signup)
app.post('/login', login)

app.post('/user', FBauth, addUserDetails)
app.post("/user/image",FBauth, uploadImage)
// get all own user
app.get("/user", FBauth, getAuthenticatedUser)
// get one user details
app.get("/users/:handle", getUserDetails)
// mark notifications as read
app.post("/notifications",FBauth, markNotificationsRead)





exports.api = functions.https.onRequest(app);

// adding like notification 

exports.createNotificationOnLike = functions.firestore.document("likes/{id}")
.onCreate((snapshot)=> {
    return db.doc(`/screens/${snapshot.data().screenId}`).get()
    .then((doc)=> {
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type:"like",
                read:false,
                screenId:doc.id
            })
        }
    })
    .catch((err)=> console.log(err))
})
// adding unlike notification 

exports.createNotificationOnUnLike = functions.firestore.document("likes/{id}")
.onDelete((snapshot)=> {
    return db.doc(`notifications/${snapshot.id}`).delete()
   .catch((err)=>  console.log(err)
   )
})


// adding comment notification 

exports.createNotificationOnComment = functions.firestore.document("comments/{id}")
.onCreate((snapshot)=> {
    return db.doc(`/screens/${snapshot.data().screenId}`).get()
    .then((doc)=> {
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type:"comment",
                read:false,
                screenId:doc.id
            })
        }
    })
    .catch((err)=> console.log(err))
})

// updating all references of the image when a user update their image

exports.onUserImageChange = functions.firestore.document("/users/{id}").onUpdate((change)=> {
    console.log("the data before",change.before.data())
    console.log("the data after",change.after.data())
    if(change.before.data().imageUrl !== change.after.data().imageUrl){
        console.log("//////////////////////////image has changed////////////////////");
        let batch = db.batch();
        return db.collection("screens").where("userHandle", "==", change.before.data().handle).get()
        .then((data)=> {
            data.forEach((doc)=> {
                const screen = db.doc(`/screens/${doc.id}`);
                batch.update(screen, { userImage: change.after.data().imageUrl});
            })
            return batch.commit();
        })
    }
    else return true
})



exports.createNotificationOnUnLike = functions.firestore.document("/screens/{screenId}")
.onDelete((snapshot, context)=> {
   const screenId = context.params.screenId;
   const batch = db.batch();
   return db.collection("comments").where("screenId", "==", screenId).get()
   .then((data)=> {
       data.forEach((doc)=> {
           batch.delete(db.doc(`/comments/${doc.id}`))
       })
       return db.collection("likes").where("screenId", "==", screenId).get()
   })
   .then((data)=> {
       data.forEach((doc)=> {
           batch.delete(db.doc(`/likes/${doc.id}`))
       })
       return db.collection("notifications").where("screenId", "==", screenId).get()
   })
   .then((data)=> {
       data.forEach((doc)=> {
           batch.delete(db.doc(`/notifications/${doc.id}`))
       })
       return batch.commit()
   })
   .catch((err)=> console.error(err))
})