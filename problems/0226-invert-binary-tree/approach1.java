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
    public TreeNode invertTree(TreeNode root) {
        return mirror(root); // the original tree isn't changed // @viz return
    }
    private TreeNode mirror(TreeNode node) { // a new tree: the mirror image of node's subtree // @viz call
        if (node == null) return null; // @viz base
        TreeNode copy = new TreeNode(node.val); // @viz copy
        copy.left = mirror(node.right); // the left side of the copy is the mirrored right side // @viz copy
        copy.right = mirror(node.left); // @viz copy
        return copy; // @viz copy
    }
}
