import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
            <style>
                header {
                    font-family: "Playwrite VN", serif;
                    color: var(--heading-color);
                    background-color: var(--background-color-header);
                    display: flex;
                    flex-direction: row;
                    vertical-align: center;
                    align-items: center;
                    justify-content: space-between;
                }
                header h1, header p {
                    margin: 1em;
                }
                header a:visited {
                    color: var(--link-header-visted);
                }
                
                a:visited {
                    color: var(--link-color);
                }
                
                #nam-butt {
                    display: flex;
                    flex-direction: row;
                }
                .dark-butt {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                button {
                    display: initial;
                    align-self: end;
                    vertical-align: center;
                    padding: 1em;
                    margin: 1em;
                }
                #dark-check {
                    margin: 1em;
                }
                #pages {
                    display: none;
                    /*display: flex;*/
                    /*flex-direction: column;*/
                    align-items: center;
                }
                
                
                @media only screen and (min-width:700px) {
                    header {
                        display: flex;
                        flex-direction: row;
                    }
                    button{
                        display: none;
                        
                    }
                    #pages{
                        display: flex;
                        flex-direction: row;
                    }
                }
                                
                
                
            </style>
            <header>
                <div id="nam-butt">
                    <h1>Gabe Alonso</h1>
                    <div id="pages">
                        <p> <a href=\"index.html\">Home</a> </p>
                        <p> <a href=\"subpage.html\">Projects</a> </p>
                    </div>
                </div>
                <div class="dark-butt">
                    <label id="dark-check">
                        <input type="checkbox" autocomplete="off" />
                            Dark mode
                    </label>
                    <button id="mob-butt">Menu</button>
                </div>
            </header>
`;

class CusNav extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
        let mobileWidth = 700;
        let pagesDiv = shadowRoot.getElementById("pages");
        let checkbox = shadowRoot.getElementById("dark-check");

        let pages = pagesDiv.getElementsByTagName("a");
        let page;
        for (page of pages){
            //console.log(page.href);
            if (window.location.href.includes(page.href)) {
                //console.log("We changing " + page.href);
                page.style.color = "blue";
                page.style.fontSize = "1.5em";
                page.style.fontWeight = "bold";
            }
            //console.log(page);
        }
        let checkedST = localStorage.getItem("checked");
        if (checkedST !== null) {
            if (checkedST === "true") {
                console.log(checkedST);
                document.body.className = "dark-mode";
                checkbox.getElementsByTagName("input")[0].checked = true;
            }else if (checkedST === "false") {
                document.body.className = null;
                checkbox.getElementsByTagName("input")[0].checked = false;
            }
        } else{
            document.body.className = null;
            checkbox.getElementsByTagName("input")[0].checked = false;
        }
        const btn = shadowRoot.getElementById("mob-butt");

        let nameDiv = shadowRoot.getElementById("nam-butt");

        btn.addEventListener("click", () => {
            console.log("clicked");

            if (pagesDiv.style.display === "none" || pagesDiv.style.display === "") {
                pagesDiv.style.display = "flex";
                pagesDiv.style.flexDirection = "column";
                nameDiv.style.flexDirection = "column";
            } else {
                pagesDiv.style.display = "none";
            }
        });

        document.addEventListener("click", (event) => {
            if (!shadowRoot.contains(event.target) && event.target !== this && window.innerWidth < mobileWidth) {
                pagesDiv.style.display = "none";
            }
        });


        checkbox.addEventListener("change", (event) => {
            console.log("Click click");
            let checked = checkbox.getElementsByTagName("input")[0].checked;

            if(checked){
                document.body.className = "dark-mode";
                localStorage.setItem("checked", "true");
            } else {
                document.body.className = null;
                localStorage.setItem("checked", "false");
            }
        });

        let isMobile = window.matchMedia("(min-width: 700px)")

        isMobile.addEventListener("change", (e) => {
            if (e.matches) {
                pagesDiv.style.display = "flex";
                pagesDiv.style.flexDirection = "row";
                nameDiv.style.flexDirection = "row";
            } else {
                nameDiv.style.flexDirection = "column";
                pagesDiv.style.display = "none";
            }
        });
    }
}

customElements.define("cus-nav", CusNav);


