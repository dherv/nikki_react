export interface ISelection {
  name: string;
  translation: string;
  sentence: string;
  explanation?: string;
  type: "words" | "grammars";
}

export interface IWord {
  id: number;
  text: string;
  translation: string;
  example: string;
  timesUsed?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGrammar {
  id: number;
  text: string;
  translation: string;
  explanation: string;
  example: string;
  dailyId: number;
  createdAt: string;
  updatedAt: string;
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
