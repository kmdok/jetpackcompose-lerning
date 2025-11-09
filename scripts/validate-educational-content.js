#!/usr/bin/env node

/**
 * Educational Content Validation Script
 * Validates educational content quality, accuracy, and consistency
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const PAGES_DIR = './src/pages';
const REQUIRED_SECTIONS = [
  'hero section',
  'learning objective', 
  'related resources',
  'navigation'
];

const EDUCATIONAL_STANDARDS = {
  maxCodeBlockLines: 30,
  requiredCrossReferences: 1,
  maxPageLength: 1000, // lines
  minMobileWidth: 375
};

class EducationalContentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      pagesChecked: 0,
      codeExamples: 0,
      crossReferences: 0,
      missingRequiredSections: 0
    };
  }

  async validateAllContent() {
    console.log('🎓 Starting Educational Content Validation...\n');
    
    const pageFiles = await glob(`${PAGES_DIR}/*.tsx`);
    
    for (const filePath of pageFiles) {
      await this.validatePage(filePath);
    }
    
    this.generateReport();
  }

  async validatePage(filePath) {
    const fileName = path.basename(filePath);
    console.log(`📄 Validating: ${fileName}`);
    
    this.stats.pagesChecked++;
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Validate page structure
      this.validatePageStructure(content, fileName);
      
      // Validate code examples
      this.validateCodeExamples(content, fileName);
      
      // Validate educational content quality
      this.validateEducationalQuality(content, fileName);
      
      // Validate cross-references
      this.validateCrossReferences(content, fileName);
      
      // Validate mobile responsiveness indicators
      this.validateResponsiveDesign(content, fileName);
      
    } catch (error) {
      this.errors.push(`❌ ${fileName}: Failed to read file - ${error.message}`);
    }
  }

  validatePageStructure(content, fileName) {
    // Check for hero section
    if (!content.includes('text-3xl') && !content.includes('text-4xl')) {
      this.errors.push(`❌ ${fileName}: Missing hero section with proper heading`);
      this.stats.missingRequiredSections++;
    }

    // Check for learning objectives
    if (!content.includes('学習') && !content.includes('learning')) {
      this.warnings.push(`⚠️ ${fileName}: No clear learning objective found`);
    }

    // Check for navigation
    if (!content.includes('前のページ') && !content.includes('次のページ')) {
      this.warnings.push(`⚠️ ${fileName}: Missing educational navigation`);
    }

    // Check for proper imports
    const requiredImports = ['Card', 'CardContent', 'CardHeader', 'CardTitle'];
    requiredImports.forEach(imp => {
      if (content.includes('<' + imp) && !content.includes(`import.*${imp}`)) {
        this.errors.push(`❌ ${fileName}: Using ${imp} without importing`);
      }
    });
  }

  validateCodeExamples(content, fileName) {
    // Find CodeBlock components
    const codeBlockMatches = content.match(/<CodeBlock[^>]*>/g) || [];
    const comparisonCodeMatches = content.match(/<ComparisonCode[^>]*>/g) || [];
    
    this.stats.codeExamples += codeBlockMatches.length + comparisonCodeMatches.length;

    // Check for proper syntax highlighting
    codeBlockMatches.forEach((match, index) => {
      if (!match.includes('language=')) {
        this.warnings.push(`⚠️ ${fileName}: CodeBlock ${index + 1} missing language specification`);
      }
    });

    // Check for production-ready code
    const codeBlockContent = content.match(/{\`[^`]*\`}/g) || [];
    codeBlockContent.forEach((block, index) => {
      if (block.includes('// TODO') || block.includes('// FIXME') || block.includes('placeholder')) {
        this.errors.push(`❌ ${fileName}: Code example ${index + 1} contains placeholder content`);
      }
      
      // Check for reasonable code length
      const lines = block.split('\n').length;
      if (lines > EDUCATIONAL_STANDARDS.maxCodeBlockLines) {
        this.warnings.push(`⚠️ ${fileName}: Code example ${index + 1} exceeds ${EDUCATIONAL_STANDARDS.maxCodeBlockLines} lines (${lines})`);
      }
    });

    // Validate Kotlin syntax patterns
    const kotlinBlocks = content.match(/language="kotlin"[^}]*}\`[^`]*\`/g) || [];
    kotlinBlocks.forEach((block, index) => {
      if (block.includes('function ') && !block.includes('fun ')) {
        this.errors.push(`❌ ${fileName}: Kotlin code block ${index + 1} uses JavaScript 'function' instead of 'fun'`);
      }
    });
  }

  validateEducationalQuality(content, fileName) {
    // Check for Japanese educational content
    const hasJapanese = /[ひらがなカタカナ\u4e00-\u9faf]/.test(content);
    if (!hasJapanese && !fileName.includes('test')) {
      this.warnings.push(`⚠️ ${fileName}: No Japanese educational content detected`);
    }

    // Check for time estimates
    if (!content.includes('週間') && !content.includes('時間') && !content.includes('分')) {
      this.warnings.push(`⚠️ ${fileName}: Missing time estimates for educational content`);
    }

    // Check for prerequisite information
    if (!content.includes('前提') && !content.includes('prerequisite')) {
      this.warnings.push(`⚠️ ${fileName}: No prerequisite information found`);
    }

    // Check for practical application
    if (!content.includes('実践') && !content.includes('実装') && !content.includes('例')) {
      this.warnings.push(`⚠️ ${fileName}: Limited practical examples or implementation guidance`);
    }
  }

  validateCrossReferences(content, fileName) {
    // Find internal links
    const internalLinks = content.match(/href="\/[^"]*"/g) || [];
    const routerLinks = content.match(/to="\/[^"]*"/g) || [];
    
    const totalLinks = internalLinks.length + routerLinks.length;
    this.stats.crossReferences += totalLinks;

    if (totalLinks < EDUCATIONAL_STANDARDS.requiredCrossReferences) {
      this.warnings.push(`⚠️ ${fileName}: Insufficient cross-references (${totalLinks} found, ${EDUCATIONAL_STANDARDS.requiredCrossReferences} required)`);
    }

    // Check for educational progression links
    const progressionKeywords = ['次', 'previous', 'next', '前', 'continue', '続き'];
    const hasProgression = progressionKeywords.some(keyword => content.includes(keyword));
    
    if (!hasProgression) {
      this.warnings.push(`⚠️ ${fileName}: No learning progression indicators found`);
    }

    // Validate link destinations exist
    [...internalLinks, ...routerLinks].forEach(link => {
      const path = link.match(/["']([^"']*)["']/)[1];
      if (path.startsWith('/') && !path.startsWith('http')) {
        // Basic validation - in real implementation, check if route exists
        if (!path.includes('-')) {
          this.warnings.push(`⚠️ ${fileName}: Unusual internal link format: ${path}`);
        }
      }
    });
  }

  validateResponsiveDesign(content, fileName) {
    // Check for responsive classes
    const responsiveIndicators = ['md:', 'lg:', 'sm:', 'xl:'];
    const hasResponsive = responsiveIndicators.some(indicator => content.includes(indicator));
    
    if (!hasResponsive) {
      this.warnings.push(`⚠️ ${fileName}: No responsive design indicators found`);
    }

    // Check for mobile-friendly code examples
    if (content.includes('overflow-x-auto')) {
      // Good practice for code examples
    } else if (content.includes('CodeBlock')) {
      this.warnings.push(`⚠️ ${fileName}: Code examples may not be mobile-friendly`);
    }

    // Check for proper spacing and layout
    if (!content.includes('space-y-') && !content.includes('gap-')) {
      this.warnings.push(`⚠️ ${fileName}: No consistent spacing patterns found`);
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 EDUCATIONAL CONTENT VALIDATION REPORT');
    console.log('='.repeat(60));
    
    // Statistics
    console.log('\n📈 Statistics:');
    console.log(`📄 Pages checked: ${this.stats.pagesChecked}`);
    console.log(`💻 Code examples found: ${this.stats.codeExamples}`);
    console.log(`🔗 Cross-references found: ${this.stats.crossReferences}`);
    console.log(`📋 Missing required sections: ${this.stats.missingRequiredSections}`);
    
    // Errors
    if (this.errors.length > 0) {
      console.log('\n🚨 ERRORS (Must Fix):');
      this.errors.forEach(error => console.log(error));
    }
    
    // Warnings  
    if (this.warnings.length > 0) {
      console.log('\n⚠️ WARNINGS (Recommended Fixes):');
      this.warnings.forEach(warning => console.log(warning));
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    if (this.errors.length === 0) {
      console.log('✅ No critical errors found!');
    } else {
      console.log(`❌ ${this.errors.length} critical errors require attention`);
    }
    
    if (this.warnings.length === 0) {
      console.log('✅ Educational content quality is excellent!');
    } else {
      console.log(`⚠️ ${this.warnings.length} recommendations for improvement`);
    }
    
    console.log('='.repeat(60));
    
    // Exit code
    process.exit(this.errors.length > 0 ? 1 : 0);
  }
}

// Run validation
const validator = new EducationalContentValidator();
validator.validateAllContent().catch(console.error);