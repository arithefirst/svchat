import markdownit from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import mila from 'markdown-it-link-attributes';

export default function renderMarkdown(input: string): string {
  const md = markdownit({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
  });

  md.disable(['image', 'table']);
  md.use(highlightjs);
  md.use(mila, {
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  });

  return md.render(input);
}
