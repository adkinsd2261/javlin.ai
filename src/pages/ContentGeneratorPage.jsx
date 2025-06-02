import React from 'react';
import ToolPageTemplate from '../components/ToolPageTemplate';

export default function ContentGeneratorPage() {
  const mockContentGen = async (prompt) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          generatedText:
            'Here’s an engaging blog intro: Welcome to the future of web analytics! In this post, we explore how Javlin.ai transforms your website insights...',
        });
      }, 1500)
    );
  };

  return (
    <ToolPageTemplate
      title="Content Generator"
      description="Generate AI-powered content for your site, from blog intros to product descriptions."
      onSubmit={mockContentGen}
    >
      {(result) => (
        <div>
          <h2 className="text-lg font-semibold mb-2">Generated Content</h2>
          <p className="bg-gray-800 p-4 rounded">{result.generatedText}</p>
        </div>
      )}
    </ToolPageTemplate>
  );
}

