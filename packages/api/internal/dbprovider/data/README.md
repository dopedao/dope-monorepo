# Bootstrap data

This data has been exported after running the indexer and various scripts for awhile. The current indexer in its basic form will not run without these files being inserted into the datbase first.

There are some gotchas here, like the items.sql table containing new items manually added by Tarrence during the Chinese New Year / Vehicles drop. They were not indexed, and therefore will not index correctly if run from zero.

At the time of this file's creation you can load it by running `grift db:bootstrap`
