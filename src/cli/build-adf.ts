export const buildAdf = (content: any) => ({
  version: 1,
  type: 'doc',
  content,
});

export const buildTable = (heading: string, rows: any[]) => [
  {
    type: 'heading',
    attrs: {
      level: 2,
    },
    content: [
      {
        type: 'text',
        text: heading + ' ',
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
      ...rows,
    ],
  },
];

export const buildNameCell = (key: string) => {
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
  medianValue: number,
  numberOfSamples: number,
  samples: number[],
) => {
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
