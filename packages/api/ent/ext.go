package ent

import "strings"

func (*Dope) IsSearchResult()    {}
func (*Item) IsSearchResult()    {}
func (*Hustler) IsSearchResult() {}

func (*Dope) IsToken()    {}
func (*Item) IsToken()    {}
func (*Hustler) IsToken() {}

func IsNoRowsInResultSetError(e error) bool {
	// Workaround for https://github.com/ent/ent/issues/2176
	return strings.Contains(e.Error(), "no rows in result set")
}
