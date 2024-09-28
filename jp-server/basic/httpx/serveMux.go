package httpx

import (
	"net/http"
)

type RouteHandler interface {
	HandlePost(w http.ResponseWriter, r *http.Request)
	HandleGetSingle(w http.ResponseWriter, r *http.Request)
	HandleGetMany(w http.ResponseWriter, r *http.Request)
	HandlePut(w http.ResponseWriter, r *http.Request)
	HandleDelete(w http.ResponseWriter, r *http.Request)
}

func enableCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func HandleRequests(mux *http.ServeMux, resourcePath string, handler RouteHandler) {
	mux.HandleFunc(
		resourcePath,
		func(w http.ResponseWriter, r *http.Request) { 
			enableCORS(w, r)
			getOrCreateResourceHandler(w, r, handler) 
		})

	mux.HandleFunc(
		resourcePath+"/",
		func(w http.ResponseWriter, r *http.Request) { 
			enableCORS(w, r)
			getUpdateOrDeleteResourceHandler(w, r, handler) 
		})
}

func getOrCreateResourceHandler(w http.ResponseWriter, r *http.Request, handler RouteHandler) {
	switch r.Method {
	case http.MethodGet:
		handler.HandleGetMany(w, r)
	case http.MethodPost:
		handler.HandlePost(w, r)
	default:
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}

func getUpdateOrDeleteResourceHandler(w http.ResponseWriter, r *http.Request, handler RouteHandler) {
	switch r.Method {
	case http.MethodGet:
		handler.HandleGetSingle(w, r)
	case http.MethodPut:
		handler.HandlePut(w, r)
	case http.MethodDelete:
		handler.HandleDelete(w, r)
	default:
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}
