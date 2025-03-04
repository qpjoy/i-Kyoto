import { Document, AbstractDocument } from "./abstractDocument";

export default class HTMLDocument extends AbstractDocument {
  title(document: Document): void {
    document["title"] = "New HTML Document";
  }

  text(document: Document, text: string): void {
    const lines = text.split("\n");
    let markup = "";
    lines.forEach((line) => {
      markup = markup + "   <p>" + line + "</p>\n";
      document["text"] = markup.substring(0, markup.length - 1);
    });
  }

  print(document: Document): void {
    console.log("<html>");
    console.log("  <head>");
    Object.keys(document).forEach((attribute: string) => {
      if (["title", "description", "author"].indexOf(attribute) > -1) {
        console.log(`    <${attribute}>${document[attribute]}</${attribute}>`);
      }
      if (attribute === "bg-col") {
        console.log("      <style>");
        console.log("        body {");
        console.log(`          background-color: ${document[attribute]};`);
        console.log("        }");
        console.log("      </style>");
      }
    });
    console.log("  </head>");
    console.log("  <body>");
    console.log(`${document["text"]}`);
    console.log(`  </body>`);
    console.log(`</html>`);
  }
}
