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
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @viz init
        if (root == null) return result; // an empty tree has no levels: [], not [[]] // @viz empty
        Deque<TreeNode> queue = new ArrayDeque<>(); // @viz init
        queue.add(root); // @viz init
        while (!queue.isEmpty()) { // @viz loop
            List<Integer> level = new ArrayList<>(); // @viz loop
            int n = queue.size(); // exactly the nodes of this level are in the queue now // @viz size
            for (int k = 0; k < n; k++) { // @viz size
                TreeNode node = queue.poll(); // @viz pop
                level.add(node.val); // @viz pop
                if (node.left != null) queue.add(node.left); // their children go to the back: the next level // @viz push
                if (node.right != null) queue.add(node.right); // @viz push
            }
            result.add(level); // @viz done
        }
        return result; // @viz return
    }
}
