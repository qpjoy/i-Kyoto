function render(reactElement, containerDOMElement) {
  const domElement = document.createElement(reactElement.type);
  domElement.innerText = reactElement.children;
  for (const key in reactElement.props) {
    const value = reactElement.props[key];
    domElement.setAttribute(key, value);
  }
  domElement.setAttribute("href", reactElement.props.href);
  containerDOMElement.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    id: "some-link",
    "data-number": 20,
    href: "https://wikipedia.org/"
  },
  children: "Read more on Wikipedia"
};

const containerDOMElement = document.getElementById("root");
render(reactElement, containerDOMElement);
