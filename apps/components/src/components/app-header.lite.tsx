import { useStore } from '@builder.io/mitosis';
import { frameworks, examples } from '../links.js';
import type { Framework, Example } from '../links.js';

export interface HeaderProps {
  framework: string;
  path: string;
}

export default function AppHeader(props: HeaderProps) {
  const state = useStore({
    getStyleForFrameworkLink(link: Framework) {
      return {
        color:
          props.framework === link.name ? 'var(--primary)' : 'var(--gray-3)',
      };
    },
    getStyleForExampleLink(link: Example) {
      return {
        color: link.url === props.path ? 'var(--primary)' : 'var(--gray-3)',
      };
    },
  });

  return (
    <div>
      {/* TODO: maybe some global style component, or use css={{}} obj with some @global or something */}
      <style jsx>{`
        :root {
          /* Space */
          --s1: 5px;
          --s2: calc(var(--s1) * 2);
          --gray-1: #eee;
          --gray-2: #bbb;
          --gray-3: #999;
          --gray-4: #666;
          --border-gray: 1px solid var(--gray-2);
          --shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
          --round: 4px;
          --primary: rgb(26, 115, 232);
          --mobile: 640px;
          --font-medium: 400;
        }

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
          font-family: Avenir, Helvetica, sans-serif;
        }

        a {
          text-decoration: none;
        }
      `}</style>
      <div
        css={{
          backgroundColor: '$gray-1',
          borderBottom: '$border-gray',
          display: 'flex',
          padding: '$s1',
          marginBottom: 'var(--s2)',
          '@media (max-width: %mobile)': {
            flexDirection: 'column',
          },
        }}
      >
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '$s1',
            textTransform: 'capitalize',
            '@media (max-width: %mobile)': {
              borderBottom: 'var(--border-gray)',
              justifyContent: 'center',
            },
          }}
        >
          {frameworks.map((link) => (
            <a
              css={{
                padding: '$s1',
                fontWeight: '$font-medium',
                '&:hover': {
                  color: '$gray-4',
                },
              }}
              href={link.url + (props.path || '/')}
              style={state.getStyleForFrameworkLink(link)}
            >
              {link.text || link.name}
            </a>
          ))}
        </div>
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            textTransform: 'capitalize',
            padding: '$s1',
            marginLeft: 'auto',
            justifyContent: 'flex-end',
            '@media (max-width: %mobile)': {
              marginRight: 'auto',
              justifyContent: 'center',
            },
            '&:hover': {
              color: '$gray-4',
            },
          }}
        >
          {examples.map((example) => (
            <a
              css={{
                padding: '$s1',
                fontWeight: '$font-medium',
              }}
              href={example.url}
              style={state.getStyleForExampleLink(example)}
            >
              {example.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
