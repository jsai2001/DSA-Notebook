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
    public boolean isValidBST(TreeNode root) {
        // long limits: a node can hold Integer.MIN_VALUE or MAX_VALUE itself, so the limits must go one past them.
        return check(root, Long.MIN_VALUE, Long.MAX_VALUE); // no limits at the root // @viz return
    }
    private boolean check(TreeNode node, long low, long high) { // every value here must be strictly between low and high // @viz call
        if (node == null) return true; // an empty subtree breaks no rule // @viz empty
        if (node.val <= low || node.val >= high) return false; // @viz check, bad
        // Going left, this node's value becomes the new upper limit; going right, the new lower limit.
        return check(node.left, low, node.val) && check(node.right, node.val, high); // @viz recurse
    }
}
