import { ChangeEventHandler, useEffect, useRef, useState } from "react";
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

export type EditInfo = {
  id: string | undefined;
  text: string;
}

const EDIT_INFO_INITIAL = {
  id: undefined,
  text: ''
} as const satisfies EditInfo;

const getText = (nodes: TreeNode[], nodeId: string) => {

  let text = '';

  nodes.forEach((node) => {

    if (!node.childNodes) {
      return;
    }

    const index = node.childNodes.findIndex(child => child.id === nodeId);

    if (index === -1) {

      const childText = getText(node.childNodes, nodeId);

      if (childText !== '') {
        text = childText;
      }

      return;
    }

    text = node.childNodes[index].label.text;
  });

  return text;
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

  const [editInfo, setEditInfo] = useState<EditInfo>(EDIT_INFO_INITIAL);

  const handleEdit: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditInfo(prev => ({ ...prev, text: e.target.value }));
  };

  const handleClickOutOfInput = () => {

    if (
      !selectableProps ||
      !selectableProps.nodeId ||
      !selectableProps.editableProps
    ) {
      return;
    }

    if (!editInfo.id) {
      return;
    }

    selectableProps.editableProps.onEdit(editInfo.text);
    setEditInfo(EDIT_INFO_INITIAL);
  };

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (
        !selectableProps ||
        !selectableProps.nodeId ||
        !selectableProps.editableProps
      ) {
        return;
      }

      if (editInfo.id === undefined && e.key === 'F2') {

        const nodeId = selectableProps.nodeId;
        const text = Array.isArray(nodes)
          ? getText(nodes, nodeId)
          : getText([nodes], nodeId);

        setEditInfo({ id: nodeId, text });
        return;
      }

      if (editInfo.id !== undefined) {

        if (e.key === 'Escape') {
          setEditInfo(EDIT_INFO_INITIAL);
          return;
        }

        if (e.key === 'Enter') {
          selectableProps.editableProps.onEdit(editInfo.text.trim());
          setEditInfo(EDIT_INFO_INITIAL);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);

    return (() => {
      document.removeEventListener('keydown', handleKeyDown);
    });
  }, [nodes, selectableProps?.nodeId, editInfo.id, editInfo.text]);

  const treeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutsideTree = (e: MouseEvent) => {
      if (treeRef.current && !treeRef.current.contains((e.target as Node))) {
        handleClickOutOfInput();
      }
    };

    document.addEventListener('mousedown', handleClickOutsideTree, false);

    return (() => {
      document.removeEventListener('mousedown', handleClickOutsideTree);
    });
  }, [editInfo.id, editInfo.text]);

  return (
    <div role='list' onClick={handleClickOutOfInput} ref={treeRef}>
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
            parentNodeId={undefined}
            previousNodeId={isFirst ? undefined : nodes[i - 1].id}
            nextNodeId={isLast ? undefined : nodes[i + 1].id}
            ancestorNodeIds={[]}
            dragNode={dragNode}
            onDragStart={handleDragStart}
            editInfo={editInfo}
            onEditText={handleEdit}
            key={node.id}
          />
        )
      })}
    </div>
  );
}

export default Tree;
