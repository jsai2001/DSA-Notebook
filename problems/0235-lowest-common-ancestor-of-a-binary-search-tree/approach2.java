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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> a = path(root, p), b = path(root, q); // @viz both
        TreeNode lca = root; // @viz compare
        for (int i = 0; i < a.size() && i < b.size() && a.get(i) == b.get(i); i++) lca = a.get(i); // the deepest node both paths share // @viz compare
        return lca; // @viz return
    }
    private List<TreeNode> path(TreeNode node, TreeNode target) { // the BST search path from the root down to target // @viz path
        List<TreeNode> out = new ArrayList<>(); // @viz path
        while (node != target) { // @viz path
            out.add(node); // @viz path
            node = target.val < node.val ? node.left : node.right; // smaller: go left; bigger: go right // @viz path
        }
        out.add(node); // @viz path
        return out; // @viz path
    }
}
