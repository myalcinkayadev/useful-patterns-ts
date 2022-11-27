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
