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
    public int goodNodes(TreeNode root) {
        return dfs(root, root.val); // @viz start
    }

    // best = largest value from the root down to node's parent
    private int dfs(TreeNode node, int best) { // @viz call
        if (node == null) return 0; // @viz empty
        int count = node.val >= best ? 1 : 0; // good: nothing above it is bigger // @viz check
        best = Math.max(best, node.val); // @viz update
        count += dfs(node.left, best); // @viz left
        count += dfs(node.right, best); // @viz right
        return count; // @viz done
    }
}
