class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        return ser(root, new StringBuilder()).indexOf(ser(subRoot, new StringBuilder()).toString()) >= 0; // the "," stops ",2" from matching inside ",12"
    }
    private StringBuilder ser(TreeNode node, StringBuilder out) { // "," before every value, "#" for a missing child
        if (node == null) return out.append(",#");
        out.append(',').append(node.val);
        ser(node.left, out);
        return ser(node.right, out);
    }
}
