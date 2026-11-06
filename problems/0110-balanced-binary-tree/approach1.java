/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true; // an empty tree is balanced // @viz empty
        if (Math.abs(height(root.left) - height(root.right)) > 1) return false; // this node's two sides differ too much // @viz check, bad
        return isBalanced(root.left) && isBalanced(root.right); // every node must pass, not just the root // @viz recurse
    }
    private int height(TreeNode node) { // the number of nodes on the longest path down // @viz height
        if (node == null) return 0; // @viz height
        return 1 + Math.max(height(node.left), height(node.right)); // @viz height
    }
}
