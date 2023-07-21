// import firebase from "firebase/app";

// export const send = (messages) => {
//   messages.forEach((item) => {
//     const message = {
//       text: item.text,
//       timestamp: firebase.database.ServerValue.TIMESTAMP,
//       user: item.user,
//     };
//     db.push(message);
//   });
// };

// export const parse = (message) => {
//   const { user, text, timestamp } = message.val();
//   const { key: _id } = message;
//   const createdAt = new Date(timestamp);

//   return {
//     _id,
//     createdAt,
//     text,
//     user,
//   };
// };

// export const get=callback=>{
//     db.on("child_added",snapshot=>callback(parse(snapshot)))
// }

// export const off=()=>{
//     db.off()
// }

// export const getDb = () => {
//   return firebase.database().ref("messages");
// };

// export const getUid=()=>{
//     return (firebase.auth().currentUser || {}).uid
// }
