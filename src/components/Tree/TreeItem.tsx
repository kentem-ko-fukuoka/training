/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  DragEvent,
  DragEventHandler,
  KeyboardEventHandler,
  useRef,
  useState
} from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { DragNode, EditInfo } from "./Tree";
import TreeLabel from "./TreeLabel";
import TreeNode from "./treeNode";
import {
  CheckableProps,
  DroppableProps,
  ExpandableProps,
  SelectableProps
} from "./treeProps";

type DroppableState = {
  prevBlank: boolean;
  thisItem: boolean;
  nextBlank: boolean;
  nextParent: boolean;
};

const UNDROPPABLE = {
  prevBlank: false,
  thisItem: false,
  nextBlank: false,
  nextParent: false
} as const satisfies DroppableState;

type Props = {
  node: TreeNode;
  selectableProps?: SelectableProps,
  expandableProps?: ExpandableProps,
  checkableProps?: CheckableProps,
  droppableProps?: DroppableProps,
  parentNodeId: string | undefined;
  previousNodeId: string | undefined;
  nextNodeId: string | undefined;
  ancestorNodeIds: string[];
  dragNode: DragNode;
  onDragStart: (
    nodeId: string,
    parentNodeId: string | undefined,
    previousNodeId: string | undefined,
    nextNodeId: string | undefined
  ) => void;
  onClickLabel: () => void;
  editInfo: EditInfo;
  onEditText: ChangeEventHandler<HTMLInputElement>;
  onKeyDownInInput: KeyboardEventHandler<HTMLInputElement>;
};

const TreeItem = ({
  node,
  selectableProps,
  expandableProps,
  checkableProps,
  droppableProps,
  parentNodeId,
  previousNodeId,
  nextNodeId,
  ancestorNodeIds,
  dragNode,
  onDragStart,
  onClickLabel,
  editInfo,
  onEditText,
  onKeyDownInInput
}: Props) => {

  const isRootNode = ancestorNodeIds.length === 0;
  const isFirstNode = previousNodeId === undefined;
  const isLastNode = nextNodeId === undefined;

  const isSelected = selectableProps?.nodeId === node.id;
  const handleSelect = () => selectableProps?.onSelect(node.id);

  const isExpanded = expandableProps?.nodeIds?.includes(node.id);
  const handleToggleExpand = () => expandableProps?.onToggle(node.id);

  const isChecked = checkableProps?.checkStates.find(checkState =>
    checkState.nodeId === node.id)?.checked;
  const handleToggleCheck = () => checkableProps?.onToggle(node.id);

  const prevRef = useRef<HTMLDivElement>(null);
  const thisRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const nextParentRef = useRef<HTMLDivElement>(null);

  const getDragOverArea = (
    e: DragEvent<HTMLDivElement>
  ): keyof DroppableState | undefined => {
    switch (e.currentTarget) {
      case prevRef.current: return 'prevBlank';
      case thisRef.current: return 'thisItem';
      case nextRef.current: return 'nextBlank';
      case nextParentRef.current: return 'nextParent';
      default: return undefined;
    }
  };

  const handleDragStart = () => {

    if (!droppableProps) {
      return;
    }

    onDragStart(node.id, parentNodeId, previousNodeId, nextNodeId);
  };

  const [isDroppable, setIsDroppable] = useState<DroppableState>(UNDROPPABLE);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {

    if (!droppableProps) {
      return;
    }

    e.preventDefault();

    if (
      (dragNode.id === node.id && e.currentTarget !== nextParentRef.current) ||
      ancestorNodeIds.includes(dragNode.id) ||
      (
        e.currentTarget === nextRef.current &&
        dragNode.previousId === node.id
      ) ||
      (
        e.currentTarget === thisRef.current &&
        dragNode.nextId === undefined &&
        dragNode.parentId === node.id
      ) ||
      (
        e.currentTarget === nextParentRef.current &&
        dragNode.previousId === parentNodeId
      )
    ) {
      return;
    }

    const dragOverArea = getDragOverArea(e);

    if (dragOverArea) {
      setIsDroppable(state => ({ ...state, [dragOverArea]: true }));
    }
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (e) => {

    if (!droppableProps) {
      return;
    }

    setIsDroppable(UNDROPPABLE);
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {

    if (!droppableProps) {
      return;
    }

    const dragOverArea = getDragOverArea(e);

    if (!dragOverArea || !isDroppable[dragOverArea]) {
      return;
    }

    setIsDroppable(UNDROPPABLE);

    if (dragOverArea === 'prevBlank') {
      droppableProps.onDrop(dragNode.id, ancestorNodeIds, undefined);
      return;
    }

    if (dragOverArea === 'thisItem') {
      droppableProps.onDrop(dragNode.id, [...ancestorNodeIds, node.id],
        node.childNodes ? node.childNodes.at(-1)?.id : undefined);
      return;
    }

    if (dragOverArea === 'nextBlank') {
      droppableProps.onDrop(dragNode.id, ancestorNodeIds, node.id);
      return;
    }

    droppableProps.onDrop(dragNode.id,
      [...ancestorNodeIds].splice(0, ancestorNodeIds.length - 1), parentNodeId);
  };

  if (!node.childNodes) {
    return (
      <>
        {isFirstNode &&
          <div
            css={style.blankPrev(isDroppable.prevBlank)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={prevRef}
          />
        }
        <div css={style.leafContainer(isRootNode)} role='listitem'>
          <div
            css={style.leafContent(isDroppable.thisItem)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={thisRef}
          >
            <TreeLabel
              nodeId={node.id}
              iconType={node.label.iconType}
              text={node.label.text}
              isChecked={isChecked}
              isSelected={isSelected}
              onSelect={handleSelect}
              onToggleCheck={handleToggleCheck}
              onDragStart={handleDragStart}
              onClick={onClickLabel}
              editInfo={editInfo}
              onEdit={onEditText}
              onKeyDown={onKeyDownInInput}
            />
          </div>
        </div>
        {isLastNode
          ? <div css={style.blankNextLastLeaf.container}>
              <div
                css={style.blankNextLastLeaf.blankNext(isRootNode)}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                ref={nextRef}
              >
                <div
                  css={style.blankNextLastLeaf.next(isDroppable.nextBlank)}
                />
              </div>
              <div
                css={style.blankNextLastLeaf.blankParent}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                ref={nextParentRef}
              >
                <div
                  css={style.blankNextLastLeaf.parent(isDroppable.nextParent)}
                />
              </div>
            </div>
          : <div
              css={style.blankNext(isDroppable.nextBlank)}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              ref={nextRef}
            />
        }
      </>
    );
  }

  return (
    <>
      {isFirstNode &&
        <div
          css={style.blankPrev(isDroppable.prevBlank)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={prevRef}
        />
      }
      <div css={style.nodeContainer(isRootNode)} role='listitem'>
        <div
          css={style.nodeContent(isDroppable.thisItem)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={thisRef}
        >
          <button css={style.toggle} onClick={handleToggleExpand}>
            {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          <TreeLabel
            nodeId={node.id}
            iconType={node.label.iconType}
            text={node.label.text}
            isChecked={isChecked}
            isSelected={isSelected}
            onSelect={handleSelect}
            onToggleCheck={handleToggleCheck}
            onDragStart={handleDragStart}
            onClick={onClickLabel}
            editInfo={editInfo}
            onEdit={onEditText}
            onKeyDown={onKeyDownInInput}
          />
        </div>
        {isExpanded &&
          <div role='list'>
            {node.childNodes?.map((childNode, i, childNodes) => {
              const isFirst = i === 0;
              const isLast = i === childNodes.length - 1;
              return (
                <TreeItem
                  node={childNode}
                  selectableProps={selectableProps}
                  expandableProps={expandableProps}
                  checkableProps={checkableProps}
                  droppableProps={droppableProps}
                  parentNodeId={node.id}
                  previousNodeId={isFirst ? undefined : childNodes[i - 1].id}
                  nextNodeId={isLast ? undefined : childNodes[i + 1].id}
                  ancestorNodeIds={[...ancestorNodeIds, node.id]}
                  dragNode={dragNode}
                  onDragStart={onDragStart}
                  onClickLabel={onClickLabel}
                  editInfo={editInfo}
                  onEditText={onEditText}
                  onKeyDownInInput={onKeyDownInInput}
                  key={childNode.id}
                />
              )
            })}
          </div>
        }
      </div>
      {(!isRootNode && !isExpanded) &&
        <div
          css={style.blankNext(isDroppable.nextBlank)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={nextRef}
        />
      }
    </>
  );
}

export default TreeItem;

const style = {
  leafContainer: (isRootNode: boolean) => css({
    paddingLeft: isRootNode ? undefined : '3rem'
  }),
  leafContent: (isDroppable: boolean) => css({
    backgroundColor: isDroppable ? 'palegreen' : undefined,
    marginBottom: '-2px'
  }),
  nodeContainer: (isRootNode: boolean) => css({
    paddingLeft: isRootNode ? undefined : '1.5rem'
  }),
  nodeContent: (isDroppable: boolean) =>css({
    display: 'flex',
    gap: '.5rem',
    backgroundColor: isDroppable ? 'palegreen' : undefined,
    marginBottom: '-2px'
  }),
  toggle: css({
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      cursor: 'pointer'
    }
  }),
  label: (isSelected: boolean) => css({
    userSelect: 'none',
    backgroundColor: isSelected ? 'limegreen' : undefined,
    borderRadius: '.25rem',
    ':hover': {
      cursor: 'pointer',
      backgroundColor: isSelected ? undefined : 'palegreen'
    }
  }),
  blankPrev: (isDroppable: boolean) => css({
    position: 'relative',
    zIndex: '1',
    height: '6px',
    backgroundColor: isDroppable ? 'palegreen' : 'undefined',
    marginBottom: '-2px'
  }),
  blankNext: (isDroppable: boolean) => css({
    position: 'relative',
    zIndex: '1',
    height: '6px',
    backgroundColor: isDroppable ? 'palegreen' : 'undefined',
    marginBottom: '-2px'
  }),
  blankNextLastLeaf: {
    container: css({
      position: 'relative',
      zIndex: '1',
      height: '6px',
      marginLeft: '-1.5rem',
      marginBottom: '-2px'
    }),
    blankNext: (isRootNode: boolean) =>  css({
      height: '3px',
      marginLeft: isRootNode ? undefined : '1.5rem'
    }),
    next: (isDroppable: boolean) => css({
      pointerEvents: 'none',
      backgroundColor: isDroppable ? 'palegreen' : 'undefined',
      height: '6px',
    }),
    blankParent: css({
      height: '3px'
    }),
    parent: (isDroppable: boolean) => css({
      pointerEvents: 'none',
      position: 'relative',
      top: '-3px',
      backgroundColor: isDroppable ? 'palegreen' : 'undefined',
      height: '6px',
    })
  }
};
