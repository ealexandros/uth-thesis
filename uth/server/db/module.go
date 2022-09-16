package db

import (
	"context"
	"github.com/flower-corp/lotusdb"
	"go.uber.org/fx"
)

var Module = fx.Options(
	fx.Provide(
		NewPostgres,
		NewLotus,
	),
	fx.Invoke(func(lc fx.Lifecycle, db *lotusdb.LotusDB) {
		lc.Append(fx.Hook{
			OnStop: func(ctx context.Context) error {
				return db.Close()
			},
		})
	}),
)
