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
        List<List<Integer>> levels = new ArrayList<>(); // every level, left to right // @viz init
        List<TreeNode> level = new ArrayList<>(); // @viz init
        if (root != null) level.add(root); // @viz init
        while (!level.isEmpty()) { // @viz level
            List<Integer> vals = new ArrayList<>(); // @viz level
            List<TreeNode> next = new ArrayList<>(); // @viz next
            for (TreeNode node : level) { // @viz level
                vals.add(node.val); // @viz level
                if (node.left != null) next.add(node.left); // the next level, left to right // @viz next
                if (node.right != null) next.add(node.right); // @viz next
            }
            levels.add(vals); // @viz level
            level = next; // @viz next
        }
        List<Integer> res = new ArrayList<>(); // @viz return
        for (List<Integer> vals : levels) res.add(vals.get(vals.size() - 1)); // the rightmost value of each level // @viz return
        return res; // @viz return
    }
}
