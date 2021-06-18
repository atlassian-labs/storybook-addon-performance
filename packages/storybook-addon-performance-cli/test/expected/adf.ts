export default {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Server',
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
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Render to string',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '2.90',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '2.90',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '11.90',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '310.38%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '11.90',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Render to static markup (cannot be hydrated)',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '2.20',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '2.20',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '10.56',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '380.05%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '10.56',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'String output size',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '1.90',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '1.90',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '184.64',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '9617.89%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '184.64',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'String output size (gzip)',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '0.15',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '0.15',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '41.16',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '27340.00%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '41.16',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Static markup output size',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '1.90',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '1.90',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '184.64',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '9617.89%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '184.64',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Static markup output size (gzip)',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '0.15',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '0.15',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '41.16',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '27340.00%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '41.16',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Client',
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
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Initial render',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '2.80',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '2.80',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '23.09',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '724.61%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '23.09',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Re render',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '0.30',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '0.30',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '1.68',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '461.67%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '1.68',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Hydrate',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '1.80',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '1.80',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '8.30',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '361.31%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '8.30',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'Complete render (mount + layout + paint)',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '4.80',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '4.80',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '55.24',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '1050.75%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '55.24',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'DOM element count',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '40.00',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '40.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '1475.00',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '3587.50%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '1475.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'DOM element count (no nested inline svg elements)',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '40.00',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '40.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '706.00',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '1665.00%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '706.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
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
                      text: 'React Fiber node count',
                      marks: [
                        {
                          type: 'strong',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '181.00',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '181.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: '3886.00',
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                    {
                      type: 'status',
                      attrs: {
                        text: '2046.96%',
                        color: 'red',
                        style: 'bold',
                      },
                    },
                    {
                      type: 'text',
                      text: ' ',
                    },
                  ],
                },
                {
                  type: 'nestedExpand',
                  attrs: {
                    title: 'Raw runs (1 times)',
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '3886.00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
