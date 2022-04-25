# Spritesheet overview

This directory contains scripts that help prepare files from our animation team for use in the API. Sprites are [hosted in a static GCP bucket here](https://console.cloud.google.com/storage/browser/dopewars-static/male?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=dopewars-live&prefix=&forceOnObjectsSortingFiltering=false).

### About scripts

We're using Go to script some of these actions. Because of the way Go needs things named; we have to separate those scripts into folders or receive a compiler error when building for CI.

## Spritesheet details

### Mapping human readable names to computer readable names

The API understands how to serve Sprite Sheets based on the Item ID in our PGSQL database – so we need a process to map the human readable names to ones our database can understand. The script `01_rename_sprites_from_animators.go` attempts to solve that by mapping filenames to the ones stored inside `items.json` – which is a dump from our Production Database.

### How the API serves sprite sheets

Once hosted on the GCP storage bucket these files are composited into usable sprite sheets by the API if you pass a correct URL to it like - <https://api.dopewars.gg/hustlers/1/sprites/composite.png> – where `1` is the ID of a Hustler.

The API does this by querying items that belong to a Hustler, and then the `sprite` field that belongs to each of that Hustler's items in the PGSQL database.

## Source files

### Animation team Spritesheets

Original files from animation team can be found in `/packages/pixelart/raw_sprites`. Using the script `go run img2id.go` will rename files in the `./in` folder into usable files for the API. They were not the most meticulous at naming things, so that file contains some custom logic to fix filenames instead of asking them to rename things strictly.

### MrFax Spritesheets

Not all files came from the animation team. Mr Fax provided a number of animation files as well, especially for custom CNY accessories. Those are in the `/packages/pixelart/raw_sprites` directory.

## Uploading to GCP Bucket

You must have GCP access for the dopewars.gg organization to view them – or [ask for a HMAC key from an admin to access cloud files with something like Transmit](https://brianli.com/how-to-manage-files-on-google-cloud-storage-with-transmit-5/).
