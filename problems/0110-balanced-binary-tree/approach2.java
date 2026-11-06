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
        return check(root) != -1; // @viz return
    }
    private int check(TreeNode node) { // the height of this subtree, or -1 if it isn't balanced // @viz call
        if (node == null) return 0; // @viz empty
        int left = check(node.left); // @viz left
        if (left == -1) return -1; // a problem below: stop right away // @viz left
        int right = check(node.right); // @viz right
        if (right == -1) return -1; // @viz right
        if (Math.abs(left - right) > 1) return -1; // @viz bad
        return 1 + Math.max(left, right); // balanced: pass the height up // @viz height
    }
}
