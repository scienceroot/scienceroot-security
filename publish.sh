#!/bin/bash

CURRENT_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo "Current Version: $CURRENT_VERSION"
echo "Type the version that you want to set (X.X.X format), followed by [ENTER]:"
read NEXT_VERSION

# STEP NPM
echo "Setting package.json version:     $NEXT_VERSION"
npm version ${NEXT_VERSION}

# STEP BUILD
set -e  # terminates on error
npm run build
node publish_index_remove.js  # replace all occurrences of [/index] in 'dist/'
set +e

# STEP PUBLISH
echo "Publish version:                  $NEXT_VERSION"
git push --follow-tags

cd dist/
npm publish
