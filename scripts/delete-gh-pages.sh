#!/bin/bash
set -e
git ls-remote --heads | grep gh-pages > /dev/null
if [ "$?" == "0" ]; then
  git push origin --delete gh-pages
fi