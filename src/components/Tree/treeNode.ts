import { TreeLabelProps } from "./TreeLabel";

type TreeNode = {
  id: string;
  label: TreeLabelProps;
  isChecked?: boolean;
  childNodes?: TreeNode[];
};

export default TreeNode;
