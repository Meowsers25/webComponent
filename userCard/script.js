const template = document.createElement('template')
template.innerHTML = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;900&display=swap');
        .user-card{
            // border: 5px solid yellow;
            //  width: 500px;
        }
        .container{
            width: 250px;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
        }
        img{
            height: 200px;
        }
        h1{
            color: red;
            font-family: 'Lato', sans-serif;
        }
        h3{
            color: blue;
            font-family: 'Lato', sans-serif;
        }
        h4{
            color: green;
        }
        button{
            width: 55px;
            color: grey;
            // font-family: 'Lato', sans-serif;
        }
    </style>
    <div class="user-card">
        <div class="container">
            <img />
            <h1></h1>
            <h3></h3>
            <h4></h4>
            <button class="open-modal">Click</button>
        </div>
    </div> `

class UserCard extends HTMLElement {
    static get observedAttributes() {
      return ["key"];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
      connectedCallback() {
        this.shadowRoot
          .querySelector(".open-modal")
          .addEventListener("click", () => this.openModal());
      }
      
      attributeChangedCallback(name, oldValue, newValue) {
        if (name === "key") {
            this.shadowRoot.querySelector("img").src = this.getAttribute("avatar")
            
            this.shadowRoot.querySelector("h1").innerText = this.getAttribute("name");
            this.shadowRoot.querySelector("h3").innerText = this.getAttribute("age");

            this.shadowRoot.querySelector("h4").innerText = this.getAttribute("key");
          
        }
      }
      openModal() {
        console.log("clicked from modal")
        const userModal = document.createElement("user-modal")
        userModal.setAttribute("doggo", this.getAttribute("doggo"))
        userModal.setAttribute("name", this.getAttribute("name"))
        userModal.setAttribute("age", this.getAttribute("age"))
        userModal.setAttribute("key", this.getAttribute("key"))
        userModal.setAttribute("avatar", this.getAttribute("avatar"))
        document
            .getElementsByTagName("body")[0]
            .insertAdjacentElement("afterend", userModal);
        
      }
}

window.customElements.define("user-card", UserCard)