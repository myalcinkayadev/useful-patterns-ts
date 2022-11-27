import { ISpecification } from '../specifications';
import { Character } from './character';

export class CharacterFilter {
  executeSpecification(
    characters: Character[],
    spec: ISpecification<Character>,
  ) {
    return characters.filter((character) => spec.IsSatisfiedBy(character));
  }
}
