#!/bin/bash

# An attempt to make it simple to version and upload
# sprite sheets if we happen to update them over time.
#
# Requires `gsutil` utility which you can learn about here
# https://cloud.google.com/storage/docs/quickstart-gsutil
#
# You also have to be authenticated with gsutil to make this work!

DATE=$(date +%m-%d-%Y)
BUCKET="gs://dopewars-static"
BACKUP_BUCKET="${BUCKET}_${DATE}-backup"
LOCAL_PATH="./bucket_versions/$DATE"

echo "Backing up remotely to new bucket"
gsutil mb -c standard $BACKUP_BUCKET
gsutil -m rsync -r $BUCKET $BACKUP_BUCKET

echo "Downloading from GCP"
mkdir -p $LOCAL_PATH
gsutil -m rsync -r $BACKUP_BUCKET $LOCAL_PATH

echo "Copying files for upload"
cp -R ./out/* $LOCAL_PATH/

echo "Uploading new files to GCP"
gsutil -m rsync -r $LOCAL_PATH $BUCKET