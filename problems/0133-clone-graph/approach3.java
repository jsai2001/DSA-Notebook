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
        // Pass 1: find every node. Values are unique (1..100), so they can be array indexes.
        Node[] old = new Node[101]; // old[v] = the original node with value v // @viz find
        ArrayDeque<Node> stack = new ArrayDeque<>(); // @viz find
        stack.push(node); // @viz find
        old[node.val] = node; // @viz find
        while (!stack.isEmpty()) { // @viz find
            Node cur = stack.pop(); // @viz find
            for (Node nb : cur.neighbors) { // @viz find
                if (old[nb.val] == null) { // @viz find
                    old[nb.val] = nb; // @viz find
                    stack.push(nb); // @viz find
                }
            }
        }
        Node[] copy = new Node[101]; // @viz make
        for (int v = 1; v <= 100; v++) { // @viz make
            if (old[v] != null) copy[v] = new Node(v); // one copy per node // @viz make
        }
        // Pass 2: wire each copy to the copies of its neighbors.
        for (int v = 1; v <= 100; v++) { // @viz wire
            if (old[v] == null) continue; // @viz wire
            for (Node nb : old[v].neighbors) { // @viz wire
                copy[v].neighbors.add(copy[nb.val]); // @viz wire
            }
        }
        return copy[node.val]; // @viz return
    }
}
