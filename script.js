"use strict"

// XMLHttp request

let textWraper = document.getElementById("text-wraper");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let currentPage = 1;
let totalPages;

function getUser(currentPage){
    let request = new XMLHttpRequest();

    request.addEventListener("load", function(){
        let text = request.responseText;
        let convert = JSON.parse(text);

        let ul = document.getElementById("list-1");
        const fragment = new DocumentFragment();
        convert.data.forEach(item => {
            let li = document.createElement("li");
            li.innerText = `${item.first_name} ${item.last_name}`;
            fragment.appendChild(li);
        });
        ul.innerHTML = " ";
        ul.appendChild(fragment);
        textWraper.appendChild(ul);
        totalPages = convert.total_pages;
    });

    request.addEventListener("error", function(){
        let p = document.createElement("p");
        p.textContent = "server not found";
        textWraper.appendChild(p);
    });

    request.open("GET", "https://reqres.in/api/users?page=" + currentPage);
    request.send();
}

nextButton.addEventListener("click", function(){
    if(currentPage == totalPages){
        return;
    }
    currentPage++;
    getUser(currentPage);
});

prevButton.addEventListener("click", function(){
    if(currentPage == 1){
        return;
    }
    currentPage--;
    getUser(currentPage);
});

getUser(currentPage);



// fetch

let ul2 = document.getElementById("list-2")

fetch("https://reqres.in/api/unknown", {
    METHOD: "GET"
})
.then(function(text){
    if (text.status !== 200){
        throw text.status;
    }
    return text.json();
})
.then(function(converted){
    converted.data.forEach((item) => {
        let li2 = document.createElement("li")
        li2.innerText = `${item.name} ${item.year}`;
        ul2.appendChild(li2);
    });
})
.catch(function(error){
    if(error == 404){
        let p = document.createElement("p");
        p.textContent = "page not found";
        ul2.appendChild(p);
    }
})