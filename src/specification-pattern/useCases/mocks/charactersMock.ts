import { Character, Race, Skill, Gear, Spell, Shout } from '../character';

export const stealthArcherHighElf = new Character(
  'Stealth Archer High Elf',
  Race.HighElf,
  [Skill.Archery, Skill.Sneak, Skill.Illusion, Skill.Conjuration],
  [Gear.Bows, Gear.MuffledBoots],
  [Spell.Invisibility],
  [Shout.SlowTime],
);

export const stealthArcherKhajiit = new Character(
  'Stealth Archer Khajiit',
  Race.Khajiit,
  [Skill.Archery, Skill.Sneak, Skill.Illusion],
  [Gear.Bows, Gear.MuffledBoots],
);

export const windshearStunMaster = new Character(
  'Windshear Stun Master',
  Race.Redguard,
  [Skill.OneHanded],
  [Gear.Shield],
);

export const crafter = new Character(
  'Crafter',
  Race.Khajiit,
  [Skill.Alchemy, Skill.Enchanting, Skill.Smithing],
  [],
);

export const characters = [
  stealthArcherHighElf,
  stealthArcherKhajiit,
  windshearStunMaster,
  crafter,
];
