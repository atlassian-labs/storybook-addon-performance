import { Calculation } from './types';

interface Attributes {
  title?: string;
  text?: string;
  color?: string;
  style?: string;
  background?: string;
  isNumberColumnEnabled?: boolean;
  layout?: string;
}

export interface Content {
  type: string;
  attrs?: Attributes;
  text?: string;
  content?: Content[];
  marks?: {
    type: string;
  }[];
}

export const buildAdf = (content: Content[]) => ({
  version: 1,
  type: 'doc',
  content,
});

export const buildTable = (heading: string, tableRows: Content[]) => [
  {
    type: 'heading',
    attrs: {
      level: 2,
    },
    content: [
      {
        type: 'text',
        text: heading,
      },
    ],
  },
  {
    type: 'table',
    attrs: {
      isNumberColumnEnabled: false,
      layout: 'default',
    },
    content: [
      {
        type: 'tableRow',
        content: [
          {
            type: 'tableHeader',
            content: [
              {
                type: 'paragraph',
                content: [],
              },
            ],
          },
          {
            type: 'tableHeader',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Baseline',
                    marks: [
                      {
                        type: 'strong',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This should test the component before any changes.',
                    marks: [
                      {
                        type: 'subsup',
                        attrs: {
                          type: 'sup',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableHeader',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Lite mode',
                    marks: [
                      {
                        type: 'strong',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'This should test the fully converted component.',
                    marks: [
                      {
                        type: 'subsup',
                        attrs: {
                          type: 'sup',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      ...tableRows,
    ],
  },
];

export const buildNameCell = (key: string): Content => {
  return {
    type: 'tableCell',
    attrs: {
      background: '#f4f5f7',
    },
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: key,
            marks: [
              {
                type: 'strong',
              },
            ],
          },
        ],
      },
    ],
  };
};

export const buildResultCell = (
  { medianValue, numberOfSamples, samples }: Omit<Calculation, 'key'>,
  diff?: number,
): Content => {
  return {
    type: 'tableCell',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: medianValue.toFixed(2),
          },
          ...buildDiffStatus(diff),
        ],
      },
      {
        type: 'nestedExpand',
        attrs: {
          title: `Raw runs (${numberOfSamples} times)`,
        },
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: samples.map((num: number) => num.toFixed(2)).join('\t'),
              },
            ],
          },
        ],
      },
    ],
  };
};

const buildDiffStatus = (diff?: number) => {
  if (!diff) {
    return [];
  }

  return [
    {
      type: 'text',
      text: ' ',
    },
    {
      type: 'status',
      attrs: {
        text: String(diff.toFixed(2)) + '%',
        color: 'neutral',
        style: 'bold',
      },
    },
    {
      type: 'text',
      text: ' ',
    },
  ];
};
