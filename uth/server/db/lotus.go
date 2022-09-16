package db

import (
	"github.com/flower-corp/lotusdb"
)

func NewLotus() (*lotusdb.LotusDB, error) {
	return lotusdb.Open(lotusdb.DefaultOptions("lotusdb"))
}
