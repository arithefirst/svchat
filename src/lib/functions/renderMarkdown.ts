import markdownit from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

export default function renderMarkdown(input: string): string {
  const md = markdownit({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
  });

  md.disable(['image', 'table']);
  md.use(highlightjs);

  return md.render(input);
}
