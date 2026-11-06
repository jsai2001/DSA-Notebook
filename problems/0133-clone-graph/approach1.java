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
    private final Map<Node, Node> copies = new HashMap<>(); // original node -> its copy // @viz init

    public Node cloneGraph(Node node) {
        return node == null ? null : clone(node); // @viz return
    }

    private Node clone(Node old) {
        Node seen = copies.get(old); // @viz seen
        if (seen != null) { // already copied (the graph has cycles) // @viz seen
            return seen; // @viz seen
        }
        Node copy = new Node(old.val); // @viz make
        copies.put(old, copy); // record it BEFORE visiting neighbors // @viz make
        for (Node nb : old.neighbors) { // @viz wire
            copy.neighbors.add(clone(nb)); // @viz wire
        }
        return copy; // @viz done
    }
}
