#!/bin/sh

echo "Running!"
path=$(npx clipboard)
echo "Changing directory to $path"
cd $path

exit 0