package words

import (
	"jps/basic/ddd"
	"jps/basic/httpx"
	"net/http"
)

func (handler WordRouteHandler) HandleGetMany(w http.ResponseWriter, r *http.Request) {
	res := HandleGetSubmitQuestionsQuery(GetWordsQuery{}, handler.Repo)
	httpx.WriteResponse(res, w)
}

type GetWordsQuery struct{}

func HandleGetSubmitQuestionsQuery(
	q GetWordsQuery,
	r *ddd.Repository[*Word]) []*Word {

	items, _ := (*r).GetMany()
	return items[:min(len(items), 1000)]
}
