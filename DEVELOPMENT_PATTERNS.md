# Development Patterns - Jetpack Compose Learning Project

## 🎯 **CORE PATTERNS OVERVIEW**

This document contains battle-tested patterns for efficient development on this educational website. Every pattern here has been proven to work in this specific React + TypeScript + Educational Content context.

## 🧩 **COMPONENT PATTERNS**

### **Educational Page Template**
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Code, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
import CodeBlock from '@/components/CodeBlock'
import ComparisonCode from '@/components/ComparisonCode'

export default function NewEducationalPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Hero Section - REQUIRED */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-android-green to-android-blue bg-clip-text text-transparent">
          Learning Topic Title
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Clear learning objective and expected outcomes.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            📚 <strong>前提知識</strong>: 
            <a href="/prerequisite-page" className="underline font-medium">Required Prior Learning</a>
            | ⏱️ <strong>学習時間</strong>: 1-2週間
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Main Learning Section</h2>
        
        <Card className="border-2 border-android-green/20">
          <CardHeader className="bg-gradient-to-br from-android-green/5 to-android-blue/5">
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Concept Title
            </CardTitle>
            <CardDescription>Learning objective for this concept</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <CodeBlock language="kotlin" className="bg-green-50 border-green-200">
{`// Production-ready code example
@Composable
fun ExampleComponent() {
    // Real implementation here
}`}
            </CodeBlock>
            
            {/* Explanation content */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Key Points:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Specific learning point with practical value</li>
                <li>• Another key concept for production use</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Related Resources - REQUIRED */}
      <section className="space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">関連リソース</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-green-900">🔗 Next Steps</h4>
              <p className="text-sm text-green-700 mb-2">Continue your learning journey</p>
              <a href="/next-page" className="text-green-600 hover:text-green-800 underline text-sm font-medium">
                📚 Advanced Implementation Guide
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Navigation - REQUIRED */}
      <section className="flex justify-between items-center py-8 border-t">
        <Link to="/previous-page">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            前のページ: Previous Topic
          </Button>
        </Link>
        <Link to="/next-page">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-android-green to-android-blue text-white">
            次のページ: Next Topic
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>
    </div>
  )
}
```

### **Code Comparison Pattern**
```typescript
// For React/Flutter → Compose comparisons
const ExampleComparison = () => (
  <Card>
    <CardHeader>
      <CardTitle>Framework Migration Example</CardTitle>
      <CardDescription>
        React/Flutter developers: Here's how your existing knowledge translates
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ComparisonCode 
        reactCode={`// React Pattern
const [user, setUser] = useState(null);

useEffect(() => {
  loadUser().then(setUser);
}, []);`}
        
        composeCode={`// Jetpack Compose Pattern  
var user by remember { mutableStateOf<User?>(null) }

LaunchedEffect(Unit) {
    user = loadUser()
}`}
        
        title="State Management Comparison"
      />
    </CardContent>
  </Card>
);
```

### **Learning Progression Card Pattern**
```typescript
const LearningSteps = () => (
  <div className="space-y-4">
    {steps.map((step, index) => (
      <Card key={index} className="hover:shadow-md transition-all duration-300">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-android-green to-android-blue flex items-center justify-center text-white font-bold">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
            <div className="text-xs text-blue-600 mt-1">
              ⏱️ {step.timeEstimate}
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </CardContent>
      </Card>
    ))}
  </div>
);
```

## 📝 **CONTENT PATTERNS**

### **Educational Content Structure**
```yaml
Required Sections:
  1. Hero Section:
     - Learning objective
     - Time estimate
     - Prerequisites with links
  
  2. Main Content:
     - Concept introduction
     - Code examples (production-ready)
     - Key points and practical applications
  
  3. Related Resources:
     - Cross-references to complementary topics
     - Next steps in learning progression
  
  4. Navigation:
     - Previous/Next page navigation
     - Learning flow continuity

Optional Sections:
  - Comparison with React/Flutter
  - Best practices and common pitfalls  
  - Real-world implementation examples
  - Advanced topics preview
```

### **Cross-Reference Pattern**
```typescript
const CrossReference = ({ title, description, href, icon }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 className="font-medium text-blue-900 flex items-center gap-2">
      {icon} {title}
    </h4>
    <p className="text-sm text-blue-700 mb-2">{description}</p>
    <a href={href} className="text-blue-600 hover:text-blue-800 underline text-sm font-medium">
      詳細を見る →
    </a>
  </div>
);

// Usage in educational content:
<CrossReference 
  title="状態管理の詳細比較"
  description="LiveData vs Flow vs State の技術的な違いと選択基準"
  href="/state-comparison"
  icon="📊"
/>
```

## 🎨 **STYLING PATTERNS**

### **Educational Color Scheme Usage**
```css
/* Primary Android branding */
.android-primary {
  @apply bg-gradient-to-r from-android-green to-android-blue;
}

/* Framework comparison colors */
.react-section {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}

.flutter-section {
  @apply bg-blue-50 border-blue-300 text-blue-900;
}

.compose-section {
  @apply bg-green-50 border-green-200 text-green-800;
}

/* Educational content backgrounds */
.concept-card {
  @apply bg-gradient-to-br from-android-green/5 to-android-blue/5;
}

.learning-highlight {
  @apply bg-gradient-to-r from-kotlin-purple/10 to-purple-100;
}
```

### **Responsive Educational Layout**
```css
/* Code examples mobile-first */
.code-example {
  @apply text-xs overflow-x-auto;
}

@screen md {
  .code-example {
    @apply text-sm;
  }
}

/* Educational card layouts */
.educational-grid {
  @apply grid gap-6;
  @apply md:grid-cols-2;
  @apply lg:grid-cols-3;
}

/* Learning progression layout */
.learning-flow {
  @apply space-y-4;
  @apply max-w-3xl mx-auto;
}
```

## 🔧 **DEVELOPMENT WORKFLOWS**

### **Adding New Educational Content**
```bash
# 1. Plan content structure
echo "Planning educational objective and prerequisites..."

# 2. Check for existing content overlap
grep -r "new_concept_keywords" src/pages/
echo "Content overlap check completed"

# 3. Create page with standard template
# Use Educational Page Template above

# 4. Add code examples with proper highlighting
echo "Ensuring all code examples are production-ready"

# 5. Implement cross-references
echo "Adding navigation and related resources"

# 6. Validate build
pnpm run build
echo "Build validation completed"
```

### **Content Update Workflow**
```bash
# 1. Identify primary content location
echo "Finding authoritative page for concept..."

# 2. Update primary page
echo "Updating main educational content..."

# 3. Update cross-references
grep -r "concept_reference" src/pages/
echo "Cross-reference updates completed"

# 4. Validate navigation flow
echo "Testing educational progression..."

# 5. Build and verify
pnpm run build
echo "Content update validation completed"
```

### **Quality Assurance Workflow**
```bash
# Educational content validation
echo "Validating educational content quality..."

# Check for production-ready code examples
grep -r "// TODO\|// FIXME\|placeholder" src/pages/ && echo "❌ Found placeholder code" || echo "✅ No placeholder code found"

# Check for proper cross-referencing
grep -r "href=\|to=" src/pages/ | grep -v "http" && echo "✅ Internal links found" || echo "⚠️ No internal links"

# Check mobile responsiveness
echo "📱 Manual mobile responsive check required"

# Validate build
pnpm run build && echo "✅ Build successful" || echo "❌ Build failed"
```

## 📊 **PERFORMANCE PATTERNS**

### **Bundle Size Optimization**
```typescript
// Lazy loading for heavy educational content
const HeavyEducationalComponent = lazy(() => import('./HeavyEducationalComponent'));

// Code splitting for different learning paths
const AndroidBasicsPath = lazy(() => import('./AndroidBasicsPath'));
const AdvancedPath = lazy(() => import('./AdvancedPath'));

// Lazy syntax highlighting
const CodeBlock = lazy(() => import('@/components/CodeBlock'));
```

### **Educational Content Performance**
```typescript
// Optimize code example rendering
const MemoizedCodeBlock = memo(CodeBlock);

// Optimize learning progression rendering
const LearningSteps = useMemo(() => 
  steps.map(step => ({ ...step, id: step.title })), [steps]
);

// Optimize cross-reference navigation
const useEducationalNavigation = () => {
  return useMemo(() => ({
    previous: getPreviousPage(),
    next: getNextPage(),
    related: getRelatedPages()
  }), [currentPage]);
};
```

## 🧪 **TESTING PATTERNS**

### **Educational Content Testing**
```typescript
// Content accuracy testing
describe('Educational Content', () => {
  test('code examples are syntactically correct', () => {
    // Validate Kotlin/Compose syntax
    // Validate React/Flutter syntax
  });
  
  test('cross-references work correctly', () => {
    // Test internal navigation links
    // Validate learning progression
  });
  
  test('mobile responsiveness', () => {
    // Test at multiple breakpoints
    // Validate code example readability
  });
});

// Learning progression testing
describe('Learning Flow', () => {
  test('prerequisites are met before advanced topics', () => {
    // Validate learning dependency chain
  });
  
  test('educational objectives are clear', () => {
    // Check for learning objective statements
    // Validate time estimates
  });
});
```

### **Code Example Validation**
```typescript
// Automated code example testing
const validateKotlinCode = (codeString) => {
  // Check for common Kotlin syntax errors
  // Validate Compose patterns
  // Ensure production-ready practices
};

const validateReactCode = (codeString) => {
  // Check for modern React patterns
  // Validate TypeScript usage
  // Ensure current best practices
};
```

## 📈 **ANALYTICS PATTERNS**

### **Educational Effectiveness Tracking**
```typescript
// Learning progression analytics
const trackLearningProgress = (page, timeSpent, completed) => {
  // Track educational engagement
  // Monitor learning completion rates
  // Identify content effectiveness
};

// Code example engagement
const trackCodeExampleUsage = (exampleId, action) => {
  // Track copy-paste rates
  // Monitor example effectiveness
  // Identify improvement opportunities
};
```

## 🔄 **MAINTENANCE PATTERNS**

### **Content Freshness Validation**
```bash
# Check for outdated Android/Kotlin patterns
echo "Checking for deprecated Android patterns..."
grep -r "@Deprecated\|deprecated" src/pages/

# Validate React/Flutter comparison accuracy
echo "Checking React/Flutter comparison accuracy..."
grep -r "useEffect\|useState\|Widget\|StatefulWidget" src/pages/

# Check for broken educational links
echo "Validating educational progression links..."
find src/pages -name "*.tsx" -exec grep -l "href=\|to=" {} \;
```

### **Performance Monitoring**
```bash
# Bundle size tracking
pnpm run build
ls -la dist/assets/ | sort -k5 -n

# Educational content load time
echo "Monitor code highlighting performance"
echo "Check mobile educational experience"

# Syntax highlighting optimization
grep -r "prism-react-renderer\|language=" src/
```

---

## 🎯 **PATTERN SELECTION GUIDE**

### **Choose the Right Pattern**

**For New Educational Pages:**
- Use Educational Page Template
- Include all required sections
- Follow content structure patterns

**For Code Examples:**
- Use CodeBlock for single language
- Use ComparisonCode for framework migrations
- Always include proper language attribution

**For Learning Progressions:**
- Use Learning Progression Card Pattern
- Include time estimates and prerequisites
- Provide clear navigation between steps

**For Cross-References:**
- Use Cross-Reference Pattern
- Link to authoritative content pages
- Avoid content duplication

**For Performance-Critical Content:**
- Apply Performance Patterns
- Use lazy loading for heavy components
- Optimize code example rendering

---

**🚀 SUCCESS METRIC**: Every pattern application should advance the educational objective of transforming React/Flutter developers into production-ready Android developers efficiently and effectively.