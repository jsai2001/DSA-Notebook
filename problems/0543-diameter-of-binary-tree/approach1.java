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
    public int diameterOfBinaryTree(TreeNode root) {
        return diameter(root); // @viz start
    }
    private int height(TreeNode node) { // nodes on the longest path down from node (0 for null)
        if (node == null) return 0;
        return 1 + Math.max(height(node.left), height(node.right));
    }
    private int diameter(TreeNode node) { // @viz call
        if (node == null) return 0; // @viz empty
        int through = height(node.left) + height(node.right); // edges on the longest path that bends at node // @viz through
        return Math.max(through, Math.max(diameter(node.left), diameter(node.right))); // or it lies inside one subtree // @viz best
    }
}
