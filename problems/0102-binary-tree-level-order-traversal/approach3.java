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
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @viz init
        List<TreeNode> level = new ArrayList<>(); // the nodes of the current level, left to right // @viz init
        if (root != null) level.add(root); // @viz init
        while (!level.isEmpty()) { // @viz loop
            List<Integer> vals = new ArrayList<>(); // @viz done
            for (TreeNode node : level) vals.add(node.val); // @viz done
            result.add(vals); // @viz done
            List<TreeNode> next = new ArrayList<>(); // @viz next
            for (TreeNode node : level) { // their children, in order, are the next level // @viz next
                if (node.left != null) next.add(node.left); // @viz next
                if (node.right != null) next.add(node.right); // @viz next
            }
            level = next; // @viz swap
        }
        return result; // @viz return
    }
}
