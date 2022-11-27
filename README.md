# daily-snippets

## Specification pattern

A real-life example for open for extension closed for modification

```typescript
export enum Race {
  HighElf,
  Redguard,
  Breton,
  Khajiit,
  Orc,
}

export enum Gear {
  Dagger,
  Bows,
  MuffledBoots,
  HeavyArmor,
  Shield,
  FortifyAlchemy,
  FortifySmithing,
}

export enum Skill {
  OneHanded,
  Archery,
  Sneak,
  Illusion,
  Conjuration,
  Alchemy,
  Enchanting,
  Smithing,
}

export enum Spell {
  Frenzy,
  Invisibility,
}

export enum Shout {
  AuraWhisper = 'Aura Whisper',
  BendWill = 'Bend Will',
  ElementalFury = 'Elemental Fury',
  SlowTime = 'Slow Time',
}

export class Character {
  constructor(
    public readonly name: string,
    public readonly race: Race,
    public readonly coreSkills: Skill[],
    public readonly gears: Gear[],
    public readonly spells?: Spell[],
    public readonly shouts?: Shout[],
  ) {}
}

export class RaceSpecification extends CompositeSpecification<Character> {
  constructor(private readonly race: Race) {
    super();
  }

  IsSatisfiedBy(candidate: Character): boolean {
    return candidate.race === this.race;
  }
}

export class CharacterFilter {
  executeSpecification(
    characters: Character[],
    spec: ISpecification<Character>,
  ) {
    return characters.filter((character) => spec.IsSatisfiedBy(character));
  }
}

// Client code(usage):
const khajiitSpec = new RaceSpecification(Race.Khajiit);
const stealthSpec = new IsCharacterGoodAtStealthSpecification();
const combinatorSpec = khajiitSpec.and(stealthSpec);

export const stealthArcherKhajiit = new Character(
  'Stealth Archer Khajiit',
  Race.Khajiit,
  [Skill.Archery, Skill.Sneak, Skill.Illusion],
  [Gear.Bows, Gear.MuffledBoots],
);

const characters = [stealthArcherKhajiit];

const cf = new CharacterFilter();
const result = cf.executeSpecification(characters, combinatorSpec);

expect(result).toStrictEqual([stealthArcherKhajiit]);
```
