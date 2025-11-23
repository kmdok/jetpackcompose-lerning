#!/bin/bash

# Fix details/summary blocks to ensure proper markdown rendering
# Adds blank lines after <summary> and before </details>

for file in public/modules/module_*.md; do
    echo "Processing $file..."
    
    # Use perl for multi-line replacements
    perl -i.bak -0pe '
        # Add blank line after </summary> if not present
        s/(<\/summary>)\n(?!\n)/$1\n\n/g;
        
        # Add blank line before </details> if not present  
        s/(?<!\n)\n(<\/details>)/\n\n$1/g;
    ' "$file"
    
    # Remove backup files
    rm -f "${file}.bak"
done

echo "Done!"
