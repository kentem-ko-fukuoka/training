import { useState } from "react";
import TreeItem from "./TreeItem";
import TreeNode from "./treeNode";
import {
  CheckableProps,
  DroppableProps,
  ExpandableProps,
  SelectableProps
} from "./treeProps";

export type DragInfo = {
  nodeId: string;
  previousNodeId: string | undefined;
};

type Props = {
  nodes: TreeNode | TreeNode[];
  selectableProps?: SelectableProps;
  expandableProps?: ExpandableProps;
  checkableProps?: CheckableProps;
  droppableProps?: DroppableProps;
};

const Tree = ({
  nodes,
  selectableProps,
  expandableProps,
  checkableProps,
  droppableProps
 }: Props) => {

  if (!Array.isArray(nodes)) {
    nodes = [nodes];
  }

  const [dragInfo, setDragInfo] = useState<DragInfo>({
    nodeId: '',
    previousNodeId: ''
  });

  const handleDragStart = (
    nodeId: string,
    previousNodeId: string | undefined
  ) => {
    setDragInfo(prev => ({ ...prev, nodeId, previousNodeId }));
  };

  return (
    <div role='list'>
      {nodes.map((node) => (
        <TreeItem
          node={node}
          selectableProps={selectableProps}
          expandableProps={expandableProps}
          checkableProps={checkableProps}
          droppableProps={droppableProps}
          dragInfo={dragInfo}
          onDragStart={handleDragStart}
          previousNodeId={undefined}
          key={node.id}
        />
      ))}
    </div>
  );
}

export default Tree;
