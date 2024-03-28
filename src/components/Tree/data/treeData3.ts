import TreeNode from "../treeNode";
import { LiaBuilding } from 'react-icons/lia';
import { BiAtom } from "react-icons/bi";

const nodes: TreeNode[] = [{
  id: '1',
  label: { text: '1' },
  childNodes: [
    {
      id: '1-1',
      label: { text: '1-1' },
      childNodes: [
        {
          id: '1-1-1',
          label: { text: '1-1-1' },
          isChecked: false
        },
        {
          id: '1-1-2',
          label: { iconType: LiaBuilding, text: '1-1-2' }
        },
        {
          id: '1-1-3',
          label: { iconType: LiaBuilding, text: '1-1-3' },
          isChecked: true
        }
      ]
    },
    {
      id: '1-2',
      label: { text: '1-2'},
      childNodes: [
        {
          id: '1-2-1',
          label: { iconType: LiaBuilding, text: '1-2-1' },
          isChecked: true,
          childNodes: [
            {
              id: '1-2-1-1',
              label: { text: '1-2-1-1' }
            },
            {
              id: '1-2-1-2',
              label: { text: '1-2-1-2' }
            },
            {
              id: '1-2-1-3',
              label: { text: '1-2-1-3' }
            }
          ]
        },
        {
          id: '1-2-2',
          label: { text: '1-2-2' }
        },
        {
          id: '1-2-3',
          label: { text: '1-2-3' }
        }
      ]
    },
    {
      id: '1-3',
      label: { iconType: BiAtom, text: '1-3'},
      childNodes: [
        {
          id: '1-3-1',
          label: { iconType: BiAtom, text: '1-3-1' },
          isChecked: false
        },
        {
          id: '1-3-2',
          label: { text: '1-3-2' },
          isChecked: true
        },
        {
          id: '1-3-3',
          label: { text: '1-3-3' }
        }
      ]
    }
  ]
}];

export default nodes;
