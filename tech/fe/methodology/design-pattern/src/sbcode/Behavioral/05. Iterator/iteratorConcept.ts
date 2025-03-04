interface IIterator {
  next(): IAggregate;
  hasNext(): boolean;
}

class IteratorConcept implements IIterator {
  index: number;
  aggregates: IAggregate[];

  constructor(aggregates: IAggregate[]) {
    this.index = 0;
    this.aggregates = aggregates;
  }

  next() {
    if (this.index < this.aggregates.length) {
      const aggregates = this.aggregates[this.index];
      this.index += 1;
      return aggregates;
    }
    throw new Error("At End of Iterator");
  }

  hasNext(): boolean {
    return this.index < this.aggregates.length;
  }
}

interface IAggregate {
  method(): void;
}

class Aggregate implements IAggregate {
  method(): void {
    console.log("This method has been invoked");
  }
}

const aggreates = [new Aggregate(), new Aggregate(), new Aggregate(), new Aggregate()];

const iterable = new IteratorConcept(aggreates);

while (iterable.hasNext()) {
  iterable.next().method();
}
