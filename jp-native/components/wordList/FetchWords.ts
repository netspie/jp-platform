export async function fetchWords(): Promise<Word[]> {
  const url = "localhost:4000/api/v1/words";

  const res = await fetch(url);
  return await res.json();
}

export type Word = {
  created_at: Date;
  level: number;
  slug: string;
  hidden_at?: Date | null; // Nullable field
  document_url: string;
  characters: string;
  meanings: Meaning[];
  auxiliary_meanings: AuxiliaryMeaning[];
  readings: Reading[];
  parts_of_speech: string[];
  component_subject_ids: number[];
  meaning_mnemonic: string;
  reading_mnemonic: string;
  context_sentences: ContextSentence[];
  pronunciation_audios: PronunciationAudio[];
  lesson_position: number;
  spaced_repetition_system_id: number;
};

type Meaning = {
  meaning: string;
  primary: boolean;
  accepted_answer: boolean;
};

type AuxiliaryMeaning = {
  type: string;
  meaning: string;
};

type Reading = {
  primary: boolean;
  reading: string;
  accepted_answer: boolean;
};

type ContextSentence = {
  en: string;
  ja: string;
};

type PronunciationAudio = {
  url: string;
  metadata: AudioMetadata;
  content_type: string;
};

type AudioMetadata = {
  gender: string;
  source_id: number;
  pronunciation: string;
  voice_actor_id: number;
  voice_actor_name: string;
  voice_description: string;
};
