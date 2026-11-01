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
    public int diameterOfBinaryTree(TreeNode root) {
        best = 0; // longest path seen so far, in edges // @viz init
        height(root); // @viz start
        return best; // @viz answer
    }
    private int height(TreeNode node) { // returns nodes on the longest path down; updates best on the way // @viz call
        if (node == null) return 0; // @viz empty
        int left = height(node.left); // @viz left
        int right = height(node.right); // @viz right
        best = Math.max(best, left + right); // the path that bends here has left + right edges // @viz best
        return 1 + Math.max(left, right); // node's height, for its parent // @viz return
    }
}
