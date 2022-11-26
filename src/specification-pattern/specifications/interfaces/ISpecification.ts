export interface ISpecification<T> {
  IsSatisfiedBy(candidate: T): boolean;
}
