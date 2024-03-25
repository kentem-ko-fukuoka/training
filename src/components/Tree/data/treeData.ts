import TreeNode from "../treeNode";

const node: TreeNode = {
  id: '1',
  label: '1',
  childNodes: [
    {
      id: '1-1',
      label: '1-1',
      childNodes: [
        {
          id: '1-1-1',
          label: '1-1-1',
        },
        {
          id: '1-1-2',
          label: '1-1-2'
        },
        {
          id: '1-1-3',
          label: '1-1-3'
        }
      ]
    },
    {
      id: '1-2',
      label: '1-2',
      childNodes: [
        {
          id: '1-2-1',
          label: '1-2-1',
          childNodes: [
            {
              id: '1-2-1-1',
              label: '1-2-1-1'
            },
            {
              id: '1-2-1-2',
              label: '1-2-1-2'
            },
            {
              id: '1-2-1-3',
              label: '1-2-1-3'
            }
          ]
        },
        {
          id: '1-2-2',
          label: '1-2-2'
        },
        {
          id: '1-2-3',
          label: '1-2-3'
        }
      ]
    },
    {
      id: '1-3',
      label: '1-3',
      childNodes: [
        {
          id: '1-3-1',
          label: '1-3-1',
        },
        {
          id: '1-3-2',
          label: '1-3-2'
        },
        {
          id: '1-3-3',
          label: '1-3-3'
        }
      ]
    }
  ]
}

export default node;
