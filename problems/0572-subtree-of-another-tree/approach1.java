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
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false; // ran off the tree: nothing down here can match // @viz empty
        if (same(root, subRoot)) { // does the subtree that starts here match exactly? // @viz try
            return true; // @viz found
        }
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot); // @viz down
    }
    private boolean same(TreeNode a, TreeNode b) { // @viz same
        if (a == null || b == null) return a == b; // both empty: same; only one empty: different // @viz same
        return a.val == b.val && same(a.left, b.left) && same(a.right, b.right); // @viz same
    }
}
