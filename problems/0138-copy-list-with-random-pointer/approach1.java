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
    public Node copyRandomList(Node head) {
        Map<Node, Node> copies = new HashMap<>(); // original -> copy; get(null) is null // @viz init
        for (Node cur = head; cur != null; cur = cur.next) { // pass 1: one copy per node, not linked yet // @viz make
            copies.put(cur, new Node(cur.val)); // @viz make
        }
        for (Node cur = head; cur != null; cur = cur.next) { // pass 2: link the copies the same way as the originals // @viz link
            copies.get(cur).next = copies.get(cur.next); // @viz link
            copies.get(cur).random = copies.get(cur.random); // @viz link
        }
        return copies.get(head); // @viz return
    }
}
