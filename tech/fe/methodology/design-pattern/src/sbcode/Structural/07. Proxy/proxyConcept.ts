interface ISubject {
  request(): void;
}

class RealSubject implements ISubject {
  enormouseData: number[];

  constructor() {
    this.enormouseData = [1, 2, 3];
  }

  request() {
    return this.enormouseData;
  }
}

class ProxySubject implements ISubject {
  enormousData: number[];
  realSubject: RealSubject;

  constructor() {
    this.enormousData = [];
    this.realSubject = new RealSubject();
  }

  request() {
    if (this.enormousData.length === 0) {
      console.log("pulling data from RealSubject");
      this.enormousData = this.realSubject.request();
      return this.enormousData;
    }
    console.log("pulling data from Proxy cache");
    return this.enormousData;
  }
}

const proxySubject = new ProxySubject();
console.log(proxySubject.request());
console.log(proxySubject.request());
