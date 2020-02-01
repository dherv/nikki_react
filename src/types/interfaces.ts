export interface ISelection {
  text: string;
  translation: string;
  example?: string;
  explanation?: string;
}

export interface IWord {
  id: number;
  text: string;
  translation: string;
  example: string;
  timesUsed?: number;
  createdAt: string;
  updatedAt: string;
  type: "words" | "grammars";
}

export interface IGrammar {
  id: number;
  text: string;
  translation: string;
  explanation?: string;
  example: string;
  dailyId: number;
  createdAt: string;
  updatedAt: string;
  type: "words" | "grammars";
}

export interface IDaily {
  id: number;
  userId: number;
  languageId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  words: IWord[];
  grammars: IGrammar[];
}
