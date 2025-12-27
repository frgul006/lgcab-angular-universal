export interface PageComponent {
  slug?: string;
  title: string;
  preamble: string | null;
  content: string; // markdown
}
