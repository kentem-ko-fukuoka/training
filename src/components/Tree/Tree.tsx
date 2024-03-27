import { useState } from "react";
import TreeItem from "./TreeItem";
import TreeNode from "./treeNode";
import {
  CheckableProps,
  DroppableProps,
  ExpandableProps,
  SelectableProps
} from "./treeProps";

export type DragNode = {
  id: string;
  parentId: string | undefined;
  previousId: string | undefined;
  nextId: string | undefined;
  isRootNode: boolean;
  isFirstNode: boolean;
  isLastNode: boolean;
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

  const [dragNode, setDragNode] = useState<DragNode>({
    id: '',
    parentId: '',
    previousId: '',
    nextId: '',
    isRootNode: false,
    isFirstNode: false,
    isLastNode: false
  });

  const handleDragStart = (
    id: string,
    parentId: string | undefined,
    previousId: string | undefined,
    nextId: string | undefined
  ) => {
    setDragNode({
      id,
      parentId,
      previousId,
      nextId,
      isRootNode: parentId === undefined,
      isFirstNode: previousId === undefined,
      isLastNode: nextId === undefined
    });
  };

  return (
    <div role='list'>
      {nodes.map((node, i, nodes) => {
        const isFirst = i === 0;
        const isLast = i === nodes.length - 1;
        return (
          <TreeItem
            node={node}
            selectableProps={selectableProps}
            expandableProps={expandableProps}
            checkableProps={checkableProps}
            droppableProps={droppableProps}
            dragNode={dragNode}
            onDragStart={handleDragStart}
            parentNodeId={undefined}
            previousNodeId={isFirst ? undefined : nodes[i - 1].id}
            nextNodeId={isLast ? undefined : nodes[i + 1].id}
            ancestorNodeIds={[]}
            key={node.id}
          />
        )
      })}
    </div>
  );
}

export default Tree;
