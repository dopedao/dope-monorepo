package main

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/spf13/pflag"
)

type Item struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

var in = pflag.String("in", "./in", "sprite folder")
var out = pflag.String("out", "./out", "output folder")

func main() {
	f, err := ioutil.ReadFile("./items.json")
	if err != nil {
		log.Fatalf("Reading items: %+v", err) //nolint:gocritic
	}

	var items []Item
	if err := json.Unmarshal(f, &items); err != nil {
		log.Fatalf("Unmarshalling items: %+v", err) //nolint:gocritic
	}

	if err = filepath.Walk(*in, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			fmt.Printf("prevent panic by handling failure accessing a path %q: %v\n", path, err)
			return err
		}

		if !info.IsDir() && filepath.Ext(info.Name()) == ".png" {
			fmt.Printf("visited file or dir: %q\n", path)
			split := strings.SplitN(strings.TrimSuffix(strings.ToLower(info.Name()), "_spritesheet.png"), "_", 4)
			sex := strings.Split(path, "/")[1]
			outPath := filepath.Join(*out, sex)
			if err := os.MkdirAll(outPath, 0755); err != nil {
				log.Fatal(err)
			}

			typ := strings.ToLower(strings.Split(path, "/")[2])

			if typ == "beards" || typ == "hair" {
				if typ == "beards" {
					typ = "beard"
				}

				i, err := strconv.Atoi(split[3])
				if err != nil {
					log.Fatal(err)
				}

				if err := os.MkdirAll(filepath.Join(outPath, typ), 0755); err != nil {
					log.Fatal(err)
				}

				if err := os.Rename(path, filepath.Join(outPath, typ, fmt.Sprintf("%d.png", i))); err != nil {
					log.Fatal(err)
				}
				return nil
			}

			split = strings.Split(split[3], "_")
			normalized := strings.Join(split, " ")

			for _, item := range items {
				if normalized == strings.ToLower(item.Name) {
					if err := os.Rename(path, filepath.Join(outPath, item.ID+".png")); err != nil {
						log.Fatal(err)
					}
					break
				}
			}
		}

		return nil
	}); err != nil {
		log.Fatalf("walking path: %+v", err) //nolint:gocritic
	}
}
