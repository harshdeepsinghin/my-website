#!/bin/bash

# Simple script to update lastmod in frontmatter of a Markdown file to current date/time
# Usage: ./update_lastmod.sh <file>

if [ $# -ne 1 ]; then
    echo "Usage: $0 <file>"
    exit 1
fi

file="$1"
if [ ! -f "$file" ]; then
    echo "Error: File $file not found."
    exit 1
fi

current_date=$(date +"%Y-%m-%d %H:%M:%S")

if grep -q "^lastmod:" "$file"; then
    sed -i.bak "s/^lastmod:.*/lastmod: $current_date/" "$file"
    echo "Updated lastmod in $file to $current_date"
else
    sed -i.bak "/^date:/a\\
lastmod: $current_date" "$file"
    echo "Added lastmod to $file: $current_date"
fi

rm "${file}.bak"
echo "Run 'hugo' to rebuild the site, then commit the changes."