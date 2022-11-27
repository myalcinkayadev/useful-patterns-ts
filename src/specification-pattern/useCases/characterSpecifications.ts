import { CompositeSpecification } from '../specifications';
import { Character, Gear, Race } from './character';

export class RaceSpecification extends CompositeSpecification<Character> {
  constructor(private readonly race: Race) {
    super();
  }

  IsSatisfiedBy(candidate: Character): boolean {
    return candidate.race === this.race;
  }
}

export class IsCharacterGoodAtStealthSpecification extends CompositeSpecification<Character> {
  IsSatisfiedBy(candidate: Character): boolean {
    const stealthGears = [Gear.MuffledBoots];
    return stealthGears.some((gear) => candidate.gears.includes(gear));
  }
}

export class IsCharacterGoodAtCloseCombatSpecification extends CompositeSpecification<Character> {
  IsSatisfiedBy(candidate: Character): boolean {
    const closeCombatGears = [Gear.HeavyArmor, Gear.Shield];
    return closeCombatGears.some((gear) => candidate.gears.includes(gear));
  }
}
