import { Link } from "react-router-dom";
import { fetchWords, Word } from "./FetchWords";
import { useEffect, useState } from "react";

type WordListProps = {};

export function WordList(props: WordListProps) {
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    fetchWords().then(setWords).catch(console.log);
    console.log("What up!");
  }, []);

  return (
    <div className="flex flex-col items-center">
      {words?.slice(0, 50).map((word, i) => (
        <WordItem key={i} word={word} />
      ))}
    </div>
  );
}

type WordItemProps = {
  word: Word;
};

export function WordItem(props: WordItemProps) {
  const { word } = props;

  return (
    <div className="p-4 rounded-lg w-full">
      <div className="w-full h-[1px] bg-gray-700 mb-6" />
      <h2 className="text-4xl font-bold">{word.slug}</h2>
      <div className="flex flex-row justify-between gap-3 mb-5">
        <div className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <h3 className="text-gray-500 font-bold">Meaning</h3>
          <h3 className="font-normal">
            {/* {word.meanings.map((m) => m.meaning).join(", ")} */}
            {word.meanings[0].meaning}
          </h3>
        </div>
        <div className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <h3 className="text-gray-500 font-bold">Reading</h3>
          <h3 className="font-normal">
            {/* {word.readings.map((r) => r.reading).join(", ")} */}
            {word.readings[0].reading}
          </h3>
        </div>
        <div className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <h3 className="text-gray-500 font-bold">Speech</h3>
          <h3 className="font-normal">
            {/* {word.parts_of_speech.join(", ")} */}
            {uppercaseFirstChar(word.parts_of_speech[0])}
          </h3>
        </div>
        {/* <h3 className="text-sm font-semibold">
        Lesson Position:{" "}
        <h3 className="font-normal">{word.lesson_position}</h3>
      </h3> */}
        {/* <h3 className="text-sm font-semibold">
        Meaning Mnemonic:{" "}
        <h3 className="font-normal">{word.meaning_mnemonic}</h3>
      </h3> */}
        {/* <h3 className="text-sm font-semibold">
        Reading Mnemonic:{" "}
        <h3 className="font-normal">{word.reading_mnemonic}</h3>
      </h3> */}
      </div>
      <Link
        to={word.document_url}
        className="text-sm font-semibold text-blue-500 underline"
      >
        Wanikani
      </Link>
    </div>
  );
}

function uppercaseFirstChar(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
