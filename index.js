inspect: () => `Left(${x})`

const isNull =
  value =>
    value === null || value === undefined

export const Just = x => ({
  chain: f => f(x),
  map: f => Just(f(x)),
  fold: f => f(x),
  inspect: () => `Just(${x})`
})

Just.of = x => Just(x)

export const fromNullable = x =>
  (isNull(x) ? Left : Right)(x)

export const Right = x => ({
  of: x => Right(x),

  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  fromNullable,
  inspect: () => `Right(${x})`
})

Right.of = x => Right(x)

export const Left = x => ({
  of: x => Left(x),

  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  fromNullable,
  inspect: () => `Left(${x})`
})

Left.of = x => Left(x)


export const Either = ({
  fromNullable,
  Left,
  Right,
})

export const Maybe = x => ({
  of: x => Maybe(x),
  chain: f => isNull(x) ? Maybe(x) : f(x),
  map: f => isNull(x) ? Maybe(x) : Maybe(f(x)),
  fold: f => f(x),
  else: f => isNull(x) ? f(x) : Maybe(x),
  inspect: () => `Maybe(${x})`
})

Maybe.of = x => Maybe(x)

export const List = x => {
  x.__proto__.head = () => (x || []).slice(0, 1);
  x.__proto__.tail = () => (x || [0]).slice(1);
  x.__proto__.fold = f => isNull(f) ? x.slice(0, 1) : f(x.slice(0, 1));
  return x
}

Array.of = x => Array(x)
