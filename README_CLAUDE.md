# Claude Development Guide - Jetpack Compose Learning Project

> **🎯 PROJECT OBJECTIVE**: Transform React/Flutter developers into production-ready Android developers through efficient, accurate educational content.

## 🚀 **QUICK START FOR CLAUDE DEVELOPERS**

### **Essential Files to Read First**
1. **`CLAUDE.md`** - Complete development standards and workflows
2. **`DEVELOPMENT_PATTERNS.md`** - Battle-tested implementation patterns  
3. **`package.json`** - Available commands and dependencies
4. **`src/pages/`** - Current educational content structure

### **Before Starting Any Work (PNPM REQUIRED)**
```bash
# CRITICAL: This project uses pnpm - NEVER use npm or yarn

# 1. Understand current project state
pnpm run check-quality

# 2. Validate build health
pnpm run build

# 3. Start development server  
pnpm run dev

# Package manager is enforced:
# - .npmrc forces engine-strict 
# - package.json specifies pnpm engine
# - .clauderc aliases prevent npm/yarn usage
```

## 📁 **PROJECT ARCHITECTURE OVERVIEW**

```
jetpackcompose-lerning/
├── 📋 CLAUDE.md                    # Complete development guide
├── 📋 DEVELOPMENT_PATTERNS.md      # Implementation patterns  
├── 📋 README_CLAUDE.md            # This guide
├── 🔧 .clauderc                   # Environment aliases
├── 📦 scripts/                    # Quality validation tools
├── 🎨 src/
│   ├── 🧩 components/
│   │   ├── CodeBlock.tsx          # Syntax highlighting
│   │   ├── ComparisonCode.tsx     # React/Flutter comparisons
│   │   └── ui/                    # shadcn/ui components
│   ├── 📚 pages/                  # Educational content
│   │   ├── 🏠 Home.tsx           # Overview & learning path
│   │   ├── 📊 StateComparison.tsx # State management comparison
│   │   ├── 🛠️ StateManagement.tsx # Implementation patterns
│   │   ├── 🗺️ ReactFlutterMapping.tsx # Concept mapping
│   │   ├── ⚙️ DependencyInjection.tsx # DI guide
│   │   └── 📖 [Other educational pages]
│   └── 🎨 App.tsx                 # Main routing
└── 🏗️ vite.config.ts             # Build configuration
```

## 🎓 **EDUCATIONAL CONTENT HIERARCHY**

### **Content Types and Purposes**
```yaml
📊 Comparison Pages:
  Purpose: Technical decision matrices and selection criteria
  Examples: StateComparison, ReactFlutterMapping
  Usage: When developers need to choose between technologies

🛠️ Implementation Pages:  
  Purpose: Practical coding guides and patterns
  Examples: StateManagement, DependencyInjection
  Usage: When developers need to implement solutions

🏠 Overview Pages:
  Purpose: Learning motivation and roadmap
  Examples: Home, Comparison
  Usage: Orientation and learning path guidance

📚 Tutorial Pages:
  Purpose: Step-by-step skill building
  Examples: KotlinBasics, Composables  
  Usage: Progressive skill development
```

### **Content Quality Standards**
- ✅ **Production-Ready Code**: All examples must be copy-pasteable and functional
- ✅ **Japanese Educational Content**: Technical explanations in Japanese, code in English
- ✅ **Cross-Platform Mapping**: Leverage React/Flutter knowledge efficiently
- ✅ **No Redundancy**: Each concept has ONE authoritative page with cross-references
- ✅ **Mobile-Responsive**: Educational content optimized for all devices

## 🔧 **DEVELOPMENT WORKFLOW**

### **Standard Development Process**
```bash
# 1. Analysis Phase
# - Read request and understand educational objective
# - Check existing content: grep -r "concept" src/pages/
# - Plan content structure and cross-references

# 2. Planning Phase  
# - Use TodoWrite for multi-step work
# - Plan code examples and syntax highlighting
# - Identify navigation and related resource updates

# 3. Implementation Phase
# - Follow CLAUDE.md standards strictly
# - Use CodeBlock/ComparisonCode components
# - Ensure mobile-responsive design
# - Test all code examples for accuracy

# 4. Validation Phase
pnpm run build              # TypeScript + build verification
pnpm run check-quality      # Educational content validation
# - Test navigation between pages
# - Verify cross-references work
```

### **Quality Gates (NON-NEGOTIABLE)**
1. **TypeScript Compliance**: `pnpm run build` must pass
2. **Educational Quality**: `pnpm run check-quality` warnings addressed  
3. **Code Accuracy**: All Kotlin/Compose examples production-ready
4. **Cross-Reference Integrity**: Navigation and links tested
5. **Mobile Responsiveness**: Verified at 375px, 768px, 1024px

## 📝 **COMMON DEVELOPMENT TASKS**

### **Creating New Educational Pages**
```typescript
// 1. Use Educational Page Template from DEVELOPMENT_PATTERNS.md
// 2. Required sections:
//    - Hero with learning objective
//    - Prerequisites with links  
//    - Main educational content
//    - Related resources
//    - Previous/Next navigation

// 3. Always use proper components:
import CodeBlock from '@/components/CodeBlock'
import ComparisonCode from '@/components/ComparisonCode'

// 4. Follow color scheme:
className="bg-gradient-to-r from-android-green to-android-blue"
```

### **Adding Code Examples**
```typescript
// Single language example:
<CodeBlock language="kotlin" className="bg-green-50 border-green-200">
{`@Composable
fun ProductionExample() {
    // Real, tested code only
}`}
</CodeBlock>

// Framework comparison:
<ComparisonCode 
  reactCode={`const [state, setState] = useState(null);`}
  composeCode={`var state by remember { mutableStateOf<T?>(null) }`}
/>
```

### **Content Updates and Maintenance**
```bash
# 1. Find authoritative page:
grep -r "concept_name" src/pages/

# 2. Update primary content location
# 3. Update cross-references:
grep -r "href.*concept\|to.*concept" src/pages/

# 4. Validate changes:
pnpm run check-quality
```

## 🎨 **STYLING AND DESIGN STANDARDS**

### **Color Scheme (ENFORCE STRICTLY)**
```css
android-green: #3DDC84    /* Primary Android branding */
android-blue: #4285F4     /* Secondary Android branding */
kotlin-purple: #7F52FF    /* Kotlin language branding */
react-blue: #61DAFB       /* React comparison sections */
flutter-blue: #02569B     /* Flutter comparison sections */
```

### **Component Usage**
```typescript
// Educational cards:
<Card className="border-2 border-android-green/20">
  <CardHeader className="bg-gradient-to-br from-android-green/5 to-android-blue/5">

// Cross-references:
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <a href="/related-page" className="text-blue-600 hover:text-blue-800 underline">

// Code examples:  
<CodeBlock className="bg-green-50 border-green-200">
<ComparisonCode /> // For React/Flutter → Compose
```

## 📊 **QUALITY VALIDATION TOOLS**

### **Available Commands**
```bash
pnpm run build              # TypeScript + build validation
pnpm run check-quality      # Comprehensive content validation  
pnpm run validate-content   # Automated educational content checks
pnpm run lint-educational   # Combined validation suite

# Shortcuts from .clauderc:
alias validate="pnpm run build && echo 'Build successful ✅'"
alias check-overlap="grep -r 'StateComparison\|ReactFlutterMapping' src/pages/"
```

### **Quality Metrics Tracked**
- 📊 Code example quality and syntax
- 📱 Mobile responsiveness indicators
- 🔗 Cross-reference link integrity  
- 📝 Educational content structure
- 🎌 Japanese language consistency
- ⚡ Bundle size and performance
- 🎓 Learning progression flow

## 🚨 **CRITICAL SUCCESS FACTORS**

### **Educational Effectiveness**
1. **Target Audience**: React/Flutter developers → Android developers
2. **Learning Objective**: Business-ready skills in 2-3 months
3. **Key Strategy**: Concept mapping leverages existing knowledge
4. **Quality Standard**: Production-ready, not tutorial-level

### **Technical Excellence**  
1. **Code Accuracy**: All examples must work without modification
2. **Modern Patterns**: Current Android best practices (2023+)
3. **Performance**: Optimized for code-heavy educational content
4. **Accessibility**: Mobile-friendly learning experience

### **Content Management**
1. **Single Source of Truth**: No content duplication between pages
2. **Cross-Reference Strategy**: Link to authoritative pages, don't repeat
3. **Learning Flow**: Clear progression with prerequisites and next steps
4. **Maintenance**: Regular validation of technical accuracy

## 🎯 **SUCCESS METRICS**

### **Development Efficiency**
- ⚡ New educational pages: < 2 hours with template
- 🔧 Content updates: < 30 minutes with proper cross-referencing
- ✅ Quality validation: < 5 minutes automated checking
- 📱 Mobile optimization: Built into component patterns

### **Educational Quality**
- 🎓 Learning objectives clearly stated
- ⏱️ Time estimates provided for all content
- 🔗 Related resources linked appropriately
- 📝 Production-ready code examples
- 🎌 Consistent Japanese educational language

### **Technical Performance**
- 🏗️ Build time: < 2 minutes
- 📦 Bundle size: < 500KB for educational content
- 📱 Mobile performance: 60fps scrolling
- 🔍 Content search: Fast grep-based content location

---

## 🎉 **GETTING STARTED CHECKLIST**

When working on this project, ensure you:

- [ ] ✅ Read CLAUDE.md completely  
- [ ] 🔧 Run `pnpm run check-quality` to understand current state
- [ ] 📚 Review existing educational content structure in `src/pages/`
- [ ] 🎨 Understand component patterns in `DEVELOPMENT_PATTERNS.md`
- [ ] 🎯 Identify target learning objective for your work
- [ ] 📝 Plan content structure and cross-references
- [ ] 💻 Follow development workflow and quality gates
- [ ] 🧪 Validate with automated tools before completion

**🎯 MISSION CRITICAL**: Every change must advance the educational objective of efficiently teaching React/Flutter developers to become production-ready Android developers. Quality, accuracy, and learner success are non-negotiable.