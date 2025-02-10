import markdownit from 'markdown-it';

export default function renderMarkdown(input: string): string {
  const md = markdownit({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
  }).disable(['image', 'table']);

  return md.render(input);
}
