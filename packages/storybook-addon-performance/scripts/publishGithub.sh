#!/bin/sh

set -e +x

echo "Publishing to github..."

OUT_NAME="package"
TAR_NAME=$(npm pack -q)

# Stash working tree
git stash -q

# Move and extract NPM package
mv "$TAR_NAME" "../../$TAR_NAME"
cd ../..
tar -xf "$TAR_NAME"
rm "$TAR_NAME"

# Commit package dir
git add -f "$OUT_NAME"
git commit -qnm "temp"

# Push package dir to separate branch
BRANCH_NAME="devpkg-$(git rev-parse --short HEAD)"
git subtree split -q --branch "$BRANCH_NAME" --prefix "$OUT_NAME" > /dev/null
git push -qf origin "$BRANCH_NAME" > /dev/null 2>&1
git branch -qD "$BRANCH_NAME"

echo "Published branch: $BRANCH_NAME"
echo "Use: npm un storybook-addon-performance && npm i akhdrv/storybook-addon-performance#$BRANCH_NAME"

# Reset to base commit and restore working tree
git reset -q --hard HEAD^
git stash pop -q
