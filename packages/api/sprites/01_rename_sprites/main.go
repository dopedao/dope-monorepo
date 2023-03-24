// Renames ITEM, HAIR, and BEARD sprite files from animation team
// into a format that maps to IDS in our PGSQL Database.
//
// Output files can can be used for generating sprite sheets
// on our API when matched with traits from a Hustler.
//
// Some images are incorrectly named and need to be renamed,
// some duplicate items don't have a sprite in the provided files so
// need to be manually duplicated, items with "nothing" like barefoot
// need to be manually created from the transparent layer.
//

// ** EXPECTED FILE STRUCTURE + FORMAT **
// Inside the same directory of this file you should have the following:
// ./in
// 		/male
//    /female
//
// Sprite sheets from team are in format of "DW_F_Clothes_Basketball_Jersey_Spritesheet.png"
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

// Read stored solidity IDs of Hustlers traits
func readJsonItemIds() []Item {
	f, err := ioutil.ReadFile("./items.json")
	if err != nil {
		log.Fatalf("Reading items: %+v", err) //nolint:gocritic
	}

	var items []Item
	if err := json.Unmarshal(f, &items); err != nil {
		log.Fatalf("Unmarshalling items: %+v", err) //nolint:gocritic
	}
	return items
}

var in = pflag.String("in", "./in", "sprite folder")
var out = pflag.String("out", "./out", "output folder")
var items = readJsonItemIds()

func main() {
	err := filepath.Walk(*in, func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			fmt.Printf("prevent panic by handling failure accessing a path %q: %v\n", path, err)
			return err
		}
		renamePngFile(path, info)
		return nil
	})
	if err != nil {
		log.Fatalf("walking path: %+v", err) //nolint:gocritic
	}
}

func renamePngFile(path string, info fs.FileInfo) {
	if info.IsDir() || filepath.Ext(info.Name()) != ".png" {
		return
	}

	fnameSplit := strings.SplitN(
		strings.TrimSuffix(strings.ToLower(info.Name()), "_spritesheet.png"),
		"_",
		4,
	)
	sex := strings.Split(path, "/")[1]

	outPath := filepath.Join(*out, sex)
	if err := os.MkdirAll(outPath, 0755); err != nil {
		log.Fatal(err)
	}

	itemType := fnameSplit[2]

	// Beards and hair are numbered by team on file arrival so need different handling.
	if itemType == "beard" || itemType == "hair" {
		i, err := strconv.Atoi(fnameSplit[3])
		if err != nil {
			log.Fatal(err)
		}

		if err := os.MkdirAll(filepath.Join(outPath, itemType), 0755); err != nil {
			log.Fatal(err)
		}

		if err := os.Rename(path, filepath.Join(outPath, itemType, fmt.Sprintf("%d.png", i))); err != nil {
			log.Fatal(err)
		}
		return
	}

	// Rings are not named properly
	if itemType == "ring" && !strings.Contains(fnameSplit[len(fnameSplit)-1], "ring") {
		fnameSplit[len(fnameSplit)-1] += "_ring"
	}

	// Necklaces are not named properly
	if itemType == "necklace" && !strings.Contains(fnameSplit[len(fnameSplit)-1], "chain") {
		fnameSplit[len(fnameSplit)-1] += "_chain"
	}

	if 3 >= len(fnameSplit) {
		fmt.Printf("Skipping unknown file %v\n", path)
		return
	}
	itemSplit := strings.Split(fnameSplit[3], "_")

	nFname := strings.Join(itemSplit, "")
	nFname = normalizeItemName(nFname)

	for _, item := range items {
		nItemName := normalizeItemName(item.Name)
		if nFname == nItemName {
			if err := os.Rename(path, filepath.Join(outPath, item.ID+".png")); err != nil {
				log.Fatal(err)
			}
			break
		}
	}

}

// Lowercase and join names for comparison's sake
// Animation team sometimes doesn't put correct spaces in between names
func normalizeItemName(name string) string {
	var n string
	n = strings.ToLower(name)
	n = strings.ReplaceAll(n, " ", "")
	return n
}
