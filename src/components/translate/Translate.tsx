import React, { useState, FC, useEffect } from "react";
import Api from "../../api/Api";

const Translate: FC<{
  addToTextAndSelection: (source: string, target: string) => void;
  addToSelection: (source: string, target: string) => void;
  selection?: string;
}> = ({ selection, addToTextAndSelection, addToSelection }) => {
  const [sourceLanguage, setSourceLanguage] = useState<string>();
  const [targetLanguage, setTargetLanguage] = useState<string>();
  const [translationInProgress, setTranslationInProgess] = useState<boolean>(
    false
  );

  useEffect(() => {
    setTargetLanguage(selection);
    setSourceLanguage("");
    setTranslationInProgess(false);
  }, [selection]);

  const handleTranslate = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTranslationInProgess(true);
    const translationWay = {
      text: selection ? targetLanguage : sourceLanguage,
      sourceLanguageCode: selection ? "no" : "en",
      targetLanguageCode: selection ? "en" : "no"
    };
    Api.post("/translate", {
      ...translationWay
    }).then(({ translation }) =>
      selection
        ? setSourceLanguage(translation)
        : setTargetLanguage(translation)
    );
  };

  return (
    <form>
      <label>English</label>
      <textarea
        name="source"
        value={sourceLanguage}
        disabled={!!selection}
        onChange={({ target }) => setSourceLanguage(target.value)}
      ></textarea>
      <label>Norwegian</label>
      <textarea
        name="target"
        value={targetLanguage}
        disabled={!!sourceLanguage}
        onChange={({ target }) => setTargetLanguage(target.value)}
      ></textarea>
      {!translationInProgress ? (
        <button type="button" onClick={event => handleTranslate(event)}>
          translate
        </button>
      ) : (
        <>
          {!selection && (
            <button
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                if (sourceLanguage && targetLanguage) {
                  const source = targetLanguage;
                  const target = sourceLanguage;
                  return addToTextAndSelection(source, target);
                }
              }}
            >
              add to text and selection
            </button>
          )}
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              if (sourceLanguage && targetLanguage) {
                const source = selection ? targetLanguage : sourceLanguage;
                const target = selection ? sourceLanguage : targetLanguage;
                return addToSelection(source, target);
              }
              return;
            }}
          >
            add to selection only
          </button>
        </>
      )}
    </form>
  );
};

export default Translate;
