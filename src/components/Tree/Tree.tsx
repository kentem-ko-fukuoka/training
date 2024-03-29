import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState
} from "react";
import TreeItem from "./TreeItem";
import TreeNode from "./treeNode";
import {
  CheckableProps,
  DroppableProps,
  ExpandableProps,
  SelectableProps
} from "./treeProps";
import {
  getNode,
  getOrderedNodeIds,
  getParentNodeId,
  getText
} from "./treeUtil";

export type DragNode = {
  id: string;
  parentId: string | undefined;
  previousId: string | undefined;
  nextId: string | undefined;
};

export type EditInfo = {
  id: string;
  text: string;
}

type Props = {
  nodes: TreeNode[];
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

  const [dragNode, setDragNode] = useState<DragNode>({
    id: '',
    parentId: '',
    previousId: '',
    nextId: ''
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
    });
  };

  const orderedNodeIds = getOrderedNodeIds(nodes, expandableProps?.nodeIds);

  const [editInfo, setEditInfo] = useState<EditInfo | null>(null);

  const handleEdit: ChangeEventHandler<HTMLInputElement> = (e) => {

    if (!selectableProps?.nodeId) {
      return;
    }

    setEditInfo({ id: selectableProps.nodeId, text: e.target.value });
  };

  const handleClickLabel = () => {

    if (!selectableProps || !selectableProps.nodeId) {
      return;
    }

    if (!selectableProps.editableProps) {
      return;
    }

    const selectedNodeId = selectableProps.nodeId;

    const text = getText(nodes, selectedNodeId);
    setEditInfo({ id: selectedNodeId, text });
    return;
  };

  const handleKeyDownOnLabelInput: KeyboardEventHandler = (e) => {

    e.stopPropagation();

    if (
      !selectableProps ||
      !selectableProps.nodeId ||
      !selectableProps.editableProps
    ) {
      return;
    }

    if (!editInfo) {
      return;
    }

    if (e.key === 'Escape') {
      setEditInfo(null);
      return;
    }

    if (e.key === 'Enter') {

      selectableProps.editableProps.onEdit(editInfo.text);
      setEditInfo(null);

      const selectedId = selectableProps.nodeId;
      const selectedIndex = orderedNodeIds.findIndex(id => id === selectedId);

      if (selectedIndex !== orderedNodeIds.length - 1) {
        selectableProps.onSelect(orderedNodeIds[selectedIndex + 1]);
      }
    }
  };

  const handleClickOutOfInput = () => {

    if (
      !selectableProps ||
      !selectableProps.nodeId ||
      !selectableProps.editableProps
    ) {
      return;
    }

    if (!editInfo) {
      return;
    }

    selectableProps.editableProps.onEdit(editInfo.text);
    setEditInfo(null);
  };

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (!selectableProps || !selectableProps.nodeId) {
        return;
      }

      const selectedNodeId = selectableProps.nodeId;

      if (e.key === 'ArrowUp') {

        const index = orderedNodeIds.findIndex(id => id === selectedNodeId);

        if (index !== 0) {
          selectableProps.onSelect(orderedNodeIds[index - 1]);
        }

        return;
      }

      if (e.key === 'ArrowDown') {

        const index = orderedNodeIds.findIndex(id => id === selectedNodeId);

        if (index !== orderedNodeIds.length - 1) {
          selectableProps.onSelect(orderedNodeIds[index + 1]);
        }

        return;
      }

      if (e.key === 'ArrowRight') {

        if (!getNode(nodes, selectedNodeId)?.childNodes) {
          return;
        }

        if (!expandableProps?.nodeIds.includes(selectedNodeId)) {
          expandableProps?.onToggle(selectedNodeId);
        }

        return;
      }

      if (e.key === 'ArrowLeft') {

        if (expandableProps?.nodeIds.includes(selectedNodeId)) {
          expandableProps?.onToggle(selectedNodeId);
          return;
        }

        const parentId = getParentNodeId(nodes, selectedNodeId);
        parentId && selectableProps.onSelect(parentId);
        return;
      }

      if (!selectableProps.editableProps) {
        return;
      }

      if (e.key === 'F2') {
        const text = getText(nodes, selectedNodeId);
        setEditInfo({ id: selectedNodeId, text });
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown, false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nodes, selectableProps?.nodeId, orderedNodeIds]);

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
  }, [editInfo?.id, editInfo?.text]);

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
            onClickLabel={handleClickLabel}
            editInfo={editInfo}
            onEditText={handleEdit}
            onKeyDownInInput={handleKeyDownOnLabelInput}
            key={node.id}
          />
        )
      })}
    </div>
  );
}

export default Tree;
