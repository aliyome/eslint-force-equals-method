class ValueObject {
  constructor(private readonly value: string) {}
  equals(other: ValueObject) {
    return this.value === other.value;
  }
}

const vo1 = new ValueObject('foo');
const vo2 = new ValueObject('foo');

// OK
vo1.equals(vo2);

// NG
// because they are different instances. we want to force using the equals method
vo1 === vo2;
vo1 !== vo2;
vo1 == vo2;
vo1 != vo2;
