const createHtmlELement = (type) => {
    return document.createElement(type);
};

const setElementAttribute = (element, type, value) => {
    element.setAttribute(type, value);
};

export { createHtmlELement, setElementAttribute }
