/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { DragEvent, DragEventHandler, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { DragInfo } from "./Tree";
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
  dragInfo: DragInfo;
  onDragStart: (nodeId: string, previousNodeId: string | undefined) => void;
  previousNodeId: string | undefined;
  ancestorNodeIds?: string[];
  isFirstNode?: boolean;
};

const TreeItem = ({
  node,
  selectableProps,
  expandableProps,
  checkableProps,
  droppableProps,
  dragInfo,
  onDragStart,
  previousNodeId,
  ancestorNodeIds = [],
  isFirstNode = false
}: Props) => {

  const isRoot = ancestorNodeIds.length === 0;

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
  }

  const [isDroppable, setIsDroppable] = useState<DroppableState>(UNDROPPABLE);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {

    if (!droppableProps) {
      return;
    }

    e.preventDefault();

    if (
      dragInfo.nodeId === node.id ||
      ancestorNodeIds.includes(dragInfo.nodeId) ||
      (
        e.currentTarget === nextRef.current &&
        dragInfo.previousNodeId === node.id
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
      droppableProps.onDrop(dragInfo.nodeId, ancestorNodeIds,
        undefined);
      return;
    }

    if (dragOverArea === 'thisItem') {
      droppableProps.onDrop(dragInfo.nodeId, [...ancestorNodeIds, node.id],
        undefined);
      return;
    }

    droppableProps.onDrop(dragInfo.nodeId, ancestorNodeIds,
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
        <div css={style.leafContainer(isRoot)} id={node.id} role='listitem'>
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
              isDraggable={!isRoot}
              onSelect={handleSelect}
              onToggleCheck={handleToggleCheck}
              onDragStart={() => onDragStart(node.id, previousNodeId)}
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
      <div css={style.nodeContainer(isRoot)} id={node.id} role='listitem'>
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
            isDraggable={!isRoot}
            onSelect={handleSelect}
            onToggleCheck={handleToggleCheck}
            onDragStart={() => onDragStart(node.id, previousNodeId)}
          />
        </div>
        {isExpanded &&
          <div role='list'>
            {node.childNodes?.map((childNode, i, childNodes) => (
              <TreeItem
                node={childNode}
                selectableProps={selectableProps}
                expandableProps={expandableProps}
                checkableProps={checkableProps}
                droppableProps={droppableProps}
                dragInfo={dragInfo}
                onDragStart={onDragStart}
                previousNodeId={i === 0 ? undefined : childNodes[i - 1].id}
                ancestorNodeIds={[...ancestorNodeIds, node.id]}
                isFirstNode={i === 0}
                key={childNode.id}
              />
            ))}
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
