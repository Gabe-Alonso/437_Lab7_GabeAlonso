import {toHtmlElement} from "./toHtmlElement.mjs";



function navBar () {
    console.log("Creating Nav bar");
    console.log(window.location.href);
    return toHtmlElement(`<cus-nav></cus-nav>`);
}

window.addEventListener("load", () => { // Create a function on the fly
    const body = document.body;
    let nav = navBar();
    let pages = nav.getElementsByTagName("a");
    let page;
    for (page of pages){
        console.log(page.href);
        if (window.location.href.includes(page.href)) {
            console.log("We changing " + page.href);
            page.style.color = "blue";
            page.style.fontSize = "1.5em";
            page.style.fontWeight = "bold";
        }
        console.log(page);
    }
    body.prepend(nav);
    console.log("Placing Nav bar");
});