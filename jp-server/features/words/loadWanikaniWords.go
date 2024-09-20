package words

import (
	"embed"
	"encoding/json"
	"log"
)

//go:embed files/*.txt
var vocabFiles embed.FS

func LoadWanikaniWords() []Word {
	var vocabData []Word

	files, err := vocabFiles.ReadDir("files")
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if !file.IsDir() {
			data, err := vocabFiles.ReadFile("files/" + file.Name())
			if err != nil {
				log.Fatal(err)
			}

			var collection Collection
			err = json.Unmarshal(data, &collection)
			if err != nil {
				log.Fatal(err)
			}

			for _, word := range collection.Data {
				vocabData = append(vocabData, word.Data)
			}
		}
	}

	return vocabData
}
