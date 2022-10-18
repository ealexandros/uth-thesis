package services

import (
	"github.com/ldej/go-acapy-client"
	"github.com/pkg/errors"
	"strings"
)

type Presentations struct {
	a *acapy.Client
}

func (s *Presentations) SendPresentationRequest(connID string, schemaID string, issuerDID string, attrs []string) error {
	reqAttrs := map[string]acapy.RequestedAttribute{}
	for _, a := range attrs {
		reqAttrs[a] = acapy.RequestedAttribute{
			Restrictions: []acapy.Restrictions{{SchemaID: schemaID, IssuerDID: issuerDID}},
			Name:         a,
		}
	}

	_, err := s.a.SendPresentationRequest(acapy.PresentationRequestRequest{
		ConnectionID: connID,
		ProofRequest: acapy.NewProofRequest(
			"Degree proof",
			"1234567890",
			map[string]acapy.RequestedPredicate{},
			reqAttrs,
			"1.0",
			nil,
		),
	})

	return err
}

func (s *Presentations) GetPresentationRecords(role string) ([]PresentationRecord, error) {
	switch role {
	case "prover":
		return s.getPresentationRecords(func(a acapy.PresentationExchangeRecord) bool {
			return a.Role == "prover"
		})
	case "verifier":
		return s.getPresentationRecords(func(a acapy.PresentationExchangeRecord) bool {
			return a.Role == "verifier"
		})
	default:
		return s.getPresentationRecords(func(_ acapy.PresentationExchangeRecord) bool {
			return true
		})
	}
}

func (s *Presentations) getPresentationRecords(filter func(a acapy.PresentationExchangeRecord) bool) ([]PresentationRecord, error) {
	presentations, err := s.a.QueryPresentationExchange(acapy.QueryPresentationExchangeParams{})
	if err != nil {
		return nil, err
	}

	res := make([]PresentationRecord, 0)
	for _, p := range presentations {
		if !filter(p) {
			continue
		}

		conn, err := s.a.GetConnection(p.ConnectionID)
		if err != nil {
			return nil, err
		}

		reqAttrs := map[string]string{}
		for attr, val := range p.Presentation.RequestedProof.RevealedAttrs {
			reqAttrs[attr] = val.Raw
		}

		var revAttrs []string
		for attr := range p.PresentationRequest.RequestedAttributes {
			revAttrs = append(revAttrs, attr)
		}

		res = append(res, PresentationRecord{
			State:          p.State,
			Role:           p.Role,
			Label:          conn.TheirLabel,
			PresExchangeID: p.PresentationExchangeID,
			RevAttrs:       reqAttrs,
			ReqAttrs:       revAttrs,
			ErrMsg:         s.parseErrMsg(p.ErrorMsg),
		})
	}
	return res, nil

}

func (s *Presentations) SendPresentationProof(preID string) error {
	presRecord, err := s.a.GetPresentationExchangeByID(preID)
	if err != nil {
		return err
	}

	matchedCredIDs := map[string]string{}
	for _, reqAttr := range presRecord.PresentationRequest.RequestedAttributes {
		for _, r := range reqAttr.Restrictions {
			creds, err := s.a.GetCredentials(10, 0, "")
			if err != nil {
				return err
			}
			for _, cred := range creds {
				if cred.SchemaID == r.SchemaID {
					matchedCredIDs[reqAttr.Name] = cred.Referent
				}
			}
		}
	}

	nameCredID, ok := matchedCredIDs["name"]
	if !ok {
		return errors.New("credential with name attribute not found")
	}
	departmentCredID, ok := matchedCredIDs["department"]
	if !ok {
		return errors.New("credentail with department attribute not found")
	}

	_, err = s.a.SendPresentationByID(preID, acapy.PresentationProof{
		RequestedAttributes: map[string]acapy.PresentationProofAttribute{
			"name": acapy.PresentationProofAttribute{
				CredentialID: nameCredID,
				Revealed:     true,
			},
			"department": acapy.PresentationProofAttribute{
				Revealed:     true,
				CredentialID: departmentCredID,
			},
		},
		RequestedPredicates:    map[string]acapy.PresentationProofPredicate{},
		SelfAttestedAttributes: map[string]string{},
		Trace:                  false,
	})

	return err

}

func (s *Presentations) RejectPresentationRecord(preID string) error {
	return s.a.SendPresentationProblemReportForID(preID, "John has rejected the request")
}

// parseErrMsg is a dummy way to parse messages, it should be replaced
// by proper status codes
func (s *Presentations) parseErrMsg(msg string) string {
	splits := strings.Split(msg, ":")
	if len(splits) < 2 {
		return msg
	}

	trimmed := strings.TrimSpace(splits[1])
	// indicates that no error message has been posted
	if trimmed == "abandoned" {
		return "Invalid schema or issuer ID"

	}

	return trimmed
}

func NewPresentations(a *acapy.Client) *Presentations {
	return &Presentations{a: a}
}
