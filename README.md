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

export class IsCharacterGoodAtStealthSpecification extends CompositeSpecification<Character> {
  IsSatisfiedBy(candidate: Character): boolean {
    const stealthGears = [Gear.MuffledBoots];
    return stealthGears.some((gear) => candidate.gears.includes(gear));
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

## Circuit Breaker
```typescript
class CircuitBreaker {
  private isOpen: boolean;
  private failureCount: number;
  private readonly maxFailures: number;
  private readonly resetTimeout: number;
  private lastFailureTime: number;

  constructor(maxFailures: number, resetTimeout: number) {
    this.isOpen = false;
    this.failureCount = 0;
    this.maxFailures = maxFailures;
    this.resetTimeout = resetTimeout;
    this.lastFailureTime = 0;
  }

  public async executeAction<T>(action: () => Promise<T>): Promise<T> {
    if (this.isOpen && this.isResetTimeoutExpired()) {
      this.reset();
    }

    if (this.isOpen) {
      return Promise.reject(new Error("Circuit breaker is open"));
    }

    try {
      const result = await action();
      this.onActionSuccess();
      return result;
    } catch (error) {
      this.onActionFailure();
      return Promise.reject(error);
    }
  }

  private isResetTimeoutExpired(): boolean {
    return Date.now() - this.lastFailureTime >= this.resetTimeout;
  }
  
  private reset() {
    this.isOpen = false;
    this.failureCount = 0;
    console.log(`Circuit breaker is reset: ${new Date().toISOString()}`);
  }

  private onActionSuccess() {
    this.failureCount = 0;
  }

  private onActionFailure() {
    this.failureCount++;
    
    console.log(`failureCount: ${this.failureCount}`);

    if (this.failureCount >= this.maxFailures) {
      this.trip();
    }
  }

  private trip() {
    this.isOpen = true;
    this.lastFailureTime = Date.now();
    console.log(`Circuit breaker is open: ${new Date().toISOString()}`);
  }
}

// Example usage
// Maximum 3 failures within 5 seconds
const circuitBreaker = new CircuitBreaker(3, 5000);

const riskyAction = () => {
  return new Promise((resolve, reject) => {
    // Simulating some risky operation
    const randomNumber = Math.random();
    if (randomNumber < 0.6) {
      resolve("Success!");
    } else {
      reject(new Error("Something went wrong."));
    }
  });
};

// Perform action using the circuit breaker
setInterval(async () => {
  try {
   const result = await circuitBreaker.executeAction(riskyAction);
   console.log(result);
  } catch(error) {
    console.log(error?.message);
  }
}, 100);
```
