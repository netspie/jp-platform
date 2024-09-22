import { Linking, Pressable, Text, View } from "react-native";
import { fetchWords, Word } from "./FetchWords";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

type WordListProps = {};

export function WordList(props: WordListProps) {
  const [words, setWords] = useState<Word[] | null>(null);

  useEffect(() => {
    fetchWords().then(setWords);
  }, []);

  return (
    <Stack>
      {words?.map((word) => (
        <WordItem word={word} />
      ))}
    </Stack>
  );
}

type WordItemProps = {
  word: Word;
};

export function WordItem(props: WordItemProps) {
  const { word } = props;

  return (
    <View className="p-4 mb-3 bg-gray-100 rounded-lg border border-gray-300">
      <Text className="text-xl font-bold mb-2">{word.characters}</Text>

      <Text className="text-sm font-semibold">
        Slug: <Text className="font-normal">{word.slug}</Text>
      </Text>
      <Text className="text-sm font-semibold">
        Level: <Text className="font-normal">{word.level}</Text>
      </Text>
      <Text className="text-sm font-semibold">
        Created At:{" "}
        <Text className="font-normal">
          {new Date(word.created_at).toLocaleDateString()}
        </Text>
      </Text>

      {word.hidden_at && (
        <Text className="text-sm font-semibold">
          Hidden At:{" "}
          <Text className="font-normal">
            {new Date(word.hidden_at).toLocaleDateString()}
          </Text>
        </Text>
      )}

      <Pressable onPress={() => Linking.openURL(word.document_url)}>
        <Text className="text-sm font-semibold text-blue-500 underline">
          Document URL
        </Text>
      </Pressable>

      <Text className="text-sm font-semibold">
        Meanings:{" "}
        <Text className="font-normal">
          {word.meanings.map((m) => m.meaning).join(", ")}
        </Text>
      </Text>
      <Text className="text-sm font-semibold">
        Readings:{" "}
        <Text className="font-normal">
          {word.readings.map((r) => r.reading).join(", ")}
        </Text>
      </Text>
      <Text className="text-sm font-semibold">
        Parts of Speech:{" "}
        <Text className="font-normal">{word.parts_of_speech.join(", ")}</Text>
      </Text>
      <Text className="text-sm font-semibold">
        Lesson Position:{" "}
        <Text className="font-normal">{word.lesson_position}</Text>
      </Text>
      <Text className="text-sm font-semibold">
        Meaning Mnemonic:{" "}
        <Text className="font-normal">{word.meaning_mnemonic}</Text>
      </Text>
      <Text className="text-sm font-semibold">
        Reading Mnemonic:{" "}
        <Text className="font-normal">{word.reading_mnemonic}</Text>
      </Text>
    </View>
  );
}
