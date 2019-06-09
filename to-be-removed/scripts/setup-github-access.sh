#!/bin/bash
set -e
echo "machine github.com" >> ~/.netrc
echo "   login seemann@mseemann.de" >> ~/.netrc
echo "   password $github_token" >> ~/.netrc