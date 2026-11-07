import java.util.*;
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder out = new StringBuilder(); // pre-order with "#" for null, but with a stack instead of recursion // @viz ser
        List<TreeNode> stack = new ArrayList<>(); // a list as the stack: ArrayDeque can't hold null // @viz ser
        stack.add(root); // @viz ser
        while (!stack.isEmpty()) { // @viz ser
            TreeNode node = stack.remove(stack.size() - 1); // @viz ser
            if (node == null) { out.append("#,"); continue; } // @viz ser
            out.append(node.val).append(','); // @viz ser
            stack.add(node.right); // push right first, so left comes out first // @viz ser
            stack.add(node.left); // @viz ser
        }
        out.setLength(out.length() - 1); // drop the last comma // @viz trim
        return out.toString(); // @viz trim
    }
    public TreeNode deserialize(String data) {
        String[] tokens = data.split(","); // @viz root
        if (tokens[0].equals("#")) return null; // @viz empty
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0])); // @viz root
        ArrayDeque<TreeNode> nodes = new ArrayDeque<>(); // nodes still missing a child // @viz root
        ArrayDeque<Integer> given = new ArrayDeque<>(); // how many children each has been given // @viz root
        nodes.push(root); // @viz root
        given.push(0); // @viz root
        for (int k = 1; k < tokens.length; k++) { // each token is the next missing child of the node on top // @viz link
            TreeNode parent = nodes.peek(); // @viz link
            TreeNode child = tokens[k].equals("#") ? null : new TreeNode(Integer.parseInt(tokens[k])); // @viz link
            int g = given.pop(); // @viz link
            if (g == 0) parent.left = child; else parent.right = child; // @viz link
            given.push(g + 1); // @viz link
            while (!nodes.isEmpty() && given.peek() == 2) { nodes.pop(); given.pop(); } // both children set: this node is done // @viz link
            if (child != null) { nodes.push(child); given.push(0); } // a real node: its own children come next // @viz link
        }
        return root; // @viz return
    }
}
