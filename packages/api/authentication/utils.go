package authentication

import (
	"errors"
	"os"
	"path/filepath"
)

func SessionExists(s_path string, sid string) bool {
	path := filepath.Join(s_path, "session_"+sid)

	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		return false
	}

	return true
}
