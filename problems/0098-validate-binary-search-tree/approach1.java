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
    public boolean isValidBST(TreeNode root) {
        return check(root); // @viz return
    }
    private void allValues(TreeNode node, List<Integer> out) { // every value in this subtree // @viz collect
        if (node == null) return; // @viz collect
        out.add(node.val); // @viz collect
        allValues(node.left, out); // @viz collect
        allValues(node.right, out); // @viz collect
    }
    private boolean check(TreeNode node) { // @viz call
        if (node == null) return true; // @viz call
        // Every value on the left must be smaller, every value on the right bigger.
        List<Integer> left = new ArrayList<>(), right = new ArrayList<>(); // @viz left
        allValues(node.left, left); // @viz left
        for (int v : left) if (v >= node.val) return false; // @viz left
        allValues(node.right, right); // @viz right
        for (int v : right) if (v <= node.val) return false; // @viz right
        return check(node.left) && check(node.right); // @viz recurse
    }
}
