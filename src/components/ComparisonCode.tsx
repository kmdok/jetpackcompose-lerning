import { Highlight, themes } from 'prism-react-renderer'

interface ComparisonCodeProps {
  reactCode?: string
  flutterCode?: string
  composeCode?: string
  title?: string
}

export default function ComparisonCode({ reactCode, flutterCode, composeCode, title }: ComparisonCodeProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="text-lg font-semibold mb-4">{title}</h4>}
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* React/Flutter Code */}
        {reactCode && (
          <div>
            <div className="text-sm font-medium text-blue-700 mb-2">React</div>
            <Highlight theme={themes.github} code={reactCode.trim()} language="javascript">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} text-sm p-4 rounded-lg overflow-x-auto bg-blue-50 border border-blue-200`} style={style}>
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
          </div>
        )}
        
        {flutterCode && (
          <div>
            <div className="text-sm font-medium text-blue-700 mb-2">Flutter</div>
            <Highlight theme={themes.github} code={flutterCode.trim()} language="dart">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} text-sm p-4 rounded-lg overflow-x-auto bg-blue-50 border border-blue-200`} style={style}>
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
          </div>
        )}
        
        {/* Compose Code */}
        {composeCode && (
          <div className={reactCode || flutterCode ? "md:col-span-2" : ""}>
            <div className="text-sm font-medium text-green-700 mb-2">Jetpack Compose</div>
            <Highlight theme={themes.github} code={composeCode.trim()} language="kotlin">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} text-sm p-4 rounded-lg overflow-x-auto bg-green-50 border border-green-200`} style={style}>
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
          </div>
        )}
      </div>
    </div>
  )
}