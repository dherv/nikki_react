export interface ISelection {
  name: string;
  translation: string;
  sentence: string;
  explanation?: string;
  type: "words" | "grammars";
}

export interface IWord {
  text: string;
  translation: string;
  type: "words" | "grammars";
  createdAt: string;
  example: string;
  timesUsed?: number;
}

export interface IDaily {
  id: number;
  title: string;
  userId: number;
  languageId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  words: IWord[];
}
