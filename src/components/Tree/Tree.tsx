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
  getOrderedNodeIds,
  getParentNodeId,
  getText,
  hasChild
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
};

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

  const editableProps = selectableProps?.editableProps;

  const selectedNodeId = selectableProps?.nodeId;

  const expandedNodeIds = expandableProps?.nodeIds;
  const orderedNodeIds = getOrderedNodeIds(nodes, expandedNodeIds);

  const [editInfo, setEditInfo] = useState<EditInfo | null>(null);

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

  const handleEdit: ChangeEventHandler<HTMLInputElement> = (e) => {

    if (!selectedNodeId) {
      return;
    }

    setEditInfo({ id: selectedNodeId, text: e.target.value });
  };

  const handleClickLabel = () => {

    if (!selectedNodeId) {
      return;
    }

    if (!editableProps) {
      return;
    }

    const text = getText(nodes, selectedNodeId);
    setEditInfo({ id: selectedNodeId, text });
    return;
  };

  const handleKeyDownOnLabelInput: KeyboardEventHandler = (e) => {

    e.stopPropagation();

    if (!selectedNodeId) {
      return;
    }

    if (!editableProps) {
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

      editableProps.onEdit(editInfo.text);
      setEditInfo(null);

      const index = orderedNodeIds.findIndex(id => id === selectedNodeId);

      if (index !== orderedNodeIds.length - 1) {
        selectableProps.onSelect(orderedNodeIds[index + 1]);
      }
    }
  };

  const handleClickOutOfInput = () => {

    if (!selectedNodeId) {
      return;
    }

    if (!editableProps) {
      return;
    }

    if (!editInfo) {
      return;
    }

    editableProps.onEdit(editInfo.text);
    setEditInfo(null);
  };

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (!selectedNodeId) {
        return;
      }

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

        if (!hasChild(nodes, selectedNodeId)) {
          return;
        }

        if (!expandedNodeIds?.includes(selectedNodeId)) {
          expandableProps?.onToggle(selectedNodeId);
        }

        return;
      }

      if (e.key === 'ArrowLeft') {

        if (expandedNodeIds?.includes(selectedNodeId)) {
          expandableProps?.onToggle(selectedNodeId);
          return;
        }

        const parentId = getParentNodeId(nodes, selectedNodeId);
        parentId && selectableProps.onSelect(parentId);
        return;
      }

      if (!editableProps) {
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
  }, [nodes, selectedNodeId, editableProps, orderedNodeIds]);

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
