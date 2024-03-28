import TreeNode from "./treeNode";

export const getNode = (nodes: TreeNode[], nodeId: string): TreeNode | undefined => {

  let matchedNode: TreeNode | undefined = undefined;

  nodes.forEach((node) => {

    if (node.id === nodeId) {
      matchedNode = node;
    }

    if (matchedNode) {
      return;
    }

    if (!node.childNodes) {
      return;
    }

    const matched = node.childNodes.find(childNode => childNode.id === nodeId);

    if (!matched) {
      const cMatchedNode = getNode(node.childNodes, nodeId);

      if (cMatchedNode) {
        matchedNode = cMatchedNode;
      }

      return;
    }

    matchedNode = matched;
  });

  return matchedNode;
}

export const getText = (nodes: TreeNode[], nodeId: string): string => {
  const node = getNode(nodes, nodeId);
  return node?.label.text ?? '';
};

export const getOrderedNodeIds = (
  nodes: TreeNode[],
  expandedNodeIds: string[] | undefined
  ): string[] => {

  const orderedNodeIds: string[] = [];

  nodes.forEach((node) => {

    orderedNodeIds.push(node.id);

    if (!node.childNodes || !expandedNodeIds?.includes(node.id)) {
      return;
    }

    const cOrderedNodeIds = getOrderedNodeIds(node.childNodes, expandedNodeIds);
    orderedNodeIds.push(...cOrderedNodeIds);
  });

  return orderedNodeIds;
};

export const getParentNodeId = (
  nodes: TreeNode[],
  childNodeId: string
): string | undefined => {

  let parentNodeId: string | undefined = undefined;

  nodes.forEach((node) => {

    if (!node.childNodes) {
      return;
    }

    const childNode = node.childNodes.find(node => node.id === childNodeId);

    if (childNode) {
      parentNodeId = node.id;
      return;
    }

    const cParentNodeId = getParentNodeId(node.childNodes, childNodeId);

    if (cParentNodeId) {
      parentNodeId = cParentNodeId;
    }
  });

  return parentNodeId;
};
