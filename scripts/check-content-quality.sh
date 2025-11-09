#!/bin/bash

# Educational Content Quality Check Script
# Comprehensive validation for Jetpack Compose learning website

set -e

echo "🎓 Educational Content Quality Check"
echo "=================================="
echo ""

# Color codes for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Function to log results
log_check() {
    CHECKS=$((CHECKS + 1))
    echo -e "${BLUE}[$CHECKS]${NC} $1"
}

log_error() {
    ERRORS=$((ERRORS + 1))
    echo -e "${RED}❌ ERROR:${NC} $1"
}

log_warning() {
    WARNINGS=$((WARNINGS + 1))
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
}

log_success() {
    echo -e "${GREEN}✅ PASS:${NC} $1"
}

# 1. Build Validation
log_check "TypeScript and Build Validation"
if pnpm run build > /dev/null 2>&1; then
    log_success "Build completed successfully"
else
    log_error "Build failed - fix TypeScript errors first"
fi

# 2. Code Example Quality
log_check "Code Example Quality"
if grep -r "// TODO\|// FIXME\|placeholder" src/pages/ > /dev/null 2>&1; then
    log_error "Found placeholder code in educational examples"
    grep -r "// TODO\|// FIXME\|placeholder" src/pages/ | head -5
else
    log_success "No placeholder code found in examples"
fi

# 3. Syntax Highlighting Usage
log_check "Syntax Highlighting Implementation"
code_blocks=$(grep -r "CodeBlock\|ComparisonCode" src/pages/ | wc -l)
plain_pre=$(grep -r "<pre\|<code" src/pages/ | grep -v "CodeBlock\|ComparisonCode" | wc -l)

echo "   📊 CodeBlock/ComparisonCode usage: $code_blocks"
echo "   📊 Plain <pre>/<code> usage: $plain_pre"

if [ "$plain_pre" -gt 5 ]; then
    log_warning "Consider migrating plain code elements to CodeBlock components"
fi

# 4. Educational Content Structure
log_check "Educational Content Structure"
pages_without_hero=$(find src/pages -name "*.tsx" -exec grep -L "text-3xl\|text-4xl" {} \; | wc -l)
pages_without_navigation=$(find src/pages -name "*.tsx" -exec grep -L "前のページ\|次のページ\|Previous\|Next" {} \; | wc -l)

echo "   📊 Pages without hero sections: $pages_without_hero"
echo "   📊 Pages without navigation: $pages_without_navigation"

if [ "$pages_without_hero" -gt 2 ]; then
    log_warning "Multiple pages missing hero sections"
fi

# 5. Cross-Reference Validation
log_check "Cross-Reference and Link Integrity"
internal_links=$(grep -r "href=\"/\|to=\"/" src/pages/ | wc -l)
echo "   📊 Internal links found: $internal_links"

if [ "$internal_links" -lt 10 ]; then
    log_warning "Low number of internal cross-references - consider adding more educational links"
fi

# 6. Mobile Responsiveness Indicators
log_check "Mobile Responsiveness Indicators"
responsive_classes=$(grep -r "md:\|lg:\|sm:" src/pages/ | wc -l)
echo "   📊 Responsive classes found: $responsive_classes"

if [ "$responsive_classes" -lt 50 ]; then
    log_warning "Limited responsive design implementation detected"
fi

# 7. Japanese Educational Content
log_check "Japanese Educational Content"
japanese_content=$(grep -r "[ひらがなカタカナ一-龯]" src/pages/ | wc -l)
echo "   📊 Japanese content lines: $japanese_content"

if [ "$japanese_content" -lt 100 ]; then
    log_warning "Limited Japanese educational content detected"
fi

# 8. Content Redundancy Check
log_check "Content Redundancy Analysis"
echo "   🔍 Checking for duplicated concept explanations..."

# Check for potential redundancy patterns
state_mgmt_mentions=$(grep -r "LiveData\|StateFlow\|状態管理" src/pages/ | wc -l)
react_comparisons=$(grep -r "React\|useState\|useEffect" src/pages/ | wc -l)
di_explanations=$(grep -r "@HiltViewModel\|依存性注入\|Dependency Injection" src/pages/ | wc -l)

echo "   📊 State management mentions: $state_mgmt_mentions"
echo "   📊 React comparison mentions: $react_comparisons"
echo "   📊 DI explanations: $di_explanations"

# 9. Code Example Language Validation
log_check "Code Example Language Attribution"
kotlin_blocks=$(grep -r 'language="kotlin"' src/pages/ | wc -l)
javascript_blocks=$(grep -r 'language="javascript\|language="typescript"' src/pages/ | wc -l)

echo "   📊 Kotlin code blocks: $kotlin_blocks"
echo "   📊 JavaScript/TypeScript blocks: $javascript_blocks"

if [ "$kotlin_blocks" -lt 10 ]; then
    log_warning "Limited Kotlin code examples for Android learning content"
fi

# 10. Educational Time Estimates
log_check "Learning Time Estimates"
time_estimates=$(grep -r "週間\|時間\|分\|week\|hour\|minute" src/pages/ | wc -l)
echo "   📊 Time estimate references: $time_estimates"

if [ "$time_estimates" -lt 5 ]; then
    log_warning "Limited learning time guidance for students"
fi

# 11. Bundle Size Check
log_check "Bundle Size Analysis"
if [ -d "dist" ]; then
    bundle_size=$(ls -la dist/assets/*.js | awk '{sum += $5} END {print sum/1024/1024}')
    echo "   📊 JavaScript bundle size: ${bundle_size}MB (approx)"
    
    if (( $(echo "$bundle_size > 1.0" | bc -l) )); then
        log_warning "Large bundle size detected - consider code splitting"
    fi
else
    log_warning "No dist directory found - run build first for complete analysis"
fi

# 12. Educational Flow Validation
log_check "Educational Flow and Prerequisites"
prerequisite_mentions=$(grep -r "前提\|prerequisite\|required knowledge" src/pages/ | wc -l)
progression_indicators=$(grep -r "Phase\|Step\|段階\|ステップ" src/pages/ | wc -l)

echo "   📊 Prerequisite mentions: $prerequisite_mentions"
echo "   📊 Progression indicators: $progression_indicators"

# Summary Report
echo ""
echo "=================================="
echo "📊 QUALITY CHECK SUMMARY"
echo "=================================="
echo "Total checks performed: $CHECKS"
echo -e "${RED}Errors found: $ERRORS${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo ""

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}🎉 Excellent! Educational content quality is outstanding.${NC}"
    exit 0
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "${YELLOW}✨ Good quality with $WARNINGS recommendations for improvement.${NC}"
    exit 0
else
    echo -e "${RED}🚨 $ERRORS critical issues require immediate attention.${NC}"
    echo ""
    echo "Recommended actions:"
    echo "1. Fix build errors and TypeScript issues"
    echo "2. Remove placeholder code from educational examples"
    echo "3. Ensure all code examples are production-ready"
    echo "4. Review educational content structure"
    echo ""
    exit 1
fi