#!/bin/bash

echo "Replacing localhost with remote urls";

sed 's/localhost:3000/office-sample.netlify.app/g' manifest.xml > dist/manifest.xml