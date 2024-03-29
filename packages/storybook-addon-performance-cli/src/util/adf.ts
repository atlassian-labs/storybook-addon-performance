import { Calculation, CalculationWithDiff } from '../types';

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
                    text: 'Current state',
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

export const buildTableRows = (result: CalculationWithDiff | Calculation): Content => {
  const name = buildNameCell(result.key);

  if ('diffPercentage' in result) {
    const { baseline, current, diffPercentage } = result;
    return {
      type: 'tableRow',
      content: [name, buildResultCell(baseline), buildResultCell(current, diffPercentage)],
    };
  }

  const missingBaseline = {
    medianValue: 0,
    numberOfSamples: 0,
    samples: [0],
    minValue: 0,
    maxValue: 0,
    meanValue: 0,
  };

  return {
    type: 'tableRow',
    content: [name, buildResultCell(missingBaseline), buildResultCell(result)],
  };
};

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
                text: samples.map((num: number) => num && num.toFixed(2)).join('\t'),
              },
            ],
          },
        ],
      },
    ],
  };
};

const getStatusColor = (diff: number) => {
  if (diff < 0) {
    return 'green';
  } else if (diff > 0) {
    return 'red';
  }

  return 'neutral';
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
        color: getStatusColor(diff),
        style: 'bold',
      },
    },
    {
      type: 'text',
      text: ' ',
    },
  ];
};
