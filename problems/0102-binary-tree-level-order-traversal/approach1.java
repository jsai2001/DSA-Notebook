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
import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    public List<List<Integer>> levelOrder(TreeNode root) {
        result = new ArrayList<>(); // result.get(d) = the values at depth d, left to right // @viz init
        dfs(root, 0); // @viz init
        return result; // @viz return
    }
    private void dfs(TreeNode node, int depth) { // @viz call
        if (node == null) return; // @viz call
        if (depth == result.size()) result.add(new ArrayList<>()); // the first node seen at this depth // @viz new
        result.get(depth).add(node.val); // left is visited before right, so each level fills left to right // @viz add
        dfs(node.left, depth + 1); // @viz recurse
        dfs(node.right, depth + 1); // @viz recurse
    }
}
