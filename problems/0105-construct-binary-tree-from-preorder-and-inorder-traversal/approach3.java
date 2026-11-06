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
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        TreeNode root = new TreeNode(preorder[0]); // @viz init
        Deque<TreeNode> stack = new ArrayDeque<>(); // the path of nodes still waiting for their right child // @viz init
        stack.push(root); // @viz init
        int j = 0; // the next value of inorder not yet reached // @viz init
        for (int i = 1; i < preorder.length; i++) { // @viz loop
            TreeNode node = new TreeNode(preorder[i]); // @viz loop
            if (stack.peek().val != inorder[j]) { // the top's left side isn't finished: this is its left child // @viz left
                stack.peek().left = node; // @viz left
            } else { // the top's left side is done: climb up to the last node inorder has reached // @viz climb
                TreeNode parent = null; // @viz climb
                while (!stack.isEmpty() && stack.peek().val == inorder[j]) { // @viz climb
                    parent = stack.pop(); // @viz climb
                    j++; // @viz climb
                }
                parent.right = node; // this is that node's right child // @viz right
            }
            stack.push(node); // @viz push
        }
        return root; // @viz return
    }
}
