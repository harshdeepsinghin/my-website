#!/bin/bash

# Script to update lastmod in frontmatter of Markdown files in content/posts/
# based on the last Git commit date of each file.

# Check if we're in a Git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: Not in a Git repository."
    exit 1
fi

# Directory to scan
POSTS_DIR="content/posts"

# Check if directory exists
if [ ! -d "$POSTS_DIR" ]; then
    echo "Error: $POSTS_DIR directory not found."
    exit 1
fi

# Function to update lastmod in a file
update_lastmod() {
    local file="$1"
    local last_commit_date

    # Get the last commit date in ISO 8601 format (YYYY-MM-DDTHH:MM:SS)
    last_commit_date=$(git log --format=%ci -1 "$file" 2>/dev/null)
    if [ -z "$last_commit_date" ]; then
        echo "Warning: No Git history for $file, skipping."
        return
    fi

    # Convert to YYYY-MM-DDTHH:MM:SS (remove timezone offset)
    last_commit_date=$(echo "$last_commit_date" | sed 's/ [+-][0-9][0-9][0-9][0-9]$//')

    # Check if lastmod already exists in frontmatter
    if grep -q "^lastmod:" "$file"; then
        # Update existing lastmod
        sed -i.bak "s/^lastmod:.*/lastmod: $last_commit_date/" "$file"
        echo "Updated lastmod in $file to $last_commit_date"
    else
        # Add lastmod after date line
        sed -i.bak "/^date:/a\\
lastmod: $last_commit_date" "$file"
        echo "Added lastmod to $file: $last_commit_date"
    fi

    # Remove backup file
    rm "${file}.bak"
}

# Find all .md files in content/posts and subdirs
find "$POSTS_DIR" -name "*.md" -type f | while read -r file; do
    update_lastmod "$file"
done

echo "Done updating lastmod for all posts."
echo "Run 'hugo' to rebuild the site, then commit the changes."