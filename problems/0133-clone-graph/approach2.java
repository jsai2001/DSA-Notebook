/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
}
*/
import java.util.*;

class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null; // @viz init
        Map<Node, Node> copies = new HashMap<>(); // original node -> its copy // @viz init
        copies.put(node, new Node(node.val)); // @viz init
        ArrayDeque<Node> queue = new ArrayDeque<>(); // @viz init
        queue.add(node); // @viz init
        while (!queue.isEmpty()) { // @viz pop
            Node old = queue.poll(); // @viz pop
            for (Node nb : old.neighbors) { // @viz look
                if (!copies.containsKey(nb)) { // first time we see it // @viz make
                    copies.put(nb, new Node(nb.val)); // copy it now, wire it when it's popped // @viz make
                    queue.add(nb); // @viz make
                }
                copies.get(old).neighbors.add(copies.get(nb)); // @viz wire
            }
        }
        return copies.get(node); // @viz return
    }
}
