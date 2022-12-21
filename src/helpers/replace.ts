// Quais Props da tipagem original irá ser subsitituida

export type Replace<T, R> = Omit<T, keyof R> & R;
