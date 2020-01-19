export interface ISelection {
  name: string;
  translation: string;
  sentence: string;
  explanation?: string;
  type: "words" | "grammars";
}

export interface IWord {
  name: string;
  translation: string;
  type: "words" | "grammars";
  createdAt: string;
  example: string;
  timesUsed: number;
}

export interface IDaily {
  name: string;
  createdAt: string;
  text: string;
  words: IWord[];
}
