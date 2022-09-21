package services

import (
	"github.com/ldej/go-acapy-client"
	"github.com/pkg/errors"
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
		})
	}
	return res, nil

}

func (s *Presentations) SendPresentationProof(preID string, revAttrs []string) error {
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

	reqAttrs := map[string]acapy.PresentationProofAttribute{}
	for _, revAttr := range revAttrs {
		credID, ok := matchedCredIDs[revAttr]
		if !ok {
			return errors.New("no credential found that satisfy the restriction of the requested presentation")
		}
		reqAttrs[revAttr] = acapy.PresentationProofAttribute{
			Revealed:     true,
			CredentialID: credID,
		}

	}

	_, err = s.a.SendPresentationByID(preID, acapy.PresentationProof{
		RequestedAttributes:    reqAttrs,
		RequestedPredicates:    map[string]acapy.PresentationProofPredicate{},
		SelfAttestedAttributes: map[string]string{},
		Trace:                  false,
	})

	return err

}

func (s *Presentations) DeletePresentationRecord(preID string) error {
	return s.a.RemovePresentationExchangeByID(preID)
}

func NewPresentations(a *acapy.Client) *Presentations {
	return &Presentations{a: a}
}
