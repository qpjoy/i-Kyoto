// JQuery $
function $(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector);
}

namespace $ {
  export function ajax(arg: { url: string; data: any; success: (response: any) => void }): Promise<any> {
    return Promise.resolve();
  }
}
