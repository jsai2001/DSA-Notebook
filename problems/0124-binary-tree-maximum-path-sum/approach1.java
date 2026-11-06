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
        best = root.val; // @viz init
        visit(root); // @viz init
        return best; // @viz return
    }
    private int down(TreeNode node) { // the best path that starts at node and only goes down (it may stop at node) // @viz down
        if (node == null) return 0; // @viz down
        return node.val + Math.max(0, Math.max(down(node.left), down(node.right))); // @viz down
    }
    private void visit(TreeNode node) { // make every node the top of a path, one at a time // @viz top
        if (node == null) return; // @viz top
        // The path bends at node: the best way down on each side, or nothing if that side is negative.
        int here = node.val + Math.max(0, down(node.left)) + Math.max(0, down(node.right)); // @viz sum
        best = Math.max(best, here); // @viz sum
        visit(node.left); // @viz top
        visit(node.right); // @viz top
    }
}
