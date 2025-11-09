import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export default function CodeBlock({ children, language = 'kotlin', className = '' }: CodeBlockProps) {
  const code = children.trim()
  
  return (
    <Highlight
      theme={themes.github}
      code={code}
      language={language}
    >
      {({ className: prismClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${prismClassName} ${className} text-xs sm:text-sm p-2 sm:p-4 rounded-lg overflow-x-auto border whitespace-pre-wrap sm:whitespace-pre`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}