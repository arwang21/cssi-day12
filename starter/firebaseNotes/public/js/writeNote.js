let googleUser;
const writeButton = document.querySelector("#writeButton");

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
    console.log("note submission function called");

    // 1. Capture the form data
    let noteTitle = document.querySelector("#noteTitle");
    let noteText = document.querySelector("#noteText");
    let noteLabel = document.querySelector("#noteLabel");

    let title = noteTitle.value;
    let text = noteText.value;
    let label = noteLabel.value;
    console.log(title);
    console.log(text);
    console.log(label);

    // 2. Format the data
    let note = {
        title: title,
        text: text,
        label: label
    }

    // 3. Clear the form so that we can write a new note
    noteTitle.value = "";
    noteText.value = "";
    noteLabel.value = "";

    // 4. Write data to database
    const dbRef = firebase.database().ref(`users/${googleUser.uid}`);
    dbRef.push(note);
}
