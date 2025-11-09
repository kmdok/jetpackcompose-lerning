# CLAUDE.md - Jetpack Compose Learning Project

> **CRITICAL PROJECT CONTEXT**: This is a Japanese language educational website teaching Android Jetpack Compose to React/Flutter developers. Every decision must prioritize educational effectiveness, technical accuracy, and learner success.

## 🎯 **PROJECT MISSION**

Transform experienced React/Flutter developers into business-ready Android developers in 2-3 months through:
- **Concept Mapping**: Leveraging existing UI framework knowledge
- **Efficient Learning**: Focused content that avoids redundancy
- **Production-Ready Skills**: Real-world patterns, not toy examples
- **Japanese Audience**: Technical content optimized for Japanese developers

## 🏗️ **ARCHITECTURE PRINCIPLES**

### **Technology Stack Standards**
```yaml
Package Manager: pnpm (REQUIRED - NEVER use npm or yarn)
Frontend: React 18 + TypeScript + Vite (NEVER create new frameworks/configs)
Styling: Tailwind CSS + shadcn/ui (NEVER add new CSS libraries without explicit need)
Code Highlighting: prism-react-renderer with custom CodeBlock/ComparisonCode
Routing: React Router DOM (educational content flow optimized)
Build: Vite (optimized for code-heavy educational content)
```

### **Content Architecture**
```yaml
Educational Structure:
  - 📊 Comparison Pages: Technical decision matrices (StateComparison, ReactFlutterMapping)
  - 🛠️ Implementation Pages: Practical coding guides (StateManagement, DependencyInjection)  
  - 🏠 Overview Pages: Learning motivation and roadmap (Home, Comparison)
  - 📚 Tutorial Pages: Step-by-step skill building (KotlinBasics, Composables)

Content Rules:
  - NO redundancy between pages - each concept has ONE authoritative page
  - Cross-reference with links, never duplicate content
  - Japanese text for explanations, English for code
  - Production-ready code examples only
```

## 🎨 **COMPONENT STANDARDS**

### **Code Display Components (CRITICAL)**
```typescript
// Use CodeBlock for single language examples
<CodeBlock language="kotlin" className="bg-green-50 border-green-200">
{`@Composable fun Example() { }`}
</CodeBlock>

// Use ComparisonCode for React/Flutter → Compose comparisons
<ComparisonCode 
  reactCode={`const [state, setState] = useState(null);`}
  composeCode={`var state by remember { mutableStateOf<T?>(null) }`}
/>

// NEVER use plain <pre> or raw HTML for code
```

### **Educational Card Pattern**
```typescript
<Card className="border-2 border-android-green/20">
  <CardHeader className="bg-gradient-to-br from-android-green/5 to-android-blue/5">
    <CardTitle className="flex items-center gap-2">
      <Icon className="w-5 h-5" />
      Concept Title
    </CardTitle>
    <CardDescription>Brief learning objective</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Educational content with proper spacing */}
  </CardContent>
</Card>
```

### **Color Scheme (ENFORCE STRICTLY)**
```css
android-green: #3DDC84    /* Primary Compose/Android branding */
android-blue: #4285F4     /* Secondary Android branding */
kotlin-purple: #7F52FF    /* Kotlin language branding */
react-blue: #61DAFB       /* React comparison sections */
flutter-blue: #02569B     /* Flutter comparison sections */
```

## 📝 **CONTENT DEVELOPMENT WORKFLOWS**

### **Creating New Educational Pages**
```yaml
1. Educational Planning:
   - Define learning objective and target skill level
   - Identify prerequisite knowledge and follow-up topics
   - Plan concept mapping to React/Flutter (if applicable)
   - Outline code examples and practical exercises

2. Content Structure (MANDATORY):
   - Hero section: Learning objective and time estimate
   - Prerequisite check: Link to required prior knowledge
   - Core content: Structured with clear headings
   - Code examples: Use proper CodeBlock/ComparisonCode components
   - Related resources: Cross-links to complementary topics
   - Navigation: Previous/Next page links

3. Quality Gates (NON-NEGOTIABLE):
   - All Kotlin/Compose code must be tested and production-ready
   - React/Flutter comparisons must be technically accurate
   - No content redundancy - check existing pages first
   - Mobile-responsive verification
   - Japanese language consistency check
```

### **Code Example Standards**
```yaml
Kotlin/Compose Examples:
  - Use current Android best practices (2023+)
  - Include proper imports and package structure  
  - Follow Google's Compose style guide
  - Include error handling where appropriate
  - Add comments explaining React/Flutter differences

React/Flutter Examples:
  - Use modern patterns (Hooks, Function Components)
  - Include TypeScript types where applicable
  - Match real-world implementation patterns
  - Avoid deprecated APIs or patterns

Quality Requirements:
  - All code examples must be copy-pasteable and runnable
  - Include package/import information
  - Follow language conventions strictly
  - NO placeholder or incomplete code
```

### **Content Consolidation Process**
```yaml
Before Creating New Content:
  1. Search existing pages for overlap (grep -r "concept" src/pages/)
  2. Check ReactFlutterMapping.tsx for concept comparisons
  3. Check StateComparison.tsx for state management topics
  4. Check DependencyInjection.tsx for DI-related concepts

If Overlap Found:
  1. ENHANCE existing page rather than create new one
  2. Add cross-references from other pages
  3. Update related resources sections
  4. Test navigation flow between pages

Content Update Process:
  1. Update content in primary authoritative page
  2. Verify all cross-references are accurate
  3. Update related resource sections
  4. Test affected navigation flows
```

## 🔧 **DEVELOPMENT WORKFLOWS**

### **Standard Development Process**
```yaml
1. Analysis Phase:
   - Read request and understand educational objective
   - Check existing content for overlaps/opportunities
   - Plan content structure and component usage
   - Identify required code examples and comparisons

2. Planning Phase:
   - Use TodoWrite to break down multi-step work
   - Plan code examples and syntax highlighting needs
   - Identify cross-references and navigation updates
   - Plan mobile-responsive considerations

3. Implementation Phase:
   - Follow component standards strictly
   - Test all code examples for accuracy
   - Implement proper syntax highlighting
   - Ensure mobile-responsive design

4. Validation Phase:
   - Build project to verify TypeScript compliance
   - Test educational content flow
   - Verify code example accuracy
   - Check Japanese language consistency
```

### **Quality Assurance Gates**
```yaml
Pre-Commit Validation:
  - pnpm run build (TypeScript + build verification)
  - Check mobile responsiveness at 375px, 768px, 1024px
  - Verify syntax highlighting works correctly
  - Test navigation between related pages
  - Validate all code examples are production-ready

Content Quality Checks:
  - Kotlin/Compose code follows Android best practices
  - React/Flutter comparisons are technically accurate
  - No redundancy with existing educational content
  - Cross-references work correctly
  - Japanese technical writing is clear and consistent

Performance Validation:
  - Bundle size impact assessment
  - Page load performance with code highlighting
  - Mobile performance verification
  - Educational content accessibility
```

## 🎓 **EDUCATIONAL CONTENT RULES**

### **Learning Progression Standards**
```yaml
Content Difficulty:
  - Beginner: Basic syntax and concept introduction
  - Intermediate: Implementation patterns and best practices  
  - Advanced: Architecture decisions and optimization
  - Expert: Complex real-world scenarios and edge cases

Prerequisite Management:
  - Always link to required prior knowledge
  - Provide skill level estimates (時間: 1-2週間)
  - Include skill check sections for complex topics
  - Reference React/Flutter equivalent knowledge when applicable

Success Metrics:
  - Can reader implement concept in production?
  - Does content avoid common beginner mistakes?
  - Is learning progression logical and achievable?
  - Do code examples work without modification?
```

### **Cross-Platform Comparison Standards**
```yaml
React Comparisons:
  - Use modern React patterns (Hooks, TypeScript)
  - Focus on functional component patterns
  - Include state management comparisons (useState → remember)
  - Cover effect management (useEffect → LaunchedEffect)
  - Address architecture differences (Redux → ViewModel)

Flutter Comparisons:
  - Use modern Flutter patterns (null safety, sound type system)
  - Focus on widget composition comparisons
  - Include state management (Provider/Riverpod → ViewModel)
  - Cover navigation differences (Navigator → Navigation Component)
  - Address lifecycle differences

Technical Accuracy Requirements:
  - All comparisons must be current and accurate
  - Include version information when relevant
  - Explain differences, not just similarities
  - Provide migration guidance, not just comparison
```

## ⚡ **PERFORMANCE OPTIMIZATION**

### **Build and Bundle Optimization**
```yaml
Code Splitting Strategy:
  - Each educational page loads independently
  - Shared components (CodeBlock, ComparisonCode) in common bundle
  - Syntax highlighting only loads when needed
  - Educational resources preloaded for better UX

Bundle Size Management:
  - Monitor impact of new dependencies
  - Optimize syntax highlighting bundle
  - Lazy load heavy educational content
  - Compress and optimize code examples

Performance Standards:
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s  
  - Educational content scroll performance: 60fps
  - Code highlighting render time: < 100ms
```

### **Mobile-First Educational Design**
```yaml
Responsive Breakpoints:
  - Mobile: 375px (code examples must remain readable)
  - Tablet: 768px (side-by-side comparisons optimization)
  - Desktop: 1024px+ (optimal learning layout)

Mobile Optimization:
  - Code examples with horizontal scroll when needed
  - Touch-friendly navigation between educational topics
  - Optimized font sizes for code readability
  - Efficient space usage for educational content

Touch Interaction Design:
  - Large touch targets for navigation
  - Smooth scrolling for long educational content
  - Swipe-friendly code comparison views
  - Accessible educational progression
```

## 🔍 **DEBUGGING AND MAINTENANCE**

### **Common Issue Patterns**
```yaml
Syntax Highlighting Issues:
  - Check CodeBlock language prop is correct
  - Verify prism-react-renderer language support
  - Check custom styling doesn't override syntax colors
  - Validate code content is properly escaped

Educational Content Issues:
  - Verify cross-references work correctly
  - Check mobile responsiveness of code examples
  - Validate Japanese language consistency
  - Ensure code examples are production-ready

Navigation Issues:
  - Check React Router path configurations
  - Verify internal links use correct paths
  - Test educational progression flow
  - Validate previous/next navigation
```

### **Maintenance Workflows**
```yaml
Content Updates:
  - Update Android/Kotlin version compatibility regularly
  - Review React/Flutter comparison accuracy quarterly  
  - Update educational progression based on learner feedback
  - Maintain cross-reference accuracy

Technical Debt Management:
  - Monitor bundle size growth
  - Update dependencies regularly
  - Optimize syntax highlighting performance
  - Review and consolidate educational content patterns

Quality Monitoring:
  - Track educational content accuracy
  - Monitor learner progression success rates
  - Validate code example effectiveness
  - Review mobile learning experience
```

## 🚀 **DEPLOYMENT AND VALIDATION**

### **Pre-Deployment Checklist**
```yaml
Technical Validation:
  - ✅ pnpm run build successful
  - ✅ All educational pages render correctly
  - ✅ Syntax highlighting works for all languages
  - ✅ Mobile responsiveness verified
  - ✅ Navigation flows tested

Content Validation:
  - ✅ All Kotlin/Compose code examples tested
  - ✅ React/Flutter comparisons verified
  - ✅ Educational progression logical
  - ✅ Cross-references accurate
  - ✅ Japanese language consistency

Performance Validation:
  - ✅ Bundle size within acceptable range
  - ✅ Page load performance measured
  - ✅ Educational content accessibility
  - ✅ Mobile learning experience optimized
```

### **Post-Deployment Monitoring**
```yaml
Success Metrics:
  - Educational content engagement
  - Code example copy rates
  - Learning progression completion
  - Mobile vs desktop usage patterns

Quality Metrics:
  - Educational content accuracy reports
  - Code example issue reports
  - Cross-reference link integrity
  - Learner feedback incorporation

Technical Metrics:
  - Page load performance
  - Mobile responsiveness
  - Syntax highlighting performance
  - Educational content accessibility
```

---

## 📋 **QUICK REFERENCE**

### **Essential Commands (PNPM ONLY)**
```bash
# Development (NEVER use npm/yarn)
pnpm run dev                 # Start development server
pnpm run build              # Production build  
pnpm run preview            # Preview production build

# Quality Checks
pnpm run check-quality      # Comprehensive educational content validation
pnpm run validate-content   # Automated content structure validation
pnpm run lint-educational   # Combined validation suite

# Content Analysis
grep -r "pattern" src/      # Content overlap detection
pnpm run build              # TypeScript + build validation

# CRITICAL: Always use pnpm - npm/yarn will cause dependency conflicts
```

### **Component Quick Start**
```typescript
// New educational page template
import CodeBlock from '@/components/CodeBlock'
import ComparisonCode from '@/components/ComparisonCode'

// Standard educational card
<Card className="border-2 border-android-green/20">
  <CardHeader className="bg-gradient-to-br from-android-green/5 to-android-blue/5">
    <CardTitle>Educational Concept</CardTitle>
    <CardDescription>Learning objective description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <CodeBlock language="kotlin">{`// Production-ready example`}</CodeBlock>
  </CardContent>
</Card>
```

### **Educational Content Patterns**
```typescript
// Cross-reference template
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <p className="text-sm text-blue-800">
    💡 <strong>関連トピック</strong>: 
    <a href="/related-page" className="underline font-medium">詳細ガイド</a>
  </p>
</div>

// Code comparison template
<ComparisonCode 
  reactCode={`// React pattern`}
  composeCode={`// Equivalent Compose pattern`}
/>
```

**🎯 MISSION CRITICAL**: Every change must advance the goal of efficiently teaching React/Flutter developers to become production-ready Android developers. When in doubt, prioritize learner success over technical perfection.