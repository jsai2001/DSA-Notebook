/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
import java.util.*;

class Solution {
    private final Map<Node, Node> copies = new HashMap<>(); // original -> copy // @viz init

    public Node copyRandomList(Node head) {
        for (Node cur = head; cur != null; cur = cur.next) { // one pass // @viz walk
            Node c = copyOf(cur); // @viz walk
            c.next = copyOf(cur.next); // may make the next copy early // @viz link
            c.random = copyOf(cur.random); // may make a copy far ahead, or reuse one behind // @viz link
        }
        return copyOf(head); // @viz return
    }

    private Node copyOf(Node node) { // get the copy, making it the first time it's needed
        if (node == null) return null; // @viz get
        return copies.computeIfAbsent(node, n -> new Node(n.val)); // @viz get
    }
}
