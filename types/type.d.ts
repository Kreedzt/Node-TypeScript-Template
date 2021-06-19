interface CT {
  a: string;
}

type ES = {
  es: string
};

type fn = (a: string) => string;
type Dict<T = any> = Record<string, T>;