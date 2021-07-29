let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      googleUser = user;
      getNotes(googleUser.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const getNotes = (userId) => {
    console.log('Logged in as: ' + userId);
    // 1. Get access to all the current user's notes
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    })
}

const renderData = (data) => {
    const destination = document.querySelector("#app");
    destination.innerHTML = "";
    for (let key in data) {
        const note = data[key];
        destination.appendChild(createCard(note));
    }
};

/****************** MILD 2 *********************/
let index;
const randColor = (Bg) => {
    if(Bg==null) {
        if (index > 11)
            return ' has-text-white';
    }
    let colors = ['light',
                  'primary',
                  'info',
                  'success',
                  'warning',
                  'danger',
                  'primary-light',
                  'link-light',
                  'info-light',
                  'success-light',
                  'warning-light',
                  'danger-light',
                  'black',
                  'dark',
                  'link',
                  'primary-dark',
                  'link-dark',
                  'info-dark',
                  'success-dark',
                  'warning-dark',
                  'danger-dark'];
    index = Math.floor(Math.random() * 21);

    let color = colors[index];
    if(Bg) {
        if (index > 11)
            color += ' has-text-white';
    }
    console.log(color);
    return color;
}

const createCard = (note) => {
    console.log("createCard");
    /****************** MILD 1, MEDIUM *********************/
    //incredibly tedious, I probably didn't do this right
    let column = document.createElement("div");
    let card = document.createElement("div");
    let header = document.createElement("header");
    let headerTitle = document.createElement("p");
    let titleText = document.createTextNode(note.title);
    let cardContent = document.createElement("div");
    let content = document.createElement("div");
    let contentText = document.createTextNode(note.text)
    let footer = document.createElement("footer");
    let footerItem = document.createElement("div");
    let footerText = document.createTextNode(googleUser.displayName +" : " + note.label);

    column.classList = "column is-one-quarter";
    card.classList = `card has-background-${randColor(true)}`;
    header.classList = "card-header";
    headerTitle.classList = `card-header-title ${randColor()}`;
    cardContent.classList = "card-content";
    content.classList = "content";
    footer.classList = "card-footer has-background-warning-light has-text-dark";
    footerItem.classList = "card-footer-item is-size-7";

    column.appendChild(card);
    card.appendChild(header);
    card.appendChild(cardContent);
    card.appendChild(footer);
    header.appendChild(headerTitle);
    headerTitle.appendChild(titleText);
    cardContent.appendChild(content);
    content.appendChild(contentText);
    footer.appendChild(footerItem);
    footerItem.appendChild(footerText);
    console.log("done");
    return column;

    /*return `<div class="column is-one-quarter"> 
                <div class="card has-background-${randColor(true)}" >
                    <header class="card-header"> 
                        <p class="card-header-title ${randColor()}"> ${note.title}  </p>
                    </header> 
                    <div class="card-content"> 
                        <div class="content">
                            ${note.text} 
                        </div>
                    </div> 
                    <footer class="card-footer has-background-warning-light has-text-dark">
                        <div class="card-footer-item is-size-7">
                            ${googleUser.displayName} : ${note.label}
                        </div>
                    </footer>
                </div>
            </div>`;*/


};

