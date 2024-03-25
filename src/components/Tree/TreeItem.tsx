/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  DragEvent,
  DragEventHandler,
  useContext,
  useRef,
  useState
} from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { DragInfo } from "./Tree";
import TreeContext from "./TreeContext";
import TreeNode from "./treeNode";

type DroppableState = {
  prev: boolean;
  this: boolean;
  label: boolean;
  next: boolean;
};

const DROP_DISABLED = {
  prev: false,
  this: false,
  label: false,
  next: false
} as const satisfies DroppableState;

type Props = {
  node: TreeNode;
  dragInfo: DragInfo;
  onDragStart: (nodeId: string, previousNodeId: string | undefined) => void;
  previousNodeId: string | undefined;
  ancestorNodeIds?: string[];
  isFirstNode?: boolean;
};

const TreeItem = ({
  node,
  dragInfo,
  onDragStart,
  previousNodeId,
  ancestorNodeIds = [],
  isFirstNode = false
}: Props) => {

  const isRoot = ancestorNodeIds.length === 0;

  const context = useContext(TreeContext);

  const isSelected = context.selectedNodeId === node.id;

  const handleSelect = () => {
    context.onSelect && context.onSelect(node.id);
  };

  const isExpanded = context.expandedNodeIds?.includes(node.id);

  const handleToggle = () => {
    context.onToggle && context.onToggle(node.id);
  };

  const [isDroppable, setIsDroppable] = useState<DroppableState>({
    prev: false,
    this: false,
    label: false,
    next: false
  });

  const prevRef = useRef(null);
  const thisRef = useRef(null);
  const labelRef = useRef(null);
  const nextRef = useRef(null);

  const handleDragEnter = (
    e: DragEvent<HTMLElement>,
    dragArea: keyof DroppableState
  ) => {

    if (e.target instanceof HTMLLabelElement && dragArea === 'this') {
      return;
    }

    if (e.target === nextRef.current && dragInfo.previousNodeId === node.id) {
      return;
    }

    if (dragInfo.nodeId === node.id) {
      return;
    }

    if (ancestorNodeIds.includes(dragInfo.nodeId)) {
      return;
    }

    setIsDroppable((prev) => ({ ...prev, [dragArea]: true }));
  };

  const handleDragLeave = (
    e: DragEvent<HTMLElement>,
    dragArea: keyof DroppableState
  ) => {

    if (e.target instanceof HTMLLabelElement && dragArea === 'this') {
      return;
    }

    setIsDroppable((prev) => ({ ...prev, [dragArea]: false }));
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {

    if (!isDroppable.prev &&
        !isDroppable.this &&
        !isDroppable.label &&
        !isDroppable.next
    ) {
      return;
    }

    setIsDroppable(DROP_DISABLED);

    if (!context.onDrop) {
      return;
    }

    if (e.target === prevRef.current) {
      context.onDrop(dragInfo.nodeId, [...ancestorNodeIds], undefined);
      return;
    }

    if (e.target === thisRef.current || e.target === labelRef.current) {
      context.onDrop(dragInfo.nodeId, [...ancestorNodeIds, node.id], undefined);
      return;
    }

    context.onDrop(dragInfo.nodeId, ancestorNodeIds , node.id);
  };

  if (!node.childNodes) {
    return (
      <>
        {isFirstNode
          ? <div
              css={style.blankPrev(isDroppable)}
              onDragEnter={(e) => handleDragEnter(e, 'prev')}
              onDragLeave={(e) => handleDragLeave(e, 'prev')}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              ref={prevRef}
            />
          : null}
        <div css={style.leafContainer(isRoot)} id={node.id} role='listitem'>
          <div
            css={style.leafContent(isDroppable)}
            onDragEnter={(e) => handleDragEnter(e, 'this')}
            onDragLeave={(e) => handleDragLeave(e, 'this')}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            ref={thisRef}
          >
            <label
              css={style.label(isSelected)}
              onClick={handleSelect}
              draggable={!isRoot}
              onDragStart={() => onDragStart(node.id, previousNodeId)}
              onDragEnter={(e) => handleDragEnter(e, 'label')}
              onDragLeave={(e) => handleDragLeave(e, 'label')}
              ref={labelRef}
            >
              {node.label}
            </label>
          </div>
        </div>
        <div
          css={style.blankNext(isDroppable)}
          onDragEnter={(e) => handleDragEnter(e, 'next')}
          onDragLeave={(e) => handleDragLeave(e, 'next')}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          ref={nextRef}
        />
      </>
    );
  }

  return (
    <>
      {isFirstNode
        ? <div
            css={style.blankPrev(isDroppable)}
            onDragEnter={(e, ) => handleDragEnter(e, 'prev')}
            onDragLeave={(e) => handleDragLeave(e, 'prev')}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            ref={prevRef}
          />
        : null}
      <div css={style.nodeContainer(isRoot)} id={node.id} role='listitem'>
        <div
          css={style.nodeContent(isDroppable)}
          onDragEnter={(e) => handleDragEnter(e, 'this')}
          onDragLeave={(e) => handleDragLeave(e, 'this')}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          ref={thisRef}
        >
          <button css={style.toggle} onClick={handleToggle}>
            {isExpanded ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </button>
          <label
            css={style.label(isSelected)}
            onClick={handleSelect}
            draggable={!isRoot}
            onDragStart={() => onDragStart(node.id, previousNodeId)}
            onDragEnter={(e) => handleDragEnter(e, 'label')}
            onDragLeave={(e) => handleDragLeave(e, 'label')}
            ref={labelRef}
          >
            {node.label}
          </label>
        </div>
        {isExpanded
          ? <div role='list'>
              {node.childNodes?.map((childNode, i, childNodes) => (
                <TreeItem
                  node={childNode}
                  dragInfo={dragInfo}
                  onDragStart={onDragStart}
                  previousNodeId={i === 0 ? undefined : childNodes[i - 1].id}
                  ancestorNodeIds={[...ancestorNodeIds, node.id]}
                  isFirstNode={i === 0}
                  key={childNode.id}
                />
              ))}
            </div>
          : null}
      </div>
      <div
        css={style.blankNext(isDroppable)}
        onDragEnter={(e) => handleDragEnter(e, 'next')}
        onDragLeave={(e) => handleDragLeave(e, 'next')}
        onDragOver={(e) => e.preventDefault()}
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
  leafContent: (isDroppable: DroppableState) => css({
    backgroundColor: isDroppable.this || isDroppable.label
      ? 'palegreen'
      : undefined
  }),
  nodeContainer: (isTopLayer: boolean) => css({
    paddingLeft: isTopLayer ? undefined : '1.5rem'
  }),
  nodeContent: (isDroppable: DroppableState) => css({
    display: 'flex',
    gap: '.5rem',
    backgroundColor: isDroppable.this || isDroppable.label
      ? 'palegreen'
      : undefined
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
  blankPrev: (isDroppable: DroppableState) => css({
    backgroundColor: isDroppable.prev ? 'palegreen' : undefined,
    height: '.25rem'
  }),
  blankNext: (isDroppable: DroppableState) => css({
    backgroundColor: isDroppable.next ? 'palegreen' : undefined,
    height: '.25rem'
  })
};
