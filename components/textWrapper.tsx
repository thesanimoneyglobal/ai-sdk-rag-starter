import { log } from 'console';
import { ClipboardCheck, Copy } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';


// Function to convert markdown-like text to HTML
const convertToHTML = (text: string) => {
  // Convert headers (### for h3)
  let html = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');

  // Convert bold text (**text**)
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');

  // Convert new lines to <br /> or wrap in <p> tags for paragraphs
  html = html.replace(/\n/gim, '<br />');

  // Optional: Convert list items (- item)
  html = html.replace(/- (.*$)/gim, '<li>$1</li>');

  // Optional: Wrap list items in <ul> tags
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');

  return html.trim();
};

export const DynamicTextRenderer = ({ text }: {text: string }) => {
  const htmlContent = convertToHTML(text);

  const sqlRegex = /```sql\n([\s\S]*?)```/;
  const match = text.match(sqlRegex);

  const [sqlCodeCopy, setSqlCodeCopy] = useState<string | null>(null);
  console.log(sqlCodeCopy)

  if (match) {
    const [fullMatch, sqlCode] = match;
    const parts = text.split(fullMatch);

    const onCopy = () => {
      navigator.clipboard.writeText(sqlCode.trim())
      setSqlCodeCopy(sqlCode.trim())
      console.log(sqlCode.trim())
    }

    return (
      <div>
        {parts[0]}
        <div className="relative">
          <SyntaxHighlighter customStyle={{ fontSize: '12px', borderRadius: '5px' }} language="sql" style={tomorrow}>
            {sqlCode.trim()}
          </SyntaxHighlighter>
          <button
            className={`absolute top-2 right-2 p-1 ${sqlCodeCopy !== null ? 'bg-blue-200' : 'bg-zinc-200 hover:bg-gray-100'} rounded-md shadow-sm`}
            onClick={onCopy}>
            {sqlCodeCopy !== null ? <ClipboardCheck size={16} /> : <Copy size={16} />}
          </button>
        </div>
        {parts[1]}
      </div>
    );
};
return (
  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
);
}
