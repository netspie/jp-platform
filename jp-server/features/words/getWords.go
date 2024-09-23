package words

import (
	"fmt"
	"jps/basic/ddd"
	"jps/basic/httpx"
	"net/http"
)

func (handler WordRouteHandler) HandleGetMany(w http.ResponseWriter, r *http.Request) {
	res := HandleGetWordsQuery(GetWordsQuery{}, handler.Repo)
	httpx.WriteResponse(res, w)
}

type GetWordsQuery struct{}

func HandleGetWordsQuery(
	q GetWordsQuery,
	r *ddd.Repository[*Word]) []*Word {

	items, _ := (*r).GetMany()
	fmt.Println("GetWordsQuery")
	return items[:min(len(items), 100)]
}
