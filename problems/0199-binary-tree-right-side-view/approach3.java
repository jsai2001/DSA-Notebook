import java.util.*;
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
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>(); // res[d] = the first value seen at depth d // @viz init
        dfs(root, 0, res); // @viz init
        return res; // @viz return
    }
    private void dfs(TreeNode node, int depth, List<Integer> res) { // @viz call
        if (node == null) return; // @viz call
        if (depth == res.size()) res.add(node.val); // first visit to this depth: right first, so it's the rightmost // @viz first
        dfs(node.right, depth + 1, res); // right before left // @viz right
        dfs(node.left, depth + 1, res); // @viz left
    }
}
