package alchemy

import (
	"bytes"
	"io"
	"log"
	"net/http"
)

func MakeGetRequest(url string) []byte {
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("accept", "application/json")

	res, requestErr := http.DefaultClient.Do(req)
	if requestErr != nil {
		log.Fatal("GET Request Error: ", requestErr)
	}
	defer res.Body.Close()

	body, readErr := io.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal("GET Read Error: ", readErr)
	}
	return body
}

func MakePostRequest(url string, payload []byte) []byte {
	req, _ := http.NewRequest("POST", url, bytes.NewReader(payload))
	req.Header.Add("accept", "application/json")
	req.Header.Add("content-type", "application/json")

	res, requestErr := http.DefaultClient.Do(req)
	if requestErr != nil {
		log.Fatal("POST Request Error: ", requestErr)
	}
	defer res.Body.Close()

	body, readErr := io.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal("POST Read Error: ", readErr)
	}
	return body
}
