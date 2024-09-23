import { Linking, Pressable, Text, View } from "react-native";
import { fetchWords, Word } from "./FetchWords";
import { useEffect, useState } from "react";

type WordListProps = {};

export function WordList(props: WordListProps) {
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    fetchWords().then(setWords);
  }, []);

  return (
    <View>
      {words?.slice(0, 50).map((word, i) => (
        <WordItem key={i} word={word} />
      ))}
    </View>
  );
}

type WordItemProps = {
  word: Word;
};

export function WordItem(props: WordItemProps) {
  const { word } = props;

  return (
    <View className="p-4 rounded-lg w-fit">
      <View className="w-full h-[1px] bg-gray-700 mb-6" />
      <Text className="text-4xl font-bold">{word.slug}</Text>
      <View className="flex flex-row justify-between gap-3 mb-5">
        <View className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <Text className="text-gray-500 font-bold">Meaning</Text>
          <Text className="font-normal">
            {/* {word.meanings.map((m) => m.meaning).join(", ")} */}
            {word.meanings[0].meaning}
          </Text>
        </View>
        <View className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <Text className="text-gray-500 font-bold">Reading</Text>
          <Text className="font-normal">
            {/* {word.readings.map((r) => r.reading).join(", ")} */}
            {word.readings[0].reading}
          </Text>
        </View>
        <View className="w-1/4 flex flex-col text-sm font-semibold pt-2">
          <Text className="text-gray-500 font-bold">Speech</Text>
          <Text className="font-normal">
            {/* {word.parts_of_speech.join(", ")} */}
            {uppercaseFirstChar(word.parts_of_speech[0])}
          </Text>
        </View>
        {/* <Text className="text-sm font-semibold">
        Lesson Position:{" "}
        <Text className="font-normal">{word.lesson_position}</Text>
      </Text> */}
        {/* <Text className="text-sm font-semibold">
        Meaning Mnemonic:{" "}
        <Text className="font-normal">{word.meaning_mnemonic}</Text>
      </Text> */}
        {/* <Text className="text-sm font-semibold">
        Reading Mnemonic:{" "}
        <Text className="font-normal">{word.reading_mnemonic}</Text>
      </Text> */}
      </View>
      <Pressable onPress={() => Linking.openURL(word.document_url)}>
        <Text className="text-sm font-semibold text-blue-500 underline">
          Wanikani
        </Text>
      </Pressable>
    </View>
  );
}

function uppercaseFirstChar(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
