const modalTemplate = document.createElement('template')
modalTemplate.innerHTML = `
  <link rel="stylesheet" href="modal/style.css">
  <div class="modal">
    <div class='modal-content'>
        <button id='close' class='close'>Close</button>
        <img alt=""></img>
        <h3></h3>
        <p></p>
    </div>
  </div>`

  class Modal extends HTMLElement {

    static get observedAttributes() {
      return ['key'];
    }
    constructor() {
        super();
        this.showInfo = false;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
      }
      connectedCallback() {
        this.shadowRoot.querySelector('#close').addEventListener('click', () => {this.remove()});
      }
      attributeChangedCallback(name, oldValue, newValue) {
        if(name==='key'){
          
          this.shadowRoot.querySelector('img').src = this.getAttribute('img')
          this.shadowRoot.querySelector('h3').innerText = this.getAttribute('doggo');
          this.shadowRoot.querySelector('p').innerHTML = `
          Age: ${this.getAttribute('age')}`
        }
      }
}
window.customElements.define('user-modal', Modal)

