import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, getFirestore, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyBlFVymTVosH9a0rdkeiDTePMdQhEdHtzA",
  authDomain: "personal-blogging-app-8258d.firebaseapp.com",
  projectId: "personal-blogging-app-8258d",
  storageBucket: "personal-blogging-app-8258d.appspot.com",
  messagingSenderId: "105169474002",
  appId: "1:105169474002:web:60bce0fe7811e66063780b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const ids = []





window.signUp = function () {

  let signUpEmail = document.getElementById("signupemail").value
  let signUpPassword = document.getElementById("signuppassword").value

  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Swal.fire('User Created Successfully')
      window.location.href = "./index.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal.fire(errorMessage)
      // ..
    });

}

window.logIn = function () {
  let logInEmail = document.getElementById("loginemail").value
  let logInPassword = document.getElementById("loginpassword").value
  signInWithEmailAndPassword(auth, logInEmail, logInPassword)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Swal.fire('Login Successfull')
      window.location.href = "./dashboard.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(errorMessage);
    });

}

window.addpost = async () => {


  let postTitle = document.getElementById("author-name")
  let postText = document.getElementById("post-text")
  let date = new Date()
  try {
    const docRef = await addDoc(collection(db, "post"), {
      postTitle: postTitle.value,
      postText: postText.value,
      time: date.toLocaleString()
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const postContainer = document.getElementById("post-container");

window.getPost = () => {
  const postCollectionRef = collection(db, "post");

  onSnapshot(postCollectionRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const postDoc = change.doc;
      const postId = postDoc.id;
      const postTitle = postDoc.data().postTitle;
      const postText = postDoc.data().postText;

      console.log("Post ID:", postId);
      console.log("Post Title:", postTitle);
      console.log("Post Text:", postText);

      // Create a new card element
      const card = document.createElement("div");
      card.classList.add("post-card");

      // Set the content of the card
      // let postContainer = document.getElementById("postContainer")
      card.innerHTML = `<div class="card" style="width: 18rem;">

      
<div class="card-body">
  <h5 class="card-title">${postTitle}</h5>
  <p class="card-text">${postText}</p>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>`

      // card.innerHTML = `
      //   <h2>PostTitle: ${postTitle}</h2>
      //   <p>PostText: ${postText}</p>
      // `;

      // Append the card to the post container
      postContainer.appendChild(card);
    });
  });
}





getPost();












