# Spritesheet overview

This directory contains files from our animation team, and scripts that help prepare them for use in the API. Sprites are [hosted in a static GCP bucket here](https://console.cloud.google.com/storage/browser/dopewars-static/male?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=dopewars-live&prefix=&forceOnObjectsSortingFiltering=false). 

Once hosted on the GCP storage bucket (like s3), they are transformed into usable sprite sheets by the API if you pass a correct URL to it like - https://api.dopewars.gg/hustlers/1/sprites/composite.png – where `1` is the ID of the Hustler you'd like to see the sprite sheet for.

## Animation team notes

Original files from animation team can be found in `monorepo/packages/pixelart/sprites_from_animation_team`. Using the script `go run img2id.go` will rename files in the `./in` folder into usable files for the API. They were not the most meticulous at naming things, so that file contains some custom logic to fix filenames instead of asking them to rename things strictly.

**Body colors**
In the provided files in `from_animation_team` it seems as if they only passed us one skintone. Make sure they all exist when putting on server.

## Uploading to GCP Bucket

You must have GCP access for the dopewars.gg organization to view them – or [ask for a HMAC key from an admin to access cloud files with something like Transmit](https://brianli.com/how-to-manage-files-on-google-cloud-storage-with-transmit-5/).

In this directory we have a `gcp_backup` folder that has manually been filled with the files from there. It's checked into version control so you can easily tell what diffs have been made when uploading.

Run the `img2id.go` script, then compare contents of the `out` folder with `gcp_backup_[date]`