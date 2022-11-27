import { Race } from './character';
import { CharacterFilter } from './characterFilter';
import {
  IsCharacterGoodAtCloseCombatSpecification,
  IsCharacterGoodAtStealthSpecification,
  RaceSpecification,
} from './characterSpecifications';
import {
  characters,
  stealthArcherHighElf,
  stealthArcherKhajiit,
  windshearStunMaster,
} from './mocks/charactersMock';

describe('Character Specications', () => {
  let cf: CharacterFilter;

  beforeEach(() => {
    cf = new CharacterFilter();
  });

  it('gets race high elf from characters', () => {
    const highElfSpec = new RaceSpecification(Race.HighElf);
    const result = cf.executeSpecification(characters, highElfSpec);

    expect(result).toStrictEqual([stealthArcherHighElf]);
  });

  it('gets all characters that are good at stealth', () => {
    const stealthSpec = new IsCharacterGoodAtStealthSpecification();
    const result = cf.executeSpecification(characters, stealthSpec);

    expect(result).toStrictEqual([stealthArcherHighElf, stealthArcherKhajiit]);
  });

  it('get all characters whose race is khajiit and good at stealth', () => {
    const khajiitSpec = new RaceSpecification(Race.Khajiit);
    const stealthSpec = new IsCharacterGoodAtStealthSpecification();
    const combinatorSpec = khajiitSpec.and(stealthSpec);

    const result = cf.executeSpecification(characters, combinatorSpec);

    expect(result).toStrictEqual([stealthArcherKhajiit]);
  });

  it('gets all characters that are good at close combat', () => {
    const closeCombatSpec = new IsCharacterGoodAtCloseCombatSpecification();
    const result = cf.executeSpecification(characters, closeCombatSpec);

    expect(result).toStrictEqual([windshearStunMaster]);
  });
});
