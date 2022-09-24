package acapy

import (
	"fmt"
	"github.com/ealexandros/digital-story/uth/server/config"
	"github.com/flower-corp/lotusdb"
	"github.com/ldej/go-acapy-client"
	"go.uber.org/fx"
)

func RegisterStudentDegree(a *acapy.Client, db *lotusdb.LotusDB) error {
	existingCredDefID, err := db.Get([]byte("student_degree_cred_def_id"))
	if err != nil {
		return err
	}

	if existingCredDefID != nil {
		return nil
	}

	schemaRes, err := a.RegisterSchema("student_degree", "1.0", []string{"name", "department", "graduation_date"})
	if err != nil {
		return err
	}

	credDefID, err := a.CreateCredentialDefinition("1", false, 0, schemaRes.ID)
	if err != nil {
		return err
	}

	if err := db.Put([]byte("student_degree_cred_def_id"), []byte(credDefID)); err != nil {
		return err
	}

	return nil
}

var Module = fx.Options(
	fx.Provide(New),
	fx.Invoke(RegisterStudentDegree),
)

func New(c config.Config) *acapy.Client {
	return acapy.NewClient(fmt.Sprintf("http://%s:%s", c.AcapyAdminHost, c.AcapyAdminPort))
}
