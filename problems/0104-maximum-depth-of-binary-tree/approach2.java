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
    public int maxDepth(TreeNode root) {
        if (root == null) return 0; // no node: depth 0 // @viz empty
        int left = maxDepth(root.left); // @viz left
        int right = maxDepth(root.right); // @viz right
        return 1 + Math.max(left, right); // this node, plus the deeper side // @viz return
    }
}
