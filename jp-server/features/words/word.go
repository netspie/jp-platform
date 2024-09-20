package words

import "time"

type Collection struct {
	Object        string       `json:"object"`
	URL           string       `json:"url"`
	Pages         Pages        `json:"pages"`
	TotalCount    int          `json:"total_count"`
	DataUpdatedAt time.Time    `json:"data_updated_at"`
	Data          []Vocabulary `json:"data"`
}

type Pages struct {
	PerPage     int     `json:"per_page"`
	NextURL     string  `json:"next_url"`
	PreviousURL *string `json:"previous_url"` // Nullable field
}

type Vocabulary struct {
	ID            int       `json:"id"`
	Object        string    `json:"object"`
	URL           string    `json:"url"`
	DataUpdatedAt time.Time `json:"data_updated_at"`
	Data          Word      `json:"data"`
}

type Word struct {
	CreatedAt           time.Time            `json:"created_at"`
	Level               int                  `json:"level"`
	Slug                string               `json:"slug"`
	HiddenAt            *time.Time           `json:"hidden_at"` // Nullable field
	DocumentURL         string               `json:"document_url"`
	Characters          string               `json:"characters"`
	Meanings            []Meaning            `json:"meanings"`
	AuxiliaryMeanings   []AuxiliaryMeaning   `json:"auxiliary_meanings"`
	Readings            []Reading            `json:"readings"`
	PartsOfSpeech       []string             `json:"parts_of_speech"`
	ComponentSubjectIDs []int                `json:"component_subject_ids"`
	MeaningMnemonic     string               `json:"meaning_mnemonic"`
	ReadingMnemonic     string               `json:"reading_mnemonic"`
	ContextSentences    []ContextSentence    `json:"context_sentences"`
	PronunciationAudios []PronunciationAudio `json:"pronunciation_audios"`
	LessonPosition      int                  `json:"lesson_position"`
	SRSID               int                  `json:"spaced_repetition_system_id"`
}

func (word *Word) GetId() string {
	return word.Slug
}

type Meaning struct {
	Meaning        string `json:"meaning"`
	Primary        bool   `json:"primary"`
	AcceptedAnswer bool   `json:"accepted_answer"`
}

type AuxiliaryMeaning struct {
	Type    string `json:"type"`
	Meaning string `json:"meaning"`
}

type Reading struct {
	Primary        bool   `json:"primary"`
	Reading        string `json:"reading"`
	AcceptedAnswer bool   `json:"accepted_answer"`
}

type ContextSentence struct {
	English  string `json:"en"`
	Japanese string `json:"ja"`
}

type PronunciationAudio struct {
	URL         string        `json:"url"`
	Metadata    AudioMetadata `json:"metadata"`
	ContentType string        `json:"content_type"`
}

type AudioMetadata struct {
	Gender           string `json:"gender"`
	SourceID         int    `json:"source_id"`
	Pronunciation    string `json:"pronunciation"`
	VoiceActorID     int    `json:"voice_actor_id"`
	VoiceActorName   string `json:"voice_actor_name"`
	VoiceDescription string `json:"voice_description"`
}
