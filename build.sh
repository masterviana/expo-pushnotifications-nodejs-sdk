#!/bin/bash
set -e

echo "🔥  Cleaning build directory"
sudo rm -fr build

echo
echo "📚  Compiling source files"
sudo npm run tsc

echo
echo "🆗  Build finished"
