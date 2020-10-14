const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // Deleting Data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("Cafes").doc(id).delete();
  });
}

// Getting the Data
// db.collection("Cafes").orderBy('city')
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

//Saveing Data and Eidt Data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("Cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});

// real-time listener

db.collection("Cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      //this for added itme
      if (change.type == "added") {
        renderCafe(change.doc);
      }
      // this for removed itme
      else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });

//Updata mathed
db.collection("Cafe").doc(id).updata({
  name: "kola",
  city: "new york",
});
//set mathed
db.collection("Cafe").doc(id).set ({
  name: "kola",
  city: "new york",
});
