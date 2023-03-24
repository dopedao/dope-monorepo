package utils

import "time"

func NowInUnixMillis() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}

func Contains(haystack []string, needle string) bool {
	for i := range haystack {
		if haystack[i] == needle {
			return true
		}
	}

	return false
}
