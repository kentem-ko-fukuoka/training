/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, DragEventHandler, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { DragNode } from "./Tree";
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
};

const UNDROPPABLE = {
  prevBlank: false,
  thisItem: false,
  nextBlank: false
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
  onDragStart
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

  const getDragOverArea = (
    e: DragEvent<HTMLDivElement>
  ): keyof DroppableState | undefined => {
    switch (e.currentTarget) {
      case prevRef.current: return 'prevBlank';
      case thisRef.current: return 'thisItem';
      case nextRef.current: return 'nextBlank';
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
      dragNode.id === node.id ||
      ancestorNodeIds.includes(dragNode.id) ||
      (
        e.currentTarget === nextRef.current &&
        dragNode.previousId === node.id
      ) ||
      (
        e.currentTarget === thisRef.current &&
        dragNode.isLastNode &&
        dragNode.parentId === node.id
      )
    ) {
      return;
    }

    const dragOverArea = getDragOverArea(e);

    if (dragOverArea) {
      setIsDroppable(state => ({ ...state, [dragOverArea]: true }));
    }
  }

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
      droppableProps.onDrop(dragNode.id, ancestorNodeIds,
        undefined);
      return;
    }

    if (dragOverArea === 'thisItem') {
      droppableProps.onDrop(dragNode.id, [...ancestorNodeIds, node.id],
        node.childNodes ? node.childNodes.at(-1)?.id : undefined);
      return;
    }

    droppableProps.onDrop(dragNode.id, ancestorNodeIds,
      node.id);
  }

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
        <div css={style.leafContainer(isRootNode)} id={node.id} role='listitem'>
          <div
            className='thisItem'
            css={style.leafContent(isDroppable.thisItem)}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={thisRef}
          >
            <TreeLabel
              iconType={node.label.iconType}
              text={node.label.text}
              isChecked={isChecked}
              isSelected={isSelected}
              onSelect={handleSelect}
              onToggleCheck={handleToggleCheck}
              onDragStart={handleDragStart}
            />
          </div>
        </div>
        <div
          className='nextBlank'
          css={style.blankNext(isDroppable.nextBlank)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={nextRef}
        />
      </>
    );
  }

  return (
    <>
      {isFirstNode &&
        <div
          className='prevBlank'
          css={style.blankPrev(isDroppable.prevBlank)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={prevRef}
        />
      }
      <div css={style.nodeContainer(isRootNode)} id={node.id} role='listitem'>
        <div
          className='thisItem'
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
            iconType={node.label.iconType}
            text={node.label.text}
            isChecked={isChecked}
            isSelected={isSelected}
            onSelect={handleSelect}
            onToggleCheck={handleToggleCheck}
            onDragStart={handleDragStart}
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
                  key={childNode.id}
                />
              )
            })}
          </div>
        }
      </div>
      <div
        className='nextBlank'
        css={style.blankNext(isDroppable.nextBlank)}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        ref={nextRef}
      />
    </>
  );
}

export default TreeItem;

const style = {
  leafContainer: (isTopLayer: boolean) => css({
    paddingLeft: isTopLayer ? undefined : '3rem'
  }),
  leafContent: (isDroppable: boolean) => css({
    backgroundColor: isDroppable ? 'palegreen' : undefined
  }),
  nodeContainer: (isTopLayer: boolean) => css({
    paddingLeft: isTopLayer ? undefined : '1.5rem'
  }),
  nodeContent: (isDroppable: boolean) =>css({
    display: 'flex',
    gap: '.5rem',
    backgroundColor: isDroppable ? 'palegreen' : undefined
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
    height: '4px',
    backgroundColor: isDroppable ? 'palegreen' : undefined
  }),
  blankNext: (isDroppable: boolean) => css({
    height: '4px',
    backgroundColor: isDroppable ? 'palegreen' : undefined
  })
};
