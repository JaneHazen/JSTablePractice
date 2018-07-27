// Put IDS on each div in the form so that you can switch around the order of the HTML without messing up the JS
let form = document.getElementsByTagName("form");
let children = form[0].children;

for (let i = 0; i < children.length; i++) {
    let textContent = children[i].children[0].textContent;
    let splitText = textContent.split("\n");
    let label = splitText[0];
    children[i].setAttribute("id", label);
}

// Find the buttons
let submitButton = document.getElementById("submit").getElementsByTagName("button")[0];
let addButton = document.getElementById("add").getElementsByTagName("button")[0];

//Add state that tracks family members
let familyMembers = [];

//Put a click event on the submit button
submitButton.addEventListener("click", function(){
    let json = JSON.stringify(familyMembers);
    alert(json);
});

//Put a click event on the add button
addButton.addEventListener("click", function(){
    event.preventDefault();

    // Get the attributes
    let age = validateAge();
    let relationship = validateRelationship();
    if(!age || !relationship) {
        return;
    }
    let smoker = document.getElementById("Smoker?").getElementsByTagName("input")[0].checked;

    let attributes = [];
    attributes.push(age, relationship, smoker);

    //Find the labels
    let labels = [];
    for(let i = 0; i < children.length; i++){
        labels.push(children[i].id);
    }

    //Store label:attribute in a person object
    let person = {};
    for(let i = 0; i < (labels.length - 2); i++){
        person[labels[i]] = attributes[i]
    }

    let familyViewer = document.getElementById("viewer");
    if (!familyViewer) {
        createFamilyViewerDiv();
    }

    familyMembers.push(person);

    // Add the latest addition to the family to a table...
    let table = createTable(familyMembers[familyMembers.length -1], labels);

    //And store it on the page
    let familyList = document.getElementById("familyList");
    familyList.insertAdjacentElement("beforeend", table);
});

//Ensure the age is a positive integer and that it exists
function validateAge() {
    let age = document.getElementById('Age').getElementsByTagName("input")[0].value;
    if (age === "") {
        alert("Please enter an age");
        return false;
    }
    let ageInteger = parseInt(age);
    if(isNaN(ageInteger)){
        alert("Please enter a number for the age");
        return false;
    }
    if(ageInteger < 0){
        alert("Please enter a valid age");
        return false;
    }
    return age;
}

//Ensure that the relationship is not left blank
function validateRelationship(){
    let relationshipStatus = document.getElementById("Relationship").getElementsByTagName("select");
    let selectedIndex = relationshipStatus[0].selectedIndex;
    let status = relationshipStatus[0].children[selectedIndex].text;
    if(status === "---"){
        alert("Please enter a relationship status");
        return false;
    }
    return status;
}

function createFamilyViewerDiv(){
    //Create div for family list and place after builder div
    let builderDiv = document.getElementsByClassName("builder")[0];
    let viewerDiv = document.createElement("div");
    viewerDiv.setAttribute("id", "viewer");
    builderDiv.insertAdjacentElement("afterend", viewerDiv);

    //Set up a header and an actionable div for the family list
    viewerDiv.innerHTML = "<h1>Family list</h1><div id='familyList'></div>";
}
//(labels.length - 2)
function createTable(person, labels){
    let table = document.createElement('table');
    for (let i = 0; i < 3; i++){
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        let text1 = document.createTextNode(labels[i]);
        let text2 = document.createTextNode(person[labels[i]]);

        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    return table;
}