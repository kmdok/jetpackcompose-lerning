#!/bin/bash

# Fix quiz formatting in all module markdown files
# This script converts quiz choices from plain text to markdown lists

for file in public/modules/module_*.md; do
    echo "Processing $file..."
    
    # Use sed to add list markers to quiz choices
    # Pattern: Lines starting with A), B), C) should become *   A), *   B), *   C)
    sed -i.bak -E '
        # If line starts with A), B), or C) followed by space
        s/^([ABC])\) /*   \1) /
    ' "$file"
    
    # Remove backup files
    rm -f "${file}.bak"
done

echo "Done!"
