package acapy

import (
	"github.com/flower-corp/lotusdb"
	"github.com/ldej/go-acapy-client"
	"go.uber.org/fx"
)

func RegisterStudentPass(a *acapy.Client, db *lotusdb.LotusDB) error {
	existingCredDefID, err := db.Get([]byte("student_pass_cred_def_id"))
	if err != nil {
		return err
	}

	if existingCredDefID != nil {
		return nil
	}

	schemaRes, err := a.RegisterSchema("student_pass", "1.0", []string{"name", "department"})
	if err != nil {
		return err
	}

	credDefID, err := a.CreateCredentialDefinition("1", false, 0, schemaRes.ID)
	if err != nil {
		return err
	}

	if err := db.Put([]byte("student_pass_cred_def_id"), []byte(credDefID)); err != nil {
		return err
	}

	return nil
}

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
	fx.Invoke(RegisterStudentPass, RegisterStudentDegree),
)

func New() *acapy.Client {
	return acapy.NewClient("http://localhost:8010")
}
