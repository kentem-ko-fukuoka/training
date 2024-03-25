import { useState } from "react";
import TreeContext, { TreeContextProps } from "./TreeContext";
import TreeItem from "./TreeItem";
import TreeNode from "./treeNode";

export type DragInfo = {
  nodeId: string;
  previousNodeId: string | undefined;
}

type Props = {
  nodes: TreeNode | TreeNode[];
} & TreeContextProps;

const Tree = ({
  nodes,
  selectedNodeId,
  onSelect,
  expandedNodeIds,
  onToggle,
  onDrop
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
    setDragInfo({ nodeId, previousNodeId });
  };

  return (
    <TreeContext.Provider
      value={{
        selectedNodeId,
        onSelect,
        expandedNodeIds,
        onToggle,
        onDrop
      }}
    >
      <div role='list'>
        {nodes.map((node) => (
          <TreeItem
            node={node}
            dragInfo={dragInfo}
            onDragStart={handleDragStart}
            previousNodeId={undefined}
            key={node.id}
          />
        ))}
      </div>
    </TreeContext.Provider>
  );
}

export default Tree;
