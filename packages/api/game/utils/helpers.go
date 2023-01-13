package utils

import "time"

func NowInUnixMillis() int64 {
	return time.Now().UnixNano() / int64(time.Millisecond)
}
