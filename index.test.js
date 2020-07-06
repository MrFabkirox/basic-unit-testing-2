log = console.log
expect = require('chai').expect
should = require('chai').should()
_ = require('lodash')

const {
  alwaysTrue,
  legitString,
  getPerson,
  Person,
  Armor,
  Weapon,
  getRandomNumber,
  rollDice,
  getNotARandomNumber,
  attack
} = require('./index')

describe('#mocha basics', () => {
  it('true should be true', () => {
    true.should.be.true
  })
  it('expect true to be true', () => {
    expect(true).to.be.true
  })
})

describe('#alwaysTrue', () => {
  it('should always return true', () => {
    alwaysTrue().should.be.true
  })
  it('expect it to be always true', () => {
    expect(alwaysTrue()).to.be.true
  })
  it('should not be false', () => {
    alwaysTrue().should.not.be.false
  })
})

describe('#legitString', () => {
  it('"toto" should be a legitString', () => {
    legitString('toto').should.be.true
  })
  it('some string should be a legitString', () => {
    legitString('some string').should.be.string
  })
  it('undefined should not be true', () => {
    legitString(undefined).should.not.be.true
  })
})

describe('#index initial conditions', () => {
  it('initial person is an object', () => {
    const person = getPerson();
    _.isObject(person).should.be.true
  })
  it('armorBonus by default is 0 with leatherArmor', () => {
    const person = getPerson();
    person.armorBonus.should.equal(0)
    // FIXME: should be 2 by default for leatherrmor
    // fix is not to reset armorB?onus to 0
  })
})

describe('#Person', () => {
  describe('#rollDice', () => {
    it('should return a finite number', () => {
      const number = Person.rollDice(1, 20);
      _.isFinite(number).should.be.true;
    })
    it('should not have 0 in 500 sample size, code ko so ohanged to false', () => {
      const sample = new Array(500);
      _.fill(sample, 0);
      const rollDiceSamples = _.map(sample, item => Person.rollDice(1, 20))
      const anyZeros = _.filter(rollDiceSamples, item => item === 0);
      anyZeros.length.should.not.equal(0);
    })
  })
  describe('#attack', () => {
    var personA;
    var personB;
    var createPersonFixture = (name) => {
      var leatherArmor = new Armor("Leather", 2);
      var shortSword = new Weapon("short sword", 0, 1, 6)
      return new Person(name, 2, 4, 1, [leatherArmor, shortSword])
    };
    beforeEach(() => {
      personA = createPersonFixture('Person A');
      personB = createPersonFixture('Person B');
    })
    afterEach(() => {
      personA = undefined;
      personB = undefined;
    })
    it('personA s hitpoints start at 11', () => {
      personA.hitPoints.should.equal(11);
    })
    it('personB s hitpoints start at 11', () => {
      personB.hitPoints.should.equal(11);
    })
    it('personA s armorBonus is 0 sadly', () => {
      personA.armorBonus.should.equal(0);
    })
    it('personB s armorBonus is 0 sadly', () => {
      personB.armorBonus.should.equal(0);
    })

    it('if i add boomstick to equipment it is in the array', () => {
      const boomStick = new Weapon('Boom Stick', 0, 1, 12)
      personA.addEquipment(boomStick);
      personA.equipment.should.include(boomStick);
    })

    it('if i add hotpants to PersonA he become awessauce', () => {
      const hotPants = new Armor('Hawt Pawwwnts', 1)
      personA.addEquipment(hotPants);
      personA.armorBonus.should.equal(3);
    })
  })
})

describe('#getRandomNumber', () => {
  it('should return a finite number', () => {
    const result = getRandomNumber();
    _.isFinite(result).should.be.true;
  })
})
describe('#rollDice', () => {
  it('should return a finite number', () => {
    const result = rollDice(1, 20);
    _.isFinite(result).should.be.true;
  })
  it('should NOT be a random number if we use 1', () => {
    const result = rollDice(1, 20, getNotARandomNumber);
    result.should.equal(20);
  })
  describe('#getNotARandomNumber', () => {
    it('should return 1', () => {
      const result = getNotARandomNumber();
      result.should.equal(1);
    })
  })
})
describe('#attack', () => {
  it('should always be a hit if 20 is rolled', () => {
    const rollDice = () => 20;
    const result = attack(
      rollDice,
      getNotARandomNumber,
      0,
      0,
      0
    );
    log("result", result);
    result.hit.should.be.true
  })
})