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
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;
class Solution {
    public int diameterOfBinaryTree(TreeNode root) {
        Map<TreeNode, Integer> height = new HashMap<>(); // height of every finished node // @viz init
        height.put(null, 0); // an empty child has height 0 // @viz init
        int best = 0; // @viz init
        Deque<Object[]> stack = new ArrayDeque<>(); // {node, are its children finished?} // @viz init
        stack.push(new Object[] {root, false}); // @viz init
        while (!stack.isEmpty()) { // @viz loop
            Object[] top = stack.pop(); // @viz loop
            TreeNode node = (TreeNode) top[0]; // @viz loop
            if (node == null) continue; // @viz skip
            if ((Boolean) top[1]) { // both subtrees are finished: work out this node // @viz finish
                int left = height.get(node.left), right = height.get(node.right); // @viz finish
                best = Math.max(best, left + right); // @viz finish
                height.put(node, 1 + Math.max(left, right)); // @viz finish
            } else { // come back to node after its children // @viz push
                stack.push(new Object[] {node, true}); // the stack is last-in, first-out: push node first // @viz push
                stack.push(new Object[] {node.right, false}); // @viz push
                stack.push(new Object[] {node.left, false}); // @viz push
            }
        }
        return best; // @viz return
    }
}
