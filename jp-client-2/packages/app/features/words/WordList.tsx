import { Linking, Pressable, Text, View } from 'react-native'
import { fetchWords, Word } from './FetchWords'
import { useEffect, useState } from 'react'

type WordListProps = {}

export function WordList(props: WordListProps) {
  const [words, setWords] = useState<Word[] | null>(null)

  useEffect(() => {
    fetchWords().then(setWords)
  }, [])

  return (
    <View>
      {words?.slice(0, 50).map((word, i) => <WordItem key={i} word={word} />)}
    </View>
  )
}

type WordItemProps = {
  word: Word
}

export function WordItem(props: WordItemProps) {
  const { word } = props

  return (
    <View className="w-fit rounded-lg p-4">
      <View className="mb-6 h-[1px] w-full bg-gray-700" />
      <Text className="text-4xl font-bold">{word.slug}</Text>
      <View className="mb-5 flex flex-row justify-between gap-3">
        <View className="flex w-1/4 flex-col pt-2 text-sm font-semibold">
          <Text className="font-bold text-gray-500">Meaning</Text>
          <Text className="font-normal">
            {/* {word.meanings.map((m) => m.meaning).join(", ")} */}
            {word.meanings[0]?.meaning}
          </Text>
        </View>
        <View className="flex w-1/4 flex-col pt-2 text-sm font-semibold">
          <Text className="font-bold text-gray-500">Reading</Text>
          <Text className="font-normal">
            {/* {word.readings.map((r) => r.reading).join(", ")} */}
            {word.readings[0]?.reading}
          </Text>
        </View>
        <View className="flex w-1/4 flex-col pt-2 text-sm font-semibold">
          <Text className="font-bold text-gray-500">Speech</Text>
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
  )
}

function uppercaseFirstChar(str: string | undefined): string {
  if (str === undefined || !str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
