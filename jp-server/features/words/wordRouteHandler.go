package words

import (
	"fmt"
	"jps/basic/ddd"
	"net/http"
)

type WordRouteHandler struct {
	Repo *ddd.Repository[*Word]
}

func NewWordRouteHandler(repo ddd.Repository[*Word]) WordRouteHandler {
	return WordRouteHandler{
		Repo: &repo,
	}
}

func (handler WordRouteHandler) HandleDelete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HandleDelete Word")
}

func (handler WordRouteHandler) HandleGetSingle(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HandleGetSingle Word")
}

func (handler WordRouteHandler) HandlePost(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HandlePost Word")
}

func (handler WordRouteHandler) HandlePut(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "HandlePut Word")
}
