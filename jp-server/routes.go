package main

import (
	"encoding/json"
	"jps/basic/ddd"
	"jps/basic/httpx"
	"jps/features/words"
	"net/http"
	"strconv"
)

const apiVersion = 1

func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        // Handle preflight requests
        if r.Method == http.MethodOptions {
            return
        }

        next.ServeHTTP(w, r)
    })
}

func (api *api) route() *http.ServeMux {
	mux := http.NewServeMux()

	prefix := "/api/v" + strconv.Itoa(apiVersion)

	mux.HandleFunc(prefix+"/healthcheck", api.healthCheck)

	wordsRepo := ddd.NewMemoRepository[*words.Word](nil)
	wordArr := words.LoadWanikaniWords()
	for _, word := range wordArr {
		wordsRepo.Add(&word)
	}

	httpx.HandleRequests(mux, prefix+"/words", words.NewWordRouteHandler(&wordsRepo))

	return mux
}

func (api *api) healthCheck(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
		return
	}

	data := map[string]string{
		"status":      "available",
		"environment": api.config.env,
		"version":     version,
	}

	js, err := json.MarshalIndent(data, "", "\t")
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	js = append(js, '\n')

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}
