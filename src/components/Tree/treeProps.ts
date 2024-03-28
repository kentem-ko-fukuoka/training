export type SelectableProps = {
  nodeId: string | undefined;
  onSelect: (nodeId: string) => void;
  editableProps: EditableProps;
};

export type ExpandableProps = {
  nodeIds: string[];
  onToggle: (nodeId: string) => void;
};

export type CheckState = {
  nodeId: string;
  checked: boolean;
};

export type CheckableProps = {
  checkStates: CheckState[];
  onToggle: (nodeId: string) => void;
};

export type DroppableProps = {
  onDrop: (
    droppedNodeId: string,
    ancestorNodeIds: string[],
    previousNodeId: string | undefined
  ) => void;
};

type EditableProps = {
  onEdit: (text: string) => void;
};
