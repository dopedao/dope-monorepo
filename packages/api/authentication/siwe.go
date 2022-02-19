package authentication

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"
)

const DOMAIN = "(?<domain>([^?#]*)) wants you to sign in with your Ethereum account:"
const ADDRESS = "\\n(?<address>0x[a-zA-Z0-9]{40})\\n\\n"
const STATEMENT = "((?<statement>[^\\n]+)\\n)?"
const URI = "(([^:?#]+):)?(([^?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))"

var URI_LINE = fmt.Sprintf("\\nURI: (?<uri>%s?)", URI)

const VERSION = "\\nVersion: (?<version>1)"
const CHAIN_ID = "\\nChain ID: (?<chainId>[0-9]+)"
const NONCE = "\\nNonce: (?<nonce>[a-zA-Z0-9]{8,})"
const DATETIME = `([0-9]+)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])[Tt]([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(([Zz])|([\+|\-]([01][0-9]|2[0-3]):[0-5][0-9]))`

var ISSUED_AT = fmt.Sprintf("(\\nIssued at: (?<issuedAt>%s)", DATETIME)
var EXPIRATION_TIME = fmt.Sprintf("(\\nExpiration Time: (?<expirationTime>%s))", DATETIME)
var NOT_BEFORE = fmt.Sprintf("(\\nNot Before: (?<notBefore>%s))", DATETIME)

const REQUEST_ID = "(\\nRequest ID: (?<requestId>[-._~!$&'()*+,;=:@%a-zA-Z0-9]*))?"

var RESOURCES = fmt.Sprintf("(\\nResources:(?<resources>(\\n- %s?)+))", URI)

var MESSAGE = fmt.Sprintf(`^%s%s%s%s%s%s%s%s%s%s%s%s$`, DOMAIN, ADDRESS, STATEMENT, URI_LINE, VERSION, CHAIN_ID, NONCE, ISSUED_AT, EXPIRATION_TIME, NOT_BEFORE, REQUEST_ID, RESOURCES)

type SiweMessage struct {
	Domain         string
	Address        string
	Statement      string
	URI            string
	Version        string
	ChainId        string
	Nonce          string
	IssuedAt       string
	ExpirationTime string
	NotBefore      string
	RequestId      string
	Resources      []string
}

func (m *SiweMessage) ToMessage() string {
	header := fmt.Sprintf("%s wants you to sign in with your Ethereum account:", m.Domain)
	uriField := fmt.Sprintf("URI: %s", m.URI)
	prefix := fmt.Sprintf("%s\n%s", header, m.Address)
	versionField := fmt.Sprintf("Version: %s", m.Version)

	if m.Nonce == "" {
		m.Nonce = string(Bytes(22))
	}
	if m.IssuedAt == "" {
		m.IssuedAt = time.Now().Format(time.RFC3339)
	}

	chainField := ""
	if m.ChainId != "" {
		chainField = fmt.Sprintf("Chain ID: %s", m.ChainId)
	} else {
		chainField = "Chain ID: 1"
	}

	nonceField := fmt.Sprintf("Nonce: %s", m.Nonce)

	suffixArray := []string{
		uriField,
		versionField,
		chainField,
		nonceField,
	}

	suffixArray = append(suffixArray, fmt.Sprintf("Issued At: %s", m.IssuedAt))

	if m.ExpirationTime != "" {
		suffixArray = append(suffixArray, fmt.Sprintf("Expiration Time: %s", m.ExpirationTime))
	}
	if m.NotBefore != "" {
		suffixArray = append(suffixArray, fmt.Sprintf("Not Before: %s", m.NotBefore))
	}
	if m.RequestId != "" {
		suffixArray = append(suffixArray, fmt.Sprintf("Request ID: %s", m.RequestId))
	}

	if len(m.Resources) > 0 {
		resources := []string{}
		for _, resource := range m.Resources {
			resources = append(resources, fmt.Sprintf("- %s", resource))
		}
		suffixArray = append(suffixArray, fmt.Sprintf("Resources:\n%s", strings.Join(resources, "\n")))
	}

	suffix := strings.Join(suffixArray, "\n")
	prefix = fmt.Sprintf("%s\n\n%s", prefix, m.Statement)

	if m.Statement != "" {
		prefix = fmt.Sprintf("%s\n", prefix)
	}

	return fmt.Sprintf("%s\n%s", prefix, suffix)
}

func (m *SiweMessage) Validate(signature string) bool {
	// TODO: try serialize message and return
	// false if it fails
	if m.Address == "" {
		return false
	}

	return true
}

func ParseMessage(message string) (*SiweMessage, error) {
	re := regexp.MustCompile(MESSAGE)
	matches := re.FindStringSubmatch(message)
	if len(matches) == 0 {
		return nil, errors.New("could not parse message")
	}

	parsedMessage := SiweMessage{
		Domain:         matches[1],
		Address:        matches[2],
		Statement:      matches[3],
		URI:            matches[4],
		Version:        matches[5],
		ChainId:        matches[6],
		Nonce:          matches[7],
		IssuedAt:       matches[8],
		ExpirationTime: matches[9],
		NotBefore:      matches[10],
		RequestId:      matches[11],
	}

	if len(matches[12]) > 0 {
		parsedMessage.Resources = strings.Split(matches[12], "\n- ")
	}

	return &parsedMessage, nil
}
