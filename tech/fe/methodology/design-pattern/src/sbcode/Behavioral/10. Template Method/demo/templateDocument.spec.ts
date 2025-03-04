import TextDocument from "./textDocument";
import HTMLDocument from "./htmlDocument";

const textDocument = new TextDocument();
textDocument.createDocument("Some Text");

const htmlDocument = new HTMLDocument();
htmlDocument.createDocument("Line 1\nLine 2");
