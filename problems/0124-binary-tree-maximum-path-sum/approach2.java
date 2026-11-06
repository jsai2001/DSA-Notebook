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
    private int best;
    public int maxPathSum(TreeNode root) {
        best = root.val; // at least one node is on every path // @viz init
        gain(root); // @viz init
        return best; // @viz return
    }
    private int gain(TreeNode node) { // the best path that starts at node and goes down one side // @viz call
        if (node == null) return 0; // @viz call
        int left = Math.max(0, gain(node.left)); // a negative side only hurts: leave it out // @viz left
        int right = Math.max(0, gain(node.right)); // @viz right
        best = Math.max(best, node.val + left + right); // a path that bends here can use both sides // @viz bend
        return node.val + Math.max(left, right); // going up, a path can only continue down one side // @viz up
    }
}
